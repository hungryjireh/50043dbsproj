import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
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
                style={{
                  width: "160px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Register
              </Link>
            </div>
            
            <div className="col s5">
              <Link
                to="/login"
                style={{
                  width: "160px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
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

export default Landing;
