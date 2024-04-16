import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBXWTMKuku1RrND4zjjj_DHZEoH728pVCA",
  authDomain: "discord-clone-final.firebaseapp.com",
  projectId: "discord-clone-final",
  storageBucket: "discord-clone-final.appspot.com",
  messagingSenderId: "561512412156",
  appId: "1:561512412156:web:aad36e5df0c3aac98df879",
  measurementId: "G-R35D6BDS9Y"
};
const firebaseApp =firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth =firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();

export {auth,provider};  
export default db;