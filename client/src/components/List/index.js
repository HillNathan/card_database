import React from 'react'
import './style.css'

function List (props) {
    return (
        <div className='primary-block'>
            <div className="row header-row text-center">
                <div className="col" >
                    <h1 className="page-header russo text-center">List </h1>
                </div>
            </div>
            <div className="row list-row justify-content-center">
                <div className="col">
                    <div className='stats-table'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'><span className="list-th">Card Name</span></th>
                                    <th scope='col'><span className="list-th">Rarity</span></th>
                                    <th scope='col'><span className="list-th">Set</span></th>
                                    <th scope='col'><span className="list-th">Quantity</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.theList.map((card, index) => {
                                    return (
                                        <tr key={index}>
                                            <td><span className='list-tr'>{card.name}</span></td>
                                            <td><span className='list-tr'>{card.rarity}</span></td>
                                            <td><span className='list-tr'>{card.set}</span></td>
                                            <td><span className='list-tr'>{card.quantity}</span></td>
                                        </tr>
                                    )
                                })}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default List