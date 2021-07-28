import { connect, useDispatch, useSelector } from 'react-redux';
import { Container, Dropdown, Nav, Navbar } from 'react-bootstrap';
import { RootState } from '../../store/store';
import { logOut, showUpdateModal } from '../../store/slices/auth.slice';
import { setAuthToken } from '../../utils/setAuthToken';
import { Link } from 'react-router-dom';

const LoggedInNavbar: React.FC = (props: any) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const update = () => {
    dispatch(showUpdateModal());
  };

  const logoutUser = () => {
    setAuthToken(null);
    localStorage.removeItem('Authorization');
    dispatch(logOut());
  };

  return (
    <>
      <br />
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
            <Nav.Link href="#rooms">Rooms</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="success">Account</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={update}>Update Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logoutUser}>Logout</Dropdown.Item>
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
