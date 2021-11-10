<template>
 <div id="app">
        <h1> Login</h1>
       
            <div class="login">
                 <form @submit.prevent="login">
             <input type="text" v-model="Name" placeholder="Enter Name" />
             <input type="text" v-model="userName" placeholder="user Name"/>       
            <input type="text" v-model="email" placeholder="Enter Email" />
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
import axios from 'axios'
export default {
    name:'Login',
    data()
    {
        return {
            email:'',
            password:'',
            resdata:''
        };
    },
    methods:
    {
            async login(){

            var fd={'email':this.email,'password':this.password}
            await axios.post('http://localhost:1000/user/ins', fd, {
          }).then((res) => {
            console.log(res)
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
