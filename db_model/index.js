const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CardsDB = new Schema ({
    name: String,
    rarity: String,
    set: String,
    cmc: Number,
    type: String,
    arena_qty: Number,
    paper_qty: Number
});

var CardsDB = mongoose.model("CardsDB", SubscriptionSchema);

module.exports = CardsDB;
