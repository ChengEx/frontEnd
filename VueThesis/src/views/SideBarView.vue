<script>
    import { getCategories, getCategoriesByIdentity } from '../api.js'
    export default {
        data(){
            return{
                AllCategory:{},
                //-------
                category:"",
                categoryNow: this.$store.state.category
            }
        },
        created(){
            // getCategories(this.$props.category).then(response =>{
            //     console.log(this.$props.category);
            //     this.AllCategory = response.data;
            //     console.log(this.AllCategory);
            // }).catch(error => {
            //     console.log(error);
            // }) 
            // getCategoriesByIdentity(this.$props.category).then((res)=>{
            //     this.AllCategory = res.data;
            //     console.log(this.AllCategory);
            // }).catch((err)=> {
            //     console.log(err);
            // })

            //--------------------------------------------
            console.log("categorytest",this.$store.state.category);
            console.log("$route",this.$route)
            const splitPath = this.$route.path.split("/");  //  /Male/Pants  -> [0]:'',[1]:Male ,[2]:Pants
            if(splitPath.length === 2){
                splitPath.push('default')
            }
            this.mainRoute = splitPath[1];
            this.category = splitPath[1];
            const type = splitPath[2];   
            console.log("$route1",this.category)

        }
        
    }
</script>
<template>
    <div class="container">
        <div v-if="category=='male'" class="col-12">
            <div class="row">
                <div class="col-2">
                    <div v-for="item in categoryNow.male">
                        <router-link :key="item.categorynameEN" :to="`/male/${item.categorynameEN}`" style="text-decoration: none;">{{item.categoryname}}</router-link>
                    </div>
                </div>
                <div class="col-10">
                    <router-view></router-view>
                </div>              
            </div>
        </div>

        <div v-else-if="category=='female'" class="col-12"> 
            <div class="row">
                <div class="col-2">
                    <div v-for="item in  categoryNow.female">
                        <router-link :to="`/female/${item.categorynameEN}`" style="text-decoration: none;">{{item.categoryname}}</router-link>
                    </div>
                </div>
                <div class="col-10">
                    <router-view></router-view>
                </div>
            </div>
        </div>

        <div v-else-if="category=='kids'" class="col-12"> 
            <div class="col-2">
                <div v-for="item in  categoryNow?.kids">
                    <router-link :to="`/kids/${item.categorynameEN}`" style="text-decoration: none;">{{item.categoryname}}</router-link>
                </div>
            </div>
            <div class="col-10">
                <router-view></router-view>
            </div>     
        </div>
    </div>
</template>