<template>
  <div>
    <div v-if="loggedIn">
      <user-feed/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import UserFeed from './UserFeed';
 export default {
   name: 'HomePage',
   components: {WelcomePage,UserFeed},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<style scoped>
body {
    background-color: rgb(80,210,255);
    position: relative;
    min-height: 100%;
    margin: 0;
}
</style>
