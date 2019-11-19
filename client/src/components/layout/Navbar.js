import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import './Navbar.css'
import Man from '../../images/man.jpeg'
import Admin from '../../images/admin.png'


class Navbar extends Component {

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (

      <nav id="mySidebar" className="sidebar">

      <Link to={'/dashboard'} className={"home-logo"}>GoodReviews</Link>

        <div id="avatar-box">
          <div className="avatar">
            <img className="avatar" src={Admin} alt="" />
          </div>
        </div>
        <h5  style={{color: "orange"}}>{user.name.split(" ")[0]}</h5>
        <Link to={'/getbooks'}><span className="icon-text">Get Books</span></Link>
        <Link to={'/addreview'}><span className="icon-text">Add Review</span></Link>
        <a href="#"><span className="icon-text">Settings</span></a>
        <button
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);