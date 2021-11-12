
<script>
import NavHeader from "./Header.vue";
import axios from "axios";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import bootstrapPlugin from "@fullcalendar/bootstrap";

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    NavHeader,
  },
  data() {
    return {
      showToggle: "none",
      showToggle2:"none",
      showTogglebook:"none",
      starttime: "",
      allslote: "",
      selectedate:"",
      endtime:"",
      selected:"15",
      id:"",
      usertype:"",
      userinfo:"",
   
     

      calendarOptions: {
        plugins: [
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          listPlugin,
          bootstrapPlugin,
        ],
        initialView: "timeGrid",
        headerToolbar: {
          left: "prev,next,today",
          center: "title",
          right: "dayGridMonth,timeGridDay,timeGridWeek,listWeek",
        },
        scrollTime:'00:00:00',

        dateClick: this.handleDateClick,
        eventClick: this.handleeventClick,
        events: [],
        eventTextColor: "white",
        dayMaxEvents: true,
        views: {
          dayGridMonth: {
            dayMaxEventRows: 5, // adjust to 6 only for timeGridWeek/timeGridDay
          },
        },
        
      },
    };
  },
  methods: {

/* ------------------accesspage-------------------- */


      accesspage: function (){
      let user = localStorage.getItem("user-info");
      var name=(JSON.parse(user));
      this.userinfo=name
      if(name.type=='doctor')
      {
      this.usertype=name.type
      
      }
 
      if (!user) {
        this.$router.push({ name: "login" });
        return;
      }
      this.name = JSON.parse(user).name;
      this.userinfo=JSON.parse(user)
      this.name1 = this.name;
    },






    handleDateClick: function (arg) {
        this.starttime=arg.dateStr.slice(11,16);
  
        var hours=parseInt(this.starttime.slice(0,2));
        var minute=parseInt(this.starttime.slice(3,5));
        var date = new Date();
        date.setHours(hours);
        minute = minute + 15;
        date.setMinutes(minute);
        this.endtime = date.toString().slice(16, 21);
    

  
  
/* -----------------------CODE TO CALCULATE SLOTS------------------ */
        
      if(arg.dateStr.length>10)
      {
        this.selectedate=arg.dateStr.slice(0,10)

      }
      else if(arg.dateStr.length==10)
      {
          this.selectedate=arg.dateStr
      }

if(this.usertype=='doctor')
{
this.showToggle2 = "block";

 }     
},
    handleeventClick: function (info) {
      this.id=info.event.extendedProps._id;
      this.starttime=info.event.start;
      this.endtime=info.event.end;
     




    if(this.usertype=='doctor')
    {
      this.showToggle = "block";
    }
    else
    {
    this.showTogglebook = "block";
    } 
},
     getstarttime(event) {
      this.starttime = event.target.value;

    },
getendtime(event){
   this.endtime = event.target.value;
      
},




    async allslot() {
      await axios.get("http://localhost:1100/user/allslot").then((res) => {
        this.calendarOptions.events.push(...res.data)
      });
    },
    
  async deleteevent(){

      var id =  { _id: this.id }
    

    this.showToggle='none';

      await axios.delete("http://localhost:1100/user/deleteslot", { data: id })
        .then((res) => {
     
            if(res.status==200){
        
                this.allslote=res.data
                 this.calendarOptions.events=res.data
                
            } 
        });
    },
 







 async sendeventt(){
      var slot = {
      
      color:"red",
        start: this.starttime,
        end:this.endtime,
        title: "available",
       slot:this.selected,
       date:this.selectedate
    };
      await axios
        .post("http://localhost:1100/user/availableslot", slot)
        .then((res) => {
          this.allslote = res.data;
          this.c = true;
          console.log(res,"jaklsjdlkjaskdjlks")
          if(res.status==200)
          {
           //updating events
           this.calendarOptions.events=res.data
           this.showToggle2 = "none";
      


          }
        }); 
    },



      async bookslot() {
       var sid =  { _id: this.id }
       console.log(this.starttime);
      var data={id:sid,uid:this.userinfo._id,start:this.starttime,end:this.endtime,email:this.userinfo.email}
      await axios.patch("http://localhost:1100/user/bookslot",{data})
        .then((res) => {
            if(res.status==200){
                 this.calendarOptions.events=res.data
                    this.showTogglebook = "none";
            } 
 

        }); 
    },
 





  },
  computed: {
    events2() {
      return [Object.assign({}, this.events3)];
    },
    datestring(){
  
      return this.selectedate
    },
    startime(){
        return this.starttime;
    },
entime(){
     
          return this.endtime;
    },
  

  },
  created: function () {
        this.accesspage();
    this.allslot();
  },
};
</script>
<template>
  <div class="container">
    <nav-header /><br />
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-10">
        <!-- Modal -->
        <div
          class="modal "
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          :style="{ display: showToggle  }"

        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header text-right">
               
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="showToggle = 'none'"
                  style="margin-left:90%; background-color:blue;border:none;color:white; width:80px"
                  
                >
                  <span aria-hidden="true" style="font-size:20px">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h5 class="modal-title w-100" id="exampleModalLabel">
                  Are You Sure Delete This Events
                  
                </h5>
              </div>
              <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="deleteevent">Yes</button>
                <button type="button" class="btn btn-primary" @click="showToggle = 'none'">No</button>
              </div>
            </div>
          </div>
        </div>

