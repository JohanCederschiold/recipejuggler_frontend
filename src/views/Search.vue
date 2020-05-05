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
        <Recipe v-if="chosenRecipe" :recipe="chosenRecipe" :show="modalVisible" v-on:closeModal="closeModal"/>
    </div>
</template>
<script>
import Recipe from '../components/shared/Recipe.vue'
import axios from 'axios'
import ENDPOINTS from '@/constants/endpoints.json'
export default {
    data: function() {
        return {
            searchString : '',
            chosenRecipe: null,
            modalVisible: false,
            foundRecipes: [],
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

            axios.get(ENDPOINTS.MAIN + ENDPOINTS.SEARCH_TITLE + searchFor)
                .then(response => response.data.map(item => this.foundRecipes.push(item)))
        },
        searchIngredient(searchFor) {

            axios.get(ENDPOINTS.MAIN + ENDPOINTS.SEARCH_INGREDIENT + searchFor)
                .then(response => response.data.map(item => this.foundRecipes.push(item)))
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