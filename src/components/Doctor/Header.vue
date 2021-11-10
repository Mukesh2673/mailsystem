<template>
    <div class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/updatetime">Book Slot</router-link>
    <router-link to="/bookedslot">booked slot</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/calendar">Calendar</router-link>


    <a v-on:click="logout" id="logout">Logout</a>
</div>
</template>
<script>
export default{
    name:'nav-header',
    methods:{
        logout(){
            console.log('loggedin');
            localStorage.clear();
          this.$router.push({name:'login'});
        }
    }

}
</script>

<style scope>
.nav {
    background-color:#333; 
    float:left;
    width: 100%;

   
}
a{
    color: black;
    text-decoration: none;
}
.nav a{
color:white;

float:left;
padding: 10px;
font-weight: 500;
text-decoration: none;
cursor: pointer;
}
.nav a:hover{
    background:#ddd;
    color:white;

}
#logout{
    color:white;
    float:right;
    margin-left:810px;
}
</style>