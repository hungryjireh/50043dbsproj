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
// ##############################################################
// ##########################  USER  ############################
// ##############################################################
      // <div id="mySidebar" class="sidebar" onmouseover="testIn()" onmouseout="testOut()">
      //   <div id="avatar-box">
      //     <div className="avatar">
      //       <img className="avatar" src={Man} alt="" />
      //     </div>
      //   </div>
      //   <h5  style={{color: "orange"}}>{user.name.split(" ")[0]}</h5>
      //   <Link to={'/projectmarketplace'}><span class="icon-text">Projects</span></Link>
      //   <a href="#"><span class="icon-text">Clients</span></a>
      //   <a href="#"><span class="icon-text">Settings</span></a>
      //   <button
      //         style={{
      //           width: "150px",
      //           borderRadius: "3px",
      //           letterSpacing: "1.5px",
      //           marginTop: "1rem"
      //         }}
      //         onClick={this.onLogoutClick}
      //         className="btn btn-large waves-effect waves-light hoverable blue accent-3"
      //       >
      //         Logout
      //       </button>
      // </div>

// ##############################################################
// ##########################  ADMIN  ###########################
// ##############################################################

      <div id="mySidebar" class="sidebar" onmouseover="testIn()" onmouseout="testOut()">
        <div id="avatar-box">
          <div className="avatar">
            <img className="avatar" src={Admin} alt="" />
          </div>
        </div>
        <h5  style={{color: "orange"}}>{user.name.split(" ")[0]}</h5>
        <Link to={'/createproject'}><span class="icon-text">Create Project</span></Link>
        <a href="#"><span class="icon-text">Current Project</span></a>
        <a href="#"><span class="icon-text">Settings</span></a>
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
      </div>
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