import { useState, useEffect } from "react";
import {
  Accordion,
  Button,
  Container,
  Dropdown,
  Row,
  Col,
  Card,
  Alert
} from "react-bootstrap";
import { csvParse } from "d3-dsv";

import "./menu.css";

export const Menu = () => {
  const [menu, setMenu] = useState();
  const [shouldShowAllergyAlert, setIsShowAllergyAlert] = useState(true);
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
    window.addEventListener("scroll", toggleBackToTopButton);
  }, []);

  return (
    <Container id="menu-container">
      <Button
        id="back-to-top-button"
        className="float-right hide"
        variant="secondary"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to Top
      </Button>
      {shouldShowAllergyAlert && (
        <Alert
          className="my-1"
          variant="danger"
          onClose={() => setIsShowAllergyAlert(false)}
          dismissible
        >
          Please notify us of any allergies you may have.
        </Alert>
      )}
      <h1>
        Menu
        <Dropdown className="my-1 float-right">
          <Dropdown.Toggle variant="secondary">
            Jump to Category
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(menu || {}).map((category, i) => (
              <Dropdown.Item
                key={i}
                onClick={() =>
                  setTimeout(() =>
                    document
                      .querySelector(`#menu-category-${i}`)
                      .scrollIntoView({ behavior: "smooth" })
                  )
                }
              >
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </h1>
      {Object.entries(menu || {}).map(([category, menuItems], i) => (
        <div id={`menu-category-${i}`} className="my-1" key={i}>
          <h3>{category}</h3>
          <hr className="mt-0" />
          <Row>
            {menuItems?.map((menuItem, i) => (
              <Col key={i} xs={12} md={6} lg={4}>
                <Accordion>
                  <Card className="my-1 menu-item-card">
                    <Card.Body>
                      <Card.Text className="my-0 menu-item-name">
                        {menuItem.code ? `${menuItem.code}. ` : ""}
                        {menuItem.name}
                        {menuItem.spicyLevel > 0 && (
                          <span role="img" aria-label="chill" title="Spicy">
                            🌶️
                          </span>
                        )}
                        {menuItem.hasPeanuts > 0 && (
                          <span
                            role="img"
                            aria-label="peanuts"
                            title="Has Peanuts"
                          >
                            🥜
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

const toggleBackToTopButton = () =>
  document
    .querySelector("#back-to-top-button")
    ?.classList.toggle("hide", window.scrollY <= 10);
