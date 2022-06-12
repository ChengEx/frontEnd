<script>
  import { getCategories } from '../api.js';
  export default {
    data(){
      return {
        categoriesItem:{}
      }
    },
    methods:{
      logout(){
        localStorage.clear();
        this.$store.dispatch('user', null)
      }
    },
    created() {
      getCategories().then(response => {
              console.log("response:",response);
              this.categoriesItem = response.data;
              console.log("inventory category:",this.categoriesItem);
              this.$store.commit("getCategoryData", this.categoriesItem?.returnCategory);
          }).catch(error => {
              console.log(error);
          })
    }
  }
  // array = ['male','female','kids']
</script>
<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link class="navbar-brand " aria-current="page" to="/" style="margin-right: 30px; font-size:30px;" >電商平台</router-link>

    <div class="collapse navbar-collapse mt-3 mb-3" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
        
<!-- 看分類是否要加進資料庫 -->
        <li class="nav-item insidefont" style="margin-right: 20px;">
          <router-link class="nav-link" aria-current="page" to="/male">Male</router-link>
        </li>
        <li class="nav-item insidefont" style="margin-right: 20px;">
          <router-link class="nav-link" aria-current="page" to="/female">Female</router-link>
        </li>
        <li class="nav-item insidefont" style="margin-right: 20px;">
          <router-link class="nav-link" aria-current="page" to="/kids">Kids</router-link>
        </li>
   
        <li class="nav-item">
          <router-link class="nav-link insidefont" aria-current="page" to="/backstage">暫時後台</router-link>
        </li>
      </ul>

      <div v-if="!$store.getters['user']">
        <router-link class="nav-link insidefont mr-5" to="/signin" style="text-decoration: none; color: inherit;">Sign in</router-link>
      </div>
      <div v-else>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" >
            <button class="insidefont" @click="logout" style="border: none; background: none; margin-right: 15px;">
              Sign out
            </button>   
          </li>
          <li class="nav-item">
            <router-link class="insidefont" to="/shoppingcart" style="text-decoration: none; color: inherit;">Cart</router-link>
          </li>
        </ul>
        
      </div>

      <!-- <div>
        <router-link class="nav-link" to="/" style="text-decoration: none; color: inherit;">Cart</router-link>
      </div> -->
    </div>
  </div>
</nav>
</template>
<style>
.dropdown:hover .dropdown-menu {
    display: block;
    margin-top: 0;
}

.insidefont {
  font-size:20px;
}
</style>