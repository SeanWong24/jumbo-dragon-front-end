import { Nav, Navbar, Image } from "react-bootstrap";
import { Route } from "react-router-dom";
import { Home } from "../home/home";
import { Menu } from "../menu/menu";

import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

export default function App() {
  const navItems = [
    { url: "/", name: "Home" },
    { url: "/menu", name: "Menu" }
  ];

  return (
    <div className="App">
      <Navbar
        // collapseOnSelect
        // expand="md"
        id="navbar"
        variant="light"
        bg="light"
      >
        <Navbar.Brand className="text-center" id="logo">
          <Image fluid src="/logo.png"></Image>
        </Navbar.Brand>
        {/* <Navbar.Toggle /> */}
        {/* <Navbar.Collapse> */}
        <Nav id="nav" defaultActiveKey={window.location.hash}>
          {navItems.map(({ url, name }) => (
            <Nav.Link key={name} href={`#${url}`}>
              <h4>
                <b>{name}</b>
              </h4>
            </Nav.Link>
          ))}
        </Nav>
        {/* </Navbar.Collapse> */}
      </Navbar>

      <Route exact path="/">
        <Home></Home>
      </Route>
      <Route path="/menu">
        <Menu></Menu>
      </Route>

      <Navbar id="aaa" sticky="bottom" variant="light" bg="light">
        <Navbar.Brand className="mx-auto footer-text">
          Jumbo Dragon Chinese Restaurant | BrantFord
        </Navbar.Brand>
      </Navbar>
    </div>
  );
}
