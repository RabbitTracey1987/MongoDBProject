const assert = require('assert');
const User = require('../src/user');

describe('Subdocument',()=>{
	it('can create a subdocument',(done)=>{
  	const joe = new User({
  		name:"Joe",
  		posts:[{title:'post1'}]
    });
  	joe.save()
     		.then(()=>User.findOne({name:'Joe'}))
     		.then((user)=>{
       			assert(user.posts[0].title==='post1');
       			done();
 				});
	});

	it('can add subdocument to an existing record',(done)=>{
		const joe = new User({
  		name:"Joe",
  		posts:[]
    });
  	joe.save()
     		.then(()=>User.findOne({name:'Joe'}))
     		.then((user)=>{
       			user.posts.push({title: 'New Post'});
       			return user.save();
 				})
 				.then(() => User.findOne({name:"Joe"}))
 				.then((user)=>{
          assert(user.posts[0].title==='New Post');
          done();
 				});
	});
	it('can remove an exiting subdocument',(done)=>{
		const joe = new User({
  		name:"Joe",
  		posts:[{title:'New Title'}]
    });
  	joe.save()
     		.then(()=>User.findOne({name:'Joe'}))
 				.then((user)=>{
          const post= user.posts[0];
          post.remove();
          return user.save();
 				})
 				.then(()=>User.findOne({name:'Joe'}))
 				.then((user)=>{
 					assert(user.posts.length ==0);
 					done();
 				})
	});
});