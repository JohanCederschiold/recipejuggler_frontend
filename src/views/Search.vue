<template>
    <div class="screen">
        <h1>Sök recept</h1>
        <p class="presentation">Klicka på receptet för att se mer information.</p>
        <input class="input" v-model="searchString">
        <b-button @click="search">
            Search
        </b-button>
        <div    v-for="recipe in foundRecipes" 
                :key="recipe.id" 
                @click="choose(recipe)">
            {{recipe.title}}
        </div>
        <Recipe :recipe="chosenRecipe" :show="modalVisible" v-on:closeModal="closeModal"/>
    </div>
</template>
<script>
import Recipe from '../components/shared/Recipe.vue'
export default {
    data: function() {
        return {
            searchString : '',
            chosenRecipe: '',
            modalVisible: false,
            foundRecipes: [],
            searchTitleEndpoint: '/recipe/find/searchstring/',
            searchIngredientEndpoint: '/recipe/find/ingredient/'
        }
    },
    methods: {
        choose(recipe){
            this.chosenRecipe = recipe
            this.modalVisible = true
        },
        closeModal(){
            this.modalVisible = false
        },
        selectRecipe() {

        },
        search() {
            this.foundRecipes = []
            this.searchTitle(this.searchString);
            this.searchIngredient(this.searchString);
        },
        searchTitle(searchFor) {
            fetch(this.$store.state.mainEndpoint + this.searchTitleEndpoint + searchFor)
                .then(response => {return response.json()})
                .then(result => result.map(item => this.foundRecipes.push(item)))
        },
        searchIngredient(searchFor) {
            fetch(this.$store.state.mainEndpoint + this.searchIngredientEndpoint + searchFor)
                .then(response => {return response.json()})
                .then(result => result.map(item => this.foundRecipes.push(item)))
        }
    },
    computed: {
        recipeNames : function () {
            return this.$store.state.allRecipes.map(item => item.title)
        }, 
    },
    components: {
        Recipe
    }  
}
</script>
<style scoped>
    .screen {
        margin: 2rem;
    }
    .presentation {
        font-style: italic;
    }
    .input {
        margin-right: 1rem;
    }
</style>