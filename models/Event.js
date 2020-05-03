const mongoose = require('mongoose');

const Creator = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    self: {
        type: Boolean,
        required: false,
    },
});

const Attendant = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    organizer: {
        type: Boolean,
        required: false,
    },
    self: {
        type: Boolean,
        required: false,
    },
    responseStatus: {
        type: Boolean,
        required: false,
    },
});

const EventSchema = mongoose.Schema({
    summary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creator: Creator,
    created: {
        type: Date,
        default: Date.now,
        required: false,
    },
    updated: {
        type: Date,
        default: Date.now,
        required: false,
    },
    color: {
        type: String,
        default: '#FF0',
        required: false,
    },
    start: {
        type: Date,
        default: Date.now,
        required: true,
    },
    end: {
        type: Date,
        default: Date.now,
        required: true,
    },
    attendees: [Attendant],
});

module.exports = mongoose.model('Event', EventSchema);
