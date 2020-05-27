import React from 'react'
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

export function ModalPack (props) {
    // Alert specially set up to handle returning info from the AddPack component

    return (
        <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description" 
        >
        <DialogTitle>
            Add Pack Results!
        </DialogTitle>
        <DialogContent>
            Add pack info to go here...
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>props.handleClose(false)} color="primary">
            CLOSE
          </Button>
        </DialogActions>
        </Dialog>
    )
}


export function ModalAlert (props) {
    // A generic alert for every-day use

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