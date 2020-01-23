<template>
    <div>
        <button @click="fetchAllIngredients">Update</button>
        <p v-for="ingredient in ingredients" :key="ingredient.id"><strong>{{ ingredient.name }}</strong></p>
    </div>
</template>
<script>
export default {
    data: function(){
        return {
            localendpoint: '/ingredient/all',
            ingredients: []

        }
    },
    computed: {
        renderedEndpoint: function() {
            return this.$store.state.mainEndpoint + this.localendpoint
        }
    },
    methods: {
        fetchAllIngredients: function() {
            fetch(this.renderedEndpoint).then( response =>{
                return response.json()
            }).then( result => {
                this.ingredients = result
            })
        }
    }
    
}
</script>
<style scoped>

</style>