import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import derive from '../views/derive/Derive.vue'
import form from '../views/form/Form.vue'
import home_page from '../views/main/Main.vue'
import image_upload from '../views/image_upload/Image_upload.vue'
import label from '../views/label/Label.vue'
import look from '../views/look/Look.vue'
import out from '../views/out/Out.vue'
import publish_article from '../views/release/Release.vue'
import published from '../views/published/Published.vue'
import statistics from '../views/statistics/Statistics.vue'
import edit from '../views/edit/Edit.vue'



Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:'/main',        //主页
  },
  {
    path: '/home',
    name: 'home',
    component: Home,        //父组件
  },
  {
    path:'/derive',
    component:Home,
    children:[                //导出表格路由
      {
        path:"",
        name:"derive",
        component:derive,
        meta:{
          title:'导出表格'
        }
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
        component:edit,           //文章编辑路由
        meta:{
          title:'文章编辑'
        }
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
        component:form,         //分页表格路由
        meta:{
          title:'表格'
        }
      }
    ]
  },
  {
    path:'/main',
    component:Home,
    children:[
      {
        path:"",
        name:"home_page",          //首页路由
        component:home_page,
        meta:{
          title:'首页'
        }
      }
    ]
  },
  {
    path:'/image_upload',
    component:Home,
    children:[
      {
        path:"",
        name:"image_upload",         //图片上传路由
        component:image_upload,
        meta:{
          title:'图片上传'
        }
      }
    ]
  },
  {
    path:'/label',
    component:Home,
    children:[
      {
        path:"",                     //标签页路由
        name:"label",
        component:label,
        meta:{
          title:'标签页'
        }
      }
    ]
  },
  {
    path:'/logon',
    name:'logon',                                            //登录页路由
    component:()=>import('../views/logon/Logon.vue'),
    meta:{
      title:'登录'
    }
  },
  {
    path:'/look',
    component:Home,
    children:[
      {
        path:"",
        name:"look",                //查看页路由
        component:look,
        meta:{
          title:'查看文章'
        }
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
        component:out,            //退出登录页路由
        meta:{
          title:'退出'
        }
      }
    ]
  },
  {
    path:'/release',
    component:Home,
    children:[
      {
        path:"",
        name:"publish_article",                 //发表文章页路由
        component:publish_article,
        meta:{
          title:'发表文章'
        }
      }
    ]
  },
  {
    path:'/published',
    component:Home,
    children:[                           //已发表页路由
      {
        path:"",
        name:"published",
        component:published,
        meta:{
          title:'已发表'
        }
      }
    ]
  },
  {
    path:'/register',
    name:'register',
    component:()=>import('../views/register/Register.vue'),             //注册页路由
    meta:{
      title:'注册'
    }
  },
  {
    path:'/statistics',
    component:Home,
    children:[
      {
        path:"",
        name:"statistics",                     //统计页路由
        component:statistics,
        meta:{
          title:'统计'
        }
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
  document.title=to.meta.title
  let user=localStorage.getItem("user");
  if(to.path==="/logon" || to.path==="/register") {
    next();
  }else {
    user ? next() :next("/logon");
  }
});

export default router