<!-- ----------------Model for book---------------------- -->

<div
          class="modal "
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          :style="{ display: showTogglebook  }"

        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header text-right">
               
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="showTogglebook = 'none'"
                  style="margin-left:90%; background-color:blue;border:none;color:white; width:80px"
                  
                >
                  <span aria-hidden="true" style="font-size:20px">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h5 class="modal-title w-100" id="exampleModalLabel">
                  Are You Sure Book This Slot
                  
                </h5>
              </div>
              <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="bookslot">Yes</button>
                <button type="button" class="btn btn-primary" @click="showTogglebook = 'none'">No</button>
              </div>
            </div>
          </div>
        </div>
<!-- ------------------------------------------------------------------------ -->
<!-- Modal to Add Events-->

<div :style="{ display: showToggle2 }">
<div class="modal fade show" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
 aria-labelledby="staticBackdropLabel" aria-hidden="true" style="display:block">
  <div class="modal-dialog modal-md mt-12">
    <div class="modal-content">
      <div class="modal-header  text-center">
        <h5 class="modal-title w-100" id="staticBackdropLabel">ADD Slot</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="showToggle2 = 'none'"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <form @submit.prevent="set">
             <div class="row">
                <div class="col-md-2">Date</div>
                <div class="col-md-10"><input type="date" @change="geteDate" required  style="width:150px" :value="datestring"></div>

              </div><br>

              <div class="row">
                <div class="col-md-2">Start</div>
                <div class="col-md-10"><input type="time" @change="getstarttime" required  style="width:150px" :value="startime"></div>
              </div><br>
              <div class="row">
                <div class="col-md-2">End</div>
                <div class="col-md-10"><input type="time" @change="getendtime" required style="width:150px" :value="entime"></div>
              </div><br>
             
         <div class="row">
                <div class="col-md-2">Slot</div>
                <div class="col-md-10">
         <select v-model="selected" required>
        <option disabled value="">Slot</option>
        <option selected>15</option>
        <option>30</option></select></div>
              </div>
  
      
      
      
      
   
      
    </form>




</div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"   @click="showToggle2 = 'none'">Close</button>
        <button type="button" class="btn btn-primary" @click="sendeventt"  >ADD</button>
      </div>
    </div>
  </div>
</div>
</div>







        <FullCalendar :options="calendarOptions" />
        
      </div>
    </div>











  </div>
</template>
<style scoped>
input {
  width: 450px;
}
</style>
