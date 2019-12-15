import React, { Component } from "react";
import TopNav from '../Nav/Nav';
import SideNav from '../layout/Navbar'

const divStyle = {
    height: '100vh',
    width: '80%',
    float: 'right',
    marginTop: '7rem',
    padding: '2rem'
}

class ListAllReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
          reviews: {}
        }
    };

    componentDidMount() {
        fetch('http://localhost:5000/api/review/getallreview')
          .then(data => data.json())
          .then(res => this.setState({ reviews: res.data }));
    }

    render() {
        console.log('review ' + this.state.reviews)
      return (
        <div>
            <TopNav />
            <SideNav />
            <div style={divStyle}>
                <p>helloworld</p>
                {
                Object
                .keys(this.state.reviews)
                .map(key => <ItemListarray key={key} index={key} details={this.state.reviews[key]}/>)
                }
            </div>
        </div>
      );
    }
  }

class ItemListarray extends React.Component {
    render() {
        const {asin, helpful, overall, reviewText, reviewTime, reviewerID, reviewerName, summary} = this.props.details;
        return (
            <div>
                <ul>
                    <li>item 3</li>
                    <li>{asin}</li>
                    <li>{helpful}</li>
                    <li>{overall}</li>
                    <li>{reviewText}</li>
                    <li>{reviewTime}</li>
                    <li>{reviewerID}</li>
                    <li>{reviewerName}</li>
                    <li>{summary}</li>
                </ul>
            </div>
        )
    }
}
  
  
  export default ListAllReview;