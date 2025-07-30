const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config/db');
const { errorhandler } = require('./Middelwares/errorHandler')
const path = require('path')
require('dotenv').config()
app.use(cors({
    origin: process.env.DOMAIN_NAME
}))
app.use(express.json())

// Database
connectDB()

// Routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.use('/api/auth', require('./Routes/UserRoute'))
app.use('/api/note', require('./Routes/NoteRoute'))
app.use(errorhandler)
// Listen

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})