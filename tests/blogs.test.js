const supertest = require('supertest')
const {app,server} = require('../index.js')
const api = supertest(app)
describe("test blogs API",()=>{
  test('test GET method for all blogs',async ()=>{
  	await api.get("/api/blogs/").expect(200).expect('Content-type',/application\/json/)
  })
  afterAll(() => {
    server.close()
  })
})
