import { Container } from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import UpdateForm from '../components/auth/UpdateForm';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import MyNavbar from '../components/layouts/MyNavbar';
import ListQuestions from './ListQuestions';

const Dashboard = () => {
  return (
    <Container fluid>
      <LoggedInNavBar />
      <UpdateForm />
    </Container>
  );
};

export default Dashboard;
