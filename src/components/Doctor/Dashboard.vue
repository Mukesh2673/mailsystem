<template>
<div>

<nav-header/>
<h4 style="text-align:center">Add Available Time </h4>   
Date:<input type="Date" @change="geteDate"/>
<select v-model="selected">
<option disabled value="">Slot</option>
<option>15</option>
<option>30</option>
</select>



Starting time<input type="time" @change="settimee"/>
<p>Ending Time {{endingtime}} </p>
Date:<span>{{Datee}}</span>
<table>
    <tr>
    <th>Date</th>
    <th>slot in Minutes</th>
    <th>start time</th>
    <th>Ending Time</th>
    <th>Action</th>
</tr>
<tr>
<td><span>{{Datee}}</span></td>
<td><span>{{selected}}</span></td>
<td><span>{{starttime}}</span></td>
<td><span>{{endingtime}}</span></td>
<td><span style="background-color:blue;color:white;">Book</span></td>


</tr>

</table>


</div>
</template>
<script>
import NavHeader from './Header.vue'

export default{
    name:'Dashboard',
    components:{
        NavHeader
    
    },
    data(){
        return{
        endingtime:'',
        selected:'',
        Datee:'',
        starttime:'',
        endtime:''

      }
    },
    
    methods:{
           geteDate(event){
               this.Datee=event.target.value
               console.log(Date);
           },
            settimee(event){
            var time=({event:event.target.value}).event;
     
            var date =new Date();
            var minutes=parseInt(time.slice(3));
            var hours=parseInt(time.slice(0,2));
            var ampm=hours >=12 ?'Pm':'Am';
            this.starttime=time+ampm;
            hours=hours%12;
            hours=hours?hours:12;
       
            console.log(hours);
           
             var slot=this.selected;
             if(slot==30)
             {
             minutes=minutes+30;
             }
             else{
                   minutes=minutes+15;
             }
            date.setHours(hours);           
            date.setMinutes(minutes);
            var endtime=date.toString();
            console.log("ending time"+endtime.slice(15,21)); 
            this.endingtime=endtime.slice(15,21)+ampm;

/*     fetch("http://localhost:3600",{
                method:"POST",
                headers:{ 'Content-Type': 'application/json'},
                body:JSON.stringify({event:event.target.value})
            }) */
          }
        }
    }

</script>
<style scope>
 th, td {
  border:1px solid black;
}
</style>