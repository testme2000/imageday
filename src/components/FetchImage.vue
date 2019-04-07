<template>
    <div v-if="!resultArrived">
        <h1>{{Status}}</h1>
    </div>    
</template>

<script>
    import GLOBAL from '../mixins/Global.vue'
    import axios from 'axios'

    export default {
        name : 'FetchImage',
        imageurl : '',
        errorMessage : '',
        fetchStatus : false,
        // Component Property 
        props : ['fetchdate'],
        // Common constant value in mixins
        mixins : [GLOBAL],
        data : function() {
            return {
                "Status" : "Fetching is in progress for today.....",
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
        created : function() {
            // Prepare image url
            this.imageurl = this.NASA_WEBURL + this.NASA_APIKEY;
        },
        mounted: function() {
            setTimeout(function() {
                this.preparedFetch();
            }.bind(this),5000);
        },
        methods : {
            preparedFetch : function() {
                    axios.get(this.imageurl).then(result => {
                        // Make sure that we receive proper result
                        console.log(result.data);
                        this.imageInformation.title = result.data.title;
                        this.imageInformation.copyright = result.data.copyright;
                        this.imageInformation.detailExplnation = result.data.explantion;
                        this.imageInformation.date = result.data.date;
                        this.imageInformation.urlinfo = result.data.url;
                        this.resultArrived = true;
                        this.$emit('imagefetched',this.imageInformation);
                    }, error => {
                        this.errorMessage = "Information not found";
                        this.imageInformation.resultArrived = false;
                        this.fetchStatus = true;
                        this.resultArrived = true;
                    });
            }
        }
    }
</script>
