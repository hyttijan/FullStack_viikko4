const supertest = require('supertest')
const {app,server} = require('../index.js')
const api = supertest(app)
const blogs = require('./list_helpers.test')
const Blog = require("../models/blog")
const User = require("../models/user")

describe("test blogs API",()=>{
  const user = {
  "username":"Testi",
  "name":"Testi testi",
  "adult":true,
  "password":"5555"
  }
  beforeAll(async()=>{
  	await Blog.remove({})
    await User.remove({})
  	const blogObjects = blogs.map(blog=> new Blog(blog))
  	await Promise.all(blogObjects.map(blog=>blog.save()))
    await api.post('/api/users').send(user)
  })
  test('test that GET method returns all blogs',async ()=>{
  	const response = await api.get('/api/blogs/')
  	expect(response.status).toBe(200)
  	for(var i=0;i<response.body.length;i++){
  	  expect(blogs).toContainEqual(response.body[i])		
  	}
  	
  })

  test('test that POST method to adds new blog',async() =>{
    const response1 = await api.post('/api/login/').send({username:"Testi",password:"5555"})
  	const response2 = await api.post('/api/blogs/').send(
  	{
      title: 'Test title',
      author: 'Test author',
      url: 'http://www.testurl.fi',
      likes: 5,
    }
    ).set("Authorization","bearer "+response1.body.token)
    const testUser = await User.findOne({username:"Testi"})
    expect(response2.status).toBe(201)
    expect(response2.body).toEqual({
      _id: response2.body._id,
      title: 'Test title',
      author: 'Test author',
      url: 'http://www.testurl.fi',
      likes: 5,
      user:testUser._id.toString()})
  
  })

  test('test that POST method to adds new blog when likes are missing (likes are set to zero)',async() =>{
    const response1 = await api.post('/api/login/').send({username:"Testi",password:"5555"})
  	const response = await api.post('/api/blogs/').send(
  	{
      title: 'Test2 title',
      author: 'Test2 author',
      url: 'http://www.testurl2.fi'
    }
    ).set("Authorization","bearer "+response1.body.token)
    const testUser = await User.findOne({username:"Testi"})
    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      _id: response.body._id,
      title: 'Test2 title',
      author: 'Test2 author',
      url: 'http://www.testurl2.fi',
      likes: 0,
      user:testUser._id.toString()})
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

})


describe("test users API",()=>{

  const users = [
  {
    "_id":"5b677ce33ac3d225d5564375",
  "username":"Testi",
  "name":"Testi testi",
  "adult":true,
  "blogs":[],
  "password":"5555"
  },
  {
    "_id": "5b677ce33ac3d225d5564376",
    "username":"Testi2",
  "name":"Testi testi",
  "adult":true,
  "blogs":[],
  "password":"5555"
  }
  ]
  const usersWithoutPassword = [
  {
    "_id":"5b677ce33ac3d225d5564375",
  "username":"Testi",
  "name":"Testi testi",
  "adult":true,
  "blogs":[]
  },
  {
    "_id": "5b677ce33ac3d225d5564376",
    "username":"Testi2",
  "name":"Testi testi",
  "adult":true,
  "blogs":[]
  }
  ]
  beforeAll(async()=>{
    await User.remove({})
    const userObjects = users.map(user=> new User(user))
    await Promise.all(userObjects.map(user=>user.save()))
  })
  test("test that GET method returns all users",async()=>{
    const response = await api.get('/api/users/')
    expect(response.status).toBe(200)
    for(var i=0;i<response.body.length;i++){
      expect(usersWithoutPassword).toContainEqual(response.body[i])
    }

  })

  test("test that POST method adds new user",async()=>{
    const testUser = {
      "username":"Testi3",
      "name":"Testi testi",
      "adult":true,
      "password":"5555"
      }
    const expectedResponse = {
      "username":"Testi3",
      "name":"Testi testi",
      "adult":true,
      "blogs":[]
      }
    const response = await api.post('/api/users/').send(testUser)
    expect(response.status).toBe(201)
    delete response.body._id 
    expect(response.body).toEqual(expectedResponse)

  })
  afterAll(() => {
    server.close()
  })
 
})
