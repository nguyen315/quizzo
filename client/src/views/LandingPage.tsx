import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import "../css/landing.css";
import QuizzoTitle from "../components/layouts/QuizzoTitle";
import MyNavbar from "../components/layouts/MyNavbar";
import PINField from "../components/layouts/PINField";

const LandingPage: React.FC = () => {
  return (
    <>
      <MyNavbar />
      <QuizzoTitle />
      <PINField />
    </>
  );
};

export default LandingPage;
