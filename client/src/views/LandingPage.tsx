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
import { Container } from "react-bootstrap";
import { BsFillPersonFill } from 'react-icons/bs';

const LandingPage : React.FC = () => {
  return (
    <Navbar collapseOnSelect expand="md" id="header">
      <Container>
      <Navbar.Brand></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <BsFillPersonFill />
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Container></Container>
        <Nav className="align-nav">
          <Button
            id="sign-up"
            className="custom-btn"
            onClick={ test }
          >
            Sign Up
          </Button>
          <Button
            id="log-in"
            className="custom-btn"
            onClick={ test }
          >
            Log In
          </Button>
        </Nav>
      </Navbar.Collapse>
      </Container>
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
