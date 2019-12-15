import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss'
import api from "../../utils/api";


const PostsData = [
  // {
  //   "category": "Solar",
  //   "title": "Research on the possible application of decentralize mircogrid powered by blockchain",
  //   "text": "Reduce reliance on the main power grid, giving power to the community",
  //   "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
  // },
  // {
  //   "category": "Shopee",
  //   "title": "Study the market of retail and ecommerce",
  //   "text": "In the past few years, the effects of ecommerce have greatly reduced the profit for traditional retail shops.",
  //   "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
  // },
  // {
  //   "category": "SoftBank",
  //   "title": "Behavioural studies of investments",
  //   "text": "The next unicorn and their technology",
  //   "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
  // },
  // {
  //   "category": "Google",
  //   "title": "Collecting localised speech data",
  //   "text": "Create an AI that speaks like a local.",
  //   "image": "https://source.unsplash.com/user/erondu/600x400"
  // },
  // {
  //   "category": "ST Aerospace",
  //   "title": "Using CV to detect damages on the fan blade ",
  //   "text": "Identify the fan blades that requires repair given a certain threshold",
  //   "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
  // },
  // {
  //   "category": "Orange Tee",
  //   "title": "Analysis of the property market in Myanmar",
  //   "text": "Studying the potential growth and potential investment in Yangon region",
  //   "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
  // }
]


// Start App

class CardDesign extends React.Component { 
  constructor() {
    super();
    
    this.state = {
      posts: {}
    }
  }
  componentDidMount() {
      this.getDataFromDb();
  };

  getDataFromDb = () => {
      api.get("/api/store/getbooks")
          .then(data => data.json())
          .then(res => this.setState({ posts: res.data }));
  };

  render() {
    return <div>
      <header className="app-header"></header>
      <Title />
      <div className="app-card-list" id="app-card-list">
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
      {/* <div className="app-title-content">
        <a className="designer-link" href="https://dribbble.com/shots/1978243-Latest-News" target="_blank"> <i className="fa fa-dribbble"></i></a>
      </div> */}
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
            </div>
        )
    }
}


class Card extends React.Component {
  render() {
    return (
      <article className="card">
          <CardHeader asin={this.props.details.asin} imUrl={this.props.details.imUrl}/>
          <CardBody index={this.props.index} asin={this.props.details.asin} description={this.props.details.description} price={this.props.details.price}/>
      </article>
    )
  }
}

export default CardDesign