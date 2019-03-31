
import { setTimeout } from 'timers';
<template>
    <div>
        <h1>{{Status}}</h1>
    </div>    
</template>

<script>
    import GLOBAL from '../mixins/Global.vue'
    import axios from 'axios'
import { setInterval } from 'timers';

    export default {
        name : 'FetchImage',
        imageurl : '',
        errorMessage : '',
        resultArrived : false,
        fetchStatus : false,
        // Image Details available from server
        imageInformation : {
            resultArrived : false,
            title : 'meku',
            copyright : '',
            detailExplanation : '',
            date : '',
            urlinfo : ''
        },
        // Component Property 
        props : ['fetchdate'],
        // Common constant value in mixins
        mixins : [GLOBAL],
        data : function() {
            return {
                "Status" : "Fetching is in progress for today....."
            }
        },
        created : function() {
            // Prepare image url
            this.imageurl = this.NASA_WEBURL + this.NASA_APIKEY;
            this.imageInformation.resultArrived = false;
        },
        mounted: function() {
            setTimeout(function() {
                this.preparedFetch();
            }.bind(this),5000);
        },
        methods : {
            preparedFetch : function() {
                    console.log(this.imageInformation);
                    axios.get(this.imageurl).then(result => {
                        // Make sure that we receive proper result
                        this.resultArrived = true,
                        console.log(result.data.title);
                        console.log(this.imageInformation);
                        console.log(this.imageurl);
                        //this.imageInformation.title = result.data.title;
                        //this.imageInformation.copyright = result.data.copyright;
                        //this.imageInformation.detailExplnation = result.data.explantion;
                        //copyright : '',
                        //detailExplnation : '',
                        //date : '',
                        //urlinfo : ''

  
                    }, error => {
                        this.errorMessage = "Information not found";
                        this.resultArrived = false;
                        this.fetchStatus = true;
                    });


            }
        }
    }
</script>
