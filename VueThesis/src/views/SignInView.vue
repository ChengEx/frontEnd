<script>
    import { signIn } from '../api.js'
    export default {
        data() {
            return{
                loginForm: {
                    email: '',
                    password: '',
                    token: ''
                }
            }
        },
        methods :{
            async SignInSubmit(){
                await signIn({
                    email: this.loginForm.email,
                    password: this.loginForm.password
                }).then((res)=>{
                    console.log("res:",res);
                    localStorage.setItem('profile', JSON.stringify(res.data));
                    this.$store.dispatch('user',res.data);
                    this.$router.push('/');
                }).catch((error)=>{
                    alert(error.response.data.message)
                })
            }
        }
    }
</script>
<template>
    <div class="form_box main">
        <form id="login_form" class="form_class"  @submit.prevent="SignInSubmit" method="post">
            <div class="form_div">
                <label>Email:</label>
                <input class="field_class" name="login_txt" type="text" v-model="loginForm.email" placeholder="email" autofocus>
                <label>Password:</label>
                <input id="pass" class="field_class" name="password_txt" type="password" v-model="loginForm.password" placeholder="password">
                <button class="submit_class" type="submit" form="login_form">Login</button>
            </div>
            <div class="info_div">
                <p>還沒成為會員嗎? 
                    <router-link to="/signup" style="text-decoration: none;">
                        Sign up
                    </router-link>
                </p>
            </div>
        </form>
    </div>
</template>
<style>
    * {
        padding: 0px;
        margin: 0px;
    }
    body {
        background-color: lightgreen;
    }
    header {
        background-color: black;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 15vh;
        box-shadow: 5px 5px 10px rgb(0,0,0,0.3);
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
        width: 500px;
        /* height: 350px; */
        padding: 50px;
        border-radius: 8px;
        background-color: white;
        font-family: 'system-ui';
        box-shadow: 5px 5px 10px rgb(0,0,0,0.3);
    }
    .form_div {
        text-transform: uppercase;
    }
    .form_div > label {
        letter-spacing: 3px;
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
        margin-bottom: 20px;
        font-family: 'system-ui';
        font-size: 0.9rem;
        letter-spacing: 2px;
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
        letter-spacing: 3px;
    }
    footer > p > a {
        text-decoration: none;
        color: white;
        font-weight: bold;
    }
</style>
