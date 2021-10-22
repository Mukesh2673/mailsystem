<template>
    <div class="nav">
    <router-link to="/bookedslot">Home</router-link>
    <router-link to="/">UpdateTime</router-link>
    <router-link to="/bookedslot">booked slot</router-link>
    <a v-on:click="logout">Logout</a>
</div>
</template>
<script>
export default{
    name:'header',
    methods:{
        logout(){
            console.log('hi');
            localStorage.clear();
            this.$router.push({name:'bookedslot'})
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
.nav a{
color:white;
float:left;
padding: 10px;
font-weight: 500;
text-decoration: none;
}
.nav a:hover{
    background:#ddd;
    color:#333
}
</style>