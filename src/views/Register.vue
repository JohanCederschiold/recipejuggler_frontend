<template>
    <div class="screen">
        <input type="text" name="name" id="name" v-model="name" placeholder="Name">
        <input type="text" name="email" id="email" v-model="email" placeholder="Email">
        <input type="text" name="password" id="password" v-model="password" placeholder="Password">
        <b-button @click="createUser" variant="success">Register</b-button>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    data: function () {
        return {
            email: '',
            name: '',
            password: ''
        }
    },
    methods: {
        createUser(){
            firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            })
            .then(data => console.log(data))
        }
    }
}
</script>
<style scoped>
    .screen {
        margin: 2rem;
    }
</style> 
