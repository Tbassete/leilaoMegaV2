const express = require('express');
const router = express.Router();
const Auction = require('../models/Auction');

// Página inicial - Listar leilões
router.get('/', async (req, res) => {
    const auctions = await Auction.find({});
    res.render('index', { auctions });
});

// Dar lance
router.post('/bid/:id', async (req, res) => {
    const auction = await Auction.findById(req.params.id);
    const newBid = {
        user: req.body.user,
        amount: req.body.amount
    };

    // Validar o lance
    if (newBid.amount > auction.initialBid && newBid.amount >= auction.bids[auction.bids.length - 1]?.amount + auction.minBidIncrement) {
        auction.bids.push(newBid);
        await auction.save();
    }

    res.redirect('/');
});

module.exports = router;
