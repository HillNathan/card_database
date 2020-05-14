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
    firstname: "",
    lastname: "",
    username: "",
    arenausername: "",
    mythicWC: 0,
    rareWC: 0,
    uncommonWC: 0,
    commonWC: 0,
    vaultProgress: 0,
    cardList: []
  };

  componentDidMount() {
    this.updateUser()
  }

  callGetUser = async() => {
    // hit the databse route to get the most current user data
     const userData = await API.getUserData({username: "pjsstp"})
    return userData
  }

  doAddPack = (event, packObject) => {
    // prevent default action so we can handle the click in this function
    event.preventDefault();

    // Using a series of async function calls to process the adding of a pack to state.  
    console.log('=========ADD=COMMONS=========')
    this.processCard(packObject.common1, "common")
    .then (a => {
      this.processCard(packObject.common2, "common")
      .then(b => {
        this.processCard(packObject.common3, "common")
        .then(c => {
          this.processCard(packObject.common4, "common")
          .then(d => {
            this.processCard(packObject.common5, "common")
            .then(e => {
              this.processCard(packObject.uncommon1, "uncommon")
              .then (f => {
                this.processCard(packObject.uncommon2, "uncommon")
                .then (g => {
                  this.processPremium(packObject.premium) 
                  .then(z => {
                    API.updateUserData(this.state)
                    this.updateUser()
                  })
                })
              })
            })
          })
        }) 
      }) 
    })
  }

  processCard = async (cardName, rarity) => {
    var found = false
    this.state.cardList.forEach(item => {
      // go through and find the card, then do the process if we find the card. 
      if (item.name === cardName) { 
        found = true
        if (item.quantity  < 4) this.incrementCardQuantity(cardName)
        else this.updateVaultProgress(rarity)
      }
    })
  }

  processPremium = async (premiumObject) => {
    var found = false
    var rarity = "rare"

    this.state.cardList.forEach(item => {
      // go through and find the card, then do the process if we find the card. 
      if (item.name === premiumObject.name) { 
        found = true
        if (premiumObject.mythic) rarity = "mythic"
        if (item.quantity  < 4) this.incrementCardQuantity(item.name)
      }
    })
  }

  incrementCardQuantity = (cardName) => {
    console.log(`Adding a copy of ${cardName} to my binder!`)
    var found = false
    var tempList = this.state.cardList
    tempList.forEach(item => {
      if (item.name === cardName) { 
        found = true
        var newQty = item.quantity
        newQty++
        item.quantity = newQty
        this.setState({cardList: tempList})
      }
    })
  }

  updateVaultProgress = (rarity) => {
    if (rarity === "common"){
      var tempProgress = this.state.vaultProgress
      tempProgress += 1
      this.setState({ vaultProgress: tempProgress})
      console.log(`New Vault progress is ${this.state.vaultProgress}`)
    }
    else {
      var tempProgress = this.state.vaultProgress
      tempProgress += 3
      this.setState({ vaultProgress: tempProgress})
      console.log(`New Vault progress is ${this.state.vaultProgress}`)
    }
    
  }

  updateUser = () => {
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
        username: response.data.username,
        vaultProgress: response.data.vaultProgress,
        cardList: response.data.cardList
      })
    })
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
            vault={this.state.vaultProgress}
          />
        </Route>
        <Route exact path='/list'>
          <List 
            theList={this.state.cardList}/>
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