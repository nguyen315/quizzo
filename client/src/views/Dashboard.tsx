import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import MyNavbar from '../components/layouts/MyNavbar';

const Dashboard = () => {
  return (
    <Container fluid>
      <MyNavbar />
      <div>
        <Link to="/list-questions">List Questions</Link>
      </div>
    </Container>
  );
};

export default Dashboard;
