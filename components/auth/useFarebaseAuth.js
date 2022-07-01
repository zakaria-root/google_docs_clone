import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Firebase, { auth } from '../../firebase'
import { useAuth } from "../contexts/authContext"
import firebase from 'firebase'
export default function useFirebaseAuth() {

  const route = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const clear = () => {
    setUser(null);
    setLoading(true);
  };

  const provider = new firebase.auth.GoogleAuthProvider();

  // const signInWithEmailAndPassword = (email, password) =>
  //   Firebase.auth().signInWithEmailAndPassword(email, password);

  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        setUser(user)
        setLoading(false);
        route.push('/')
      }).catch((error) => {
        console.log(error)
      });
  }


  // const createUserWithEmailAndPassword = (email, password) =>
  //   auth.createUserWithEmailAndPassword(email, password);

  const signOut = () => Firebase.auth().signOut().then(() => { clear() });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    // signInWithEmailAndPassword,
    // createUserWithEmailAndPassword,
    signInWithGoogle,
    signOut,
  };
}
