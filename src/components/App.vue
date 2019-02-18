Vue.mixin({
  data: function() {
    return : {
      NASA_WEB_KEY : 'vME6LAMD7IhEiy7rDmjfIaG6MhiKbu1MNIqxtqd1',
      NASA_WEB_QUERY : 'https://api.nasa.gov/planetary/apod?api_key='
    }
  }
})


<template>
  <div id="app">
    <div>
      <h1>Welcome to Image of day</h1>
      <h2>Here is image of space today {{todaydate}}</h2>
      <div>
        <imagefetch :keydetail="todaydate"></imagefetch>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import imageavailble from './ImageFetch.vue'
  
  export default {
    name: 'app',
    imagedetails : {
       title : '',
       description: '',
       imageurl : ''
    },
    components : {
      'imagefetch' : imageavailble
    },
    computed : {
      todaydate : function() {
        let today = new Date();
        return today.toLocaleDateString('en-US');
      }
    },
    created : function() {
      this.loadimageForToday(this.todateDate);
    },
    methods : {
      loadimageForToday : function(todayDate)
      {
          let imageurl = NASA_WEB_QUERY + NASA_WEB_KEY;
          axios.get(imageurl).then(result => {
            // Get image title, description and image url
            this.imagedetails.title = result.title;

          }, error => {
              this.errorMessage = error.message;
              this.resultArrived = false;
              this.fetchStatus = true;
            });

      }
    }
  }
</script>

<!-- CSS libraries -->
<style src="normalize.css/normalize.css"></style>

<!-- Global CSS -->
<style>
  code {
    font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    font-size: 0.9em;
    white-space: pre-wrap;
    color: #2c3e50;
  }

  code::before, code::after {
    content: '`';
  }
</style>

<!-- Scoped component css -->
<!-- It only affect current component -->
<style scoped>
  #app {
    text-align: center;
  }

  #app h1 {
    color: #2c3e50;
    font-weight: 300;
    margin: 0;
  }

  .banner {
    height: 200px;
    background-color: #f6f6f6;
    padding: 50px 10px;
  }

  .bottom {
    padding: 80px 10px;
    font-size: 24px;
    font-weight: 300;
  }

  .fade {
    font-size: 14px;
  }

  .logo {
    animation: spin 4s 1s infinite linear
  }

  @keyframes spin {
    from {transform:rotate(0deg);}
    to {transform:rotate(360deg);}
  }
</style>
