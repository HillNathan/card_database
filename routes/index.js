// include any additional middleware declarations up here:
// i.e.
const API = require("../controller");
const db = require('../db_model')


module.exports = app => {

    // Starting route to confirm everything is set up to run through express
    app.get('/express_backend', (req, res) => {
        res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
      });

    app.post('/db/addpack', (req, res) => {
      console.log(req.body)
      console.log("===========================/")
      db.create(req.body)
      .then(newUser => {
        res.send({ data: 'RECEIVED',
                 info: newUser })
        })
      })

    app.post('/db/getmydata', (req,res) => {
      API.getuser(req.body.username, (userData) => {
        res.send(userData)
      })
    })

}

