import React, { Component } from "react";
import './addreview.scss'


class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
          review_content: '',
          book_id: '',
          rating: '',
          date: new Date(),
          token: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    handleSubmit(event) {
        event.preventDefault();
        const input = localStorage.jwtToken
        var token = input.split(" ");
        this.setState({
            token : token[1]
        })
        console.log(this.state.token)
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
    
        fetch('http://localhost:5000/api/review/'+this.state.book_id, {
            method: 'POST',
            body: formData,
        });
    }

    handleChange(event) {
        this.setState({book_id: event.target.value});
        // fetch('http://localhost:5000/api/review/book/'+this.state.book_id)
        //   .then(data => data.json())
        //   .then(res => console.log(res));
        console.log(this.state.book_id)
    }
        
    render() {
        return (
            <div className="addreview"> 
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="book_id">BookID</label>
                    <input ref="bookid" onChange={(evt) => this.handleChange(evt)} id="book_id" name="book_id" type="text" />

                    <label htmlFor="reivew">Review</label>
                    <textarea ref="review" bid="reivew" name="reivew" type="reivew" />

                    <label htmlFor="rating">Rating</label>
                    <input ref="rating" id="rating" name="rating" type="text" />

                    <input ref="date" type="hidden" id="date" name="date" value={this.state.date}></input>
                    <input ref="token" type="hidden" id="token" name="token" value={this.state.token}></input>

                    <button>Send data!</button>
                </form>
            </div>
        )
    }
}
export default AddReview