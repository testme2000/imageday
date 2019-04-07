<template>
  <div id="app">
    <h1>Welcome to Image Day</h1>
    <h2>Image of today </h2>
    <image-for-date v-bind:fetchdate="currentDate" @imagefetched="onImageArrived"></image-for-date>
    <div v-show="resultStatus">
        <display-image v-bind:imagedetail="imageInformation"></display-image>
     </div> 
  </div>
</template>

<script>
  import FetchImage from './components/FetchImage.vue'
  import DisplayImage from './components/DisplayImage.vue'
  import GLOBAL from './mixins/Global.vue'

export default {
  name: 'app',
  resultStatus : false,
  currentDate : '',
  mixins : [GLOBAL],
  data : function() {
      return {
          resultArrived : false,
          // Image Details available from server
          imageInformation : {
              title : '',
              copyright : '',
              detailExplanation : '',
              date : '',
              urlinfo : ''
          }
      }
  },
  components: {
    'ImageForDate' : FetchImage,
    'displayImage' : DisplayImage
  },
  created :function() {
    this.initilizeImageDay();
  },
  methods : {
      initilizeImageDay : function() {
          // Initialize current date
          this.currentDate = new Date();
      },
      onImageArrived : function(imageInformation) {
        this.resultStatus = true;
        this.imageInformation = imageInformation;
        alert(imageInformation.title);
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
