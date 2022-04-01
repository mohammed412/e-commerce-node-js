const express = require('express')

const path = require('path');
const session = require('express-session');
const sessionStore = require('connect-mongodb-session')(session);
const homeRouter = require('./routes/home.routes');
const productRouter = require('./routes/product.routes');
const authRouter = require('./routes/auth.routes');



const app = express()
const port = 3000

app.use(express.static(path.join(__dirname , 'assets')))
app.use(express.static(path.join(__dirname ,"vendor")));
app.set('view engine', 'ejs')
app.set('views', 'views')

const STORE = new sessionStore({
    url: 'http://mongodb:27017/online-shop', 
    collection: 'session'
})

app.use(session({
    secret: 'hu eh iozaoiçéç {#çé}  )éà&ç 01° BH1Uçéç1^@#@ @#@  "~~#¤¤*" ',
    saveUninitialized: false,
    store: STORE
}))


app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))