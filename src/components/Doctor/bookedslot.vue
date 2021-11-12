<template>
  <div>
    <nav-header />
        <button  id="set" @click="availableslot()">Appointment</button><br>

    <h4 style="text-align: center">{{ name1 }}</h4>

    <h4 style="text-align: center">Get Doctor Appointment Time</h4>
    
    <!--------------------------------------------all calender events----------------------------- -->

    <!-----------------------------------------Slot type------------------------------------------------- -->
   
    <!-------------------------------ADD NEW SLOT LIST------------------------------>

    
    <!-------------------------------ALL SLOT LIST-------------------------------------->
    <div id="booktable" v-if="current_slots.length!=''">
      <h3>All Availableslot</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Slot</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in current_slots" :key="index">
            <td>{{ user.Date }}</td>
            <td>{{ user.slot }}</td>
            <td>{{ user.starttime }}</td>
            <td>{{ user.endtime }}</td>

            <td><button @click="deleteda(index)">Book Now</button></td>
          </tr>
        </tbody>
      </table>
    </div>



       <div v-if="this.slottype!==''&&current_slots.length===0">
        <h4 style="color:red;text-align:center">Slot Not Available</h4>
 
        </div> 
 
  </div>
</template>
<script>
import NavHeader from "./Header.vue";
import axios from "axios";
export default {
  name: "Dashboard",
  components: {
    NavHeader,
  },

  data() {
    return {
      endingtime: "",
      selected: "",
      slotseleted: "",
      Datee: "",
      starttime: "",
      endtime: "",
      name1: "",
      slottype: "",
      allslote: "",
      c:'',
      userinfo:""
     
     
    };
  },

  methods: {
    accesspage: function () {
      let user = localStorage.getItem("user-info");
      var name=(JSON.parse(user).name);
      console.log(typeof name);
      if(name)
      {
        console.log("ok");
      }
      if (!user) {
        this.$router.push({ name: "login" });
        return;
      }
      this.name = JSON.parse(user).name;
      this.userinfo=JSON.parse(user)
      this.name1 = this.name;
    },
    /*---------------------------------------CODE TO GET TIME SLOT-------------------- */

    geteDate(event) {
      this.Datee = event.target.value;
    },
     //CODE TO GET DATE
    
    /*--------------------------------------------------------Send Data To Backend--------------------------- */

    async set() {
      var slot = {
        Date: this.Datee,
        slot: this.selected,
        starttime: this.starttime,
        endtime: this.endingtime,
        slottype: "available"
    
      };
      await axios
        .post("http://localhost:1100/user/availableslot", slot)
        .then((res) => {
          this.allslote = res.data;
          this.c = true;
        });
    },
    async allslot() {
      await axios.get("http://localhost:1100/user/allslot").then((res) => {
        this.allslote = res.data;

      
      });
    },
/*----------------------------------------------------------get Available slot from backend---------------------- */
  
     async availableslot() {
      await axios.get("http://localhost:1100/user/availableslot").then((res) => {
        this.allslote = res.data;
      });
    },








    async deleteda(message) {
      var bookid = { _id: this.allslote[message]._id };
      var data={id:bookid,name:this.userinfo}
      
      await axios.patch("http://localhost:1100/user/bookslot",{data})
        .then((res) => {
            if(res.status==200){
        
                this.allslote=res.data
            }
        });
    },

    onchangeslot: function () {
      var t = this.slottype;
      if (t == 1) {
        this.allslot();
        this.lastslote=this.lastslote+1;
     
        
      }
      
    },
  },
  /*---------------------------------Call function on page load-------------------------------------- */
  created: function () {
    this.accesspage();
  },
  computed:{
      current_slots(){
  
          return this.allslote
        
        },
       last_slots(){
            console.log(this.allslote.length);
              var test=this.allslote.length;
              console.log(test+1);
              return test+1;
       } 

    },

               

  }

</script>

<style scope>
th,
td {
  border: 1px solid black;
}
#set {
  background: blue;
  color: white;
  height: 28px;
  float:right;
  margin-top:0px;
  width: 90px;
  border: 1px soild black;
   border-radius: 12px;
   border-color:blue;
}
#set:hover{
  background: green;
  width: 120px;
  height:35px;
  cursor:pointer;
   border-radius: 14px;
   border-color:green;
}
form {
  margin-left: 20%;
}
#booktable {
  margin-left: 50px;
  margin-top: 40px;
}
#booktable button {
  background: green;
  color: white;
  border: green;
  cursor: pointer;
  border-radius: 12px;
}
#booktable button:hover{
  height: 40px;
  width: 90px;
}
#booktable table {
  text-align: center;
  border-collapse: collapse;
}

#booktable th,
td {
  padding-top: 12px;
  padding-bottom: 12px;
  width: 124px;
}
#checkslot {
  margin-top: -25px;
  margin-left: 50px;
}
</style>