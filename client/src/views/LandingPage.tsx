import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { loadUser } from '../store/actions/auth/authActions';
import QuizzoTitle from '../components/layouts/QuizzoTitle';
import MyNavbar from '../components/layouts/MyNavbar';
import PINField from '../components/layouts/PINField';
import Footer from '../components/layouts/Footer';
import { Redirect } from 'react-router';

const LandingPage: React.FC = (props: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadUser());
    };
    fetchData();
  }, []);

  if (props.auth.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <>
      <MyNavbar />
      <QuizzoTitle />
      <PINField />
      <Footer />
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(LandingPage);
