import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import ShoppingCartView from '../views/ShoppingCartView.vue'
import BackStage from '../views/BackStage.vue'
import SideBarView from '../views/SideBarView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: true
    },
    {
      path:'/:category',
      name:'sidebar',
      component: SideBarView,
      props: true,
      children:[
        {
          path:':type',
          name:'product',
          component: ProductView,
          props: true
        }
      ]
    },
    {
      path:'/product/:id',
      name:'productdetail',
      component: ProductDetailView
    },
    {
      path:'/signin',
      name:'signin',
      component: SignInView
    },
    {
      path:'/signup',
      name:'signup',
      component: SignUpView
    },
    {
      path:'/shoppingcart',
      name:'shoppingcart',
      component: ShoppingCartView
    },
    {
      path:'/backstage',
      name:'backstage',
      component: BackStage
    }
  ]
})
export default router


