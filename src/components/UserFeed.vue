<template>
  <div class="feed">
    <h1>Write Your Story</h1>

    <p>Use the following template to create your very own story outline.
    Fill in the blanks to create your story's setting, characters, and
    events. Your outline will appear at the bottom of the page. When you
    are done filling in the boxes, copy your outline to use as a guide as
    you write the whole story.
    </p>

    <div>
        <h2>Genre:</h2>
        <form v-on:submit.prevent="enter_genre">
            <textarea type="text" v-model="new_genre" placeholder=""/><br>
            <div class="buttonWrap">
                <button class="button" type="submit">Enter Genre</button>
      	    </div>
        </form>
        <p>{{genre}}</p>


        <h2>Setting:</h2>
        <form v-on:submit.prevent="enter_setting">
            <textarea type="text" v-model="new_setting" placeholder=""/>
            <div class="buttonWrap">
                <button class="button" type="submit">Enter Setting</button>
            </div>
        </form>

        <p>{{setting}}</p>

        <h2>Main Character's Name:</h2>
        <form v-on:submit.prevent="enter_main_character_name">
            <textarea type="text" v-model="new_main_character_name" placeholder=""/>
            <div class="buttonWrap">
                <button class="button" type="submit">Enter Name</button>
            </div>
        </form>
        <p>{{ main_character_name }}</p>


        <h2>Main Character's Description:</h2>
        <form v-on:submit.prevent="enter_main_character_description">
            <textarea type="text" v-model="new_main_character_description" placeholder=""/>
            <div class="buttonWrap">
                <button class="button" type="submit">Enter Description</button>
            </div>
        </form>
        <p>{{ main_character_description }}</p>

        <h2>Main Conflict:</h2>
        <form v-on:submit.prevent="enter_main_conflict">
            <textarea type="text" v-model="new_main_conflict" placeholder=""/>
            <div class="buttonWrap">
                <button class="button" type="submit">Enter Conflict</button>
            </div>
        </form>
        <p>{{ main_conflict }}</p>

        <h2>Theme:</h2>
        <form v-on:submit.prevent="enter_theme">
            <textarea type="text" v-model="new_theme" placeholder=""/>
            <div class="buttonWrap">
                <button class="button" type="submit">Enter Theme</button>
            </div>
        </form>
        <p>{{ theme }}</p>

        <h2>The Story's Three Parts</h2>

        <h3>The Beginning:</h3>
        <form v-on:submit.prevent="enter_beginning">
            <textarea type="text" v-model="new_beginning" placeholder=""/>
            <div class="buttonWrap">
                <button class="button" type="submit">Enter Beginning</button>
            </div>
        </form>
        <p>{{ beginning }}</p>

        <h3>The Middle:</h3>
        <form v-on:submit.prevent="enter_middle">
            <textarea type="text" v-model="new_middle" placeholder=""/>
            <div class="buttonWrap">
                <button class="button" type="submit">Enter Middle</button>
            </div>
        </form>
        <p>{{ middle }}</p>

        <h3>The Ending:</h3>
        <form v-on:submit.prevent="enter_ending">
            <textarea type="text" v-model="new_ending" placeholder=""/>
            <div class="buttonWrap">
                <button class="button" type="submit">Enter Ending</button>
            </div>
        </form>
        <p>{{ ending }}</p>
        <div class="writer_text">
            <h2>Your Outline:</h2>
                <p>The genre of the story is {{ genre }}</p>

                <p>The setting of the story is {{ setting }}</p>

                <p>The name of the main character is {{main_character_name}}</p>

                <p>The main character's description:</p>

                <p>{{ main_character_description }}</p>


                <h4>The Main Conflict:</h4>
                <p>{{ main_conflict }}</p>


                <h4>The Theme:</h4>
                <p>{{ theme }}</p>


                <h4>The Beginning:</h4>
                <p>{{ beginning }}</p>

                <h4>The Middle:</h4>
                <p>{{ middle }}</p>

                <h4>The Ending:</h4>
                <p>{{ ending }}</p>
        </div>

      <form v-on:submit.prevent="tweet" class="tweetForm">
	     <textarea v-model="text" placeholder=""/><br/>
    	<div class="buttonWrap">
            <button class="primary" type="submit">Tweet</button>
        </div>
      </form>
    </div>
    <div v-for="item in feed" class="item">
      <p class="idline"><span class="user">{{item.name}}</span><span class="handle">@{{item.username}}</span><span class="time">{{item.created | since}}</span></p>
      <p class="tweet">{{item.tweet}}</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'UserFeed',
        data () {
          return {
            new_genre: '',
            new_setting: '',
            new_main_character_name: '',
            new_main_character_description: '',
            new_main_conflict: '',
            new_theme: '',
            new_beginning: '',
            new_middle: '',
            new_ending: '',
          }
        },
        computed: {
            genre: function(){
                return this.$store.getters.genre;
            },
            setting: function(){
                return this.$store.getters.setting;
            },
            main_character_name: function(){
                return this.$store.getters.main_character_name;
            },
            main_character_description: function(){
                return this.$store.getters.main_character_description;
            },
            main_conflict: function(){
                return this.$store.getters.main_conflict;
            },
            theme: function(){
                return this.$store.getters.theme;
            },
            beginning: function(){
                return this.$store.getters.beginning;
            },
            middle: function(){
                return this.$store.getters.middle;
            },
            ending: function(){
                return this.$store.getters.ending;
            },
        },
        methods: {
            enter_genre: function(){
                this.$store.dispatch('enter_genre', { genre: this.new_genre });
            },
            enter_setting: function(){
                this.$store.dispatch('enter_setting', { setting: this.new_setting});
            },
            enter_main_character_name: function(){
                this.$store.dispatch('enter_main_character_name', { main_character_name: this.new_main_character_name });
            },
            enter_main_character_name: function(){
                this.$store.dispatch('enter_main_character_description', { main_character_description: this.new_main_character_description });
            },
            enter_main_conflict: function(){
                this.$store.dispatch('enter_main_conflict', { main_conflict: this.new_main_conflict });
            },
            enter_theme: function(){
                this.$store.dispatch('enter_theme', { theme: this.new_theme });
            },
            enter_beginning: function(){
                this.$store.dispatch('enter_beginning', { beginning: this.new_beginning });
            },
            enter_middle: function(){
                this.$store.dispatch('enter_middle', { middle: this.new_middle });
            },
            enter_ending: function(){
                this.$store.dispatch('enter_ending', { ending: this.new_ending });
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
 .feed {
     width: 600px;
 }
 .tweetForm {
     background: #eee;
     padding: 10px;
     margin-bottom: 10px;
 }
 .buttonWrap {
     width: 100%;
     display: flex;
 }
 button {
     margin-left: auto;
     height: 2em;
     font-size: 0.9em;
 }

.button {
    background-color: rgb(0,100,255);
    color: white;
    margin-left: auto;
    height: 2em;
    font-size: 0.9em;
}

.writer_text {
    background-color: white;
    padding: 5%;
    margin-bottom: 5%;
}

h1 {
    color: white;
}

 textarea {
     width: 100%;
     height: 5em;
     padding: 2px;
     margin-bottom: 5px;
     resize: none;
     box-sizing: border-box;
 }

input {
    width: 50%;
    height: 5em;
    padding: 2px;
    margin-bottom: 5px;
    resize: none;
    box-sizing: border-box;
}

 .item {
     border-bottom: 1px solid #ddd;
     padding: 10px;
 }
 .tweet {
     margin-top: 0px;
 }
 .idline {
     margin-bottom: 0px;
 }
 .user {
     font-weight: bold;
     margin-right: 10px;
 }
 .handle {
     margin-right: 10px;
     color: #666;
 }
 .time {
     float: right;
     color: #666;
 }
</style>
