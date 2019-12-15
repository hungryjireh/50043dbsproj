import React, { Component } from "react";
import TopNav from '../Nav/Nav';
import SideNav from '../layout/Navbar'
import './ListAllReview.css'

const divStyle = {
    height: '100vh',
    width: '80%',
    float: 'right',
    marginTop: '7rem',
    padding: '2rem'
}

class trstAllReview extends Component {

    constructor(props) {
        super(props);
        this.state = {
          reviews: []
        }
    };

    componentDidMount() {
        fetch('http://localhost:5000/api/review/getallreview')
          .then(data => data.json())
          .then(res => this.setState({reviews: res}));
    }

    render() {
        console.log('review ' + this.state.reviews)
      return (
        <div>
            <TopNav />
            <SideNav />
            <div style={divStyle}>
                <table>
                    <tr>
                        <th colspan="8">List of reviews added</th>
                    </tr>
                    <tr>
                        <td>Asin</td>
                        <td>Helpful</td>
                        <td>Overall</td>
                        <td>ReivewText</td>
                        <td>ReivewTime</td>
                        <td>ReivewerID</td>
                        <td>ReivewerName</td>
                        <td>Summary</td>
                    </tr>
                    {
                    Object
                    .keys(this.state.reviews)
                    .map(key => <Itemarray key={key} index={key} details={this.state.reviews[key]}/>)
                    }
                </table>
            </div>
        </div>
      );
    }
  }

class Itemarray extends React.Component {
    render() {
        const {asin, helpful, overall, reviewText, reviewTime, reviewerID, reviewerName, summary} = this.props.details;
        return (
            <tr>
                <td>{asin}</td>
                <td>{helpful}</td>
                <td>{overall}</td>
                <td>{reviewText}</td>
                <td>{reviewTime}</td>
                <td>{reviewerID}</td>
                <td>{reviewerName}</td>
                <td>{summary}</td>
            </tr>
        )
    }
}
  
export default trstAllReview;