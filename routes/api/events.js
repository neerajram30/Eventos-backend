const express = require('express');
const router = express.Router();
const Events = require('../../models/Events')
// const auth = require('../../middlewares/auth')
const {protect} = require('../../middlewares/auth')

// Fetch all events data from database
router.get('/events', (req, res) => {
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

// Create event
router.post('/create', protect, async (req, res) => {
    const { createdAt, title, startDate, endDate, venue, description
    } = req.body
        const event = await Events.create({
            title,
            startDate,
            endDate,
            createdAt,
            venue,
            description,
            user: req.user.id,
        })
        res.status(200).json(event)
    } 
)

//Fetch events accroding to user session
router.get("/myevent", protect, async (req, res) => {
    const event = await Events.find({ user: req.user.id })
        if (event) {
            res.status(200).json(event);
        }
        else {
            res.status(404).json({ message: "Events not found!" });
        }
    
})

//Delete events by id
router.delete("/myevent/:id", protect, (req, res) => {
    Events.deleteOne({ _id: req.params.id, user: req.user.id }).then((response) => {
        console.log(response)
        if (response.n > 0) {
            res.status(200).json({ message: "sucessfully deteleted event" })
        }
        else {
            res.status(404).json({ message: "some error occured while deleting" })
        }
    })
})

//List events by id
router.get("/:id", (req, res) => {
    Events.findById(req.params.id).then(event => {
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).json({ message: "Event not found!" });
        }
    });
});

//Update event
router.put("/:id", protect, async (req, res) => {
    const { createdAt, title, startDate, endDate, venue, description
    } = req.body
    let event = new Events({
        _id: req.params.id,
        title,
        startDate,
        endDate,
        venue,
        description,
        createdAt,
        creator: req.session.user_id
    })
    console.log(event);
    await Events.updateOne({ _id: req.params.id, creator: req.session.user_id }, event
    ).then((response) => {
        console.log(response)
        if (response) {
            res.status(200).json({ message: "Update successful!" });
        }
        else {
            res.status(500).json({ message: "Error Upating Event" });
        }
    })

})

module.exports = router;
