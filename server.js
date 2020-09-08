const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const passport = require('passport')
const cookieSession = require('cookie-session')
require('./passportSetup')


const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

//cookie

app.use(cookieSession({
  name: 'jahangir-session',
  keys: ['key1', 'key2']
}))

const isLogin = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.sendStatus(4000)
    }
}

app.use(passport.initialize())
app.use(passport.session())

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname + '/index.html'))
// })

app.get('/', (req, res) => {
    res.send('you are not login ')
})

app.get('/good',isLogin, (req, res) => {
    res.send(`welcome to ${req.user.displayName}`)
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  });
app.get('/logout', (req, res) => {
    req.session = null,
        req.logOut(),
        res.redirect('/')
} )


const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`server running ${port}`);
})
