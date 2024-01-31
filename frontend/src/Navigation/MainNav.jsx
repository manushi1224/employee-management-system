import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";

import { NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import MainHeader from "./MainHeader";
import getIcon from "../utils/getIcon";

const NavLinks = (item) => {
  return (
    <Link
      className="text-decoration-none text-white mt-1 ms-2 me-2"
      to={item.link}
    >
      {getIcon(item.navIcon)}
      {item.navText}
    </Link>
  );
};

function MainNav() {
  const authUser = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser.isLoggedIn) {
      navigate("/");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    authUser.getUserData();
    // eslint-disable-next-line
  }, []);

  return (
    <MainHeader>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow-lg">
        <Container>
          <Navbar.Brand>
            <Link
              to={`${authUser.isLoggedIn ? "/dashboard" : "/"}`}
              className="text-decoration-none text-white"
            >
              Employee Management System
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {authUser.isLoggedIn && (
                <>
                  <NavLinks
                    link="/leave-page"
                    navIcon="leave"
                    navText="Leave Page"
                  />
                  <NavLinks
                    link="/profile"
                    navIcon="profile"
                    navText="Profile"
                  />
                  <NavLinks
                    link="/dashboard"
                    navIcon="dashboard"
                    navText="Dashboard"
                  />
                </>
              )}
            </Nav>
            {authUser.token && authUser.currentUser && (
              <NavDropdown
                title={authUser.currentUser.name}
                className="text-white"
                id="collapsible-nav-dropdown"
              >
                {authUser.isSuperUser && (
                  <>
                    <NavDropdown.Item href="/signup">
                      Add New User
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                )}

                <NavDropdown.Item onClick={authUser.logout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </MainHeader>
  );
}

export default MainNav;
