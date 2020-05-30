<template>
    <div class="screen">
        <div v-if="!$store.state.loggedin">
            <h1>Återställ lösenord</h1>
            <input type="text" name="email" id="email" v-model="email" placeholder="Email">
            <b-button @click="resetPassword" variant ="success">Reset</b-button>
        </div>
        <div v-else>
            <h1>Du är redan inloggad!</h1>
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
        resetPassword() {
            if(this.email !== '') {
                firebase.auth().sendPasswordResetEmail(this.email).then(function() {
                    console.log('Sent email')
                }).catch(function(error) {
                    console.log(error)
                });
            }
        }
    }
    
}
</script>
<style scoped>
    .screen {
        margin: 2rem;
    }
</style>
