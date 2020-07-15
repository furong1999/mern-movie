const express = require('express');
const router = express.Router();


const { Favourite } = require("../models/Favourite");

const { auth } = require("../middleware/auth");

//=================================
//             Favourite
//=================================


router.post("/favouriteNumber",(req, res) => {
    //Find Favourite information inside Favourite Collection by Movie ID

    Favourite.find({ "movieId": req.body.movieId })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)

            res.status(200).json({ success: true, subscribeNumber: subscribe.length })
        })

});



router.post("/favourited", (req, res) => {
//Find Favourite Information inside Favourite collection by Movie Id, userFrom
    Favourite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
        .exec((err, subscribe) => {
            if (err) return res.status(400).send(err)

            //To know whether the movie is already already favourited 
            let result = false;
            if (subscribe.length !== 0) {
                result = true
            }

            res.status(200).json({ success: true, subcribed: result })
        })

});



router.post("/addToFavourite", (req, res) => {
    // Save the information about the movie or user Id inside favourite collection
    console.log(req.body)

    const favourite = new Favourite(req.body);

    favourite.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});


router.post("/removeFromFavourite",  (req, res) => {


    Favourite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).json({ success: false, err });
            res.status(200).json({ success: true, doc })
        })
});


router.post("/getFavouritedMovie", (req, res) => {

    //Find all Favourited movie by users
    Favourite.find({ 'userFrom': req.body.userFrom })
        .exec((err, favourites) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({ success: true, favourites })
        })
});



module.exports = router;
