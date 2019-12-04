import React, { Component } from "react";
import './Carousel.css'

const divStyle = {
};

const grid = {
    marginTop: '2rem',
    display: 'grid',
    gridTemplateRows: '2fr',
    gridTemplateColumns: 'auto',
    gridAutoFlow: 'column',
    gridGap: '1rem',
    overflow: 'auto',
    height: '300px'
};

const box = {
};

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: {},
        };
        };

        componentDidMount() {
            this.getDataFromDb();
        };

        getDataFromDb = () => {
        fetch("http://localhost:5000/api/store/getbooks")
            .then(data => data.json())
            .then(res => this.setState({ posts: res.data }));
        };

    render() {
    console.log(this.state.posts)
        return (
            <div>
                <div style={grid}>
                    <div style={box}>
                        {
                        Object
                        .keys(this.state.posts)
                        .map(key => <CardHeader key={key} index={key} details={this.state.posts[key]}/>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

class CardHeader extends React.Component {
    render() {
      const { imUrl, asin } = this.props;
      var style = { 
          backgroundImage: 'url(' + imUrl + ')',
          height: '15rem',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
      };
      return (
        <header style={style} className="card-header">
          <h4 className="card-header--title">{asin}</h4>
        </header>
      )
    }
  }

export default Carousel