import bookedslot from './components/Doctor/bookedslot'
import Dashboard from './components/Doctor/Dashboard'
import login from './components/Doctor/login'
import register from './components/register'
import Home from './components/Home.vue'
import Calendar from './components/Doctor/Calendar.vue'
import {createRouter, createWebHistory} from 'vue-router'
const routes=[
{
name:'Dashboard',
component:Dashboard,
path:'/updatetime'
},
{
  name:'bookedslot',
  component:bookedslot,
  path:'/bookedslot'  
},
{
name:'login',
component:login,
path:'/login'
},

{
name:'Home',
component:Home,
path:'/'
},

{
name:'Calendar',
component:Calendar,
path:'/calendar'
},

{
  name:'sign-up',
  component:register,
  path:'/sign-up'
}

];
const router=createRouter({
history:createWebHistory(),
routes
});
export default router;