// import firebase from 'firebase';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { collection, setDoc, doc, addDoc, getDocs, getDoc, Query, QueryDocumentSnapshot, QuerySnapshot, where, query } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
// const firebase_key = "../../keys/mess-sheet-firebase.json"
const firebaseConfig = {
    apiKey: "AIzaSyA_40gZMh6Y2_mZMPq4S9jCy0ICIwVtEY4",
    authDomain: "mess-sheet-df9b4.firebaseapp.com",
    projectId: "mess-sheet-df9b4",
    storageBucket: "mess-sheet-df9b4.appspot.com",
    messagingSenderId: "545458539151",
    appId: "1:545458539151:web:7cd5c2e704a30d3ff3fefa",
    measurementId: "G-JBHK05LKRP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const fetchCollections = async () => {
    const usersSnap: QuerySnapshot = await getDocs(collection(db, 'users'))
    const messSnap: QuerySnapshot = await getDocs(collection(db, 'mess'))
    return [usersSnap, messSnap]
}
var usersSnap: any;
var messSnap: any;
fetchCollections().then((arr) => {
    usersSnap = arr[0]
    messSnap = arr[1]
})
const getAllMess = async () => {
    const val: QueryDocumentSnapshot[] = messSnap.docs
    return val.map(doc => ({ id: doc.id, ...doc.data() }))
}

const getUsers = async () => {
    const val: QueryDocumentSnapshot[] = usersSnap.docs
    return val.map(doc => ({ id: doc.id, ...doc.data() }))
}

const getUser = async (email: string) => {
    const docRef = query(collection(db, 'users'), (where('email', '==', email)));
    const docSnapshot = await getDocs(docRef);
    return docSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
const createUser = async (mess_id: string, data: any) => {
    data.mess = doc(db, "/mess/zpHVgNvOXUICOM3UH6Ia")
    console.log(data);
    const docRef = collection(db, 'users');
    const docSnapshot = await addDoc(docRef, data);
    return docSnapshot.id
}


export { getUsers, getUser, createUser, getAllMess }