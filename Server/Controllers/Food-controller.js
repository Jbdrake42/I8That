let express = require('express');
let router = express.Router();
const Food = require('../Db').import('../Models/Food');
let validateSession = require("../Middleware/Validate-session");

router.post("/create", validateSession, (req, res) => {
    const foodEntry = {
        food: req.body.food.food,
        location: req.body.food.location,
        date: req.body.food.date,
        emoji: req.body.food.emoji,
        feelings: req.body.food.feelings,
        calories: req.body.food.calories,
        photo: req.body.food.photo,
        owner_id: req.user.id
    }
    Food.create(foodEntry)
    .then(food => res.status(200).json(food))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/get", validateSession, (req, res) => {
    let ownerId = req.user.id
    Food.findAll({
        where: { owner_id: ownerId }
    })
    .then(foods => res.status(200).json(foods))
    .catch(err => res.status(500).json({ error: err }));
});

router.get("/get/all", (res) => {
    Food.findAll()
        .then(foods => res.status(200).json(foods))
        .catch(err => res.status(500).json({ error: err }))
});

router.get("/get/:id", validateSession, (req, res) => {
    Food.findAll({
        where: { id: req.params.id, owner_id: req.user.id }
    })
    .then(foods => res.status(200).json(foods))
    .catch(err => res.status(500).json({ error: err }))
    });

router.put("/update/:id", validateSession, function (req, res) {
    const updateFoodEntry = {
        food: req.body.food.food,
        location: req.body.food.location,
        date: req.body.food.date,
        emoji: req.body.food.emoji,
        feelings: req.body.food.feelings,
        calories: req.body.food.calories,
        photo: req.body.food.photo
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id }};

    Food.update(updateFoodEntry, query)
        .then((foods) => res.status(200).json(foods))
        .catch((err) => res.status(500).json({ error: err }));
    });

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id }};

    Food.destroy(query)
        .then(() =>res.status(200).json({ message: "Food entry destroyed ):" }))
        .catch((err) => res.status(500).json({ error: err }));
    });

module.exports = router;
