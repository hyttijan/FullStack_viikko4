const supertest = require('supertest')
const {app,server} = require('../index.js')
const api = supertest(app)
const blogs = require('./list_helpers.test')
const Blog = require("../models/blog")

describe("test blogs API",()=>{
  beforeEach(async()=>{
  	await Blog.remove({})
  	const blogObjects = blogs.map(blog=> new Blog(blog))
  	await Promise.all(blogObjects.map(blog=>blog.save()))
  })
  test('test that GET method returns all blogs',async ()=>{
  	const response = await api.get('/api/blogs/')
  	expect(response.status).toBe(200)
  	for(var i=0;i<response.body.length;i++){
  	  expect(blogs).toContainEqual(response.body[i])		
  	}
  	
  })

  test('test that POST method to adds new blog',async() =>{
  	const response = await api.post('/api/blogs/').send(
  	{
      title: 'Test title',
      author: 'Test author',
      url: 'http://www.testurl.fi',
      likes: 5,
    }
    )
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      _id: response.body._id,
      title: 'Test title',
      author: 'Test author',
      url: 'http://www.testurl.fi',
      likes: 5,
      __v: 0 })
  })

  test('test that POST method to adds new blog when likes are missing (likes are set to zero)',async() =>{
  	const response = await api.post('/api/blogs/').send(
  	{
      title: 'Test2 title',
      author: 'Test2 author',
      url: 'http://www.testurl2.fi',
    }
    )
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      _id: response.body._id,
      title: 'Test2 title',
      author: 'Test2 author',
      url: 'http://www.testurl2.fi',
      likes: 0,
      __v: 0 })
  })

  test('test that POST method returns Bad request when url is missing)',async() =>{
    const response = await api.post('/api/blogs/').send(
  	{
      title: 'Test2 title',
      author: 'Test2 author',
      likes:3
    }
    )
    expect(response.status).toBe(400)
  })
  test('test that POST method returns Bad request when title is missing)',async() =>{
    const response = await api.post('/api/blogs/').send(
  	{
      author: 'Test2 author',
      url: 'http://www.testurl2.fi',
      likes:3
    }
    )
    expect(response.status).toBe(400)
  })
  afterAll(() => {
    server.close()
  })
})
