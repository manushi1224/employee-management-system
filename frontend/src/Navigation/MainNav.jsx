import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MainHeader from "./MainHeader";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import userContext from "../context/userContext";
import { useContext, useEffect } from "react";

function MainNav() {
  const authUser = useContext(userContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!authUser.isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [authUser, navigate]);

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
                  <Link
                    className="text-white text-decoration-none mt-1 ms-2"
                    to={"/leave-page"}
                  >
                    Leave Page
                  </Link>
                  <Link
                    to={`/profile`}
                    className="text-white text-decoration-none mt-1 ms-2"
                  >
                    Profile Page
                  </Link>
                  <Link
                    to={"/dashboard"}
                    className="text-white text-decoration-none mt-1 ms-2"
                  >
                    DashBoard
                  </Link>
                </>
              )}
            </Nav>
            {authUser.token && authUser.currentUser && (
              <NavDropdown
                title={authUser.currentUser.name}
                className="text-white"
                id="collapsible-nav-dropdown"
              >
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={authUser.logout}>
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {/* (
                <div className="w-100 d-flex justify-content-end">
                   <Link
                    to={"/signup"}
                    className="text-white text-decoration-none"
                  >
                    <Button className="bg-dark border-white me-3">
                      Add New User
                    </Button>
                  </Link>
                  <Button
                    className="bg-dark border-white me-3"
                    onClick={authUser.logout}
                  >
                    Log Out
                  </Button>
                </div>
              ) : authUser.isLoggedIn && !authUser.isSuperUser ? (
                <Button
                  className="bg-dark border-white me-3"
                  onClick={authUser.logout}
                >
                  Log Out
                </Button>
              ) : null */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </MainHeader>
  );
}

export default MainNav;
