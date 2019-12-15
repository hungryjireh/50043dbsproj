import React, { Component } from "react";
import Navbar from '../layout/Navbar'
import NavbarTop from '../Nav/Nav'
import api from "../../utils/api";

const divStyle = {
    height: '100vh',
    width:'80%',
    padding: '7rem',
    float: 'right'
}

const uploadImage = {
    width: '200px',
    height: '300px',
    objectFit: 'contain',
    border: 'None'
}

const display = {
    textAlign: 'center',
    padding: '20px'
}

class AddBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            price: '',
            date: Date(),
            token: '',
            image: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    getDataID = () => {
        const { handle } = this.props.match.params

        api.get('/api/review/'+this.state.asin)
            .then(res => this.setState({book_id: res.data}));
    };

    componentDidMount() {
        const input = localStorage.jwtToken
        var token = input.split(" ");
        var token1 = token[1].slice(0,20);
        // console.log(token1)
        this.setState({
            token : token1,
            title: '',
            image: '',
            price: '',
            description: '',
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }

        try {
            api.post("/api/store/addbook",
                formData,
                {headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
            }})
                .then(res => {
                    console.log(res);
                    this.props.history.push('/dashboard');
                })
                .catch(e => console.log(e, e.response.data));


          } catch (error) {
            console.error(error);
          }
    }

    handleChange(event) {
        this.setState({book_id: event.target.value});
    }

    handleImage(event) {
        this.setState({image: URL.createObjectURL(event.target.files[0])})
    }

    handleTitle(event) {
        this.setState({title: event.target.value});
    }

    handleDescription(event) {
        this.setState({description: event.target.value});
    }

    handlePrice(event) {
        this.setState({price: event.target.value});
    }

    render() {
        return (
            <div>
                <NavbarTop />
                <Navbar />
                <div style={divStyle} className="addBooks">
                    <div style={{textAlign:'center'}}>
                        <img style={uploadImage} src={this.state.image}/>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div style={display}>
                            <input style= {{textAlign:'center'}} ref="image" id="image" name= "image" type="file" onChange={(evt) => this.handleImage(evt)}/>
                        <br></br>
                        </div>
                        {/* <label htmlFor="book_id">BookID</label>
                        <input ref="bookid" onChange={(evt) => this.handleChange(evt)} id="book_id" name="book_id" type="text" /> */}
                        <label htmlFor="title">Book Title</label>
                            <input ref="title" name="title" type="text" onChange={(evt) => this.handleTitle(evt)}/>
                        <label htmlFor="description">Description</label>
                            <textarea ref="description" name="description" type="text" onChange={(evt) => this.handleDescription(evt)}/>
                        <label htmlFor="rating">Price</label>
                            <input ref="price" id="price" name="price" type="text" onChange={(evt) => this.handlePrice(evt)}/>
                        {/* <input ref="date" type="hidden" id="date" name="date" value={this.state.date}></input> */}
                            <input ref="token" type="hidden" id="token" name="token" value={this.state.token}></input>
                        <button class="btn draw-border">ADD BOOK</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddBooks