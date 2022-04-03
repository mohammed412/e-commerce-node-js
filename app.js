const express = require('express')

const path = require('path');
const session = require('express-session');
const sessionStore = require('connect-mongodb-session')(session);
const flashSession = require('connect-flash');
const check  = require('express-validator');

const homeRouter = require('./routes/home.routes');
const productRouter = require('./routes/product.routes');
const authRouter = require('./routes/auth.routes');
const cartRouter = require('./routes/cart.routes')



const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, "vendor")));
app.use(flashSession());
app.set('view engine', 'ejs')
app.set('views', 'views')

const STORE = new sessionStore({
  uri: "mongodb://localhost:27017/online-shop",
  collection: 'session'
});

app.use(session({
    secret: "we are the chompions",
    saveUninitialized: true,
    store: STORE,
    resave: true,
}))


app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))