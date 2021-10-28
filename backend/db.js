var MongoClient = require('mongodb').MongoClient
var bcrypt=require('bcrypt');
MongoClient.connect('mongodb://localhost:27017/patients', function (err, client) {
  if (err) throw err

  var db = client.db('patients1')

exports.createcol=function(){
  console.log("connected");
}
/*------------------------------ create collection in mongodb ---------------

db.createCollection("SlotManagement",function(err,result){
  if(err) throw err;
  console.log("collection is Created");
  db.close();  
});

----------------------------------------------------------------------------*/























exports.insertuser=function(insobj){
//var data={name:"Mukesh2",email:"abc@12314", pass:"12345"};



db.collection("patients").insertOne(insobj,function(err,res){
  if(err) 
  {
    throw err
  }
  else{
 
  }
})

}

exports.insertslot=function(slotobj){
db.collection("SlotManagement").insertOne(slotobj,function(err,res){
  if(err) 
  {
    throw err
  }

  })
}

/* ------------get all  slot-------------------------- */

exports.allslot=function(slotobj){
db.collection("SlotManagement").find().toArray(function(err,result){
if(err){
  throw err;
}
else
{
  //console.log(result);
  slotobj.send(result);
 // slotobj.send(result);
}

})
}
/* ---------------------delete slot-------------------------- */
exports.deleteslot=function(slotid,res)
{



console.log(slotid._id)
  console.log('ObjectId("'+slotid._id+'")');
db.collection("SlotManagement").deleteMany(slotid,function(err,obj){
  if (err) throw err;
  console.log("1 document deleted");
});
}








exports.user_signin=function(uobj,pass,outp){
db.collection("patients").find(uobj).toArray(function(err,result){
if(err){
  throw err;
}
else{
   if(result.length>0){
    bcrypt.compare(pass,result[0].password,function(err,result2){
      if(result2==true){
      
       // outp.json({result});
        //outp.json({"msg":"Login Successfull"});
        //outp.setHeader('Content-Type', 'application/json');
        //outp.send("result",result);
        outp.send(result)
        

      }
      else{
    /*     outp.json({"msg":"incorrect Password"}); */
          outp.json(1);
      }



    });
}
  else{
 /*    outp.json({"msg":"USER NOT FOUND"}); */
      outp.json(2);
} 
}


});




}






/* db.createCollection("patients",function(err,res){
  if(err){
    throw err;
  }
  else{
    console.log("user created");
  }
}); */




});