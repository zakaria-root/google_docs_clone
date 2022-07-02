import { signIn } from 'next-auth/client'
import Image from 'next/image';
import React from 'react'
import { useAuth } from '../components/contexts/authContext'

function Login() {
  const { signInWithGoogle } = useAuth();
  return (

    <div className=" max-w-xl mx-auto grid justify-items-center mt-60">
      <div className="relative w-48 h-52 cursor-pointer" >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png"
          layout="fill"
        />
      </div>

      <h1 className="text-5xl text-center py-8 text-gray-400"><span className="font-semibold text-gray-500">Google</span> Docs</h1>
      <button
        onClick={signInWithGoogle}
        class="button button-blue  mt-3 font-bold text-md px-20  "
        data-ripple-light="true">
        Sign In
      </button>

    </div>

  )
}

export default Login
