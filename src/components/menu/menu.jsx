import { useState, useEffect } from "react";
import { Accordion, Container, Row, Col, Card } from "react-bootstrap";
import { csvParse } from "d3-dsv";

import "./menu.css";

export const Menu = () => {
  const [menu, setMenu] = useState();
  useEffect(() => {
    async function fetchAndSetMenu() {
      const businessHoursCsvFile = await (
        await fetch("/assets/menu.csv")
      ).text();
      const menuItems = csvParse(businessHoursCsvFile);
      const menu = {};
      for (const menuItem of menuItems) {
        const menuItemsInCategory = menu[menuItem.category];
        if (menuItemsInCategory) {
          menuItemsInCategory.push(menuItem);
        } else {
          menu[menuItem.category] = [menuItem];
        }
      }
      setMenu(menu);
    }
    fetchAndSetMenu();
  }, []);

  return (
    <Container id="menu-container">
      {Object.entries(menu || {}).map(([category, menuItems]) => (
        <div className="my-1" key={category}>
          <h3>{category}</h3>
          <hr className="mt-0" />
          <Row>
            {menuItems?.map((menuItem, i) => (
              <Col key={i} xs={12} md={6} lg={4}>
                <Accordion>
                  <Card className="my-1 menu-item-card">
                    <Card.Body>
                      <Card.Text className="my-0 menu-item-name">
                        {`${menuItem.code}. ${menuItem.name}`}
                        {menuItem.spicyLevel > 0 && (
                          <span role="img" aria-label="chill">
                            🌶️
                          </span>
                        )}
                      </Card.Text>
                      <Card.Text className="my-0 menu-item-price">
                        ${(+menuItem.price).toFixed(2)}
                      </Card.Text>
                      {menuItem.description && (
                        <Accordion.Toggle
                          className="my-0 menu-item-detail-toggle"
                          as={Card.Text}
                          variant="link"
                          eventKey="1"
                        >
                          See details
                        </Accordion.Toggle>
                      )}
                      {menuItem.description && (
                        <Accordion.Collapse eventKey="1">
                          <div>
                            {menuItem.description.split("\n").map((line, i) => (
                              <Card.Text
                                key={i}
                                className="my-0 menu-item-description"
                              >
                                {line}
                              </Card.Text>
                            ))}
                          </div>
                        </Accordion.Collapse>
                      )}
                    </Card.Body>
                  </Card>
                </Accordion>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};
