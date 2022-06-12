<script>
    import { addInventories } from '../api.js';

    export default {
        data() {
            return {
                inventorySchema:{
                    name:'',
                    categories:[],
                    productDetail:{
                        price:{
                            base:'',
                            discount:''
                        },
                        quantity:0,
                        options:{
                            size:{
                                S:0,
                                M:0,
                                L:0
                            },
                            image:''
                        }
                    }
                }
            }
        },
        methods:{
            async AddProductSubmit(){
                await addInventories(this.inventorySchema).then((res)=>{
                    console.log(res)
                    alert('Form successfully submit') 
                }).catch((error)=>{
                    alert(error.response.data.message)                    
                })         
            },
            onfile(event){
                this.file=event.target.files[0]
                let filereader=new FileReader();
                filereader.readAsDataURL(this.file)
                filereader.addEventListener("load",()=>{
                    this.inventorySchema.productDetail.options.image = filereader.result;
                    console.warn(this.inventorySchema.productDetail.options.image)
                })
            }
        }
    }
</script>
<template>
    <div class="form_box main">
        <form id="signup_form" class="form_class" @submit.prevent="AddProductSubmit" method="post">
            <div class="form_div">
                <div class="row">
                    <h1>Add Product</h1>
                </div>
                <div class="row mt-3">
                    <div class="col-3">
                        <h5 class="title">name:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="email_txt" v-model="inventorySchema.name" type="text" placeholder="name" autofocus>                   
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <h5 class="title">categories:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="password_txt" v-model="inventorySchema.categories" type="text" placeholder="categories">
                    </div>
                </div>


                <div class="row mt-3">
                    <div class="col-3">
                        <h5 class="title">base:</h5>
                    </div>              
                    <div class="col-3">
                        <input class="field_class" name="firstname_txt" v-model="inventorySchema.productDetail.price.base" type="text" placeholder="base">                       
                    </div>
                    <div class="col-3">
                        <h5 class="title">discount:</h5>
                    </div> 
                    <div class="col-3">
                        <input class="field_class" name="lastname_txt"  v-model="inventorySchema.productDetail.price.discount"  type="text" placeholder="discount">                      
                    </div>               
                </div>

                <div class="row">
                    <div class="col-3">
                        <h5 class="title">quantity:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="password_txt" v-model="inventorySchema.productDetail.quantity" type="text" placeholder="quantity">
                    </div>
                </div>
                
                <div class="row mt-3">
                    <div class="col-2">
                        <h5 class="title">S:</h5>
                    </div>              
                    <div class="col-2">
                        <input class="field_class" name="firstname_txt" v-model="inventorySchema.productDetail.options.size.S" type="text" placeholder="S">                       
                    </div>
                    <div class="col-2">
                        <h5 class="title">M:</h5>
                    </div> 
                    <div class="col-2">
                        <input class="field_class" name="lastname_txt"  v-model="inventorySchema.productDetail.options.size.M"  type="text" placeholder="M">                      
                    </div>  
                    <div class="col-2">
                        <h5 class="title">L:</h5>
                    </div> 
                    <div class="col-2">
                        <input class="field_class" name="lastname_txt"  v-model="inventorySchema.productDetail.options.size.L"  type="text" placeholder="L">                      
                    </div>               
                </div>

                <div class="row">
                    <div class="col-3">
                        <h5 class="title">上傳圖片:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="password_txt" type="file" @change="onfile">
                    </div>
                </div>

                
                <button class="submit_class" type="submit" form="signup_form">add product</button>
            </div>
        </form>
    </div>
</template>