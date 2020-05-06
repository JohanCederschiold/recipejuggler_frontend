<template>
    <div>
        <h3>Ingredienser</h3>
        <div v-for="ingredient in updatedIngredients" :key="ingredient.id">
            <div>
                <b-button pill @click="deleteIngredient(ingredient.id)" variant="danger">x</b-button>
                {{getAmountsAsString(ingredient.amount, ingredient.units)}} av {{ingredient.ingredientName}}
            </div>
        </div>
            <div>
                <div class="input">
                    <label for="input-with-list">Lägg till ingrediens</label>
                    <b-form-input   list="input-list" 
                                    id="input-with-list" 
                                    :disabled="enterInputMode"
                                    v-model="ingredientName" 
                                    placeholder="Write ingredient"></b-form-input>
                    <b-form-datalist id="input-list" :options="ingredients"></b-form-datalist>
                    <b-button @click="onSubmit" variant="success" :disabled="enterInputMode">Sök</b-button>
                </div>
                <div v-if="chosenIngredient.units !== undefined">
                    <InputWeightUnit v-if="chosenIngredient.units ==='WEIGHT'" v-on:sendAmount="register" v-on:reset="resetInputField"/>
                    <InputVolumeUnit v-if="chosenIngredient.units ==='VOLUME'" v-on:sendAmount="register" v-on:reset="resetInputField"/>
                    <InputAmountUnit v-if="chosenIngredient.units ==='AMOUNT'" v-on:sendAmount="register" v-on:reset="resetInputField"/>
                </div>
                <b-modal hide-footer hide-header v-model="setNewIngredient" >
                    <RegisterNewIngredient v-on:unitChosen="setUnit"  />
                </b-modal>
            </div>
            <div class="navigationButtons">
            <b-button   @click="goBack" 
                        variant="danger">
                            Bakåt
            </b-button>
            <b-button   @click="goForward"
                        variant="primary">
                            Gå vidare
            </b-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ENDPOINTS from '@/constants/endpoints.json'
import InputWeightUnit from '@/components/shared/InputWeightUnit'
import InputVolumeUnit from '@/components/shared/InputVolume'
import InputAmountUnit from '@/components/shared/InputAmount'
import RegisterNewIngredient from '@/components/AddRecipe/RegisterUnit'
export default {
    props: ['currentRecipe'],
    created() {
        this.getRecipe()
    },
    methods: {
        getAmountsAsString(amount, unit) {
            switch (unit) {
                case 'AMOUNT' : 
                    return amount + ' st'
                case 'WEIGHT' :
                    if(amount % 1000 === 0) {
                        return amount / 1000 + ' kg'
                    } else if(amount % 100 === 0) {
                        return amount / 100 + ' hg'
                    }  else {
                        return amount + ' g'
                    } 
                case 'VOLUME' : 
                    if (amount % 1000 === 0 ) {
                        return amount / 1000 + ' l'
                    } else if (amount % 100 === 0 ) {
                        return amount / 100 + ' dl'
                    } else if (amount % 10 === 0 ) {
                        return amount / 10 + ' cl'
                    } else {
                        return amount + ' ml'
                    }
            }

        },
        increaseUnit() {
            if(this.unitNavigation >= this.weights.length - 1) {
                this.unitNavigation = 0
            } else {
                this.unitNavigation++
            }
        },
        decreaseUnit() {
            if(this.unitNavigation === 0) {
                this.unitNavigation = this.weights.length - 1
            } else {
                this.unitNavigation--
            }
        },
        deleteIngredient(id) {
            axios.delete(ENDPOINTS.MAIN + ENDPOINTS.DELETE_RECIPE_INGREDIENT + id)
                .then(result => {
                    console.log(result)
                    if(result.status === 202){
                       this.getRecipe()
                    } 
            })
        },
        getRecipe() {
            axios.get(ENDPOINTS.MAIN + ENDPOINTS.GET_RECIPE + this.currentRecipe.recipeId)
                .then(res => this.updatedIngredients = res.data.ingredients)
        },
        onSubmit() {
            this.enterInputMode = true
            const fetchedIngredient = this.getChosenIngredient(this.ingredientName)[0]
            
            if (fetchedIngredient === undefined) {
                this.chosenIngredient = ''
                this.setNewIngredient = true
            } else {
                this.setNewIngredient = false
                this.chosenIngredient = fetchedIngredient
            }
        },
        resetInputField() {
           this.resetSearchIngredient()
           this.enterInputMode = false
        },
        getChosenIngredient(ingredient) {
            return this.$store.state.allIngredients.filter(item => item.name.toLowerCase() === ingredient.toLowerCase())
        },
        register(amount) {
            this.amount = amount
            this.enterInputMode = false
            this.registerNewRecipeIngredient()
        },
        resetSearchIngredient() {
            this.chosenIngredient = ''
            this.ingredientName = ''
        },
        setUnit(newUnit) {
            this.registerNewIngredient(newUnit)
            this.setNewIngredient = false
        },
        registerNewIngredient(newUnit) {
            const message =   {
                    name: this.ingredientName,
                    unit: newUnit
                }
            
            axios.post(ENDPOINTS.MAIN + ENDPOINTS.ADD_INGREDIENT , message)
                .then(result => this.chosenIngredient = result.data)
        },
        registerNewRecipeIngredient() {
            const message =  {
                    ingredientId: this.chosenIngredient.id,
                    recipeId: this.currentRecipe.recipeId,
                    amount: this.amount
                }
            axios.post(ENDPOINTS.MAIN + ENDPOINTS.ADD_RECIPE_INGREDIENT , message)
                .then(result => {
                    if(result.status === 201) {
                        this.resetSearchIngredient()
                        this.getRecipe()
                    }
            })
        },
        addIngredientToIngredientList() {
            this.$emit('addToIngredientList', this.chosenIngredient)
        },
        goBack(){
            this.$emit('goBack')
        },
        goForward(){
            this.$emit('goForward')
        }
    },
    data: function () {
        return {
            changeUnitFor: null,
            updatedIngredients: [],
            value: 0,
            unitNavigation: 0,
            weights: [{value: 1, text: "gr"}, {value: 100, text: "hg"}, {value: 1000, text: "kg"} ],
            amount: 0,
            ingredientName: '',
            enterInputMode: false,
            chosenIngredient: '',
            setNewIngredient: false,
        }
    },  
    computed: {
        ingredients() {
            return this.$store.state.allIngredients.map(item => item.name)
        }
    },
    components: {
        InputWeightUnit,
        InputVolumeUnit,
        InputAmountUnit,
        RegisterNewIngredient
    }  
}
</script>
<style scoped>

    .inputingredient {
        margin-left: 1rem;
        margin-right: 1rem;
    }

    .navigationButtons {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }


</style>