<template>
    <div class="screen">
        <div v-if="!$store.state.loggedin">
            <h1>Logga in</h1>
            <input type="text" name="email" id="email" v-model="email" placeholder="Email">
            <input type="password" name="password" id="password" v-model="password" placeholder="Password">
            <b-button @click="loginUser" variant ="success">Login</b-button>
            <b-button @click="resetPassword" variant ="warning">Forgot password</b-button>
        </div>
        <div v-else>
            <h1>Du är inloggad</h1>
            <b-button @click="logoutUser" variant="danger">Logout</b-button>
        </div>
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
        },
        resetPassword(){
            this.$router.push({name: 'reset'})
        }
    }
    
}
</script>
<style scoped>
    .screen {
        margin: 2rem;
    }
</style>
