import React, { Component } from "react";
import {getBookReviews} from "../../actions/reviewActions";
import {connect} from "react-redux";
import {getBookDetail} from "../../actions/bookActions";
import AddReview from "./AddReview";

class Review extends Component {
    constructor(props) {
        super(props);

        this.props.getBookDetail(this.props.match.params.asin)
        this.props.getBookReviews(this.props.match.params.asin)

      };
    
    render() {
        if (this.props.bookDetail === null){
            return ""
        }

        const { asin, title, imUrl, categories, description } = this.props.bookDetail;

        return (
            <div>
                <div className="card horizontal">
                    <div className="card-image">
                        <img src={imUrl} alt="book image"/>
                    </div>

                    <div className="card-stacked">
                        <div className="card-title">Title: {title} ({asin})</div>
                        <div className="card-title">Categories: <br/>{ categories}</div>
                        <div className="card-content">Description: <br/> {description}</div>
                    </div>
                </div>
                <AddReview/>
                <div>
                    Reviews: <br/>
                    {this.props.bookReviews}
                </div>
            </div>

        )
    }
}


const mapStateToProps = state => ({
    bookReviews: state.reviews.bookReviews,
    bookDetail: state.reviews.bookDetail
})

export default connect(
    mapStateToProps,
    { getBookDetail, getBookReviews }
)(Review);