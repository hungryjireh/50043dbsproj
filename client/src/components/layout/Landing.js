import React, { Component } from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";

class Landing extends Component {

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s10 center-align">
            <h4>
              <span>Book Review </span>
              <b>
                <span style={{ fontFamily: "monospace" }}>GoodReads</span>
              </b>
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Predicting the next book you will like
            </p>
            <br />

            <div className="col s5">
              <Link
                to="/register"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>

            <div className="col s5">
              <Link
                to="/login"
                className="btn btn-large btn-flat waves-effect white black-text"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps
)(withRouter(Landing));
