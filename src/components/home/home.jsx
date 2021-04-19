import { useState, useEffect } from "react";
import {
  Container,
  Carousel,
  Image,
  Row,
  Col,
  Card,
  Jumbotron,
  Button,
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
      <Alert className="my-1 text-center" variant="danger">
        FREE Delivery over $50 (before tax) in Limited Area
      </Alert>
      <Carousel className="my-1">
        {["img33.jpg", "img34.jpg", "img35.jpg", "img36.jpg"].map(
          (imageName) => (
            <Carousel.Item key={imageName} className="carousel-item">
              <Image fluid src={`/assets/images/${imageName}`}></Image>
            </Carousel.Item>
          )
        )}
      </Carousel>
      <Jumbotron className="my-1 py-3">
        <h2>Free Choice of One</h2>
        <ul>
          <li>Jar Doo Chicken Wings</li>
          <li>Sweet & Sour Wonton</li>
          <li>Crabmeat Cheese Wonton</li>
        </ul>
        <p>with pick up order over $45.00 before tax, cash only</p>
        <p>
          * Except Mother's Day, Christmas Eve, New Year's Eve, New Year's Day
        </p>
        <Button variant="primary">Learn more</Button>
      </Jumbotron>
      <Row id="info-section">
        <Col className="column my-1" xs={12} md={4}>
          <Card className="info-card">
            <Card.Body className="text-center">
              <Card.Title>Business Hours</Card.Title>
              {businessHoursCsv?.map(({ day, start, end }) => (
                <Card.Text key={day} className="my-0">
                  {`${day}: ${start ? `${start} - ${end}` : "Closed"}`}
                </Card.Text>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col className="column my-1" xs={12} md={4}>
          <Card className="info-card">
            <Card.Body className="text-center">
              <Card.Title>Contact Us</Card.Title>
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
            </Card.Body>
          </Card>
        </Col>
        <Col className="column my-1" xs={12} md={4}>
          <Card className="info-card">
            <Card.Body className="text-center">
              <Card.Title>Find Us on Google Map</Card.Title>
            </Card.Body>
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
