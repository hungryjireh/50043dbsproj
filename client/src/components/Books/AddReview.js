import React, { Component } from "react";
import './addreview.scss'
import NavbarTop from '../Nav/Nav'
import Navbar from '../layout/Navbar'



class AddReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
          review_content: '',
          book_id: '',
          rating: '',
          date: Date(),
          token: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    getDataID = () => {
        const { handle } = this.props.match.params

        fetch('http://localhost:5000/api/review/'+this.state.asin)
            .then(data => data.json())
            .then(res => this.setState({book_id: res}));
    };

    componentDidMount() {
        let id = window.location.href.split("/").slice(-1)[0];
        const input = localStorage.jwtToken
        var token = input.split(" ");
        var token1 = token[1].slice(0,20);
        console.log(token1)
        console.log(id)
        this.setState({
            token : token1,
            book_id : id
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
        console.log(formData)

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
            <div>
                <Navbar />
                <NavbarTop />
                <div className="addreview"> 
                    <div>
                        <h1 style={{textAlign: 'center'}}>Add a book review for your favourite book</h1>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="book_id">BookID</label>
                        <input ref="bookid" value={this.state.book_id} onChange={(evt) => this.handleChange(evt)} id="book_id" name="book_id" type="text" />
                        <label htmlFor="reivew">Review</label>
                            <textarea ref="review" name="reivew" type="text" onChange={(evt) => this.handleReview(evt)}/>
                        <label htmlFor="rating">Rating</label>
                            <input ref="rating" id="rating" name="rating" type="text" onChange={(evt) => this.handleRating(evt)}/>
                        <input ref="date" type="hidden" id="date" name="date" value={this.state.date}></input>
                            <input ref="token" type="hidden" id="token" name="token" value={this.state.token}></input>
                        <button class="btn draw-border">Review Me</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default AddReview