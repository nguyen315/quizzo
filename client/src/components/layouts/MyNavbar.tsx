import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types"
import { connect } from 'react-redux'
// import { test } from "../store/actions/authActions"
import { Container } from "react-bootstrap";
import { BsFillPersonFill } from 'react-icons/bs';

const MyNavbar: React.FC = () => {
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
            // onClick={ test }
          >
            Sign Up
          </Button>
          <Button
            id="log-in"
            className="custom-btn"
            // onClick={ test }
          >
            Log In
          </Button>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
	)
}

export default MyNavbar
