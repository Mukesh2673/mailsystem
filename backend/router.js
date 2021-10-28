const express=require("express")
const app=express()
const bcrypt=require('bcrypt');
var cors=require('cors');
app.use(cors());
db=require('./db');
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
    //console.log(req.body);

    db.insertslot(req.body,res);
    res.send('get data');
})

router.get('/allslot',(req,res)=>{

    //db.insertslot(req.body,res);
    db.allslot(res);
})
/* -------------------------------------delete Available slot------------------ */
router.delete('/deleteslot',(req,res)=>{
   var slotid=req.body

  db.deleteslot(slotid,res);
})










module.exports=router;
