require('dotenv').config();
const express = require('express');
const session = require('express-session');
const {SERVER_PORT, SESSION_SECRET} = process.env;
const checkForSession = require('./middlewares/checkForSession')
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')
const cartController = require('./controllers/cartController')
const searchController = require('./controllers/searchController')

const app = express()

app.use(express.static(`${__dirname}/../build`))

app.use(express.json())

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60}
}));

app.use(checkForSession)

app.get('/api/swag', swagController.read)

app.post('/api/login', authController.login)
app.post('/api/register', authController.register)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)

app.get('/api/search', searchController.search)

const port = SERVER_PORT
app.listen(port, () => {console.log(`Take us to warp ${port}!`)})