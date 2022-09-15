//npm i firebase
import firebase from 'firebase';
import { useState, useEffect } from 'react';

//we have to intialise the firebase
firebase.initializeApp({
  apiKey: "AIzaSyDVdpG4AdbSDu_k86bn3oE9k47ahpUw_iU",
  authDomain: "signin-c5f06.firebaseapp.com",
  projectId: "signin-c5f06",
  storageBucket: "signin-c5f06.appspot.com",
  messagingSenderId: "29706955249",
  appId: "1:29706955249:web:300964239125c11a43fc50"
})

//we have assigned a firebase auth to local variable auth.From now onwards whatever the authentication process is occuring, we have to use auth
const auth = firebase.auth();

const App = () => {
  //To store the  Users after authentication is success
  const [user, setUser] = useState(null);
//After Authentication is Successfull, we have to check if there is any User is there or not
  useEffect(() => {
    auth.onAuthStateChanged(person => {
      if (person) {
        setUser(person)             //if user is there we have to store in a varibale
      }
      else {
        setUser(null)                 //otherWise Set the User to null
      }
    })
  })

  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); //when we are clicking on button, it want to show popup
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <center>

{   /* By depending on the User We have to check that whether we have to move to Home page Component or Signin Page  */}

        {user ?
            <div className='container shadow mt-5 p-3  '>
              <h1>Welcome to home page </h1>
              <button className='btn btn-danger' onClick={() => auth.signOut()}>Sign Out</button>
            </div>
          :
             <button className='btn btn-success' onClick={signInWithGoogle}>Sign In With Google</button>}

      </center>
    </div>
  )
}

export default App

