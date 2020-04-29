import React from 'react'
import './style.css'

function Main () {
    return (
        <div className='primary-block'>
            <div className="col" >
                <div className="row header-row text-center">
                    <h1 className="page-header russo text-center">Home </h1>
                </div>
                <div className="row">
                    <span className="intro">
                        Welcome to Arena Binder. This will help track my MTG Arena collection, available wildcards, and 
                         vault progress for my Arena account. I am looking to figure out how to automate the process, but 
                         for now all data will have to be entered manually. 
                    </span>
                </div>

                <div className="row stats-block">
                    <h3 className="stats-header">
                        Stats
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Main;