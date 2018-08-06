const supertest = require('supertest')
const {app,server} = require('../index.js')
const api = supertest(app)
const User = require("../models/user")

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
  beforeEach(async()=>{
    await User.remove({})
    const userObjects = users.map(user=> new User(user))
    await Promise.all(userObjects.map(user=>user.save()))
  })
  test("test that GET method returns all users",async()=>{
    const response = await api.get('/api/users')
    expect(response.status).toBe(200)
    for(var i=0;i<response.body.length;i++){
    	expect(usersWithoutPassword).toContainEqual(response.body[i])
    }

  })
  test("test that POST method succesfully adds new user",async()=>{
  	const testUser = {
  	"username":"Testi3",
	"name":"Testi testi",
	"adult":true,
	"password":"5555"
   }
   const expectedResponse = {
   	"_id": "5b677ce33ac3d225d5564375",
    "blogs": [],
    "username": "Testi",
    "name": "Testi testi",
    "adult": true,
    "__v": 0
   }
   const response = await api.post('/api/users',testUser)
   expect(response.status).toBe(201)
   expect(expectedResponse).toEqual(response.body)
  })
  afterAll(() => {
    server.close()
  })
 
})