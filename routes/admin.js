const express = require('express');
const router = express.Router();
const Auction = require('../models/Auction');

// Listar leilões para administração
router.get('/', async (req, res) => {
    const auctions = await Auction.find({});
    res.render('admin', { auctions });
});

// Criar novo leilão
router.post('/new', async (req, res) => {
    const newAuction = new Auction({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        initialBid: req.body.initialBid,
        minBidIncrement: req.body.minBidIncrement
    });

    await newAuction.save();
    res.redirect('/admin');
});

// Editar leilão
router.put('/edit/:id', async (req, res) => {
    const auction = await Auction.findById(req.params.id);

    auction.title = req.body.title;
    auction.description = req.body.description;
    auction.imageUrl = req.body.imageUrl;
    auction.initialBid = req.body.initialBid;
    auction.minBidIncrement = req.body.minBidIncrement;

    await auction.save();
    res.redirect('/admin');
});

// Excluir leilão
router.delete('/delete/:id', async (req, res) => {
    await Auction.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
});

// Remover lance
router.delete('/remove-bid/:auctionId/:bidId', async (req, res) => {
    const auction = await Auction.findById(req.params.auctionId);
    auction.bids.id(req.params.bidId).remove();
    await auction.save();
    res.redirect('/admin');
});

module.exports = router;
