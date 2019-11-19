import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import { setCurrentUser, logoutUser } from "../actions/authActions";
import { Provider } from "react-redux";
import store from "../store";

import Landing from "./layout/Landing";
import Register from "./auth/Register";
import Login from "./auth/Login";
import PrivateRoute from "./private-route/PrivateRoute";
import Dashboard from "./Users/dashboard/Dashboard";
import Store from "./card/card-marketplace";
import Review from "./Books/Review";
import AddReview from "./Books/AddReview";
import Navbar from "./layout/Navbar";



// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

              <Route path="/" >
                <div class="page-wrapper">
                  <Navbar />


                  <main id="content" style={{paddingLeft: 260+"px"}}>
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <Route path="/getbooks" component={Store} />
                    <Route path="/addreview" component={AddReview} />
                    <Route path="/book/:asin" component={Review} />
                  </main>
                </div>
              </Route>

            </Switch>
          </Router>
        </Provider>
    );
  }
}
export default App;
