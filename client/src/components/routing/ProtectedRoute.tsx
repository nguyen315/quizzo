import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, connect, useSelector } from 'react-redux';
import { loadUser } from '../../store/slices/auth.slice';
import store, { RootState } from '../../store/store';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

const ProtectedRoute = ({ component: Component, ...rest }: IProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(loadUser());
    };
    fetchData();
  }, []);

  if (auth.authLoading) {
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
          auth.isAuthenticated === true ? (
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

export default ProtectedRoute;
