import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Dashboard.scss'
import Navbar from "../../layout/Navbar";
import NavbarTop from '../../Nav/Nav'
import api from "../../../utils/api";

const divStyle = {
  height: '100vh',
  width: '80%',
  float: 'right',
  marginTop: '7rem',
  padding: '2rem'
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
    };
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.getDataFromDb();
  };

  getDataFromDb = () => {
    api.get("/api/store/getbooks")
      .then(res => {
          this.setState({ posts: res.data.data })
      });
  };

  render() {

    return (
      <div>
        <NavbarTop />
        <Navbar />
        <div class="dashboard">
          <div style={divStyle}>
            <h1>Books<span class="highlight"></span></h1>
            <p>Finding my favourite book</p>
            <div className="gridstyle">
            {
            Object
            .keys(this.state.posts)
            .map(key => <Card key={key} index={key} details={this.state.posts[key]}/>)
            }
            </div>
          </div>
        </div>
      </div>
    );
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

class Button extends React.Component {
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

// Dashboard.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(
//   mapStateToProps,
//   { logoutUser }
// )(Dashboard);

export default Dashboard