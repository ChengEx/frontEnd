
<script>
    import Product from '../components/Product.vue'
    export default {
        data(){
            return{

            }
        },
        components:{
            Product
        },
        created:{

        },
        methods:{

        }
    }
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-2">Category</div>
            <div class="col-10">
                <div class="row">
                    <Product v-for="(product,index) in inventory" :key="index" :product="product" />      
                </div>
            </div>
            
        </div>
    </div>
</template>