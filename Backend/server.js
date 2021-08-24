const express = require('express')
const expressSession = require('express-session')
const cors = require('cors')
const path = require('path');

const app = express()
const http = require('http').createServer(app)

const session = expressSession({
    secret: 'some secret string',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})
app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const songRoutes = require('./api/song/song.routes')

app.get('/api/setup-session', (req, res) => {
    req.session.connectedAt = Date.now()
    res.end()
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/song', songRoutes)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./service/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})
console.log('I am Here!, am I?')