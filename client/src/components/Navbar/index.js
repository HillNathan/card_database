import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
// import "./style.css";

class Navbar extends Component {
  redirect = () => {
    this.props.history.push("/");
  };

  render() {
    return (
      <nav style={{ marginLeft: 0, marginRight: 0 }}>
        <div className="row">
          <div className="col center-mobile">
              <Link to={"/"} label={"Home"} className={"font"}>
                Arena Binder
              </Link>
          </div>
          <div className="button-holder">
              <Link to={"/main"} label={"Main"}>
                <button className="nav-buttons">
                  Main
                </button>
              </Link>
            
              <Link to={"/list"} label={"List"}>
                <button className="nav-buttons">
                  List
                </button>
              </Link>
              
              <Link to={"/search"} label={"Add"}>
                <button className="nav-buttons">
                  Search
                </button>
              </Link>  
            }
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);