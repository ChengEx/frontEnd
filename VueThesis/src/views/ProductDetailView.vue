<script>
    import { getInventoryById, addCart } from '../api.js'
    export default {
        data(){
            return {
                productdata:{},       
                cartData:{
                    size:"",
                    quantity:0,
                    totalprice:0
                }
            }
        },
        created() {
            getInventoryById(this.$route.params.id).then(response=>{
                this.productdata = response.data;
                console.log("getInventoryById",this.productdata);
            }).catch(error => {
                console.log(error);
            })
        },
        methods:{
            addList(ev){
                //console.log("ev",ev);
                const target = ev.target;

                //find size button
                const eachSizeButton = document.getElementsByClassName('size-button');
                console.log(eachSizeButton.length)
                
                if(target.classList.contains('current')){
                    target.classList.remove('current')
                }else{
                    for(var i=0; i<eachSizeButton.length;i++){
                        //console.log(eachSizeButton[i].classList);
                        eachSizeButton[i].classList.remove('current'); 
                    }
                    target.classList.add('current')
                    this.cartData.size=target.outerText;                 
                }
            },
            add(){
                this.cartData.quantity+=1;
            },
            minus(){
                this.cartData.quantity===0 ? (this.cartData.quantity=0):(this.cartData.quantity-=1);
            },
            async submitCart(){
                if(!JSON.parse(localStorage.getItem('profile'))){
                    alert("請先登入會員");
                    this.$router.push('/signin');
                }else{
                    await addCart({
                        productid: this.productdata._id,
                        size: this.cartData.size,
                        quantity: this.cartData.quantity,
                        totalprice: this.productdata.productDetail?.price?.discount*this.cartData.quantity,
                        customerid: JSON.parse(localStorage.getItem('profile'))._id        
                    }).then((res)=>{
                        console.log(res);
                        alert('購物車成功發送!')
                    }).catch((err) => {
                        alert(err.response.data.message)
                    })
                }
            }
        },
        
    }
</script>

<template v-if="productdata" >
    <div class="container">
        <div class="row mt-5">
            <div class="col-6">
                <img :src="(productdata.productDetail?.options?.image)" />
            </div>
            <div class="col-6 mt-5">
                <div class="row">
                    <div class="col-7">
                        <h2>{{ productdata.name }}</h2>
                    </div>
                    <div class="col-5" >
                        <div style="text-align:right;">
                            <h5 style="margin-bottom:0px; text-decoration: line-through"> {{ productdata.productDetail?.price?.base }}</h5>
                        </div>
                        <div style="text-align:right;">
                            <span style="text-transform: uppercase;">NT$ </span>
                            <span style="font-size:50px; text-align:right;">
                                {{ productdata.productDetail?.price?.discount }}
                            </span>
                        </div>
                    </div>
                </div>
                <hr class="hrhr mt-3">
                <div style="display:flex;">
                    <button class="size-button" v-for="(siglesize, index) in productdata.productDetail?.options?.allsize"
                        :id="siglesize.size" @click.prevent="addList($event)">{{siglesize.size}}</button>
                    <div class="mt-3" style="display:flex; margin-left:30px;">
                        <span class="buttonStyle" id="minus" @click="minus">
                            <i class="fa fa-minus mt-1" style="margin-right:10px;"></i>    
                        </span>
                        <h5 class="text-grey mr-3" style="margin-right:10px;">{{cartData.quantity}}</h5>
                        <span class="buttonStyle" id="plus" @click="add">
                            <i class="fa fa-plus mt-1"></i>
                        </span>
                        
                    </div>
                    
                </div>
                <div class="row mt-5">
                    <button class="submit-button" style="width:60%;" @click.prevent="submitCart">加入購物車</button>
                </div>
                
            </div>
        </div>
    </div>
    
    
    
</template>
<style>
.buttonStyle {
    color: #333;
    cursor: pointer
}
.size-button {
    margin-right: 50px;
    height: 50px;
    width:70px;
    border: none;
}
.current {
    border: 1px solid #333;
}
.submit-button  {
    margin-left: auto;
    margin-right: auto;
    background: #FF4742;
    border: 1px solid #FF4742;
    border-radius: 6px;
    box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: nunito,roboto,proxima-nova,"proxima nova",sans-serif;
    font-size: 16px;
    font-weight: 800;
    line-height: 16px;
    min-height: 40px;
    outline: 0;
    padding: 12px 14px;
    text-align: center;
    text-rendering: geometricprecision;
    text-transform: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
}

.submit-button:hover,
.submit-button:active {
  background-color: initial;
  background-position: 0 0;
  color: #FF4742;
}

.submit-button:active {
  opacity: .5;
}
</style>