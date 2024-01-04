import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import MainHeader from "./MainHeader";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import userContext from "../context/userContext";
import { useContext, useEffect } from "react";

function MainNav() {
  const authUser = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser.isLoggedIn) {
      navigate("/");
    }
  }, [authUser, navigate]);

  return (
    <MainHeader>
      <Navbar expand="lg" className="bg-dark shadow-lg">
        <Container>
          <Navbar.Brand className="text-white">
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
                    className="text-white text-decoration-none mt-2 ms-1"
                    to={"/leave-page"}
                  >
                    Leave Page
                  </Link>
                  <Link to={`/profile`} className="text-white text-decoration-none mt-2 ms-1">Profile Page</Link>
                  <Link
                    to={"/dashboard"}
                    className="text-white text-decoration-none mt-2 ms-1"
                  >
                    DashBoard
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
        {authUser.isSuperUser ? (
          <div className="w-100 d-flex justify-content-end">
            <Link to={"/signup"} className="text-white text-decoration-none">
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
        ) : null}
      </Navbar>
    </MainHeader>
  );
}

export default MainNav;
