<template>
    <div class="screen">
        <div v-if="!$store.state.loggedin">
            <input type="text" name="email" id="email" v-model="email" placeholder="Email">
            <input type="text" name="password" id="password" v-model="password" placeholder="Password">
            <b-button @click="loginUser" variant ="success">Login</b-button>
        </div>
        <b-button @click="logoutUser" variant="danger" v-else>Logout</b-button>
    </div>
</template>
<script>
import firebase from 'firebase'
export default {
    data: function () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        loginUser() {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            })
            .then(data => this.$store.commit('setUser', data.user.uid))
        },
        logoutUser() {
                  firebase
                    .auth()
                    .signOut()
                    .then(this.$store.commit('setUser', null))
        }
    }
    
}
</script>
<style scoped>
    .screen {
        margin: 2rem;
    }
</style>
