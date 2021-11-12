<template>
 <div id="app">
<nav-header/>
       
            <div class="login">
                        <h1> Register</h1>
                 <form @submit.prevent="login">
            <input type="text" v-model="name" placeholder="Name" />          
            <input type="text" v-model="email" placeholder="Email" />
            <input type="text" v-model="phone" placeholder="Mobile Number" />
            <input type="text" v-model="username" placeholder="user Name"/>         

            <input type="text" v-model="password" placeholder="Enter Password"/>
            <button type="submit">Register</button>
            </form>
            <p>
                <router-link to="/login">Login</router-link>
            </p>
            </div>



        </div>



</template>
<script>
import NavHeader from './Doctor/Header.vue'
import axios from 'axios'
export default {
    name:'Login',
    data()
    {
        return {

            name:'',
            email:'',
            phone:'',
            username:'',
            password:'',
            resdata:'',
           
        };
    },
components:{
NavHeader
},
    
    methods:
    {
            /* async login(){

            var fd={'email':this.email,'password':this.password}
            await axios.post('http://localhost:1000/user/ins', fd, {
          }).then((res) => {
            console.log(res)
          }) */


 async login(){

            var fd={'name':this.name,'email':this.email,'password':this.password,'phone':this.phone,'username':this.username}
            await axios.post('http://localhost:1100/user/signup', fd, {
          }).then((res) => {
            console.log(res.data);

           this.name='';
           this.email='';
           this.phone='';
           this.username='';
           this.password='';
           this.resdata='';

          })








   
         /* 
         var res =await fetch("http://localhost:1000/signin/data",{
                method:'POST',
                body:fd
                });
                var rese=await res.json();
                console.log(rese);
                } */
    }
    }
}
</script>
<style scoped>
.login{
    margin-left: auto;
    margin-right:50%;
    margin-left:50%;
    background: black;
}
.login input{
margin-bottom: 20px;

}

</style>
