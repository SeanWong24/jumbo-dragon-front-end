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
import { csvParse } from "d3-dsv";

import "./home.css";

export function Home() {
  const [businessHoursCsv, setBusinessHoursCsv] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [emailAddress, setEmailAdress] = useState();
  const [googleMapEmbedUrl, setGoogleMapEmbedUrl] = useState();
  useEffect(() => {
    async function fetchAndSetBusinessHoursCsv() {
      const businessHoursCsvFile = await (
        await fetch("/assets/business-hours.csv")
      ).text();
      setBusinessHoursCsv(csvParse(businessHoursCsvFile));
    }
    fetchAndSetBusinessHoursCsv();

    async function fetchAndSetAddress() {
      setAddress(await (await fetch("/assets/address.txt")).text());
    }
    fetchAndSetAddress();

    async function fetchAndSetPhoneNumber() {
      setPhoneNumber(await (await fetch("/assets/phone-number.txt")).text());
    }
    fetchAndSetPhoneNumber();

    async function fetchAndSetEmailAdress() {
      setEmailAdress(await (await fetch("/assets/email-address.txt")).text());
    }
    fetchAndSetEmailAdress();

    async function fetchAndSetGoogleMapEmbedUrl() {
      setGoogleMapEmbedUrl(
        await (await fetch("/assets/google-map-embed-url.txt")).text()
      );
    }
    fetchAndSetGoogleMapEmbedUrl();
  }, []);

  return (
    <Container>
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
      <Alert className="my-1 text-center" variant="warning">
        <h2>Get Free Choice of One</h2>
        <ul className="list-unstyled">
          <li>Jar Doo Chicken Wings</li>
          <li>Sweet & Sour Wonton</li>
          <li>Crabmeat Cheese Wonton</li>
        </ul>
        <p className="my-0">
          with pick up order over $45.00 (before tax), CASH ONLY
        </p>
        <p className="my-0">
          <small>
            * Except Mother's Day, Christmas Eve, New Year's Eve, New Year's Day
          </small>
        </p>
      </Alert>
      <Alert className="my-1 text-center" variant="success">
        FREE Delivery over $50 (before tax) in Limited Area
      </Alert>
      <Row id="info-section">
        <Col className="column my-1" xs={12} md={4}>
          <Card className="info-card text-center">
            <Card.Header>
              <b>Business Hours</b>
            </Card.Header>
            <Card.Body className="align-items-center d-flex justify-content-center">
              <div>
                {businessHoursCsv?.map(({ day, start, end }) => (
                  <Card.Text key={day} className="my-0">
                    {`${day}: ${start ? `${start} - ${end}` : "Closed"}`}
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
