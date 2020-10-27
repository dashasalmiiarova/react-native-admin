import { auth } from './firebase';

export async function signup(email, password){
    // await firebase.auth().setPersistence();
    auth().createUserWithEmailAndPassword(email, password);
}

export async function signin(email, password){
    // await firebase.auth().setPersistence();
    auth().signInWithEmailAndPassword(email, password);
}

export function logout(){
    return auth().signOut();
}