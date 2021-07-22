import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../store/slices/auth.slice';
import QuizzoTitle from '../components/layouts/QuizzoTitle';
import MyNavbar from '../components/layouts/MyNavbar';
import PINField from '../components/layouts/PINField';
import Footer from '../components/layouts/Footer';
import { Redirect } from 'react-router';
import { RootState } from '../store/store';

const LandingPage: React.FC = (props: any) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadUser());
    };
    fetchData();
  }, []);

  if (auth.isAuthenticated) {
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

export default LandingPage;
