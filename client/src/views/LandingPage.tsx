// import { test } from "../store/actions/authActions"
import QuizzoTitle from "../components/layouts/QuizzoTitle";
import MyNavbar from "../components/layouts/MyNavbar";
import PINField from "../components/layouts/PINField";
import Footer from "../components/layouts/Footer";

const LandingPage : React.FC = () => {
  return (
    <>
    <MyNavbar />
    <QuizzoTitle />
    <PINField />
    <Footer />
    </>
  );
};

// LandingPage.propTypes = {
//   test: PropTypes.func.isRequired
// }

// const mapStatetoProps = (state: any) => ({
//   auth: state
// })

// export default connect(mapStatetoProps, {test})(LandingPage)
export default LandingPage
