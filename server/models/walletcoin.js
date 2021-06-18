const mongoose = require('mongoose')
const config = require('../config/config').get(process.env.NODE_ENV)

const walletCoinSchema = mongoose.Schema({
    symbol: {
        type: String,
        required: true        
    },
    amount: {
        type: Number,
        required: true,   
        default: 0     
    },    
    userId: {
        type: String,
        required: true 
    }
},{timestamps:true})

const WalletCoin = mongoose.model('WalletCoin',walletCoinSchema);

module.exports = { WalletCoin }
