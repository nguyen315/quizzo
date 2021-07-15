import QuizzoTitle from "../components/layouts/QuizzoTitle";
import MyNavbar from "../components/layouts/MyNavbar";
import PINField from "../components/layouts/PINField";
import Footer from "../components/layouts/Footer";

const LandingPage: React.FC = () => {
  return (
    <>
      <MyNavbar />
      <QuizzoTitle />
      <PINField />
      <Footer />
    </>
  );
};

export default LandingPage;
