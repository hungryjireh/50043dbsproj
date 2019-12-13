import React, { Component } from "react";
import Nav from '../Nav/Nav';
import Books from '../Image/book-front.jpeg';
import Footer from '../layout/Footer'
import Book from '../Image/book1.jpg';

const divStyle={
  overflowY: 'scroll',
  width:'100%',
  float: 'left',
  height:'100vh',
  position:'relative',
  marginTop: '-10px'
};

const viewPage = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center'
}
const img = {
  width:'100%',
  height:'100vh',
  position: 'absolute'
}

const section = {
  height:'20rem',
  textAlign: 'center',
  fontSize: '3rem',
  padding: '2rem',
}

const carosel = {
  padding: '30px',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  justifyItems: 'center'
}

const arrows = {
  padding: '30px',
  textAlign: 'center'
}

const image = {
  height: '15rem',
  alignItems: 'center',
  display: 'inline-block',
  justifyContent: 'center',
}

class Landing extends Component {
  render() {
    return (
      <div>
        <Nav />
        <div style={divStyle}>
          <div style={viewPage}>
            <img style={img} src={Books} alt="Books"/>
            <div style={section}>
              <p>A platform that analyzes your book search and your favorite books to recommend you a possible book</p>
            </div>
          </div>
          <div style={carosel}>
            <img style={image} src={Book} alt="Book"/>
            <img style={image} src={Book} alt="Book"/>
            <img style={image} src={Book} alt="Book"/>
            <img style={image} src={Book} alt="Book"/>
            <img style={image} src={Book} alt="Book"/>
          </div>
          <div style={arrows}>
            <button>previous</button>
            <button>next</button>
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
