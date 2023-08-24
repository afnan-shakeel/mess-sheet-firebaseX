<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createUser, getUser,getAllMess } from '../services/firebase';
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification';

const toast = useToast();
const router = useRouter()
const messOptions = ref()
onMounted(()=>{
    fetchMess()
})
const fetchMess =async () => {
    const mess = await getAllMess()
    console.log('mess', mess)
    messOptions.value = mess
}

const selectedMess = ref('');
const name = ref('');
const mobile = ref('');
const room = ref('');
const email = ref('');
const loader = ref(false);

const registerUser = async () => {
    if (!name.value || !mobile.value || !email.value) {
        alert('Please fill in all required fields.');
        return;
    }

    const register = await createUserWithEmailAndPassword(getAuth(), email.value, "asdasd")
        .then(async (data) => {
            console.log(data)
            const user = await getUser(email.value)
            console.log('user', user)
            if (user.length > 0) {
                loader.value = false
                toast.error("User already exists", { position: 'top' })
                return
            }
            const insertUserId = await createUser("zpHVgNvOXUICOM3UH6Ia",{name: name.value, email: email.value, mobile: mobile.value, room: room.value})
            console.log('user created', insertUserId)
            loader.value = false
            toast.success("User registered", { position: 'top' })
        })
        .catch((err) => {
            console.error(err)
            loader.value = false
            toast.error(err.message, { position: 'top' });
            return
        })
}

</script>

<template>
    <v-container>
        <v-card>
            <v-card-title>
                <h2>User Registration</h2>
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-select v-model="selectedMess" :items="messOptions" label="Mess"></v-select>
                    <v-text-field v-model="name" label="Name" required></v-text-field>
                    <v-text-field v-model="mobile" label="Mobile Number" required></v-text-field>
                    <v-text-field v-model="room" label="Room Number"></v-text-field>
                    <v-text-field v-model="email" label="Email" required></v-text-field>
                    <v-btn type="button" color="primary" @click="registerUser()">Register &nbsp;<v-progress-circular v-if="loader" color="white" :size="18" indeterminate></v-progress-circular></v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}

body {
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.login-container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    width: 300px;
}

.login-container h2 {
    text-align: center;
}

.input-group {
    margin-bottom: 15px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
}

.input-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

.login-button {
    width: 100%;
    background-color: #007bff;
    color: white;
    border: none;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 3px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #0056b3;
}
</style>
