<template>
  <div>
    <nav-header />
    <h4 style="text-align: center">{{ name1 }}</h4>
    <h4 style="text-align: center">Add Available Time</h4>
    <!--------------------------------------------all calender events----------------------------- -->
    <form @submit.prevent="set">
      Date:<input type="Date" @change="geteDate" required />&nbsp;
      <select v-model="selected" required>
        <option disabled value="">Slot</option>
        <option>15</option>
        <option>30</option></select
      >&nbsp;&nbsp; Time&nbsp;<input type="time" @change="settimee" required />
      <button type="submit" id="set">Create Slot</button>
    </form>
    <!-----------------------------------------Slot type------------------------------------------------- -->
    <div id="checkslot">
      <select v-model="slottype" @change="onchangeslot()">
        <option disabled value="">Check Slot</option>
        <option value="1">ALL</option> 
        <option value="2">Available</option>
        <option value="3">BooKed</option>
       ≈
      </select>
    </div>
    <!-------------------------------ADD NEW SLOT LIST------------------------------>

    <div id="slottable" v-if="this.c == true &&current_slots.length>0">
     <h1> New Added</h1>
      <table>
        <tr>
          <th>Date</th>
          <th>Slot</th>
          <th>Start</th>
          <th>Ending</th>
      
        </tr>
        <tr>
          <td>
            <span>{{ Datee }}</span>
          </td>
          <td>
            <span>{{ selected }}Min</span>
          </td>
          <td>
            <span>{{ starttime }}</span>
          </td>
          <td>
            <span>{{ endingtime }}</span>
          </td>
      
        </tr>
      </table>
    </div>

    <!-------------------------------ALL SLOT LIST-------------------------------------->
    <div id="slottable" v-if="current_slots.length!=''">
      <h3>All Availableslot</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Slot</th>
            <th>Start</th>
            <th>End</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in current_slots" :key="index">
            <td>{{ user.Date }}</td>
            <td>{{ user.slot }}</td>
            <td>{{ user.starttime }}</td>
            <td>{{ user.endtime }}</td>

            <td><button @click="deleteda(index)">Delete</button></td>
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
      lastslote:1
     
     
    };
  },

  methods: {
    accesspage: function () {
      let user = localStorage.getItem("user-info");
      if (!user) {
        this.$router.push({ name: "login" });
        return;
      }
      this.name = JSON.parse(user).name;
      this.name1 = this.name;
    },
    /*---------------------------------------CODE TO GET TIME SLOT-------------------- */

    geteDate(event) {
      this.Datee = event.target.value;
    }, //CODE TO GET DATE
    settimee(event) {
      var time = { event: event.target.value }.event;
      var date = new Date();
      var minutes = parseInt(time.slice(3));
      var hours = parseInt(time.slice(0, 2));
      var ampm = hours >= 12 ? "Pm" : "Am";
      var hours1 = hours;
      if (hours > 12) hours = hours % 12;
      if (hours < 1) hours = 12;
      date.setHours(hours);
      date.setMinutes(minutes);
      var starttime = date.toString();
      this.starttime = starttime.slice(15, 21) + ampm;
      var slot = this.selected;
      if (slot == 30) {
        minutes = minutes + 30;
      } else {
        minutes = minutes + 15;
      }
      date.setMinutes(minutes);
      hours = date.toString().slice(15, 18);
      if (hours1 > 12 && hours1 > 1) {
        ampm = "PM";
      } else if (hours1 == 0) {
        ampm = "PM";
      } else if (hours1 == 12) {
        ampm = "AM";
      } else {
        ampm = "AM";
      }
      if (hours > 12) hours = hours % 12;
      if (hours < 1) hours = 12;
      date.setHours(hours);
      this.endingtime = date.toString().slice(15, 21) + ampm;
    },

    /*--------------------------------------------------------Send Data To Backend--------------------------- */


/* -------------------------------------------------------Send Time to Backend------------------------------ */

    async set() {
      var slot = {
      
      color:"red",
        start: "2021-11-05T07:00:00",
        end: "2021-11-05T10:38:00",
        title: "available",
        allDay:false
    
      };
      await axios
        .post("http://localhost:1100/user/availableslot", slot)
        .then((res) => {
          this.allslote = res.data;
          this.c = true;
        });
    },

/*-------------------------------------------------------get All slot From Backend---------------------------- */


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
/*-------------------------------------------------------------get booked slot from backend-------------------------*/    
  
  async bookedslot() {
      await axios.get("http://localhost:1100/user/bookedslot").then((res) => {
        this.allslote = res.data;
      });
    },
  
/* ------------------------------------------------------------delete Slot from backend --------------------------------------------------------- */  
  
  
  
  
  async deleteda(message) {
      var id = { _id: this.allslote[message]._id };
      await axios
        .delete("http://localhost:1100/user/deleteslot", { data: id })
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
      else if(t ==2)
      {
        this.availableslot();
        
      }
           
      else if(t ==3)
      {
        this.bookedslot();
   
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
  margin-left: 10px;
  width: 90px;
  border: 1px soild black;
}
form {
  margin-left: 20%;
}
#slottable {
  margin-left: 50px;
  margin-top: 40px;
}
#slottable button {
  background: red;
  color: white;
  border: red;
  cursor: pointer;
}
#slottable table {
  text-align: center;
  border-collapse: collapse;
}

#slottable th,
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