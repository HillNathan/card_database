const axios = require('axios')

const functions = {

    getUserData: function(userInfo) {
        return axios.post('/db/getmydata', userInfo)
    },

    updateUserData: function(wholeUser) {
        return axios.post('/db/update_info', wholeUser)
    }
}

module.exports = functions;