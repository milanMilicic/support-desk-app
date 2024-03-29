const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');


const getTickets = asyncHandler(async (req, res) => {
    // get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const tickets = await Ticket.find({user: req.user.id});

    res.status(200).json(tickets);
})


const getTicket = asyncHandler(async (req, res) => {
    // get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(404);
        throw new Error('Ticket not found');
    }

    /* Allow only admin and user, who made a ticket, to see tickets */

    if(req.user.isAdmin) {
        res.status(200).json(ticket);
    } else if(ticket.user.toString() === req.user.id) {
        res.status(200).json(ticket);
    } else {
        res.status(401);
        throw new Error('Not authorized');
    }
})


const createTicket = asyncHandler(async (req, res) => {
    const {product, description} = req.body;

    if(!product || !description){
        res.status(400);
        throw new Error('Please add a product and description');
    }

    // get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })

    res.status(201).json(ticket);
})

//delete ticket
const deleteTicket = asyncHandler(async (req, res) => {
    // get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(404);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('Not authorized');
    }

    await Ticket.findByIdAndDelete(req.params.id);

    res.status(200).json({success: true});
})


const updateTicket = asyncHandler(async (req, res) => {
    // get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(401);
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);

    if(!ticket){
        res.status(404);
        throw new Error('Ticket not found');
    }


    if(req.user.isAdmin || ticket.user.toString() === req.user.id){
        const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true});
        res.status(200).json(updatedTicket);

    } else {
        res.status(401);
        throw new Error('Not authorized');
    }

})

// For Admin
const getAllTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find({status: 'new'})

    if(!tickets){
        res.status(404);
        throw new Error('Tickets not found');
    }

    res.status(200).json(tickets);
})


module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket,
    getAllTickets
}