const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const config = require('./config/config').get(process.env.NODE_ENV)

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const app = express()

mongoose.Promise = global.Promise
mongoose.connect(config.DATABASE)

const {User} = require('./models/user')
const {WalletCoin} = require('./models/walletcoin')
const {auth} = require('./middleware/auth')

app.use(bodyParser.json())
app.use(cookieParser())

app.get('/api/auth',auth,(req, res)=>{    
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    })
})

/////////////////////////////////////////////////////////////
//WALLET COINS
/////////////////////////////////////////////////////////////
// GET //

app.get('/api/getWalletCoin',(req,res)=>{
    let symbol = req.query.symbol
    let userId = req.query.user_id
    
    WalletCoin.find(
        {
            userId:req.query.user_id,
            symbol:req.query.symbol
        }).exec((err,doc)=>{
            if (err) return res.status(400).send(err)
            res.send(doc)
        })
})

app.get('/api/getWalletCoinById',(req,res)=>{
    let id = req.query.id
    
    WalletCoin.findById(id,(err,doc)=>{
            if (err) return res.status(400).send(err)
            res.send(doc)
        })
})

app.get('/api/GetWalletCoins',(req,res)=>{
    let userId = req.query.user_id
    
    WalletCoin.find(
        {
            userId:req.query.user_id
        }).exec((err,docs)=>{
            if (err) return res.status(400).send(err)
            res.send(docs)
        })
})

/*app.get('/api/getBooks',(req,res)=>{
    let skip = parseInt(req.query.skip)
    let limit = parseInt(req.query.limit)
    let order = req.query.order
    
    //Order = asc || desc
    Book.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if (err) return res.status(400).send(err)
        res.send(doc)
    })
})
*/

// POST //

app.post('/api/WalletCoin_Insert',(req, res)=>{
    const walletCoin = new WalletCoin({
        symbol: req.body.symbol,
        amount: req.body.amount,    
        userId: req.body.userId
    })
    walletCoin.save((err,doc)=>{
        if (err) return res.status(400).send(err)
        res.status(200).json({
            post: true,
            walletCoinId: doc._id
        })
    })    
})

/*
app.post('/api/book',(req, res)=>{
    const book = new Book({
        name: req.body.name,
        author: req.body.author,    
        review: req.body.review,
        pages: req.body.pages,
        rating: req.body.rating,
        price: req.body.price,
        ownerId: req.body.ownerId,
    })
    book.save((err,doc)=>{
        if (err) return res.status(400).send(err)
        res.status(200).json({
            post: true,
            bookId: doc._id
        })
    })    
})
*/

// UPDATE //

app.post('/api/WalletCoin_update',(req, res)=>{
    const walletCoin = new WalletCoin({
        _id: req.body._id,
        symbol: req.body.symbol,
        amount: req.body.amount,    
        userId: req.body.userId
    })
    console.log(walletCoin)
    
    WalletCoin.findByIdAndUpdate(walletCoin._id,walletCoin,{new: true},(err,doc)=>{
        console.log(doc)
        console.log(err)
        if (err) return res.status(400).send(err)
        res.json({
            success: true,
            doc
        })
    })    
})


// DELETE //

app.delete('/api/WalletCoin_delete',(req,res)=>{
    let id = req.query.id
    
    WalletCoin.findByIdAndRemove(id,(err,doc)=>{
        if (err) return res.status(400).send(err)
        res.json(true)
    })
})

/////////////////////////////////////////////////////////////
//USERS
/////////////////////////////////////////////////////////////
// GET //


/*
app.get('/api/getReviewer',(req,res)=>{
    let id = req.query.id
    
    User.findById(id,(err,doc)=>{
        if (err) return res.status(400).send(err)
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    })
})
*/

app.get('/api/getUsers',(req,res)=>{
    User.find({},(err,users)=>{
        if (err) return res.status(400).send(err)
        res.status(200).send(users)
    })
})

/*app.get('/api/user_posts',(req,res)=>{
    //const ownerId = req.query.user
    Book.find({ownerId:req.query.user}).exec((err,docs)=>{
        if (err) return res.status(400).send(err)
        res.send(docs)
    })
})
*/

// REGISTER //

app.post('/api/register',(req, res)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password,    
        name: req.body.name,
        lastname: req.body.lastname,
        role: req.body.role,
        token: req.body.token
    })
    user.save((err,doc)=>{
        if (err) return res.json({success:false})
        res.status(200).json({
            success: true,
            user: doc
        })
    })    
})

// LOGIN //

app.post('/api/login',(req, res)=>{
    
    const email = req.body.email
    const password = req.body.password

    User.findOne({'email': email},(err,user)=>{
        if (!user) return res.json({isAuth:false,message:'Auth failed, email not found'})
        
        user.comparePassword(password,(err,isMatch)=>{
            if (!isMatch) return res.json({
                isAuth: false,
                message: 'Wrong Password'
            })
            user.generateToken((err,user)=>{
                if (err) return res.status(400).send(err)
                res.cookie('auth',user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                })
            })
        })        
    })    
})

// LOGOUT //

app.get('/api/logout',auth,(req, res)=>{
    
    //res.send(req.user)
    req.user.deleteToken(req.token,(err,user)=>{
        if (err) return res.status(400).send(err)
        res.sendStatus(200)
    })
})

// UPDATE //
/*
app.post('/api/user_update',(req, res)=>{
    const book = new Book({
        _id: req.body._id,
        name: req.body.name,
        author: req.body.author,    
        review: req.body.review,
        pages: req.body.pages,
        rating: req.body.rating,
        price: req.body.price,
        ownerId: req.body.ownerId,
    })
    Book.findByIdAndUpdate(book._id,book,{new: true},(err,doc)=>{
        if (err) return res.status(400).send(err)
        res.json({
            success: true,
            doc
        })
    })    
})
*/

// DELETE //

app.delete('/api/user_delete',(req,res)=>{
    let id = req.query.id
    
    Book.findByIdAndRemove(id,(err,doc)=>{
        if (err) return res.status(400).send(err)
        res.json(true)
    })
})

const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log(`Started on port ${port}`)
})
