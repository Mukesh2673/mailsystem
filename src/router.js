import bookedslot from './components/Doctor/bookedslot'
import Dashboard from './components/Doctor/Dashboard'
import {createRouter, createWebHistory} from 'vue-router'
const routes=[
{
name:'Dashboard',
component:Dashboard,
path:'/'
},
{
  name:'bookedslot',
  component:bookedslot,
  path:'/bookedslot'  
}
];
const router=createRouter({
history:createWebHistory(),
routes
});
export default router;