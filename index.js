const http = require('http')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
mongoose.connect(config.mongoUrl).then((response)=>{
  console.log('connected to database',config.mongoUrl)
}).catch((error)=>{
  console.log(error)
})

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs',blogsRouter)


const server = http.createServer(app)

const PORT = 3003
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
server.on('close',()=>{
  mongoose.connection.close()
})

module.exports = {
  app,server
}