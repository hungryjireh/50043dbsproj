import React, { Component } from "react";
import './addreview.scss'


class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
          review_content: '',
          book_id: '',
          rating: '',
          date: Date(),
          token: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    componentDidMount() {
        const input = localStorage.jwtToken
        var token = input.split(" ");
        var token1 = token[1].slice(0,20);
        console.log(token1)

        this.setState({
            token : token1
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }

        try {
            fetch('http://localhost:5000/api/review/'+this.state.book_id, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
            });

            this.props.history.push('/dashboard'); 
        
          } catch (error) {
            console.error(error);    

            this.props.history.push('/addreview'); 
          }
    }

    handleChange(event) {
        this.setState({book_id: event.target.value});
        // fetch('http://localhost:5000/api/review/book/'+this.state.book_id)
        //   .then(data => data.json())
        //   .then(res => console.log(res));
    }

    handleReview(event) {
        this.setState({review_content: event.target.value});
    }

    handleRating(event) {
        this.setState({rating: event.target.value});
    }

    render() {
        return (
            <div className="addreview"> 
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="book_id">BookID</label>
                    <input ref="bookid" onChange={(evt) => this.handleChange(evt)} id="book_id" name="book_id" type="text" />
                    <label htmlFor="reivew">Review</label>
                    <textarea ref="review" name="reivew" type="text" onChange={(evt) => this.handleReview(evt)}/>
                    <label htmlFor="rating">Rating</label>
                    <input ref="rating" id="rating" name="rating" type="text" onChange={(evt) => this.handleRating(evt)}/>
                    <input ref="date" type="hidden" id="date" name="date" value={this.state.date}></input>
                    <input ref="token" type="hidden" id="token" name="token" value={this.state.token}></input>

                    <button class="btn draw-border">Review Me</button>
                </form>
            </div>
        )
    }
}
export default AddReview