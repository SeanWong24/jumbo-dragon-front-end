import { useState, useEffect } from "react";
import {
  Button,
  Container,
  Carousel,
  Image,
  Row,
  Col,
  Card,
  Alert
} from "react-bootstrap";

import "./home.css";

export function Home() {
  const [businessHoursJson, setBusinessHoursJson] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [emailAddress, setEmailAdress] = useState();
  const [googleMapEmbedUrl, setGoogleMapEmbedUrl] = useState();
  const [shouldShowNewsAlert, setIsShowNewsAlert] = useState(true);
  useEffect(() => {
    async function fetchAndSetBusinessHoursJson() {
      const businessHoursJsonFile = await (
        await fetch("/assets/business-info.json").then(x => x.json())
      ).businessHours;
      setBusinessHoursJson(businessHoursJsonFile);
    }
    fetchAndSetBusinessHoursJson();

    async function fetchAndSetAddress() {
      setAddress(await (
        await fetch("/assets/business-info.json").then(x => x.json())
      ).address);
    }
    fetchAndSetAddress();

    async function fetchAndSetPhoneNumber() {
      setPhoneNumber(await (
        await fetch("/assets/business-info.json").then(x => x.json())
      ).phoneNumber);
    }
    fetchAndSetPhoneNumber();

    // async function fetchAndSetEmailAddress() {
    //   setEmailAdress(await (
    //     await fetch("/assets/business-info.json").then(x => x.json())
    //   ).emailAddress);
    // }
    // fetchAndSetEmailAdress();

    async function fetchAndSetGoogleMapEmbedUrl() {
      setGoogleMapEmbedUrl(
        await (
          await fetch("/assets/business-info.json").then(x => x.json())
        ).googleMapEmbedUrl
      );
    }
    fetchAndSetGoogleMapEmbedUrl();
  }, []);

  return (
    <Container>
      {shouldShowNewsAlert && <Alert
        className="news text-center"
        variant="info"
        onClose={() => setIsShowNewsAlert(false)}
        // dismissible
      >
        <h5>
        We are closed on Feb 1st. HAPPY LUNAR NEW YEAR!
        </h5>
      </Alert>}
      <Button variant="dark" href="#/menu" block>
        CHECK OUT OUR MENU
      </Button>
      <Carousel className="my-1">
        {["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"].map((imageName) => (
          <Carousel.Item key={imageName} className="carousel-item">
            <Image fluid src={`/assets/images/${imageName}`}></Image>
          </Carousel.Item>
        ))}
      </Carousel>
      <Alert className="my-1 text-center" variant="danger">
        <h2>Get Free Choice of One</h2>
        <h5><ul className="list-unstyled">
          {/* <li>Jar Doo Chicken Wings</li> */}
          <li>Sweet & Sour Wonton</li>
          <li>Crabmeat Cheese Wonton</li>
        </ul></h5>
        <p className="my-0">
          <h5>with pick up order over $45.00 (before tax), CASH ONLY</h5>
        </p>
        <p className="my-0">
          * Except Mother's Day, Christmas Eve, New Year's Eve, New Year's Day
        </p>
      </Alert>
      <Alert className="my-1 text-center" variant="success">
        <h5>FREE Delivery over $50 (before tax) in Limited Area</h5>
      </Alert>
      <Row id="info-section">
        <Col className="column my-1" xs={12} md={4}>
          <Card className="info-card text-center">
            <Card.Header>
              <b>Business Hours</b>
            </Card.Header>
            <Card.Body className="align-items-center d-flex justify-content-center">
              <div>
                {businessHoursJson?.map(({ day, from, to }) => (
                  <Card.Text key={day} className="my-0">
                    {`${day}: ${from ? `${from} - ${to}` : "Closed"}`}
                  </Card.Text>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="column my-1" xs={12} md={4}>
          <Card className="info-card text-center">
            <Card.Header>
              <b>Contact Us</b>
            </Card.Header>
            <Card.Body className="align-items-center d-flex justify-content-center">
              <div>
                {address?.split("\n").map((addressLine) => (
                  <Card.Text key={addressLine} className="my-0">
                    {addressLine}
                  </Card.Text>
                ))}
                <br />
                <Card.Text>
                  <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                  <br />
                  <a href={`mailto:${emailAddress}`}>{emailAddress}</a>
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col className="column my-1" xs={12} md={4}>
          <Card className="info-card text-center">
            <Card.Header>
              <b>Find Us on Google Map</b>
            </Card.Header>
            <iframe
              title="map"
              src={googleMapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
