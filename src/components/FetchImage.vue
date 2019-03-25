
<template>
    <div>
        <h1>{{Status}}</h1>
    </div>    
</template>

<script>
    export default {
        name : 'FetchImage',
        props : ['fetchdate'],
        data : function() {
            return {
                "Status" : "Fetching is in process for current day....."
            }
        },
        methods : {
            preparedFetch : function() {
                var test = 0;

                test += 1;
            }
        }
    }
</script>
