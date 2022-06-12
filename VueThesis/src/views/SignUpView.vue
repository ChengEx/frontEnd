<script>
    import Cookies from 'js-cookie'
    import useVuelidate from '@vuelidate/core'
    import { required, email, minLength, sameAs } from '@vuelidate/validators'
    import { reactive, computed } from 'vue'
    import { signUp } from '../api.js'

    export default {
        name: "SignUpView",
        setup(){
            const state =  reactive({
                email:'',
                password:'',
                password_confirm:'',
                firstname: '',
                lastname: '',
                phone:'',
                address:{
                    city:'',
                    street:''
                },
            })

            const rules = computed(()=> {
                return {
                    email: {required, email},
                    password: {required, minLength:minLength(6)},
                    password_confirm: {required, sameAs:sameAs(state.password)},
                    firstname: {required, minLength:minLength(1)},
                    lastname: {required, minLength:minLength(1)},
                    phone: {required, minLength:minLength(10)},
                }
            })
            const v$ = useVuelidate(rules, state);
            return {state, v$}
        },
        data() {
            return{               
                Citylists:[
                    {item:'臺北市'},
                    {item:'新北市'},
                    {item:'桃園市'},
                    {item:'臺中市'},
                    {item:'臺南市'},
                    {item:'高雄市'},
                    {item:'新竹縣'},
                    {item:'苗栗縣'},
                    {item:'彰化縣'},
                    {item:'南投縣'},
                    {item:'雲林縣'},
                    {item:'嘉義縣'},
                    {item:'屏東縣'},
                    {item:'宜蘭縣'},
                    {item:'花蓮縣'},
                    {item:'臺東縣'},
                    {item:'澎湖縣'},
                    {item:'金門縣'},
                    {item:'連江縣'},
                    {item:'基隆市'},
                    {item:'新竹市'},
                    {item:'嘉義市'},
                ]
            }
        },
        methods: {
            async SignUpSubmit() {
                this.v$.$validate()
                if(!this.v$.$error){               
                    await signUp({
                    // await APIRequest.post('/Customer/signup',{
                        email: this.state.email,
                        password: this.state.password,
                        firstName: this.state.firstname,
                        lastName: this.state.lastname,
                        phone: this.state.phone,
                        address:{
                            city:this.state.city,
                            street: this.state.street
                        }     
                    }).then((res)=>{
                        console.log(res)
                        alert('Form successfully submit')
                        this.$router.push('/signin')  
                    }).catch((error)=>{
                        alert(error.response.data.message)                    
                    })
                }else{
                    alert('Form failed validation')
                }
            }
        }
    }
