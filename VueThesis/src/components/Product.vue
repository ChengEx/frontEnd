<script>
    export default {
        name: 'product',
        props:{
          product:{
            type: Object
          }
        }
    }
</script>
<template>
    <div class="card col-3" style="border: none;">
        <router-link :to="`/product/${product._id}`" style="text-decoration: none; color: inherit;">
          <img class="card-img-top mt-3" :src="(product.image)">
          <div class="card-body">
            <div class="row p-0 mt-3">
              <h5 class="col-auto me-auto p-0">{{product.name}}</h5>
              <h5 class="col-auto p-0">NT${{product.price}}</h5>
            </div>      
          </div>
        </router-link>
    </div>
</template>


