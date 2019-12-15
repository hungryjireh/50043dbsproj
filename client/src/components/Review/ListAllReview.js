import React, { Component } from "react";
import TopNav from '../Nav/Nav';
import SideNav from '../layout/Navbar'
import './ListAllReview.css'
import api from "../../utils/api";

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
          reviews: []
        }
    };

    componentDidMount() {
        api.get("/api/review/getallreview")
          .then(res => this.setState({reviews: res.data}));
    }

    render() {
      return (
        <div>
            <TopNav />
            <SideNav />
            <div style={divStyle}>
                <table>
                    <thead>
                    <tr>
                        <th colSpan="8">List of reviews added</th>
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
                    </thead>


                    <tbody>
                    {this.state.reviews.map(
                        (index, key) => <Itemarray key={key} index={key} details={this.state.reviews[key]}/>)
                    }
                    </tbody>


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
  
export default ListAllReview;
