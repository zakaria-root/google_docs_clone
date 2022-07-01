import { signIn } from 'next-auth/client'
import Image from 'next/image';
import React from 'react'
import { useAuth } from '../components/contexts/authContext'

function Login() {
  const { signInWithGoogle } = useAuth();
  return (

    <div className="place-content-center grid mt-60">
      <div className="relative w-52 h-56 cursor-pointer">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png"
          layout="fill"
        />
      </div>
      <button
        onClick={signInWithGoogle}
        class="button button-blue mt-7  font-bold text-md"
        data-ripple-light="true">
        Sign In
      </button>
     
    </div>

  )
}

export default Login
