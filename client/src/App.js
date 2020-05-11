import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar2'
import Main from './components/Main'
import List from './components/List'
import Search from './components/Search'
import Home from './components/Home'

class App extends Component {
state = {
    data: null,
    firstname: "",
    lastname: "",
    username: "",
    arenausername: "",
    mythicWC: 0,
    rareWC: 0,
    uncommonWC: 0,
    commonWC: 0,
    collection: [],
    collectionNames: []
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our test GET route from the Express server. 
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    return (
      <Router>
        
        {/* Inserting Navbar here for React Router Navigation */}
        <Navbar />
        
        {/* Switch Tag will change content below the navbar based on the route hit by the navbar */}
        <Switch>
        <div className="container">
        <Route exact path="/">
          <Home /> 
        </Route>
        <Route exact path='/main'>
          <Main />
        </Route>
        <Route exact path='/list'>
          <List />
        </Route>
        <Route exact path='/search'>
          <Search />
        </Route>
        </div>
    </Switch>
    {/* Keeping our little React backend tag on the bottom below the routes - kind of like a footer.  */}
    <p className="App-intro">{this.state.data}</p>

    </Router>
    )}
}

export default App;