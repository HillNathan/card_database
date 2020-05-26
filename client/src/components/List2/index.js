import React, { Component } from 'react'
import './style.css'
import {Card} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

class List extends Component {
    constructor() {
        super();
    
        this.state = {
            cardList: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        let { name, value } = event.target;
    
        this.setState({
          [name]: value
        });
      }

      handleSubmit(event) {
        event.preventDefault();
        // HANDLE FORM SUBMITS HERE. 
      }

      componentDidMount() {
        // when our component mounts, we want to get the most up-to-date Player information from our 
        //  external DB, so we will call our routine to do that once it is all mounted. 
        this.setState({
            cardList: this.props.theList
        })
      }


    render() {
        return (
            <div className='primary-block'>
                <div className="row header-row text-center">
                    <div className="col" >
                        <h1 className="page-header russo text-center">List 2</h1>
                    </div>
                </div>
                <div className="row list-row justify-content-center">
                    <div className="col">
                        <div className='stats-table'>
                            {this.state.cardList.sort((a,b) => { return(a.name - b.name) } ).map(item => {
                                return (
                                    <Card className="something">
                                        <CardContent className="my-card-content">
                                            <div className="card-header">{item.name}</div>
                                            <div className="card-info">
                                                SET: {item.set} <br />
                                                RARITY: {item.rarity}
                                            </div>
                                            <span className="card-quantity">
                                                Quantity = {item.quantity}
                                            </span>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                            
                        
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default List