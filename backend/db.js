var MongoClient = require('mongodb').MongoClient
var bcrypt=require('bcrypt');
MongoClient.connect('mongodb://localhost:27017/patients', function (err, client) {
  if (err) throw err

  var db = client.db('patients1')

exports.createcol=function(){
  console.log("connected");
}
exports.insertuser=function(insobj){
//var data={name:"Mukesh2",email:"abc@12314", pass:"12345"};



db.collection("patients").insertOne(insobj,function(err,res){
  if(err) 
  {
    throw err
  }
  else{
    console.log("data inserted");
  }
})

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
        outp.json({"msg":"Login Successfull"});
      }
      else{
        outp.json({"msg":"incorrect Password"});
      }



    });
}
  else{
    outp.json({"msg":"USER NOT FOUND"});
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