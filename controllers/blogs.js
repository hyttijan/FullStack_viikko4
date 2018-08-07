const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

blogsRouter.get('/', async(request, response) => {
  try{
    const blogs = await Blog.find({}).populate('user',{_id:1,username:1,name:1})
    response.json(blogs)
  }
  catch(exception){
    console.log(exception)
    response.status(404).json({error:'Could not retrieve data from the server'})
  }
})

blogsRouter.post('/', async(request, response) => {
  try{
    if(request.body.title===undefined||request.body.url===undefined){
      response.status(400).end()
    }
    else{
      const decodedToken = jwt.verify(request.token,config.secret)
      if(!request.token||!decodedToken.id){
        return response.status(401).json({ error: 'token missing or invalid' })
      }
      const user = await User.findById(decodedToken.id)
      const blog = {
        title: request.body.title,
        author:request.body.author,
        url: request.body.url,
        likes:request.body.likes||0,
        user: user._id
      }


      const blogObject = new Blog(blog)
      const result = await blogObject.save()
      response.status(201).json(Blog.format(result))
    }
  }
  catch(exception){
    console.log(exception)
    if (exception.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: exception.message })
    }
    else{
      response.json(500).json({error:'Something went wrong'})
    }
  }
  
})
blogsRouter.put('/:id',async(request, response) => {
  try{
    const blog = {
      title: request.body.title,
      author:request.body.author,
      url: request.body.url,
      likes:request.body.likes||0
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true })
    response.json(updatedBlog)
  }
  catch(exception){
    response.status(400).json({error:'malformatted id'})
  }
})
blogsRouter.delete('/:id',async(request, response) => {
  try{
    const decodedToken = jwt.verify(request.token,config.secret)
    const blog = await Blog.findById(request.params.id)
   
    if(!request.token||!decodedToken.id||!blog.user.equals(decodedToken.id)){
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()      
  }
  catch(exception){
    response.status(400).json({error:'malformatted id'})
  }  
})

module.exports = blogsRouter