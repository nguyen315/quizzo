import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
// import NavbarMenu from "../layouts/NavbarMenu";

const ProtectedRoute = (prop: any, { component: Component, ...rest }: any) => {
  console.log(prop.auth);
  if (prop.auth.authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) =>
          prop.auth.isAuthenticated === true ? (
            <>
              {/* <NavbarMenu /> */}
              <Component {...rest} {...props} />
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
