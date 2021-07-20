import { Link } from 'react-router-dom';
import MyNavbar from '../components/layouts/MyNavbar';

const Dashboard = () => {
  return (
    <>
      <MyNavbar />
      <div>
        <Link to="/list-questions">List Questions</Link>
      </div>
    </>
  );
};

export default Dashboard;
