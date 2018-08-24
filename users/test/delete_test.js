const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user',()=>{
	let joe;

  beforeEach((done)=>{
  	joe=new User({name: 'Joe'});
  	joe.save()
  	   .then(()=>done());
  });
  it('model instance remove',(done)=>{
 		joe.remove()
 		   .then(()=>User.findOne({name:'Joe'}))
 		   .then((user)=>{
   				assert(user === null);
   				done();
 		   });
  });
  it('class method remove',()=>{
  	//remove a bunch of revords with some give criteria
  	User.remove({name:'Joe'})
  	   .then(()=>User.findOne({name:'Joe'}))
 		   .then((user)=>{
   				assert(user === null);
   				done();
 		   });

  });
  it('class method findAndRemove',()=>{
  	User.findOneAndRemove({name:'Joe'})
  	   .then(()=>User.findOne({name:'Joe'}))
 		   .then((user)=>{
   				assert(user === null);
   				done();
 		   });

  });
  it('class method findByIdAndRemove',()=>{
  	User.findByIdAndRemove(joe.id)
  	   .then(()=>User.findOne({name:'Joe'}))
 		   .then((user)=>{
   				assert(user === null);
   				done();
 		   });

  });
});