import React, { Component } from "react";
import './Dashboard.scss'
import Navbar from "../../layout/Navbar";
import CardDesign from '../../card/card'
import NavbarTop from '../../Nav/Nav'

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    return (
      <div>
        <NavbarTop />
        <Navbar />
        <div class="dashboard">
          <div>
            <h1>Books<span class="highlight">.</span></h1>
            <p>Finding my favourite book</p>
          </div>
          <CardDesign />
        </div>
      </div>
    );
  }
}

// Dashboard.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { logoutUser }
// )(Dashboard);

export default Dashboard