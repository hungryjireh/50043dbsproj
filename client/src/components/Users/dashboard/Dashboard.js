import React, { Component } from "react";
import './Dashboard.scss'
import CardDesign from '../../card/card'
import { searchBooks } from "../../../actions/bookActions";
import {connect} from "react-redux";



class Dashboard extends Component {

 
  handleInputChange = () => {
      if (this.search.value.length > 2) {
          this.props.searchBooks(this.search.value)
      }
  }
  

  render() {

    return (
        <div className="dashboard">
          <div>
            <h1>Books<span className="highlight">.</span></h1>
            <p>Finding my favourite book</p>
          </div>

          <div className="search">

            <div className="search-input">

                <form className="col s12">
                    <div className="row">
                        <div className="input-field">
                            <i className="material-icons prefix">search</i>
                            <input id="searchBookInput" type="text" autoComplete="false"
                                   onChange={this.handleInputChange}
                                   ref={input => this.search = input}
                            />
                            <label htmlFor="searchBookInput">Search book</label>
                        </div>
                    </div>
                </form>


            </div>
         
            <div className="search-results">
                <CardDesign />
            </div>


          </div>
        </div>
    );
  }
}
const mapStateToProps = state => ({})

export default connect(
    mapStateToProps,
    { searchBooks }
)(Dashboard);