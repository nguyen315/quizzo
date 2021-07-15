import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
// import NavbarMenu from "../layouts/NavbarMenu";

const ProtectedRoute = (props: any, { component: Component, ...rest }: any) => {
  console.log(props.auth);
  if (props.auth.authLoading) {
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
          props.auth.isAuthenticated === true ? (
            <>
              {/* <NavbarMenu /> */}
              <Component {...rest} {...prop} />
            </>
          ) : (
            <Redirect to="/landingPage" />
          )
        }
      />
    );
  }
};

const mapStateToProps = (state: any) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(ProtectedRoute);
