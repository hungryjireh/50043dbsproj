import React, { Component } from "react";
import Nav from '../Nav/Nav';
import Books from '../Image/book-front.jpeg';
import Carousel from '../layout/Carousel';
import Footer from '../layout/Footer'

const divStyle={
  overflowY: 'scroll',
  width:'100%',
  float: 'left',
  height:'100vh',
  position:'relative',
  marginTop: '-10px'
};

const img = {
  width:'100%',
  height:'100vh',
}

const section = {
  height:'20rem',
  textAlign: 'center',
  fontSize: '3rem',
  padding: '2rem',
}

class Landing extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div style={divStyle}>
        <img style={img} src={Books} alt="Books"/>
          <div style={section}>
            <p>A platform that analyzes your book search and your favorite books to recommend you a possible book</p>
            <Carousel />
          </div>
          <div style={section}>
            <p>Want better recommendation of books ? We are the solution for you</p> 
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Landing;
