import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, connect } from 'react-redux';
import { loadUser } from '../../store/slices/auth.slice';
import store from '../../store/store';
// import NavbarMenu from "../layouts/NavbarMenu";

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute = ({ component: Component, ...rest }: IProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadUser());
    };
    fetchData();
  }, []);

  if (store.getState().auth.authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    return (
      <Route
        {...rest}
        render={(prop) =>
          store.getState().auth.isAuthenticated === true ? (
            <>
              {/* <NavbarMenu /> */}
              <Component {...rest} {...prop} />
            </>
          ) : (
            <Redirect to="/" />
          )
        }
      />
    );
  }
};

const mapStatetoProps = (state: any) => {
  return { auth: state.auth };
};

export default connect(mapStatetoProps)(ProtectedRoute);
