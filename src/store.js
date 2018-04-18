import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    loginError: '',
    registerError: '',
    feed: [],


    //Added States
    genre: '',
    setting: '',




  },
  getters: {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    feed: state => state.feed,

    //Added getters
    genre: state => state.genre,
    setting: state => state.setting,


  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setLogin (state, status) {
      state.loggedIn = status;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setFeed (state, feed) {
      state.feed = feed;
    },

    //Added mutations
    set_genre (state, genre) {
        state.genre = genre;
    },

    set_setting (state, setting) {
        state.setting = setting;
    },


  },
  actions: {
      // Registration, Login //
      register(context,user) {
        axios.post("/api/users",user).then(response => {
          	context.commit('setUser', response.data.user);
          	context.commit('setLogin',true);
          	context.commit('setRegisterError',"");
          	context.commit('setLoginError',"");
        }).catch(error => {
      	context.commit('setLoginError',"");
      	context.commit('setLogin',false);
          	if (error.response) {
          	  if (error.response.status === 403)
          	    context.commit('setRegisterError',"That email address already has an account.");
          	  else if (error.response.status === 409)
          	    context.commit('setRegisterError',"That user name is already taken.");
          	  return;
  	       }
  	    context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
        });
      },
      //Login
      login(context,user) {
        axios.post("/api/login",user).then(response => {
        	context.commit('setUser', response.data.user);
        	context.commit('setLogin',true);
        	context.commit('setRegisterError',"");
        	context.commit('setLoginError',"");
        }).catch(error => {
	        context.commit('setRegisterError',"");
	        if (error.response) {
	            if (error.response.status === 403 || error.response.status === 400)
	                context.commit('setLoginError',"Invalid login.");
	            context.commit('setRegisterError',"");
	            return;
	        }
	        context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
            });
        },
        //Logout
        logout(context,user) {
            context.commit('setUser', {});
            context.commit('setLogin',false);
        },

        //genre

        get_genre(context) {
            axios.get("/api/users/" + context.state.user.id + "/genre").then(response => {
                context.commit('set_genre',response.data.outline.genre);
            }).catch(err => {
                console.log("get_genre failed:",err);
            });
        },

        enter_genre(context,genre) {
            axios.post("/api/users/" + context.state.user.id + "/genre",genre).then(response => {
                return context.dispatch('get_genre');
            }).catch(err => {
                console.log("enter_genre failed:",err);
            });
        }


        //Setting
    }
});
