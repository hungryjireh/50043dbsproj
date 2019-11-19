import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss'
import {connect} from "react-redux";
import {getBookDetail, searchBooks} from "../../actions/bookActions";


class CardDesign extends React.Component {

  componentDidMount() {
      if (this.props.books.length === 0){
          this.props.searchBooks(" ")
      }
  }


    render() {
    return <div>
      <header className="app-header"></header>
      <Title />
      <div className="app-card-list" id="app-card-list">
        {
          this.props.books.map((book, key) => <Card key={key} index={key} details={book}/>)
        }
    </div>
    </div>
  }
}


class Title extends React.Component {
  render() {
    return <section className="app-title">
      {/* <div className="app-title-content">
        <a className="designer-link" href="https://dribbble.com/shots/1978243-Latest-News" target="_blank"> <i className="fa fa-dribbble"></i></a>
      </div> */}
    </section>
  }
}


class CardHeader extends React.Component {
  render() {
    const { image, title } = this.props;
    var style = { 
        backgroundImage: 'url(' + image + ')',
        height: '15rem',
        textAlign: 'center'
    };
    return (
      <header style={style} className="card-header">
        <h4 className="card-header--title">{title}</h4>
      </header>
    )
  }
}


class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        
        <p>{this.props.categories}</p>
        
        <p className="body-content">{this.props.description.substring(0, 250) + "..."}</p>

          <Link to={'/book/'+this.props.asin}>
              <button className="button button-primary button-improve">
                  <i className="fa fa-chevron-right"></i> Find out more
              </button>
          </Link>
      </div>
    )
  }
}


class Card extends React.Component {
  render() {
      const { asin, title, imUrl, categories, description} = this.props.details;
      return (
      <article className="card">
        <CardHeader title={title} image={imUrl}/>
        <CardBody asin={asin} categories={categories} description={description} />
      </article>
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
)(CardDesign);