</script>
<template>
    <div class="form_box main">
        <form id="signup_form" class="form_class" @submit.prevent="SignUpSubmit" method="post">
            <div class="form_div">
                <div class="row">
                    <h1>Sign Up</h1>
                </div>
                <div class="row mt-3">
                    <div class="col-3">
                        <h5 class="title">信箱:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="email_txt" v-model="state.email" type="text" placeholder="Email" autofocus>
                        <span v-if="v$.email.$error">
                            {{ v$.email.$errors[0].$message }}
                        </span>                      
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <h5 class="title">密碼:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="password_txt" v-model="state.password" type="text" placeholder="Password">
                        <span v-if="v$.password.$error">
                            {{ v$.password.$errors[0].$message }}
                        </span> 
                    </div>
                </div>
                 <div class="row">              
                    <div class="col-3">
                        <h5 class="title">確認密碼:</h5>
                    </div>
                    <div class="col-9">
                        <input class="field_class" name="password_confirm_txt" v-model="state.password_confirm" type="text" placeholder="Password Confirm">
                        <span v-if="v$.password_confirm.$error">
                            {{ v$.password_confirm.$errors[0].$message }}
                        </span> 
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-3">
                        <h5 class="title">姓名:</h5>
                    </div>              
                    <div class="col-4">
                        <input class="field_class" name="firstname_txt" v-model="state.firstname" type="text" placeholder="FirstName">
                        <span v-if="v$.firstname.$error">
                            {{ v$.firstname.$errors[0].$message }}
                        </span> 
                    </div>
                    <div class="col-5">
                        <input class="field_class" name="lastname_txt"  v-model="state.lastname"  type="text" placeholder="LastName">
                        <span v-if="v$.lastname.$error">
                            {{ v$.lastname.$errors[0].$message }}
                        </span> 
                    </div>
                   
                </div>
                <div class="row">
                    <div class="col-3">
                        <h5 class="title">電話:</h5>
                    </div>  
                    <div class="col-9">
                        <input class="field_class" name="phone_txt" v-model="state.phone"  type="text" placeholder="Phone">
                        <span v-if="v$.phone.$error">
                            {{ v$.phone.$errors[0].$message }}
                        </span> 
                    </div>
                </div>
                <div class="row"> 
                    <div class="col-3">
                        <h5 class="title">地址:</h5>
                    </div>
                    <div class="col-3">
                       <select class="form-select form-select-sm field_class" aria-label="Default select example" v-model="state.city">
                            <option v-for="city in Citylists" :value="city.item" >
                                {{ city.item }}
                            </option>
                        </select>
                        <!-- <span v-if="v$.address.city.$error">
                            {{ v$.address.city.$errors[0].$message }}
                        </span>  -->
                    </div>
                    <div class="col-6">
                        <input class="field_class" name="address_txt" v-model="state.street" type="text" placeholder="Address">
                        <!-- <span v-if="v$.address.street.$error">
                            {{ v$.address.street.$errors[0].$message }}
                        </span>  -->
                    </div>
                </div>
                
            
                <button class="submit_class" type="submit" form="signup_form">Sign Up</button>
            </div>
        </form>
    </div>
</template>
<style>
span{
    text-transform: lowercase;
    color: red;
}
* {
    padding: 0px;
    margin: 0px;
}
body {
    background-color: lightgreen;
}
h1 {
    letter-spacing: 1.5vw;
    font-family: 'system-ui';
    text-transform: uppercase;
    text-align: center;
}

.main {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90.5vh;
    width: 100%;
    background: url(https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Mountains-1412683.svg/1280px-Mountains-1412683.svg.png) no-repeat center center;
    background-size: cover;
}

.form_box {
    display: flex;
    justify-content: center;
}
.form_class {
    width: 600px;
    padding: 40px;
    border-radius: 8px;
    background-color: white;
    font-family: 'system-ui';
    box-shadow: 5px 5px 10px rgb(0,0,0,0.3);
}
.form_div {
    text-transform: uppercase;
}
.form_div > label {
    letter-spacing: 1px;
    font-size: 1rem;
}
.info_div {
    text-align: center;
    margin-top: 20px;
}
.info_div {
    letter-spacing: 1px;
}
.field_class {
    width: 100%;
    border-radius: 6px;
    border-style: solid;
    border-width: 1px;
    padding: 5px 0px;
    text-indent: 6px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'system-ui';
    font-size: 0.9rem;
    letter-spacing: 1px;
}
.submit_class {
    border-style: none;
    border-radius: 5px;
    background-color: #FFE6D4;
    padding: 8px 20px;
    font-family: 'system-ui';
    text-transform: uppercase;
    letter-spacing: .8px;
    display: block;
    margin: auto;
    margin-top: 10px;
    box-shadow: 2px 2px 5px rgb(0,0,0,0.2);
    cursor: pointer;
}
footer {
    height: 10vh;
    background-color: black;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: -5px -5px 10px rgb(0,0,0,0.3);
}
footer > p {
    text-align: center;
    font-family: 'system-ui';
    letter-spacing: 1px;
}
footer > p > a {
    text-decoration: none;
    color: white;
    font-weight: bold;
}
.title{
    font-family: 'system-ui';
    margin-top: 15px;
    margin-bottom: 10px;
}
</style>
