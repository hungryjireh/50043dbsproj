import React, { Component } from "react";
import TopNav from '../Nav/Nav';
import SideNav from '../layout/Navbar'
import './ViewAllLogs.css'
import api from "../../utils/api";

const divStyle = {
    height: '100vh',
    width: '80%',
    float: 'right',
    marginTop: '7rem',
    padding: '2rem'
}


class ViewAllLogs extends Component {

    constructor(props) {
        super(props);
        this.state = {
          logs: []
        }
    };

    componentDidMount() {
        api.get("/api/logs/getlogs")
          .then(res => this.setState({logs: res.data.data}));
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
                        <th colSpan="8">Logs Data</th>
                    </tr>
                    <tr>
                        <td>Id</td>
                        <td>Timestamp</td>
                        <td>Database</td>
                        <td>Method</td>
                        <td>UserID</td>
                        <td>Parameters</td>
                        <td>Response</td>
                    </tr>
                    </thead>

                    <tbody>
                    {this.state.logs.map(
                        (index, key) => <Itemarray key={key} index={key} details={this.state.logs[key]}/>)
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
        const {id, timestamp, database, method, userID, parameters, response} = this.props.details;
        return (
            <tr>
                <td>{id}</td>
                <td>{timestamp}</td>
                <td>{database}</td>
                <td>{method}</td>
                <td>{userID}</td>
                <td>{parameters}</td>
                <td>{response}</td>
            </tr>
        )
    }
}
// helloworld
  
export default ViewAllLogs;
