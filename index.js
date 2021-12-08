require('dotenv').config();
// console.log(process.env);

var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var shortid=require('shortid');
var cookieParser = require("cookie-parser");
var csurf = require('csurf');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL);

var authRoute = require("./routes/auth.route");
var userRoute = require("./routes/user.route");
var productRoute = require("./routes/product.route");
var cartRoute = require("./routes/cart.route");
var transferRoute = require("./routes/transfer.route");

var apiProduct = require('./api/routes/product.route');

var sessionMiddleware = require('./middlewares/session.middleware');
var authMiddleware = require("./middlewares/auth.middleware");

app.set('view engine','pug');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.get('/', function(req, res){
    //res.send('Welcome Node.js');
    res.render('index',{
        copy:'Kingo'
    }
    );
});

app.use("/auth", authRoute);
app.use(csurf({cookie: true}));
app.use("/users", authMiddleware.requireAuth, userRoute);
app.use("/products",productRoute);
app.use("/cart", cartRoute);
app.use("/transfer", authMiddleware.requireAuth, transferRoute);

app.use('/api/products', apiProduct);

app.listen(process.env.PORT, function(){
    console.log('Server listening on port '+process.env.PORT);
});