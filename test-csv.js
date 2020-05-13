const csv = require('@fast-csv/parse')
const fs = require('fs')
const axios = require('axios')
var theFile = 'ikoria.csv'
var bulkAddObj = {}
var myStartingIndex = 0
var statusCount = 0
var testOutput = []

// bulkAddObj.username = "pjsstp"

function doBulkAddAction (index, array) {
    if (index > 0) {
        axios.post('http://localhost:3000/db/bulk_add', 
            {
                username: "pjsstp",
                newCard: array[index]
            })
            .then(response => {
                if (response.status = 200) statusCount++
                console.log(`The card ${array[index].name} was added to the DB.`)
                doBulkAddAction(index-1, array)
            })
    }
    else {
        axios.post('http://localhost:3000/db/bulk_add', 
        {
            username: "pjsstp",
            newCard: array[index]
        })
        .then(response => {
            console.log("I'm pretty sure everything finished OK, man. ")
            console.log(`We added ${statusCount} records to the database. Sweeeet.`)
        })
    }
    
}


fs.createReadStream(theFile)
    .pipe(csv.parse({headers: ['name', 'rarity', 'quantity']}))
    .on('error', error => console.error(error))
    .on('data', row => {
        testOutput.push(row)
        // console.log(row)
    })
    .on('end', rowCount => {
        console.log(`Parsed ${rowCount} rows.`)
        bulkAddObj.newCard = testOutput
        bulkAddObj.newCard.forEach(cardObj => {
            switch (cardObj.rarity) {
                case ' c': cardObj.rarity = "Common"
                            break;
                case ' u': cardObj.rarity = "Uncommon"
                            break;
                case ' r': cardObj.rarity = "Rare"
                            break;
                case ' m': cardObj.rarity = "Mythic"
                            break;
        
            }
            cardObj.quantity = parseInt(cardObj.quantity)
            cardObj.set = 'IKO'
        })
        myStartingIndex = rowCount
        doBulkAddAction(myStartingIndex-1, bulkAddObj.newCard)
    })





    
// })