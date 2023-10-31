const { varifyUser } = require("./varifyToken");
const Card = require("../db/models/Card");

const router = require("express").Router();

router.get("/", varifyUser, async (req, res) => {
	try {
		const id = req.body.user.id;
		const response = await Card.findOne({ userId: id });
		// if user not found
		if (!response) return res.status(404).send({ error: `no any card saved` });
		// if user found
		return res.status(200).send({ message: `Profile data`, data: response });
	} catch (error) {
		return res.status(500).send({ error: `Server error ${error}` });
	}
});

router.post("/", varifyUser, async (req, res) => {
	try {
		// find userId in database
		const savedCards = await Card.findOne({ userId: req.body.user.id });
		// if userId is not found
		if (!savedCards) {
			const newCard = new Card({
				userId: req.body.user.id,
				savedCards: [req.body.data],
			});
			const response = await newCard.save();
			if (!response)
				return res.status(500).send({ message: "something went wrong..." });
			return res.status(200).send({ message: `your first card added...` });
		}
		// if userId is found
		const oldCardList = savedCards.savedCards;
		// find is profileId is already in card list
		const cardFound = oldCardList.find((cardId) => cardId === req.body.data);
		// if card already in list
		if (cardFound)
			return res.status(200).send({ message: "card is already saved..." });
		//if card is not in list
		const response = await Card.updateOne(
			{ userId: req.body.user.id },
			{ savedCards: [...oldCardList, req.body.data] }
		);
		if (!response)
			return res.status(200).send({ message: "somethig went wrong..." });
		return res.status(200).send({ message: "card saved..." });
		// check if card is already in the list
	} catch (error) {
		return res.status(500).send({ error: `Server error ${error}` });
	}
});

module.exports = router;
