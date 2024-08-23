const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    initialBid: Number,
    minBidIncrement: Number,
    bids: [
        {
            user: String,
            amount: Number,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Auction', auctionSchema);
