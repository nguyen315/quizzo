import { connect, useDispatch, useSelector } from 'react-redux';
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { RootState } from '../../store/store';
import {
  logOut,
  showUpdateModal,
  logoutUser
} from '../../store/slices/auth.slice';
import { setAuthToken } from '../../utils/setAuthToken';
import { Link } from 'react-router-dom';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import UpdateForm from '../auth/UpdateForm';
import '../../css/landing/quizzo-title.css';

const LoggedInNavbar: React.FC = (props: any) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const update = () => {
    dispatch(showUpdateModal());
  };

  const handleLogout = async () => {
    setAuthToken(null);
    localStorage.removeItem('Authorization');
    await dispatch(logoutUser());
    await dispatch(logOut());
  };

  return (
    <>
      <LoginForm />
      <RegisterForm />
      <UpdateForm />

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand className="NavbarQuizzo" as={Link} to="/">
            Quizzo
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/list-questions">
              Questions
            </Nav.Link>
            <Nav.Link as={Link} to="/list-rooms">
              Rooms
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="success">Account</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={update}>Update Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(LoggedInNavbar);
