<script setup lang="ts">
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router'
import { getUsers, getUser } from '../services/firebase';
import {useToast} from 'vue-toast-notification';
const toast = useToast();
const router = useRouter()

const email = ref("")
const password = ref("")
const loader = ref(false)
const signIn = async ()=>{
  loader.value = true
  console.log('sign in')
    // const auth = getAuth()
    // const user = await getUsers()
    const user = await getUser(email.value)
    console.log('user',user)
    if(user.length==0){
      loader.value = false
      toast.error("Invalid User",{position: 'top'})
      return
    }
    const signing = await signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data)=>{
      console.log(data)
      loader.value = false
      router.push("/home")
    })
    .catch((err) => { 
      console.error(err)
      loader.value = false
      toast.error(err.message,{position: 'top'});
      return   
    })
}
const GoogleSignIn = ()=>{

}

</script>

<template>
  <v-container fluid style="width:100vw;">
    <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="6" xl="6">
            <v-card>
                <v-card-title class="text-center">
                    <h2>Sign In</h2>
                </v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field variant="outlined" density="compact" v-model="email" label="Username" required></v-text-field>
                        <v-text-field variant="outlined" density="compact" v-model="password" label="Password" type="password" required></v-text-field>
                        <v-btn type="button" color="primary" class="mt-4" @click="signIn()">{{!loader ? "Sign in" : "Signing In" }} &nbsp;<v-progress-circular v-if="loader" color="white" :size="18" indeterminate></v-progress-circular></v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<style>
</style>
