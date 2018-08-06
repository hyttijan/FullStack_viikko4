const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  if(request.body.title===undefined||request.body.url===undefined){
    response.status(400).end()
  }
  else{


    const blog = {
      title: request.body.title,
      author:request.body.author,
      url: request.body.url,
      likes:request.body.likes||0
    }


    const blogObject = new Blog(blog)
    blogObject
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  }
})
blogsRouter.put('/:id',async(request, response)=>{
  try{
    const blog = {
      title: request.body.title,
      author:request.body.author,
      url: request.body.url,
      likes:request.body.likes||0
    }
    updatedBlog = await Blog.findByIdAndUpdate(request.params.id,blog,{ new: true })
    response.json(updatedBlog)
  }
  catch(exception){
    response.status(400).json({error:'malformatted id'})
  }
})
blogsRouter.delete("/:id",async(request, response)=>{
  try{
    await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()      
  }
  catch(exception){
    response.status(400).json({error:'malformatted id'})
  }  
})

module.exports = blogsRouter