import React from 'react';
import { Link } from 'react-router-dom';
import './card-marketplace.scss'
import './heart-shape.css'
import api from "../../utils/api";

// Start App

class CardMarketplace extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
    };
  };

  componentDidMount() {
    this.getDataFromDb();
  };

  getDataFromDb = () => {
    api.get("/api/store/getbooks")
      .then(res => this.setState({ posts: res.data.data }));
  };

  render() {
    console.log(this.state.posts)
    return <div>
      <header className="app-header"></header>
      <Title />
        <div className="app-card-list marketplace-app-card-list" id="app-card-list">
            {
            Object
            .keys(this.state.posts)
            .map(key => <Card key={key} index={key} details={this.state.posts[key]}/>)
            }
        </div>
    </div>
  }
}


class Title extends React.Component {
  render() {
    return <section className="app-title">
      <div className="app-title-content">
        <h1>Market place of Books</h1>
        <p>Finding your favourite book</p>
      </div>
    </section>
  }
}


class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const id = event.target.value;
    console.log('id' + id);
  }

  render() {
    const { asin, index } = this.props;
    return (
      <div>
        <Link to={`/book/${asin}`}>
            <button onClick={this.handleClick} value={asin} className="button button-primary marketplace-button-improve">
              <i className="fa fa-chevron-right"></i> Find out more
            </button>
        </Link>
      </div>
    )
  }
}

class AddReviewLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
      const id = event.target.value;
      console.log(id);
  }

  render() {
    const { asin, index } = this.props;
    return (
      <div>
        <Link to={`/addreview/${asin}`}>
            <button onClick={this.handleClick} value={asin} className="button button-primary marketplace-button-improve">
                <i className="fa fa-chevron-right"></i> Add Review for this book
            </button>
        </Link>
      </div>
    )
  }
}


class CardHeader extends React.Component {
  render() {
    const { imUrl, asin } = this.props;
    var style = { 
        backgroundImage: 'url(' + imUrl + ')',
        height: '15rem',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    };
    return (
      <header style={style} className="card-header">
        <h4 className="card-header--title">{asin}</h4>
      </header>
    )
  }
}


class CardBody extends React.Component {
  render() {
    const { description, price, asin, index} = this.props;
    return (
      <div className="card-body">
        <h2 className="limit-box">{description}</h2>
        <div>
            <p className="body-content">{price}</p>
        </div>
        <Button asin={asin} index={index}/>
        <AddReviewLink asin={asin} index={index} />
      </div>
    )
  }
}

class Like extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({
      button:!this.state.button
    })
  }

  render() {
    return (
      <div className="heart">
        <a className={this.state.button ? "heart-shape-true": "heart-shape-false"} onClick={this.handleClick}></a>
      </div>
    )
  }
}

class Card extends React.Component {
  render() {
    return (
      <article className="card marketplace-card">
        <CardHeader asin={this.props.details.asin} imUrl={this.props.details.imUrl}/>
        <CardBody index={this.props.index} asin={this.props.details.asin} description={this.props.details.description} price={this.props.details.price}/>
        <Like />
      </article>
    )
  }
}

export default CardMarketplace