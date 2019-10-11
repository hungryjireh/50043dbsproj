import React, { Component } from "react";
import '../Project/create-project.css';
import { Link } from "react-router-dom";
import classnames from "classnames";
import Calendar from "react-calendar";

class CreateProject extends Component {
    constructor() {
        super();
        this.state = {
            description: "",
            date: new Date(),
            skill: "",
            pay: "",
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
            errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        console.log('Submitted')

        const newUser = {
            description: this.state.description,
            date: this.state.date,
            skill: this.state.skill,
            pay: this.state.pay
        };

        this.props.registerUser(newUser, this.props.history);
    };

    onChange = date => this.setState({ date })

    render() {
        const { errors } = this.state;
        return (
        <div className="proj-container">
            <div className="row">
                <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to
                    home
                    </Link>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                    <h4>
                        <b>Project Creation</b>
                    </h4>
                    <p className="grey-text text-darken-1">
                        Already have a project? <Link to="/">Project Marketplace</Link>
                    </p>
                    </div>
                    <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field col s12">
                        <input
                        onChange={this.onChange}
                        value={this.state.description}
                        error={errors.description}
                        id="description"
                        type="text"
                        className={classnames("", {
                            invalid: errors.description
                        })}
                        />
                        <label htmlFor="description">Description</label>
                        <span className="red-text">{errors.description}</span>
                    </div>
                    <div className="input-field col s12">
                    <Calendar
                        onChange={this.onChange}
                        value={this.state.date}
                    />
                        {/* <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames("", {
                            invalid: errors.email
                        })}
                        />
                        <label htmlFor="email">Time Line</label>
                        <span className="red-text">{errors.email}</span> */}
                    </div>
                    <div className="input-field col s12">
                        <input
                        onChange={this.onChange}
                        value={this.state.skill}
                        error={errors.skill}
                        id="skill"
                        type="text"
                        className={classnames("", {
                            invalid: errors.skill
                        })}
                        />
                        <label htmlFor="skill">Skills</label>
                        <span className="red-text">{errors.skill}</span>
                    </div>
                    <div className="input-field col s12">
                        <input
                        onChange={this.onChange}
                        value={this.state.pay}
                        error={errors.pay}
                        id="pay"
                        type="text"
                        className={classnames("", {
                            invalid: errors.pay
                        })}
                        />
                        <label htmlFor="pay">Hourly/Pay</label>
                        <span className="red-text">{errors.pay}</span>
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                        style={{
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "1rem"
                        }}
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                        Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
  }
}

export default CreateProject;