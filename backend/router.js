const express=require("express")
const app=express()
const bcrypt=require('bcrypt');
var cors=require('cors');
app.use(cors());
db=require('./db');
var Objectid = require('mongodb').ObjectID;
var router=express.Router();
/* router.get('/getapi',(req,res)=>{
    res.send("user get api");
})
router.post('/ins',(req,res)=>{
    db.insertuser(req.body);
    console.log("email: "+req);
    res.json({"status":"inserted successfull"});
})
 */
router.post('/signup',async(req,res)=>{
//console.log(req.body.name);
const salt=await bcrypt.genSalt(10);
const bpass=await bcrypt.hash(req.body.password,salt);
var patientdata={
    name:req.body.name,
    email:req.body.email,
    password:bpass,
    phone:req.body.phone,
    username:req.body.username
}
db.insertuser(patientdata);
res.send(patientdata);

})

router.post('/signin',(req,res)=>{
    var loginobj={
        username:req.body.username
    };



db.user_signin(loginobj,req.body.password,res);
});


/* ----------------------------insert Available slot------------------- */
router.post('/availableslot',(req,res)=>{

   var starttime=req.body.start;
   var endtime=req.body.end;
   var slot=req.body.slot;
   
 starttimehours=parseInt(starttime.slice(0,2));

starttimeminute=parseInt(starttime.slice(3,5));

sm=starttimehours*60+starttimeminute


endtimehours=parseInt(endtime.slice(0,2));

endtimeminute=parseInt(endtime.slice(3,5));
em=endtimehours*60+endtimeminute

totalminutes=em-sm

loop=Math.trunc(totalminutes/slot)


for(var i=1;i<=loop;i++)
{
  
 var m1=starttimeminute+i*slot;


 if(m1>60)
 {
    starttimehours=starttimehours+1;
m1=m1%60
console.log(m1)

var k=parseInt(slot);




if(m1==0)
{
    m1='00'
}
else if(m1<10)
{
    m1='0'+m1
}



}

console.log(starttimehours+':'+m1);

 




}



/* date.setMinutes(23)
var a=[]
for(var i=1;i<8;i++)
{
    var m1=i*15;
    date.setMinutes(m1)
    a.push(date.toString().slice(16,21));
    //console.log( date.toString().slice(16,21))
  
}
for(var i=0;i<=a.length-2;i++)
{
    console.log(a[i]+'-'+a[i+1]);
}
 */
    // db.insertslot(req.body,res);
 
})
/* ----------------------------get All slot------------------- */
router.get('/allslot',(req,res)=>{


    db.allslot(res);
})
/* ----------------------------get Available slot------------------- */
router.get('/availableslot',(req,res)=>{


    db.availableslot(res);
})
/* ----------------------------get booked slot------------------- */
router.get('/bookedslot',(req,res)=>{


    db.bookedslot(res);
})








/* -------------------------------------delete Available slot------------------ */
router.delete('/deleteslot',(req,res)=>{
var slotid=req.body._id

var slotid={
    "_id": Objectid(slotid)
}
  db.deleteslot(slotid,res);
})

/* ----------------------------------------------Book Data--------------------------- */
router.patch('/bookslot',(req,res)=>{
    var slotid=req.body.data
    var bookedid=Objectid(slotid.id._id);
    var userdetails=slotid.name;
      db.bookslot(bookedid,userdetails,res);
    })






module.exports=router;
