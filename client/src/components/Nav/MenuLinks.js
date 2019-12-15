import React, { Component } from "react";

const divStyle = {
  float: 'right',
  marginTop: '10px'
};

class MenuLinks extends Component {
  render() {
    return (
        <div className={this.props.menuStatus} style={divStyle} className='menu'>
          <ul>
            <li><a href='#' onClick={this.props.menuToggle}>Home</a></li>
            <li><a href='#' onClick={this.props.menuToggle}>About</a></li>
            <li><a href='#' onClick={this.props.menuToggle}>Team</a></li>
            <li><a href='#' onClick={this.props.menuToggle}>Contact</a></li>
            <li><a href="/login"><span class="btn btn-default btn-lg">Login</span></a></li>
            <li><a href="/register"><span class="btn btn-default btn-lg">Register</span></a></li>
          </ul>
        </div> 
    )
  }
}

export default MenuLinks