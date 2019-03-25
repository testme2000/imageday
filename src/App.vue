<template>
  <div id="app">
    <h1>Welcome to Image Day</h1>
    <h2>Image of today </h2>
    <image-for-date fetchdate="currentDate"></image-for-date>
  </div>
</template>

<script>
  import FetchImage from './components/FetchImage.vue'
  
export const GLOBAL = {
  data() {
      return {
        NASA_APIKEY : 'vME6LAMD7IhEiy7rDmjfIaG6MhiKbu1MNIqxtqd1',
        NASA_WEBURL : 'https://api.nasa.gov/planetary/apod?api_key='
      }
  }
}

export default {
  name: 'app',
  currentDate : '',
  mixins : [GLOBAL],
  components: {
    'ImageForDate' : FetchImage
  },
  created :function() {
    this.initilizeImageDay();
  },
  methods : {
      initilizeImageDay : function() {
          // Initialize current date
          this.currentDate = new Date().format('m-d-Y h:i:s');
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
