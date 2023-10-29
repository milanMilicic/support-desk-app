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


    /* Allow admin and user, who made a note, to see notes */
    if(req.user.isAdmin) {
        const notes = await Note.find({ticket: req.params.ticketId});
        const userIds = notes.map(note => note.user);

        const firstAuthor = await User.find(userIds[0]);
        const firstAuthorName = firstAuthor[0].name;

         const secondAuthor = await User.find(userIds[1]);
         const secondAuthorName = secondAuthor[0].name;

         const updatedNotes = notes.map(note => {
            if(note.user.toString() === userIds[0].toString()){
                return {
                    ...note._doc,
                    name: firstAuthorName
                }
            } else {
                return {
                    ...note._doc,
                    name: secondAuthorName
                }
            }
         })
         
        res.status(200).json(updatedNotes);

    } else if(ticket.user.toString() === req.user.id) {
        const notes = await Note.find({ticket: req.params.ticketId});
        const userIds = notes.map(note => note.user);

        const firstAuthor = await User.find(userIds[0]);
        const firstAuthorName = firstAuthor[0].name;

         const secondAuthor = await User.find(userIds[1]);
         const secondAuthorName = secondAuthor[0].name;

         const updatedNotes = notes.map(note => {
            if(note.user.toString() === userIds[0].toString()){
                return {
                    ...note._doc,
                    name: firstAuthorName,
                }
            } else {
                return {
                    ...note._doc,
                    name: secondAuthorName,
                }
            }
         })
         
        res.status(200).json(updatedNotes);

    } else {
        res.status(401);
        throw new Error('Not authorized');
    }

    
})


const addNote = asyncHandler(async (req, res) => {
    // get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if(req.user.isAdmin || ticket.user.toString() === req.user.id){
        const note = await Note.create({
            text: req.body.text,
            isAdmin: req.user.isAdmin,
            ticket: req.params.ticketId,
            user: req.user.id
        })
    
        res.status(200).json(note);
    }

})


module.exports = {getNotes, addNote};