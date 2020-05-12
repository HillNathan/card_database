import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar2'
import Main from './components/Main'
import List from './components/List'
import AddPack from './components/Add_Pack'
import Home from './components/Home'

const API = require('./orm')

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
    vaultProgress: 0,
    collection: [],
    collectionNames: []
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
      // Also call to get the user information
    this.callGetUser()
      .then (response => {
        console.log(response.data)
        this.setState({
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          arenausername: response.data.arenausername,
          mythicWC: response.data.mythicWC,
          rareWC: response.data.rareWC,
          uncommonWC: response.data.uncommonWC,
          commonWC: response.data.commonWC,
          username: response.data.username
        })
      })
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

  callGetUser = async() => {
     const userData = await API.getUserData({username: "pjsstp"})

    return userData
  }

  doAddPack = (event, packObject) => {
    event.preventDefault();
    console.log('=========ADD=PACK=========')
    console.log(packObject)
  }

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
          <Main 
            common={this.state.commonWC}
            uncommon={this.state.uncommonWC}
            rare={this.state.rareWC}
            mythic={this.state.mythicWC}
          />
        </Route>
        <Route exact path='/list'>
          <List />
        </Route>
        <Route exact path='/addpack'>
          <AddPack 
            handleOnSubmit={this.doAddPack}/>
        </Route>
        </div>
    </Switch>
    {/* Keeping our little React backend tag on the bottom below the routes - kind of like a footer.  */}
    <p className="App-intro">{this.state.data}</p>

    </Router>
    )}
}

export default App;