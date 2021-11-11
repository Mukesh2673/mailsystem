<template>
 <div id="app">
<nav-header/>
       
            <div class="login">
                        <h1> Login</h1>
                 <form @submit.prevent="login">
            <input type="text" v-model="username" placeholder="username" />
            <input type="text" v-model="password" placeholder="Enter Password"/>
            <button type="submit">Login</button>
            </form>
            <p>
                <router-link to="/sign-up">Signup</router-link>
            </p>
            </div>
        </div>



</template>
<script>
import NavHeader from './Header.vue'
import axios from 'axios'
import router from 'vue-router'
 export default {
    name:'Login',
    data()
    {

        return {
            username:'',
            password:'',
            store:null,
            sts:'fd'

       
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

            var fd={'username':this.username,'password':this.password}
           await axios.post('http://localhost:1100/user/signin', fd, {
          }).then((res) => {
                 this.store=res.data;
            

      
         });


if((this.store)>0)
            {



                    if((this.store)=='1')
                    {
                    alert("incorrect password");
                    }
                    if(((this.store)=='2'))
                    {
                    alert("User Not Found") 
                    }
            }

else{











      if((this.store[0].email.length)>0);
      {
      localStorage.setItem("user-info",JSON.stringify(this.store[0]))
       if((this.store[0].email.length && this.store[0].password.length)>0)
           this.$router.push({name:'Dashboard'})
        else
         alert('Incorrect user Name and password');
      }


}

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
a{
    cursor: pointer;
}

</style>
