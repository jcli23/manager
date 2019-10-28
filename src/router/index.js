import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import derive from '../views/derive/Derive.vue'
import form from '../views/form/Form.vue'
import home_page from '../views/home_page/Home_page.vue'
import image_upload from '../views/image_upload/Image_upload.vue'
import label from '../views/label/Label.vue'
// import logon from '../views/logon/Logon.vue'
import look from '../views/look/Look.vue'
import out from '../views/out/Out.vue'
import publish_article from '../views/publish_article/Publish_article.vue'
import published from '../views/published/Published.vue'
// import register from '../views/register/Register.vue'
import statistics from '../views/statistics/Statistics.vue'
import edit from '../views/edit/Edit.vue'



Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:'/home_page'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path:'/derive',
    component:Home,
    children:[
      {
        path:"",
        name:"derive",
        component:derive
      }
    ]
  },
  {
    path:'/edit',
    component:Home,
    children:[
      {
        path:"",
        name:"edit",
        component:edit
      }
    ]
  },
  {
    path:'/form',
    component:Home,
    children:[
      {
        path:"",
        name:"form",
        component:form
      }
    ]
  },
  {
    path:'/home_page',
    component:Home,
    children:[
      {
        path:"",
        name:"home_page",
        component:home_page
      }
    ]
  },
  {
    path:'/image_upload',
    component:Home,
    children:[
      {
        path:"",
        name:"image_upload",
        component:image_upload
      }
    ]
  },
  {
    path:'/label',
    component:Home,
    children:[
      {
        path:"",
        name:"label",
        component:label
      }
    ]
  },
  {
    path:'/logon',
    name:'logon',
    component:()=>import('../views/logon/Logon.vue'),
  },
  {
    path:'/look',
    component:Home,
    children:[
      {
        path:"",
        name:"look",
        component:look
      }
    ]
  },
  {
    path:'/out',
    component:Home,
    children:[
      {
        path:"",
        name:"out",
        component:out
      }
    ]
  },
  {
    path:'/publish_article',
    component:Home,
    children:[
      {
        path:"",
        name:"publish_article",
        component:publish_article
      }
    ]
  },
  {
    path:'/published',
    component:Home,
    children:[
      {
        path:"",
        name:"published",
        component:published
      }
    ]
  },
  {
    path:'/register',
    name:'register',
    component:()=>import('../views/register/Register.vue'),
  },
  {
    path:'/statistics',
    component:Home,
    children:[
      {
        path:"",
        name:"statistics",
        component:statistics
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  let user=localStorage.getItem("user");
  if(to.path==="/logon" || to.path==="/register") {
    next();
  }else {
    user ? next() :next("/logon");
  }
});

export default router
