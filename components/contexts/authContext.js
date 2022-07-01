import { createContext, useContext, Context, useEffect, useState } from 'react'
import { auth } from '../../firebase'
import firebase from 'firebase'
import { useRouter } from 'next/router';
import useFirebaseAuth from '../auth/useFarebaseAuth'

const authUserContext = createContext({

});

export function AuthUserProvider({ children }) {
  // const route = useRouter()
  // const [user, setUser] = useState(null)
  // const [loading, setLoading] = useState(true)
  // var provider = new firebase.auth.GoogleAuthProvider();

  // const signInWithGoogle = () => {
  //   auth
  //     .signInWithPopup(provider)
  //     .then(({ user }) => {
  //       setUser({
  //         uid: user.uid,
  //         email: user.email,
  //         useName: user.displayName
  //       });
  //       setLoading(false);
  //       console.log(user);
  //       route.push('/')
  //     }).catch((error) => {
  //       console.log(error)
  //     });
  // }

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       setUser(user)
  //     } else {
  //       setUser(null)
  //     }
  //     setLoading(false)
  //   })
  //   return () => unsubscribe();
  // }, []);
  const auth = useFirebaseAuth()
  return <authUserContext.Provider value={auth}>{auth.loading ? "loding .." : children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);