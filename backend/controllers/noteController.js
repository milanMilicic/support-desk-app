const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');


const getNotes = asyncHandler(async (req, res) => {
    // get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorizes');
    }

    const notes = await Note.find({ticket: req.params.ticketId})

    res.status(200).json(notes);
})


const addNote = asyncHandler(async (req, res) => {
    // get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorizes');
    }

    const note = await Note.create({
        text: req.body.text,
        isAdmin: false,
        ticket: req.params.ticketId,
        user: req.user.id
    })

    res.status(200).json(note);
})

module.exports = {getNotes, addNote};