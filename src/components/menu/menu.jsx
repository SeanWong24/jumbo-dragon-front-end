import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
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
        <Card key={category} className="my-1 menu-card">
          <Card.Header>
            <b>{category}</b>
          </Card.Header>
          <Card.Body>
            {menuItems.map((menuItem, i) => (
              <Row
                key={i}
                className={+menuItem.spicyLevel ? " spicy-menu-item" : ""}
              >
                <Col className="mx-0" xs="auto">
                  <label className="menu-item-code">{menuItem.code}</label>
                </Col>
                <Col className="mx-0">
                  <label className={menuItem.description ? " mb-0" : ""}>
                    {menuItem.name}
                  </label>
                  {menuItem.description && (
                    <div>
                      {menuItem.description
                        .split("\n")
                        .map((descriptionLine, i) => (
                          <label key={i} className="mt-0 menu-item-description">
                            {descriptionLine}
                          </label>
                        ))}
                    </div>
                  )}
                </Col>
                <Col className="mx-0" xs="auto">
                  ${(+menuItem.price).toFixed(2)}
                </Col>
              </Row>
            ))}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};
