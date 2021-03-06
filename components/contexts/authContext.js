import { createContext, useContext, Context, useEffect, useState } from 'react'
import { auth } from '../../firebase'
import firebase from 'firebase'
import { useRouter } from 'next/router';
import useFirebaseAuth from '../auth/useFarebaseAuth'
import Loading from '../../components/Loading'

const authUserContext = createContext({

});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth()
  return <authUserContext.Provider value={auth}>{auth.loading ? <Loading /> : children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);