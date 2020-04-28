const mongojs = require('mongojs')
const db = require('../db_model')

module.exports = {

    getall: () => {
        db.CardsDB.find({})
            .then((cardList, cb) => {
                cb(cardList)
            })
    }
}