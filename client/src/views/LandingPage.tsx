import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import quizzoLogo from "../assets/logo.svg";
import logoutIcon from "../assets/logout.svg";
import PropTypes from "prop-types"
import {connect} from 'react-redux'
// import { Link } from "react-router-dom";
import {test} from "../store/actions/authActions"
import {users} from "../data/users"

const LandingPage : React.FC = () => {
  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={quizzoLogo}
          alt="quizzoLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        Quizzo
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            // to="/dashboard"
            // as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            // to="/about"
            // as={Link}
          >
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome {users[0].username}
          </Nav.Link>
          <Button
            variant="secondary"
            className="font-weight-bolder text-white"
            onClick={test}
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

LandingPage.propTypes = {
  test: PropTypes.func.isRequired
}

const mapStatetoProps = (state: any) => ({
  auth: state
})


export default connect(mapStatetoProps, {test})(LandingPage)
