import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../store/slices/auth.slice';
import QuizzoTitle from '../components/layouts/QuizzoTitle';
import MyNavbar from '../components/layouts/MyNavbar';
import PINField from '../components/layouts/PINField';
import Footer from '../components/layouts/Footer';
import store from '../store/store';

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadUser());
    };
    fetchData();
  }, []);

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
