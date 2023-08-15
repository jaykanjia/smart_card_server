const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
	userId: { type: String, required: true },
	savedCards: { type: [String] },
});

const Card = mongoose.model("savedCards", cardSchema);

module.exports = Card;
