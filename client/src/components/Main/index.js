import React from 'react'
import './style.css'

const Main = (props) => {
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

                <div className="row justify-content-center">
                    <div className="col-10">
                        <h3 className="stats-header">
                            Stats
                        </h3>
                        <div className='stats-table'>
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th scope='col'><span className="stats-th">Mythic</span></th>
                                        <th scope='col'><span className="stats-th">Rare</span></th>
                                        <th scope='col'><span className="stats-th">Uncommon</span></th>
                                        <th scope='col'><span className="stats-th">Common</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><span className='stats-tr'>{props.mythic}</span></td>
                                        <td><span className='stats-tr'>{props.rare}</span></td>
                                        <td><span className='stats-tr'>{props.uncommon}</span></td>
                                        <td><span className='stats-tr'>{props.common}</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className= 'manage-wc text-center'>
                            <button className="btn btn-lg btn-info">Manage my Wildcards</button>
                        </div>

                        <div className= 'vault-progress'>
                            <h4>Vault Progress: <span className='progress-pct'>{props.vault/10}</span> %.</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;