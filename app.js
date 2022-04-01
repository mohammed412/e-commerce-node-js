const express = require('express')

const path = require('path');
const port = 3000

const homeRouter = require('./routes/home.routes')
const productRouter = require('./routes/product.routes');
const authRouter = require('./routes/auth.routes')

const app = express()

app.use(express.static(path.join(__dirname, 'assets')))
app.set('view engine', 'ejs')
app.set('views', 'views')


app.use('/', homeRouter);
app.use('/', authRouter);
app.use('/product', productRouter);



app.listen(port, () => console.log(`Example app listening on port ${port}!`))