const assert = require('assert')
const User = require('../src/user')
describe("reading users out of the database", ()=>{
	let joe,may,alex,zach;
	beforeEach((done)=>{
    joe = new User({name:"Joe"});
    may = new User({name:"May"});
    alex = new User({name:"Alex"});
    zach = new User({name:"Zach"});
    Promise.all([joe.save(),alex.save(),may.save(),zach.save()])
       .then(()=>done());
	});
  it('find all users with a name of joe',(done)=>{
    User.find({name:'Joe'})
    	.then((users)=>{
      	assert(users[0]._id.toString()===joe.id.toString());
      	done();
    	});    
  });
  it('find a user with a particular id',(done)=>{
  	User.findOne({_id: joe.id})
  		.then((user)=>{
  			assert(user.name === "Joe");
  			done();
  		});
  });
  it('can skip and limit the result set',(done)=>{
    //Joe May Alex Zach
    User.find({})
        .sort({name: 1})
        .skip(1)
        .limit(2)
        .then((users)=>{
          assert(users.length===2);
          assert(users[0].name === "Jay");
          assert(users[1].name === "May");
          done();
        });
  });
});