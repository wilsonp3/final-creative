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
    main_character_name: '',
    main_character_description: '',
    main_conflict: '',
    theme: '',
    beginning: '',
    middle: '',
    ending: '',

//look up vue developer extension


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
    main_character_name: state => state.main_character_name,
    main_character_description: state => state.main_character_description,
    main_conflict: state => state.main_conflict,
    theme: state => state.theme,
    beginning: state => state.beginning,
    middle: state => state.middle,
    ending: state => state.ending,


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

    set_main_character_name (state, main_character_name) {
        state.main_character_name = main_character_name;
    },

    set_main_character_description (state, main_character_description) {
        state.main_character_description = main_character_description;
    },

    set_main_conflict (state, main_conflict) {
        state.main_conflict = main_conflict;
    },

    set_theme (state, theme) {
        state.theme = theme;
    },

    set_beginning (state, begining) {
        state.beginning = beginning;
    },

    set_middle (state, middle) {
        state.middle = middle;
    },

    set_ending (state, ending) {
        state.ending = ending;
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
            axios.get("/api/users/" + context.state.user.id + "/genre/").then(response => {
                context.commit('set_genre',response.data.outline.genre);
            }).catch(err => {
                console.log("get_genre failed:",err);
            });
        },

        enter_genre(context,genre) {
            axios.post("/api/users/" + context.state.user.id + "/genre/",genre).then(response => {
                return context.dispatch('get_genre');
            }).catch(err => {
                console.log("enter_genre failed:",err);
            });
        },


        //Setting


        get_setting(context) {
            axios.get("/api/users/" + context.state.user.id + "/setting/").then(response => {
                context.commit('set_setting',response.data.outline.setting);
            }).catch(err => {
                console.log("get_setting failed:",err);
            });
        },

        enter_setting(context,setting) {
            axios.post("/api/users/" + context.state.user.id + "/setting/",setting).then(response => {
                return context.dispatch('get_setting');
            }).catch(err => {
                console.log("enter_setting failed:",err);
            });
        },



        //main_character_name

        get_main_character_name(context) {
            axios.get("/api/users/" + context.state.user.id + "/main_character_name/").then(response => {
                context.commit('set_main_character_name',response.data.outline.main_character_name);
            }).catch(err => {
                console.log("get_main_character_name failed:",err);
            });
        },

        enter_main_character_name(context,main_character_name) {
            axios.post("/api/users/" + context.state.user.id + "/main_character_name/",main_character_name).then(response => {
                return context.dispatch('get_main_character_name');
            }).catch(err => {
                console.log("enter_main_character_name failed:",err);
            });
        },

        //main_character_description

        get_main_character_description(context) {
            axios.get("/api/users/" + context.state.user.id + "/main_character_description/").then(response => {
                context.commit('set_main_character_description',response.data.outline.main_character_description);
            }).catch(err => {
                console.log("get_main_character_description failed:",err);
            });
        },

        enter_main_character_description(context,main_character_description) {
            axios.post("/api/users/" + context.state.user.id + "/main_character_description/",main_character_description).then(response => {
                return context.dispatch('get_main_character_description');
            }).catch(err => {
                console.log("enter_main_character_description failed:",err);
            });
        },

        //main_conflict

        get_main_conflict(context) {
            axios.get("/api/users/" + context.state.user.id + "/main_conflict/").then(response => {
                context.commit('set_main_conflict',response.data.outline.main_conflict);
            }).catch(err => {
                console.log("get_main_conflict failed:",err);
            });
        },

        enter_main_conflict(context,main_character_description) {
            axios.post("/api/users/" + context.state.user.id + "/main_conflict/",main_conflict).then(response => {
                return context.dispatch('get_main_conflict');
            }).catch(err => {
                console.log("enter_main_conflict failed:",err);
            });
        },


        //Theme

        get_theme(context) {
            axios.get("/api/users/" + context.state.user.id + "/theme/").then(response => {
                context.commit('set_theme',response.data.outline.theme);
            }).catch(err => {
                console.log("get_theme failed:",err);
            });
        },

        enter_theme(context,theme) {
            axios.post("/api/users/" + context.state.user.id + "/theme/",theme).then(response => {
                return context.dispatch('get_theme');
            }).catch(err => {
                console.log("enter_theme failed:",err);
            });
        },

        //beginning

        get_beginning(context) {
            axios.get("/api/users/" + context.state.user.id + "/beginning/").then(response => {
                context.commit('set_theme',response.data.outline.beginning);
            }).catch(err => {
                console.log("get_theme failed:",err);
            });
        },

        enter_beginning(context,beginning) {
            axios.post("/api/users/" + context.state.user.id + "/beginning/",beginning).then(response => {
                return context.dispatch('get_beginning');
            }).catch(err => {
                console.log("enter_beginning failed:",err);
            });
        },

        //Middle

        get_middle(context) {
            axios.get("/api/users/" + context.state.user.id + "/middle/").then(response => {
                context.commit('set_middle',response.data.outline.middle);
            }).catch(err => {
                console.log("get_theme failed:",err);
            });
        },

        enter_middle(context,middle) {
            axios.post("/api/users/" + context.state.user.id + "/middle/",middle).then(response => {
                return context.dispatch('get_middle');
            }).catch(err => {
                console.log("enter_middle failed:",err);
            });
        },


        //ending

        get_ending(context) {
            axios.get("/api/users/" + context.state.user.id + "/middle/").then(response => {
                context.commit('set_ending',response.data.outline.ending);
            }).catch(err => {
                console.log("get_ending failed:",err);
            });
        },

        enter_ending(context,ending) {
            axios.post("/api/users/" + context.state.user.id + "/ending/",ending).then(response => {
                return context.dispatch('get_ending');
            }).catch(err => {
                console.log("enter_ending failed:",err);
            });
        },
    }
});
