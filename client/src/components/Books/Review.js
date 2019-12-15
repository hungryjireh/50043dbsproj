import React, { Component } from "react";
import AddReview from "./AddReview";
import api from "../../utils/api";

class Review extends Component {
    constructor(props) {
        super(props);
        this.state = {
          review_content: [],
          book_content: {},
          asin: this.props.match.params.asin
        };
      };
    
      componentDidMount() {
        this.getDataFromDbReview();
        this.getDataFromDbBook();
      };
    
      getDataFromDbReview = () => {
        api.get('/api/review/'+this.state.asin)
          .then(data => data.json())
          .then(res => this.setState({review_content: res}));
      };

      getDataFromDbBook = () => {
        api.get('/api/store/book/'+this.state.asin)
          .then(data => data.json())
          .then(res => this.setState({book_content: res.data}));
      };
      
    
    render() {
       console.log(this.state.book_content)

        const review_content = this.state.review_content
        const book_content = this.state.book_content

        return (
            <div> 
              <div style={{textAlign:'center'}}>
                <img src={book_content.imUrl} />
              </div>
              <div style={{paddingLeft: '50px', paddingRight: '50px'}}>
                <p>{book_content.description}</p>
                {Object
                .keys(review_content)
                .map(key => <Card key={key} index={key} details={review_content[key]}/>)}
              </div>
              <AddReview />
            </div>
        )
    }
}

class CardBody extends React.Component {
    render() {
      const { reviewText } = this.props;
      return (
        <div className="card-body">
            <div>
                <p>{reviewText}</p>
            </div>
        </div>
      )
    }
  }

class Card extends React.Component {
    render() {
      return (
        <div>
          <CardBody index={this.props.index} reviewText={this.props.details.reviewText} />
        </div>
      )
    }
}

export default Review