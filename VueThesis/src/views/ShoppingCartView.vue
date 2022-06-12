<script>
    import { getCart, addCartQuantity, minusCartQuantity, deleteCart } from '../api.js'
    export default {
        
        data(){
            return{
                cartData:[]
            }
        },
        methods:{
            async minusCartQuantity(cartID){
                console.log("item",cartID);
                //use api to change cart collection's quantity
                await minusCartQuantity(cartID).then((res)=>{
                    console.log("minus res",res);
                    this.cartData = res.data;
                }).catch((err)=>{
                    alert(err.response.data.message);
                    // localStorage.clear();
                    // this.$router.push('/signin');     
                })
            },
            async plusCartQuantity(cartID){
                //use api to change cart collection's quantity
                await addCartQuantity(cartID).then((res)=>{
                    console.log("add res",res);
                    this.cartData = res.data;
                }).catch((err)=>{
                    console.log(err);
                    alert(err.response.data.message);
                    // localStorage.clear();
                    // this.$router.push('/signin');                 
                })
            },
            async deleteCartItem(cartID){
                ///use api to delete cart collection
                await deleteCart(cartID).then((res)=>{
                    this.cartData = res.data;
                }).catch((err)=>{
                    console.log(err);
                    alert(err.response.data.message)
                })
            }

        },
        created(){
            console.log(JSON.parse(localStorage.getItem('profile'))._id);
            //if(JSON.parse(localStorage.getItem('profile'))){
                getCart(JSON.parse(localStorage.getItem('profile'))._id).then((res)=>{
                    console.log("res",res);
                    this.cartData = res.data;
                }).catch((err)=>{
                    alert(err.response.data.message);
                    jwtExpired();
                    //this.$router.push('/signin');
                })
            //}
            
        }
    }
</script>
<template>
    <div class="container mt-5 mb-5">
            <div class="d-flex justify-content-center row">
                <div class="col-md-8">
                    <div class="p-2">
                        <h4>Shopping cart</h4>
                        <!-- <div class="d-flex flex-row align-items-center pull-right"><span class="mr-1">Sort by:</span><span class="mr-1 font-weight-bold">Price</span><i class="fa fa-angle-down"></i></div> -->
                    </div>

                    <div class="d-flex flex-row justify-content-between align-items-center p-3 mt-4 px-3 rounded" style="background: #E0E0E0;" v-for="(item, index) in cartData" :key="index">
                        <div class="mr-1">
                            <!-- <img class="rounded" src="https://i.imgur.com/XiFJkhI.jpg" width="70"> -->
                            <img class="rounded" :src="item.productid?.productDetail?.options?.image"  width="90"/>
                        </div>
                        <!-- <div class="d-flex flex-column align-items-center product-details"><span class="font-weight-bold">Basic T-shirt</span>
                            <div class="d-flex flex-row product-desc">
                                <div class="size mr-1"><span class="text-grey">Size:</span><span class="font-weight-bold">&nbsp;M</span></div>
                                <div class="color"><span class="text-grey">Color:</span><span class="font-weight-bold">&nbsp;Grey</span></div>
                            </div>
                        </div> -->
                        <div class="d-flex flex-column align-items-center product-details mt-2">
                            <h5 class="font-weight-bold">{{ item.productid?.name }}</h5>
                            <div class="d-flex flex-row product-desc">
                                <div class="size mr-1">
                                    <h5 class="text-grey">Size: {{ item.size }}</h5>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex flex-row align-items-center qty">
                            <span class="buttonStyle" id="minus" @click="minusCartQuantity(item._id)">
                                <i class="fa fa-minus text-danger" style="margin-right:10px;"></i>
                            </span>
                            <h5 class="text-grey mt-1" style="margin-right:10px;">{{ item.quantity }}</h5>
                            <span class="buttonStyle" id="plus" @click="plusCartQuantity(item._id)">
                                <i class="fa fa-plus text-success"></i>
                            </span>
                        </div>
                        <div>
                            <h5 class="text-grey mt-1" style="width:100px">{{ item.totalprice }}</h5>
                        </div>
                        <div class="d-flex align-items-center">
                            <span class="buttonStyle" id="delete" @click="deleteCartItem(item._id)">
                                <i class="fa fa-trash mb-1 text-danger"></i>
                            </span>
                        </div>
                    </div>
                    
                    <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><input type="text" class="form-control border-0 gift-card" placeholder="discount code/gift card"><button class="btn btn-outline-warning btn-sm ml-2" type="button">Apply</button></div>
                    <div class="d-flex flex-row align-items-center mt-3 p-2 bg-white rounded"><button class="btn btn-warning btn-block btn-lg ml-2 pay-button" type="button">Proceed to Pay</button></div>
                </div>
            </div>
        </div>
</template>
<style>
.buttonStyle {
    color: #333;
    cursor: pointer;
}
</style>