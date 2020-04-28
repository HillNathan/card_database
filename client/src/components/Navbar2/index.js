import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./style.css";

class Navbar extends Component {
  redirect = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={'/'} className={'navbar-brand main-logo'} label={'home'}>Navbar</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to={"/main"} label={"Main"}>
                <button className="nav-buttons">
                  Main
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/list"} label={"List"}>
                <button className="nav-buttons">
                  List
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/search"} label={"Add"}>
                <button className="nav-buttons">
                  Search
                </button>
              </Link> 
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);