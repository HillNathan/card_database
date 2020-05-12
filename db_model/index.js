const mongoose = require("mongoose");


var Schema = mongoose.Schema;

var PlayerSchema = new Schema ({
        firstname: String,
        lastname: String,
        username: String,
        arenausername: String,
        mythicWC: Number,
        rareWC: Number,
        uncommonWC: Number,
        commonWC: Number,
        vaultProgress: Number,
        cardList: [{
            name: String,
            rarity: String,
            set: String,
            quantity: Number
        }]
});

var PlayerModel = mongoose.model("Player", PlayerSchema);

module.exports = PlayerModel;
