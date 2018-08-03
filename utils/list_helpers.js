const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs)=>{
  return blogs.reduce((totalLikes, blog)=>{return totalLikes+blog.likes},0)
}
const favoriteBlog = (blogs)=>{
	return blogs.length>0?blogs.reduce((favoriteBlog, blog)=>{return blog.likes>favoriteBlog.likes?blog:favoriteBlog},blogs[0]):undefined
}
const mostBlogs = (blogs)=>{
	blogs = blogs.reduce((blogs2, blog)=>{
	             blogs2[blog.author] = blogs2[blog.author]?blogs2[blog.author]:{author:blog.author,blogs:0}
                 blogs2[blog.author].blogs+=1
                 return blogs2
	            },{})
    return (
    Object.values(blogs)
    .reduce((mostBlogs,author)=>{
	       	  return author.blogs>mostBlogs.blogs?author:mostBlogs
	       	},Object.values(blogs)[0])
    )
}
const mostLikes = (blogs)=>{
  blogs = blogs.reduce((blogs2, blog)=>{
	             blogs2[blog.author] = blogs2[blog.author]?blogs2[blog.author]:{author:blog.author,likes:0}
                 blogs2[blog.author].likes+=blog.likes
                 return blogs2
	            },{})
  return (
    Object.values(blogs)
    .reduce((mostLikes,author)=>{
	       	  return author.likes>mostLikes.likes?author:mostLikes
	       	},Object.values(blogs)[0])
    )
}
module.exports = {
  dummy, totalLikes,favoriteBlog, mostBlogs,mostLikes
}