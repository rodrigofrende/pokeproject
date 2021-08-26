import store from '@/store'
import { collection, doc, getDocs, getFirestore, addDoc   } from "firebase/firestore";
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCHbnM8g1dLbhRtni3uS2rusEnT1xP4HHY",
  authDomain: "rf-pokeproject.firebaseapp.com",
  projectId: "rf-pokeproject",
  storageBucket: "rf-pokeproject.appspot.com",
  messagingSenderId: "406580085575",
  appId: "1:406580085575:web:2ae4f30eb5dc7877344262",
  measurementId: "G-ZT8EWESMLV"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export const getSubmittedTeams = async (url) => {
  const querySnapshot = await getDocs(collection(db, "teams"));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  // });
  let returnData = []
  querySnapshot.forEach( item => {
    returnData.push(item.data())
  });
  return returnData
}

export const getSubmittedNames = async (url) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  // });
  let returnData = []
  querySnapshot.forEach( item => {
    returnData.push(item.data())
  });
  return returnData
}

export const postMyTeam = async (team) => {
  const user = JSON.parse(localStorage.getItem("userData"))
  for (const pokemon of team) {
    const contents = await addDoc(collection(db, "teams"), {
      order: pokemon.order,
      pokemonId: pokemon.id,
      isShiny: pokemon.isShiny,
      name: pokemon.name,
      userName: user.userName
    })
  }
  return team
}

export const postNewUser = async (name) => {
  debugger
  const data = await addDoc(collection(db, "users"), {
    name: name
  })
  return data
}