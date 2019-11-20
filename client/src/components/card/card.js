import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss'
import {connect} from "react-redux";
import {getBookDetail, searchBooks} from "../../actions/bookActions";


class CardList extends React.Component {

    render() {
    return (
      <div className="col s12">
        {
          this.props.books.map((book, key) => <Card key={key} index={key} details={book}/>)
        }
      </div>
    )
  }
}


class Card extends React.Component {
  render() {
      const { asin, title, imUrl, description} = this.props.details;
      return (
      <div className="card horizontal">
          <div className="card-image">
              <img src={imUrl} alt="book image"/>
          </div>

          <div className="card-stacked">
            <div className="card-title">{title}</div>
            <div className="card-content">{description.substring(0, 250) + "..."}</div>
              <Link className="card-action" to={'/book/'+asin}>
                  <button className="button button-primary button-improve">
                      <i className="fa fa-chevron-right"></i> Find out more
                  </button>
              </Link>
          </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    books: state.books.books,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getBookDetail, searchBooks }
)(CardList);