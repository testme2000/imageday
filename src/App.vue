<template>
  <div id="app">
    <h1>Welcome to Image Day</h1>
    <h2>Image of today </h2>
    <image-for-date v-bind:fetchdate="currentDate"></image-for-date>
  </div>
</template>

<script>
  import FetchImage from './components/FetchImage.vue'
  import GLOBAL from './mixins/Global.vue'
 /* 
export const GLOBAL = {
  data() {
      return {
        NASA_APIKEY : 'vME6LAMD7IhEiy7rDmjfIaG6MhiKbu1MNIqxtqd1',
        NASA_WEBURL : 'https://api.nasa.gov/planetary/apod?api_key='
      }
  }
}*/

export default {
  name: 'app',
  currentDate : '',
  test : {},
  test2 : 999,
  mixins : [GLOBAL],
  components: {
    'ImageForDate' : FetchImage
  },
  created :function() {
    this.test.meku = 'teku';
    this.test2 = 6767;
    this.initilizeImageDay();
  },
  methods : {
      initilizeImageDay : function() {
          // Initialize current date
          this.currentDate = new Date();
      }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
