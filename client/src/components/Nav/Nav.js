import React, { Component } from "react";
import './Nav.css';
import MenuLinks from './MenuLinks'

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
    this._menuToggle = this._menuToggle.bind(this);
    this._handleDocumentClick = this._handleDocumentClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleScroll() {
    this.setState({scroll: window.scrollY});
  }

  componentDidMount() {
    document.addEventListener('click', this._handleDocumentClick, false);
    const el = document.querySelector('nav');
    this.setState({top: el.offsetTop, height: el.offsetHeight});
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick, false);
  }

  _handleDocumentClick(e) {
    if (!this.refs.root.contains(e.target) && this.state.isOpen === true) {
      this.setState({
      isOpen: false
    });
    };
  }

  _menuToggle(e) {
    e.stopPropagation();
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let menuStatus = this.state.isOpen ? 'isopen' : '';
    return (
      <div ref="root">
        <nav className={this.state.scroll > this.state.top ? "fixed-nav" : "fixed-nav"}>
        <div className="menubar">
          <div className="hambclicker" onClick={ this._menuToggle }></div>
          <div id="hambmenu" className={ menuStatus }><span></span><span></span><span></span><span></span></div>
          <div className="title">
            <span>{ this.props.title }</span>
          </div>
        </div>
        <MenuLinks menuStatus={ menuStatus } menuToggle={(e) => this._menuToggle(e)}/>
        </nav>
      </div>
    )
  }
}
  
  export default Nav;