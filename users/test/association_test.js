const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost=require('../src/blogPost');
const mongoose=require('mongoose');

describe('Associations',()=>{
	let joe, blogPost, comment;
	beforeEach((done)=>{
    joe = new User({name:"Joe"});
    blogPost=new BlogPost({title: "ruby is great",content:"hi there"});
    comment= new Comment({content:"this is a good saying"});
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.user = joe;
    
    Promise.all([joe.save(),blogPost.save(),comment.save()])
    	.then(()=>done());
	});
	it('saves a relation between a user and a blogpost',(done)=>{
  	User.findOne({name:'Joe'})
  	   .populate('blogPosts')
 		   .then((user)=>{
 		   	  assert(user.blogPosts[0].title==='ruby is great')
   				done();
 		   });
  });
  it('saves a full reationship graph',(done)=>{
  	User.findOne({name:'Joe'})
  	   .populate({
  	   	path: 'blogPosts',
  	   	populate: {
  	   		path: 'comments',
  	   		model: 'comment',
  	   		populate:{
  	   			path: 'user',
  	   			model: 'user'
  	   		}
  	   	}
  	   })
  	   .then((user)=>{
         assert(user.name==='Joe');
         assert(user.blogPosts[0].title==="ruby is great");
         assert(user.blogPosts[0].comments[0].content==="this is a good saying");
         assert(user.blogPosts[0].comments[0].user.name==='Joe');
         done();
  	   });
 		   
  });
});
