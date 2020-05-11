const axios = require('axios')

const functions = {

    getUserData: function(userInfo) {
        return axios.post('/db/getmydata', userInfo)
    }


}

module.exports = functions;