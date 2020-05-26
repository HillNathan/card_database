import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './style.css'



function ModalPack (props) {
    // Alert specially set up to handle returning info from the AddPack component
    return (
        <Dialog>
            Add pack info to go here...
        </Dialog>
    )
}


function ModalAlert (props) {
    // A generic alert for every-day use
    return (
        <Dialog>
            Generic info to go here...
        </Dialog>
    )
}