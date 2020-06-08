import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './style.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export class ModalPack extends Component  {
    // Alert specially set up to handle returning info from the AddPack component
    // takes props as follows:
    //  open : boolean value to signal whether the component should be shown or not
    //  handleClose : funtion to update the primary state with a false flag for "open" this 
    //      takes one argument, just the new value for the "open" flag

  state = {
      open : false,
      newMythic : 0,
      newRare : 0,
      newUncommon : 0, 
      newCommon : 0,
      cardsAdded : 0,
      vault : 0
    }

  componentWillReceiveProps (incomingProps) {
    this.setState({ 
      open:incomingProps.open,
      newMythic: incomingProps.newMythic,
      newRare: incomingProps.newRare,
      newUncommon: incomingProps.newUncommon,
      newCommon : incomingProps.newCommon,
      cardsAdded : incomingProps.cardsAdded,
      vault : incomingProps.vault
  })
  }
  
  render() {
    return (
        <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description" 
        >
        <DialogTitle>
            Add Pack Results!
        </DialogTitle>
        <DialogContent>
            {(this.state.cardsAdded > 0) ? 
              <div>You added {this.state.cardsAdded} new cards to your binder!</div>
              : 
              <div></div>}
            New Vault Progress: {this.state.vault / 10}%<br/>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>this.props.handleClose(false)} color="primary">
            CLOSE
          </Button>
        </DialogActions>
        </Dialog>
    )
  }
}


export function ModalAlert (props) {
    // A generic alert for every-day use. takes props as follows:
    //  open : boolean value to signal whether the component should be shown or not
    //  title : title to be displayed in the component
    //  message : the message to be displayed in the component
    //  handleClose : funtion to update the primary state with a false flag for "open"
    //    this takes three arguments, first the new value for the open flag, then the
    //    title and message, which should both be set to "" to clear the info. 

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description" 
        >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{props.message}</DialogContent>
        <DialogActions>
          <Button onClick={()=>props.handleClose(false, "", "")} color="primary">
            CLOSE
          </Button>
        </DialogActions>
        </Dialog>
    )
}