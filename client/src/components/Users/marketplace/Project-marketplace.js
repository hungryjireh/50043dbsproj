import React, { Component } from "react";
import './Project-marketplace.css'
import Navbar from "../../layout/Navbar";
import CardMarketplace from '../../card/card-marketplace'

class ProjectMarketplace extends Component {
    render() {
      return (
          <div className="marketplace"> 
              <Navbar />
              <div>
                <CardMarketplace />
              </div>
          </div>
      );
    }
  }
  
  export default ProjectMarketplace;