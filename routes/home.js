const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// get all events
router.get('/getEvents', async (req, res) => {
    try {
        const event = await Event.find();
        res.json(event);
    } catch (err) {
        res.json({ message: err });
    }
});

//add event
router.post('/addEvent', async (req, res) => {
    // aca crea el evento con lo que le envia post en json y en EVEN
    // estan definids los tipos y si son required
    const event = new Event(req.body);
    try {
        const savedEvent = await event.save();
        res.json(savedEvent);
    } catch (err) {
        res.json({ message: err });
    }
});

//search
router.get('/getEvent/:eventId', async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        res.json(event);
    } catch (err) {
        res.json({ message: err });
    }
});

//delete
router.delete('/deleteEvent/:eventId', async (req, res) => {
    try {
        const removedEvent = await Event.deleteOne({ _id: req.params.eventId });
        res.json(removedEvent);
    } catch (err) {
        res.json({ message: err });
    }
});

//update
router.patch('/:eventId', async (req, res) => {
    try {
        const updatedEvent = await Event.updateOne(
            { _id: req.params.eventId },
            { $set: { summary: req.body.summary } }
        );
        res.json(updatedEvent);
    } catch (err) {
        res.json({ message: err });
    }
});

//add attendee
//Needsa a object "attendee"
router.patch('/addAttendee/:eventId', async (req, res) => {
    try {
        const updatedEvent = await Event.updateOne(
            { _id: req.params.eventId },
            { $push: { attendees: req.body } }
        );
        res.json(updatedEvent);
    } catch (err) {
        res.json({ message: err });
    }
});

//remove attendee
router.patch('/removeAttendee/:eventId', async (req, res) => {
    try {
        const updatedEvent = await Event.updateOne(
            { _id: req.params.eventId },
            { $pull: { attendees: { email: req.body.email } } }
        );
        res.json(updatedEvent);
    } catch (err) {
        res.json({ message: err });
    }
});

//update attendee
router.patch('/updateResponseStatus/:eventId', async (req, res) => {
    try {
        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: req.params.eventId,
                'attendees.email': req.body.email,
            },
            { $set: { 'attendees.$.responseStatus': req.body.responseStatus } }
        );
        res.json(updatedEvent);
    } catch (err) {
        res.json({ message: err });
    }
});

//update attendee
router.patch('/modifyEvent/:eventId', async (req, res) => {
    try {
        const updatedEvent = await Event.updateOne(
            {
                _id: req.params.eventId,
            },
            {
                $set: {
                    summary: req.body.newSummary,
                    description: req.body.newDescription,
                    start: req.body.newStartDate,
                    end: req.body.newEndDate,
                    updated: new Date(),
                },
            }
        );
        res.json(updatedEvent);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
