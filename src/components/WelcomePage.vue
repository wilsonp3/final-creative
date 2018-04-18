<template>
  <div class="column">
    <h1>Write Your Story.</h1>
    <h2>Create a Private Account for Your Own Story Outline.</h2>
    <form v-on:submit.prevent="register">
      <p>1. Choose a user name (this is what your story outline will be saved under).</p>
      <input class="narrow" v-model="username" placeholder="User Name">
      <p>2. Create an account.</p>
      <input class="wide" v-model="name" placeholder="First and Last Name"><br/>
      <input class="narrow" v-model="email" placeholder="Email Address">
      <input class="narrow" type="password" v-model="password" placeholder="Password">
      <button class="alternate" type="submit">Register</button>
    </form>
    <p class="error">{{registerError}}</p>
  </div>
</template>

<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       username: '',
       email: '',
       password: '',
       name: '',
     }
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       this.$store.dispatch('register', {
           username: this.username,
           email: this.email,
           password: this.password,
           name: this.name,
       });
     }
   }
 }
</script>


<style scoped>
 body {
    background-color: rgb(80,210,255);
    position: relative;
    min-height: 100%;
    margin: 0;
 }

 h1 {
     margin-bottom: 0px;
     color: white;
 }
 h2 {
     margin-top: 0px;
     font-size: 1.2em;
     font-weight: normal;
     margin-bottom: 50px;
 }
 .narrow {
     width: 170px;
 }
 .wide {
     width: 370px;
 }

 .alternate {
    background-color: rgb(0,160,255);
 }
</style>
