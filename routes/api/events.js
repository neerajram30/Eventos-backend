const express = require('express');
const router = express.Router();
const Events = require('../../models/Events')
const auth = require('../../middlewares/auth')


// Fetch all events data from database
router.get('/', (req, res) => {
    Events.find().then((event) => {
        if (event) {
            res.status(200).json({
                message: "Events fetched succesfully",
                events: event
            })
        }
        else {
            res.status(404).json({
                message: "Cannot fetch Events"
            })
        }
    })
})

// Create events
router.post('/create', auth, async (req, res) => {
    const { title, startDate, endDate, createdAt, venue, description
    } = req.body
    try {
        let event = new Events({
            title,
            startDate,
            endDate,
            createdAt,
            venue,
            description,
            creator: req.session.user_id
        })
        console.log(event);
        await event.save();
        res.status(200).send("Event created")

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving Events");

    }
})

//Fetch events accroding to user session
router.get("/myevent", auth, (req, res) => {
    Events.find({ creator: req.session.user_id }).then((event) => {
        if (event) {
            res.status(200).json({
                message: "Events successfully fetched",
                events: event
            });
        }
        else {
            res.status(404).json({ message: "Events not found!" });
        }
    }).catch(err => console.log(err))
})

module.exports = router;