import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React from 'react'


function NavDoc({ userImage, docName }) {
  const image = userImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
  const route = useRouter()
  return (<>
    <div className='top-0 flex justify-between shadow-md items-center bg-white px-3' >

      <div className="flex ">
        <button
          onClick={() => route.push('/')}
          class="button button-text button-dark p-0 mt-2"
          data-ripple-light="true"
        >
          <Image src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png" alt="docs icon" width={45} height={45} className="object-cover " />
        </button>
        <div className="grid">
          <h1 className="capitalize text-2xl mt-4 text-gray-500 hidden md:block ml-3">
            {docName || 'undefined'}
          </h1>
          <div className="flex mb-1">
            <p className="px-3 capitalize hidden md:block cursor-pointer hover:bg-gray-100 rounded-sm ">file</p>
            <p className="px-3 capitalize hidden md:block cursor-pointer hover:bg-gray-100 rounded-sm">edite</p>
            <p className="px-3 capitalize hidden md:block cursor-pointer hover:bg-gray-100 rounded-sm">view</p>
            <p className="px-3 capitalize hidden md:block cursor-pointer hover:bg-gray-100 rounded-sm">insert</p>
            <p className="px-3 capitalize hidden md:block cursor-pointer hover:bg-gray-100 rounded-sm">format</p>
            <p className="px-3 capitalize hidden md:block cursor-pointer hover:bg-gray-100 rounded-sm">tools</p>
          </div>
        </div>


      </div>
      <div className="flex items-center">
        <button
          class="button button-blue mt-1 my-3 mr-3 font-bold text-md "
          data-ripple-light="true">
          partager
        </button>
        <div
          class="rounded-full hover:bg-gray-200 px-1  my-2 cursor-pointer"
        >
          <Image
            src={userImage}
            alt="profile image"
            width={40}
            height={40}
            className="rounded-full  object-cover mt-4"
          />
        </div>
      </div>

    </div>
  </>

  )
}


export default NavDoc
