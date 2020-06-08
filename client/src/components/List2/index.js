import React, { Component } from 'react'
import './style.css'
import { Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import ListPagination from '../ListPagination';


class List extends Component {
    
    constructor() {
        super();
    
        this.state = {
            cardList: [],
            pageStart: 0,
            page: 0,
            numPages: 0,

        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePage = this.changePage.bind(this);
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

      changePage(newPage) {
          this.setState({   
              page: newPage-1,
              pageStart: (newPage-1)*12
          })
      }

      componentDidMount() {
        // when our component mounts, we want to get the most up-to-date Player information from our 
        //  external DB, so we will call our routine to do that once it is all mounted. 
        var pages = 0
        pages = Math.floor(this.props.theList.length /12)+1
        this.setState({
            cardList: this.props.theList,
            numPages: pages
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
                            {this.state.cardList.slice(this.state.pageStart,this.state.pageStart+12).map((item,index) => {
                                return (
                                    <Card className="something" key={index}>
                                        <CardContent className="my-card-content" >
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
                <div className="row justify-content-center">
                    <div className="col-6 pages">
                        <div className="pages">
                            <ListPagination
                                numPages={this.state.numPages}
                                updateCurrentPage={this.changePage}
                                color="secondary"
                            />
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default List