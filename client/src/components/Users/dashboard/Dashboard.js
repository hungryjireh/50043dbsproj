import React, { Component } from "react";
import './Dashboard.scss'
import CardList from '../../card/card'
import { searchBooks } from "../../../actions/bookActions";
import {connect} from "react-redux";



class Dashboard extends Component {

    componentDidMount() {
        this.props.searchBooks(" ")
    }

  handleInputChange = () => {
      if (this.search.value.length > 2) {
          this.props.searchBooks(this.search.value)
      }
  }
  

  render() {

    return (
        <div className="container col">
          <div className="row center">
            <h1>Books<span className="highlight">.</span></h1>
            <p>Finding my favourite book</p>
          </div>

          <div className="col search">

              <form className="row">
                  <div className="input-field">
                      <i className="material-icons prefix">search</i>
                      <input id="searchBookInput" type="text" autoComplete="false"
                             onChange={this.handleInputChange}
                             ref={input => this.search = input}
                      />
                      <label htmlFor="searchBookInput">Search book</label>
                  </div>
              </form>

              <CardList />

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