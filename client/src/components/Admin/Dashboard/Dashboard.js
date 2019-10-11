import React, { Component } from "react";
import './Dashboard.scss'
import Navbar from "../../layout/Navbar";
import CardDesign from '../../card/card';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    return (
      <div>
        <Navbar />
        <div class="dashboard">
          <div class="col">
            <div class="card flat small">
              <h1>tRee<span class="highlight">.</span></h1>
              <p>The first of its kind project market place platform for students to choose a range of projects offered by companies </p>
              <small>At tRee, we aim to encourage students to join company project as a form of exposure and through our platform we aim to create transparency between companies and students to track their progress and communicate effectively with the tools provided on tRee</small>
            </div>
            <div class="card xl">
              <h2>Current Projects</h2>
              <CardDesign />
              <ul class="keys">
                <li class="indicator"></li>
                <li class="indicator"></li>
                <li class="indicator"></li>
                <li class="indicator"></li>
                <li class="indicator"></li>
              </ul>
            </div>
          </div>
          <div class="col">
            <div class="card small">
              <h2>Completed Projects</h2>
            </div>
            <div class="card large">
              <h2>Deadlines</h2>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <h2>Total Earnings</h2>
            </div>
            <div class="card">
              <h2>Watching</h2>
            </div>
            <div class="card large">
              <h2>Friends</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard