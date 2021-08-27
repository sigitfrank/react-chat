import React, { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import GoogleButton from './Components/Login/GoogleButton'
import './chat.css'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import Channel from './Components/Channel/Channel'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "remain-silent.firebaseapp.com",
  projectId: "remain-silent",
  storageBucket: "remain-silent.appspot.com",
  messagingSenderId: "1047246121514",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "process.env.REACT_APP_MEASUREMENT_ID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const db = firebase.firestore()


function App() {
  const [user, setUser] = useState(() => auth.currentUser)
  const [initializing, setInitializing] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }

      if (initializing) {
        setInitializing(false)
      }
    })

    return unsubscribe
  }, [initializing])

  const signOut = async () => {
    try {
      await firebase.auth().signOut()
    } catch (error) {
      console.error(error.message);
    }
  }

  if (initializing) return 'Loading...'

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    auth.useDeviceLanguage()

    try {
      await auth.signInWithPopup(provider)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        {user ? (<>
          <div className="col-md-8">
            <div className="card mt-5 p-3">
              <div className="chat-header">
                <GoogleButton status='signout' onClick={signOut} >Sign Out</GoogleButton>
              </div>
              <div className="chat-body">
                <Channel user={user} db={db} />
              </div>
            </div>
          </div>
        </>
        ) : (<div className="col-md-8">
          <div className="card mt-5">
            <div className="card-body text-center">
              <FcGoogle style={{ fontSize: "7rem", cursor: "pointer" }} onClick={signInWithGoogle} />
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

export default App;
