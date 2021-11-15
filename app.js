const express = require('express')
const config = require('config')
const path = require('path')

const connectDB = require('./config/db')
const apiUsers = require('./routes/api/users')
const apiAuth = require('./routes/api/auth')
const apiWords = require('./routes/api/words')

const app = express()

connectDB()

app.use(express.json({ extended: false }))

app.use('/api/users', apiUsers)
app.use('/api/auth', apiAuth)
app.use('/api/words', apiWords)

app.use(express.static('client/build'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

const PORT = process.env.PORT || config.get('port') || 5000

app.listen(PORT, () => console.log(`server started on port ${PORT}...`))
