<script>
    import Carousel from '../components/Carousel.vue'
    import Product from '../components/Product.vue'
    import { getInventories, getCategories } from '../api.js'
    export default {
        data() {
          return {
            inventory: {},
            categoriesItem: {}
          }
        },      
        //註冊組件
        components:{
          Carousel,
          Product
        },
        async created() {
          

          getInventories().then(response=>{
              this.inventory = response.data;
              console.log("inventory:",this.inventory);
          }).catch(error => {
              console.log(error);
          })

        
        },   
    }
</script>
<template>
  <div class="container">
    <div class="row">
      <Carousel/>
      <div class="row">
        <Product v-for="(product,index) in inventory" :key="index" :product="product" />      
      </div>
    </div>
  </div>
</template>