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
        cardList: [{
            name: String,
            rarity: String,
            set: String,
            cmc: Number,
            type: String,
            arena_qty: Number,
            paper_qty: Number
        }]
});

var PlayerModel = mongoose.model("Player", PlayerSchema);

module.exports = PlayerModel;
