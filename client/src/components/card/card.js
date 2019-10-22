import React from 'react';
import { Link } from 'react-router-dom';
import './card.scss'


const PostsData = [
  {
    "category": "Solar",
    "title": "Research on the possible application of decentralize mircogrid powered by blockchain",
    "text": "Reduce reliance on the main power grid, giving power to the community",
    "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
  },
  {
    "category": "Shopee",
    "title": "Study the market of retail and ecommerce",
    "text": "In the past few years, the effects of ecommerce have greatly reduced the profit for traditional retail shops.",
    "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
  },
  {
    "category": "SoftBank",
    "title": "Behavioural studies of investments",
    "text": "The next unicorn and their technology",
    "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
  },
  {
    "category": "Google",
    "title": "Collecting localised speech data",
    "text": "Create an AI that speaks like a local.",
    "image": "https://source.unsplash.com/user/erondu/600x400"
  },
  {
    "category": "ST Aerospace",
    "title": "Using CV to detect damages on the fan blade ",
    "text": "Identify the fan blades that requires repair given a certain threshold",
    "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
  },
  {
    "category": "Orange Tee",
    "title": "Analysis of the property market in Myanmar",
    "text": "Studying the potential growth and potential investment in Yangon region",
    "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
  }
]


// Start App

class CardDesign extends React.Component { 
  constructor() {
    super();
    
    this.state = {
      posts: {}
    }
  }
  componentWillMount() {
    this.setState({
      posts: PostsData
    });
  }
 

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
  render() {
    return (
      // <Link to={`/project/${user.id}`}>
      <Link to={'/book/'}>
        <button className="button button-primary button-improve">
          <i className="fa fa-chevron-right"></i> Find out more
        </button>
      </Link>
    )
  }
}


class CardHeader extends React.Component {
  render() {
    const { image, category } = this.props;
    var style = { 
        backgroundImage: 'url(' + image + ')',
        height: '15rem',
        textAlign: 'center'
    };
    return (
      <header style={style} className="card-header">
        <h4 className="card-header--title">{category}</h4>
      </header>
    )
  }
}


class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        <p className="date">March 20 2015</p>
        
        <h2>{this.props.title}</h2>
        
        <p className="body-content">{this.props.text}</p>
        
        <Button />
      </div>
    )
  }
}


class Card extends React.Component {
  render() {
    return (
      <article className="card">
        <CardHeader category={this.props.details.category} image={this.props.details.image}/>
        <CardBody title={this.props.details.title} text={this.props.details.text}/>
      </article>
    )
  }
}

export default CardDesign