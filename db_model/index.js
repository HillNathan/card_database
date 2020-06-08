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
            scryfall_id: String,
            arena_id: Number,
            type_line: String,
            power: String,
            toughness: String,
            name: String,
            rarity: String,
            set: String,
            quantity: Number,
            booster: Boolean,
            mana_cost: String,
            cmc: Number
        }]
});

var PlayerModel = mongoose.model("Player", PlayerSchema);

module.exports = PlayerModel;
