const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose =require('mongoose');
const Driver = mongoose.model('driver');

describe('Drivers controller',()=>{
   it('Post to /api/drivers creates a new driver',(done)=>{
      Driver.count().then(count=>{
      	request(app)
   			.post('/api/drivers')
   			.send({email: 'test@test.com'})
   			.end(() =>{
   				  Driver.count().then(newCount=>{
   				  	assert(count+1 === newCount);
   				  	done();
   				  });			
   			});
      });
   		
   });
   it('Put to /api/drivers/id edits a new driver',(done)=>{
      const driver = new Driver({email:'t@t.com',driving:false});
      driver.save().then(()=>{

         request(app)
               .put('/api/drivers/'+driver._id)
               .send({driving:true})
               .end(()=>{

                  Driver.findOne({email:'t@t.com'})
                        .then(driver=>{
                           assert(driver.driving === true);
                           done();
                        });
               });


      });
   });
   // it('Delete to /api/drivers/id delete a driver',(done)=>{
   //    const driver = new Driver({email:'t@t.com',driving:false});
   //    driver.save().then(()=>{

   //       request(app)
   //             .delete('/api/drivers/${driver._id}')
   //             .end(()=>{

   //                Driver.findOne({email:'t@t.com'})
   //                      .then(driver=>{
   //                         assert(driver ===null);
   //                         done();
   //                      });
   //             });

   //    });
   // });

   it('Get to /api/drivers find drivers in a location',(done)=>{
      const seattleDriver = new Driver({
         email: 'seattle@test.com',
         geometry: {type: 'Point',coordinates:[-122.47,47.614]}

      });
      const miamiDriver = new Driver({
         email: 'miami@test.com',
         geometry: {type: 'Point',coordinates:[-80.253,25.791]}

      });

      Promise.all([seattleDriver.save(),miamiDriver.save()])
            .then(()=>{
               request(app)
               .get('/api/drivers?lng=-80&lat=25')
               .end((err,response)=>{
                  assert(response.body.length===1);
                  assert(response.body[0].obj.email ==='miami@gmail.com');
                  done();
               });
            });
      
   });
});