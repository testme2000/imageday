<template>
    <div>
        <table>
            <tr>
                <td>Title</td>
                <td>{{imagedetail.title}}</td>
            </tr>  
            <tr>
                <td>Information</td>
                <td>{{imagedetail.detailExplanation}}</td>
            </tr>      
            <tr>
                <td>Copyright</td>
                <td>{{imagedetail.copyright}}</td>
            </tr>
        </table>    
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
