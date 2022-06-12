import { createStore } from 'vuex'


export default createStore({
    state: {
        user: JSON.parse(localStorage.getItem('profile')),
        category: {}
        //user: null
       
    },
    getters: {
        user: (state) => {
            return state.user;
        },
        category: (state) => {
            return state.category;
        }
    },
    actions:{
        user(context, user) {
            context.commit('user', user);
        },
        getCategoryData(state, newData) {
            state.category = newData;
        },
    },
    mutations:{
        user(state, user) {
            state.user = user;
        },
        getCategoryData(state, newData) {
            state.category = newData;
        },
    }
  })
