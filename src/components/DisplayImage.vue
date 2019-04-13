<template>
    <div>
        <table class="table table-bordered">
            <tr>
                <td class="font-weight-bold">Title</td>
                <td class="text-left">{{imagedetail.title}}</td>
            </tr>  
            <tr>
                <td class="font-weight-bold">Information</td>
                <td class="text-left">{{imagedetail.detailExplanation}}</td>
            </tr>      
            <tr>
                <td class="font-weight-bold">Copyright</td>
                <td class="text-left">{{imagedetail.copyright}}</td>
            </tr>
        </table>    
        <img v-bind:src="imagedetail.urlinfo" class="img-rounded"/>    
    </div>    
</template>

<script>
    export default {
        name : 'DisplayImage',
        // Component Property 
        props : ['imagedetail'],
        data : function() {
            return {
            }
        }
    }


</script>
