import React from 'react'
import './style.css'
const setlist = require("../../data/setlist.json")

function Main (props) {
    return (
        <div className="primary-block">
            <div className="col" >
                <div className="row header-row text-center">
                    <h1 className="page-header russo text-center">Add a Pack</h1>
                </div>
                <hr className="my-divider" />
                <div className="row">
                    <form className="my-form">
                        <h3>Enter the cards from your pack here:</h3>
                        <div className="form-group">
                            <label htmlFor="rare-mythic">Rare or Mythic</label>
                            <div className="row">
                                <div className="col-4">
                                    <input className="form-control" type="text" name="rare-mythic" id="rare-mythic" placeholder="Rare/Mythic" />
                                </div>
                                <div className="col-4">
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="radio" name="rarity" id="mythicRadio" value="mythic" checked />
                                        <label className="form-check-label" htmlFor="mythicRadio">
                                            Mythic
                                        </label>
                                    </div>
                                    <div className="form-check-inline">
                                        <input className="form-check-input" type="radio" name="rarity" id="rareRadio" value="rare" />
                                        <label className="form-check-label" htmlFor="rareRadio">
                                            Rare
                                        </label>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                        <div className="col-4">
                                            <label htmlFor="set-abbreviation">Set</label>
                                        </div>
                                        <div className="col-8">
                                            <select id="set-abbreviation" className="form-control">
                                                {setlist.sets.map((item, itemIndex) => {
                                                    return (
                                                        <option key={itemIndex}>{item}</option>
                                                    )
                                                })}
                                            </select>
                                        </div>
                                    </div>    
                                </div>
                            </div>
                        </div>
                        <hr className="small-divider" />
                        <div className="form-group">
                            <label htmlFor="uncommon-grp">Uncommons</label>
                            <div className="row">
                                <div className="col-4">
                                    <input className="form-control" type="text" name="uncommon1" id="uncommon1"placeholder="WC" />
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="uncommon2" id="uncommon2"placeholder="" />
                                </div>
                            </div>
                        </div>
                        <hr className="small-divider" />
                        <div className="form-group">
                            <label htmlFor="common-grp">Commons</label>
                            <div className="row">
                                <div className="col-4">
                                    <input className="form-control" type="text" name="common1" id="common1"placeholder="WC" />
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="common2" id="common2"placeholder="" />
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="common3" id="common3"placeholder="" />
                                </div>
                            </div>
                            <div className="row second-grp">
                                <div className="col-4">
                                    <input className="form-control" type="text" name="common4" id="common4"placeholder="" />
                                </div>
                                <div className="col-4">
                                    <input className="form-control" type="text" name="common5" id="common5"placeholder="" />
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-lg btn-info add-pack-submit"
                                onClick={event => props.handleOnSubmit(event, {
                                    set: document.getElementById("set-abbreviation").value,
                                    premium: {
                                        name: document.getElementById("rare-mythic").value,
                                        mythic: document.getElementById("mythicRadio").checked
                                        },
                                    uncommon1: document.getElementById("uncommon1").value,
                                    uncommon2: document.getElementById("uncommon2").value,
                                    common1: document.getElementById("common1").value,
                                    common2: document.getElementById("common2").value,
                                    common3: document.getElementById("common3").value,
                                    common4: document.getElementById("common4").value,
                                    common5: document.getElementById("common5").value,
                                    }) }>Add to my Binder!</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Main;