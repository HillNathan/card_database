const mongojs = require('mongojs')
const db = require('../db_model')

module.exports = {

    getuser: (user, cb) => {
        db.findOne({username: user})
            .then((playerData) => {
                cb(playerData)
            })
    },

    adduser: (userInfo) => {
        console.log(db.Player)
        db.Player.create(userInfo,err => {
            if(err) {
                console.log('>>>>>>> ERRROR')
                console.log(err)
            }
            else {
                console.log('SUCCESS!!!!!!!!!')
                console.log(userInfo)

            }
        })
    }
}