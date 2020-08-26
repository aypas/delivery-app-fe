import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },

  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SignIn.vue')
  },

  {
    path: '/sign-up',
    name: 'signup',
    component: () => import('../views/SignUp.vue')
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/node',
    name: 'node',
    component: () => import('../views/Node.vue')
  },

  {
    path: '/node1',
    name: 'node1',
    component: () => import('../views/Node1.vue')
  },

  {
    path: '/partners',
    name: 'partners',
    component: () => import('../views/Partners.vue')
  },

  {
    path: '/callback',
    name: 'callback',
    component: () => import('../views/redirect.vue')
  },

  {
    path: '/shitfuck',
    name: 'shitfuck',
    component: () => import('../views/ShitFuck.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});


//i cant access reactive vuex in here
//so i have to get data via localstorage
//but on login it doesnt load fast enough...
router.beforeEach((to, from, next) => {

  let auth = JSON.parse(localStorage.getItem('state'));
  console.log(auth, 'popop')
  if (auth == null && !["signin", "about", "home", "signup", 'shitfuck'].includes(to.name)) {
    console.log('sdfsdf44')
    next('/signin');
  } else if ( !(auth==null) && to.name=="signin") {
    console.log(from, "naaaam")
    next('/dashboard');
  } else if ( ["node", "callback", "partners"].includes(to.name) && (!auth.authUser.is_node_owner || !auth.authUser.is_manager) ) {
    next('/dashboard');
  }
  next();
});

export default router;
