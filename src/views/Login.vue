<template>
    <div>
        <input type="text" name="email" id="email" v-model="email" placeholder="Email">
        <input type="text" name="password" id="password" v-model="password" placeholder="Password">
        <button @click="loginUser">Login</button>
        <button @click="logoutUser">Logout</button>
        <div v-if="this.$store.state.userid">
            {{this.$store.state.userid}}
        </div>
        <div v-if="$store.state.loggedin">You are logged in</div>
        <div v-else>Not logged in</div>
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
            // Handle Errors here.
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

</style>
