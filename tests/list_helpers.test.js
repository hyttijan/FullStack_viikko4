const listHelper = require('../utils/list_helpers')


  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    }  
  ]
  const emptyBlogs = []

test('dummy is called', () => {
  const dummyBlogs = []

  const result = listHelper.dummy(dummyBlogs)
  expect(result).toBe(1)
})

describe('total likes', () => {


  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('when list has many blogs likes equal sum of all the likes in blogs',() =>{
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
  test('when list is empty likes equal zero',() =>{
    const result = listHelper.totalLikes(emptyBlogs)
    expect(result).toBe(0)
  })

})

describe("favorite blog",()=>{

  test('when list has only one blog it is the favorite blog',()=>{
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })
  test('when list has many blogs favorite blog is the blog with most likes',()=>{
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
  test('when list is empty return undefined',()=>{
    const result = listHelper.favoriteBlog(emptyBlogs)
    expect(result).toEqual(undefined)
  })

})

describe("most blogs",()=>{

  test('when list has only one blog, the author with the most blogs is the only author and amount of blogs is one',()=>{
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({author: 'Edsger W. Dijkstra',blogs:1})
  })
  
  test('when list has many blogs return author which has most blogs in the list and amount of blogs',()=>{
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({author:'Robert C. Martin',blogs:3})
  })

  test('when list is empty return undefined',()=>{
    const result = listHelper.mostBlogs(emptyBlogs)
    expect(result).toEqual(undefined)
  })

  
})

describe("most likes",()=>{

  test('when list has only one blog, the author with the most likes is the only author and amount of likes is same as likes of the blog',()=>{
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({author: 'Edsger W. Dijkstra',likes:5})
  })
  
  test('when list has many blogs return author which has most likes in his/her blogs and the amount of likes',()=>{
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({author:'Edsger W. Dijkstra',likes:17})
  })

  test('when list is empty return undefined',()=>{
    const result = listHelper.mostLikes(emptyBlogs)
    expect(result).toEqual(undefined)
  })


})
module.exports = blogs