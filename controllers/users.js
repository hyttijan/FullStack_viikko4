const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(request,response) => {
  try{
    const users = await User.find({})
    response.json(users.map(User.format))
  }
  catch(exception){
    response.status(500).json({ error: 'something went wrong...' })
  }
})
usersRouter.post('/', async (request, response) => {
  try{
    const body = request.body
    const sameUserName = await User.findOne({username:body.username})
    if(body.password===undefined||body.password.length<3){
      response.status(400).json({ error: 'Password is invalid' })
    }
    else if(sameUserName){
      response.status(400).json({ error: 'Username is already in use' })
    }
    else{

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)
      const user = new User({
        username: body.username,
        name: body.name,
        adult: body.adult,
        passwordHash
      })
      const savedUser = await user.save()
      response.status(201).json(User.format(savedUser))
    }
  } catch (exception) {
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter