import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../store/slices/auth.slice';
import QuizzoTitle from '../components/layouts/QuizzoTitle';
import MyNavbar from '../components/layouts/MyNavbar';
import LoggedInNavBar from '../components/layouts/LoggedInNavBar';
import PINField from '../components/layouts/PINField';
import Footer from '../components/layouts/Footer';
import { Redirect } from 'react-router';
import { RootState } from '../store/store';
import { SockerInit } from '../components/socket/socker';
import { initListeners } from '../components/socket/sockerListener';
import { updateGame } from '../store/slices/game.slice';
import { Button } from 'react-bootstrap';

export let socket: any = undefined;

const LandingPage: React.FC = (props: any) => {
  const auth = useSelector((state: RootState) => state.auth);
  const game = useSelector((state: RootState) => state.game);
  const dispatch = useDispatch();

  socket = SockerInit();
  initListeners(dispatch, socket);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadUser());
    };
    fetchData();
  }, []);

  return (
    <>
      {auth.isAuthenticated ? <LoggedInNavBar /> : <MyNavbar />}
      <QuizzoTitle />
      <PINField />
      <Footer />
    </>
  );
};

export default LandingPage;
