import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./style.css";

class Navbar extends Component {
  redirect = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <nav className="navbar navbar-dark top-nav">
        <div className="row">
          <div className="col center-mobile">
              <Link to={"/"} label={"Home"} className={"font"}>
                Arena Binder
              </Link>
          </div>
          <div className="button-holder float-right">
              <Link to={"/main"} label={"Main"}>
                <button type="button" className="btn btn-primary">
                  Main
                </button>
              </Link>
            
              <Link to={"/list"} label={"List"}>
              <button type="button" className="btn btn-info">
                  List
                </button>
              </Link>
              
              <Link to={"/search"} label={"Add"}>
              <button type="button" className="btn btn-info">
                  Search
                </button>
              </Link>  
            
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);