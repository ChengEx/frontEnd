<script>
    import Product from '../components/Product.vue'
    //import SideBar from '../components/SideBar.vue'
    import { getInventoriesByCategories } from '../api'
    export default {    
        data(){
            return{
                mainRoute:'',
                inventories:{}
            }
        },
        components:{
            Product,
            //SideBar
        },
        created() {
            console.log("$route",this.$route.path)
            const splitPath = this.$route.path.split("/");  //  /Male/Pants  -> [0]:'',[1]:Male ,[2]:Pants
            if(splitPath.length === 2){
                splitPath.push('default')
            }
            this.mainRoute = splitPath[1];
            const category = splitPath[1];
            const type = splitPath[2];   

            console.log("category and type",category, type);
            getInventoriesByCategories(category,type).then(response =>{
                this.inventories = response.data;
                console.log("inventory:", response.data);
            }).catch(error => {
                console.log(error);
            }) 
        }, 
        methods:{

        }
    }
</script>
<template>
    <!-- <div class="container"> -->
        <div class="row">
            <!-- <SideBar :category="mainRoute" /> -->
            <!-- <router-view class="view two" name="a"></router-view> -->
                <div class="row">
                    <Product v-for="(product,index) in inventories" :key="index" :product="product" />      
                </div>
            
        </div>
    <!-- </div> -->
    
</template>