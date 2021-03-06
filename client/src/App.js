import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar2'
import Main from './components/Main'
import List from './components/List2'
import AddPack from './components/Add_Pack'
import Home from './components/Home'
import {ModalPack, ModalAlert} from './components/Modals'

const API = require('./orm')

class App extends Component {
  // Out state here mimics exactly our DB object, so that we can just send the state object to the DB
  //  and have it update appropriately. 
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
    cardList: [],
    showPackAlert: false,
    packNewMythicWC: 0,
    packNewRareWC: 0,
    packNewUncommonWC: 0,
    packNewCommonWC: 0,
    packNewCardsAdded: 0,
    genericAlert: {
      open: false,
      title: "",
      message: ""
    }
  };

  componentDidMount() {
    // when our component mounts, we want to get the most up-to-date Player information from our 
    //  external DB, so we will call our routine to do that once it is all mounted. 
    this.updateUser()
  }

  callGetUser = async() => {
    // hit the databse route to get the most current user data
     const userData = await API.getUserData({username: "pjsstp"})
    return userData
  }

  updatePackModal = (value) => {
    this.setState({
      showPackAlert: value
    })
  }

  updateAlertMessage = (open, title, message) => {
    this.setState({
      genericAlert: { 
        open : open,
        title : title,
        message : message
      }
    })
  }

  doAddPack = (event, packObject) => {
    // prevent default action so we can handle the click in this function
    event.preventDefault();

    // resetting variables in state that are meant to track progress for each individual pack so that     
    // they don't stack up over multiple packs. 
    this.setState({    
      packNewMythicWC: 0,
      packNewRareWC: 0,
      packNewUncommonWC: 0,
      packNewCommonWC: 0,
      packNewCardsAdded: 0
    })


    // Using a series of async function calls to process the adding of a pack to state. 
    // 
    // Each of the functions processes the card for the rarity, and then updates the primary state
    //  then calls the next function so that the state is not being overwhelmed with updates all at 
    //  the same time. Then the final function call is to update the external DB with the updated 
    //  player information and run a call to get that info back and place it into state.  
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
              console.log('=========ADD=UNCOMMONS=========')
              this.processCard(packObject.uncommon1, "uncommon")
              .then (f => {
                this.processCard(packObject.uncommon2, "uncommon")
                .then (g => {
                  console.log('=========ADD=PREMIUM=========')
                  this.processPremium(packObject.premium) 
                  .then(z => {
                    // Once all of the routines have been called, and the state has been fully updated, 
                    //  we update our user of their results, clear out the form, and then 
                    //  we hit our API in order to update the database through a POST route, and then 
                    //  hit the DB once more to get the updated information into state

                    // hit DB through Post Route
                    API.updateUserData(this.state)

                    // update state wih fresh user info. 
                    this.updateUser()

                    // display the confirmation dialog
                    this.updatePackModal(true)
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
    // this function will process common and uncommon cards only. The premium cards need to 
    //   handled slightly differently, as additional copies will not trigger vault progress
    //   and 20 Gems will be awarded in the pack instead. 

    if (cardName === "WC") { 
      console.log("Wild card found!!")
      this.augmentWildCard(rarity, 1)
    }
    this.state.cardList.forEach(item => {
      // go through and find the card, then do the process if we find the card. 
      if (item.name === cardName) { 
        if (item.quantity  < 4) this.incrementCardQuantity(cardName)
        else this.updateVaultProgress(rarity)
      }
    })
  }

  processPremium = async (premiumObject) => {
    // Premium cards (rare or mythic) are handled slightly differently, since we will never
    //  get more than 4 of any rare or mythic. The card is alsy sent from the form differently,
    //  so we need a separate routine to handle the card. 

    var rarity = "rare"
    if (premiumObject.mythic) rarity = "mythic"

    if (premiumObject.name === "WC") { 
      console.log("Wild card found!!")
      this.augmentWildCard(rarity, 1)
    }

    this.state.cardList.forEach(item => {
      // go through and find the card, then do the process if we find the card. 
      if (item.name === premiumObject.name) { 
        if (item.quantity  < 4) this.incrementCardQuantity(item.name)
      }
    })
  }

  incrementCardQuantity = (cardName) => {
    // this routine will increment the card quantity of any card where we are getting the card and 
    //  adding it to our binder instea of receiving gemms or vault progress. 

    console.log(`Adding a copy of ${cardName} to my binder!`)
    var tempList = this.state.cardList
    tempList.forEach(item => {
      if (item.name === cardName) { 
        var newQty = item.quantity
        newQty++
        item.quantity = newQty
        this.setState({cardList: tempList})
        var temp = 0
        temp = this.state.packNewCardsAdded
        temp++
        this.setState({
          packNewCardsAdded : temp
        })
      }
    })
  }

  augmentWildCard = (rarity, change) => {
    // this function will take in a rarity and either 1 or -1, and then change the appropriate 
    //  wildcard quantity in state. This will be able to be used for any WC 
    //  changing we will need to do in the entire app. 
    
    console.log(`Changing ${rarity} by ${change}`)  

    var rarityAbbv = rarity.charAt(0)
    console.log(rarityAbbv)

    var tempWC = 0
    var temp=0
    switch (rarityAbbv) {
      case "m": 
        console.log("update mythic WC")
        tempWC = this.state.mythicWC
        tempWC = tempWC + change
        this.setState({ mythicWC : tempWC })
        temp = this.state.packNewMythicWC
        temp++
        this.setState({
          packNewMythicWC : temp
        })

        break
      case "r": 
        console.log("update rare WC")
        tempWC = this.state.rareWC
        tempWC = tempWC + change
        this.setState({ rareWC : tempWC })        
        temp = this.state.packNewRareWC
        temp++
        this.setState({
          packNewRareWC : temp
        })

        break
      case "u": 
        console.log("update uncommon WC")
        tempWC = this.state.uncommonWC
        tempWC = tempWC + change
        this.setState({ uncommonWC : tempWC })
        temp = this.state.packNewUnommonWC
        temp++
        this.setState({
          packNewUnommonWC : temp
        })

        break
      case "c" : 
        console.log("update common WC")
        tempWC = this.state.commonWC
        tempWC = tempWC + change
        this.setState({ commonWC : tempWC })
        temp = this.state.packNewCommonWC
        temp++
        this.setState({
          packNewCommonWC : temp
        })
        break
      default: 
        console.log("this should never get hit")
        break
    }
  }

  updateVaultProgress = (rarity) => {
    // this function will increment our vault progress based on the rarity that is 
    //  passed into the function. Commons are +1 vault progress and Uncommons are +3
    //  vault progress. The info is then saved into state to be updated into the db 

    var tempProgress = 0

    if (rarity === "common"){
      tempProgress = this.state.vaultProgress
      tempProgress += 1
      this.setState({ vaultProgress: tempProgress})
    }
    else {
      tempProgress = this.state.vaultProgress
      tempProgress += 3
      this.setState({ vaultProgress: tempProgress})
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
      <ModalPack 
        open={this.state.showPackAlert}
        newMythic={this.state.packNewMythicWC}
        newRare={this.state.packNewRareWC}
        newUncommon={this.state.packNewUncommonWC}
        newCommon={this.state.packNewCommonWC}
        cardsAdded={this.state.packNewCardsAdded}
        vault={this.state.vaultProgress}
        handleClose={this.updatePackModal}
        />
      <ModalAlert 
        open={this.state.genericAlert.open}
        title={this.state.genericAlert.title}
        message={this.state.genericAlert.message}
        handleClose={this.updateAlertMessage}
      />
      <button 
        className="btn btn-warning"
        onClick={()=>this.updatePackModal(true)}>
        Test Pack Popup
      </button>
    </Router>
    )}
}




export default App;