import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

//重复点击问题
VueRouter.prototype.push = function push(localtion) {
  return originalPush.call(this, localtion).catch(err => err)
}

const routes = [
  {
    path: '/',  //重定向到登录页面
    redirect: '/login'

  },
  {
    path: '/login',
    component: () => import('../views/login/login'),
  },
  {
    path: '/home',
    component: () => import('../views/home/layout'),
    children: [
      {
        path: '/',  //重定向到首页
        redirect: 'home'
      }, {
        path: 'home',
        component: () => import('../views/home/welcome/home')
      }, {
        path: 'administrator',
        component: () => import('../views/home/administrator/administrator')
      }, 
      {
        path: 'role',
        component: () => import('../views/home/administrator/role')
      }, {
        path: 'menu',
        component: () => import('../views/home/administrator/menu')
      }, 
      {
        path: 'customer',
        component: () => import('../views/home/customer/customer')
      }, {
        path: 'allocation',
        component: () => import('../views/home/Inventory/allocation')
      }, {
        path: 'damaged',
        component: () => import('../views/home/Inventory/damaged')
      }, {
        path: 'inventory',
        component: () => import('../views/home/Inventory/inventory')
      }, {
        path: 'reimbursement',
        component: () => import('../views/home/Inventory/reimbursement')
      }, {
        path: 'report',
        component: () => import('../views/home/Inventory/report')
      }, {
        path: 'sale',
        component: () => import('../views/home/Inventory/sale')
      }, {
        path: 'warehousing',
        component: () => import('../views/home/Inventory/warehousing')
      }, {
        path: 'prod',
        component: () => import('../views/home/product/prod')
      }, {
        path: 'sku',
        component: () => import('../views/home/product/sku')
      }, {
        path: 'spu',
        component: () => import('../views/home/product/spu')
      }, {
        path: 'category',
        component: () => import('../views/home/product/category')
      }, 
      {
        path: 'company',
        component: () => import('../views/home/company/company')
      }, 
      {
        path: 'auditPurchase',
        component: () => import('../views/home/PurchaseManagement/auditPurchase')
      }, {
        path: 'purchase',
        component: () => import('../views/home/PurchaseManagement/purchase')
      }, {
        path: 'supplier',
        component: () => import('../views/home/supplier/supplier')
      }, {
        path: 'enterWareHouse',
        component: () => import('../views/home/warehouse/enterWareHouse')
      }
    ]
  }

]
const router = new VueRouter({
  routes,
})

// // 路由导航守卫控制是否为登录页,强制跳转至登录页
// router.beforeEach((to, from, next) => {
//   if (to.path === '/login') return next()
//   const tokenstr = window.sessionStorage.getItem('admin-token')
//   if (!tokenstr) return next('/login')
//   next()
// })
export default router