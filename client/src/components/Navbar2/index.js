import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./style.css";

class Navbar extends Component {
  redirect = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <Link to={'/'} className={'navbar-brand main-logo russo'} label={'home'}>
          <span className="my-logo">Arena Binder</span>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <span className="nav-button-group">
          <div className="spacer"></div>
          <div className="collapse navbar-collapse float-right" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link to={"/main"} label={"Main"}>
                  <button className="btn btn-info nav-buttons">
                    Main
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/list"} label={"List"}>
                  <button className="btn btn-info nav-buttons">
                    List
                  </button>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addpack"} label={"Add"}>
                  <button className="btn btn-info nav-buttons">
                    Add Pack
                  </button>
                </Link> 
              </li>
            </ul>
          </div>
        </span>
      </nav>
    );
  }
}

export default withRouter(Navbar);