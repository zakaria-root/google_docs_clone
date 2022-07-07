
import Head from "next/head"
import Image from "next/image";
import { useRouter } from "next/router"
import Script from 'next/script'
import React, { useState } from 'react'
import { useAuth } from "./contexts/authContext";
import NavDoc from './NavDoc'

export default function Header({ children }) {
  let route = useRouter();
  const showNavBar = route.asPath == '/' ? true : false;
  let [showModalProfile, setShowmodalProfile] = useState(false);
  let { user, signOut } = useAuth();
  const image = user?.photoURL || "https://www.vertmondeong.com/image/commentaire/personne7.png"

  //todo : modal de profile
  let modalProfile = () => {

    if (showModalProfile == true) {
      if (user) {
        return <div class="w-80 h-96 fixed z-20 top-16 right-5 bg-[#FFFFFF] border border-black-900 shadow-md rounded-lg" >
          <div className="grid justify-center px-4 pt-4 " >
            <div className="inline-flex place-content-center p-2">
              <Image

                src={image}
                alt="profile image"
                width={90}
                height={90}
                className="rounded-full h-9 object-cover"
              />

            </div>
            <div className="text-center  ">
              <h1 className="text-lg ">{user?.displayName || "undefined"}</h1>
              <p className="text-sm text-gray-500 ">{user?.email || "undefined"}</p>
              <div className=" border  hover:bg-gray-100 cursor-pointer  rounded-full  border-gray-300  p-2 my-5 mx-2 "> <p className="capitalize text-sm ">gerer votre compte google</p> </div>
            </div>
          </div>
          <hr />
          <div className="border-y-gray-200 border h-20">
            <div
              onClick={() => signOut()}
              className="capitalize p-2 text-center border border-gray-300  m-5 cursor-pointer hover:bg-gray-100 text-gray-600 rounded-md">
              se deconnecter du compt
            </div>
            <div className="flex justify-around pt-2 items-center">
              <div className="py-1 px-2 hover:bg-slate-100 cursor-pointer">
                <p className="text-xs">regle de confidentialite</p>
              </div> <p className="font-bold">.</p>
              <div className="py-1 px-2 hover:bg-slate-100 cursor-pointer">
                <p className="text-xs">Conditions d'utilisation</p>
              </div>
            </div>

          </div>
        </div >
      }
      else {
        return <div class="w-80 h-32 fixed z-20 top-16 right-5 bg-[#FFFFFF] border border-black-900 shadow-md rounded-lg" >

          <div className="border-b-gray-200 border h-20">
            <div
              onClick={() => { route.push('/login'); setShowmodalProfile(false) }}
              className="capitalize p-2 text-center border border-gray-300  m-5 cursor-pointer hover:bg-gray-100 text-gray-600 rounded-md">
              se connecte
            </div>
            <div className="flex justify-around pt-2 items-center">
              <div className="py-1 px-2 hover:bg-slate-100 cursor-pointer">
                <p className="text-xs">regle de confidentialite</p>
              </div> <p className="font-bold">.</p>
              <div className="py-1 px-2 hover:bg-slate-100 cursor-pointer">
                <p className="text-xs">Conditions d'utilisation</p>
              </div>
            </div>

          </div>
        </div >
      }

    } else {
      return <></>
    }
  }
  return (
    <>
      {/* header of the appliation */}
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
        <link
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
          rel="stylesheet"
        />
      </Head>

      {/* profile Modal */}
      {modalProfile()}
      {/* nave bare  */}

      {showNavBar && <div className='top-0 flex p-1 justify-between shadow-md items-center bg-white px-3' >
        <div className="flex ">
          <button
            class="button button-text rounded-full hover:bg-gray-100 md:mr-2 my-1 px-4 py-1 hidden md:block "
            data-ripple-dark="true"
          >
            <i class="fa-solid fa-bars text-xl text-gray-600 py-2"></i>
          </button>
          <button
            class="button button-text button-dark mr-3 p-0"
            data-ripple-light="true"
            onClick={() => route.push('/')}
          >
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png" alt="docs icon" width="40px" className="object-cover h-11" />
          </button>
          <span className="capitalize text-2xl mt-4 text-gray-500 hidden md:block">
            docs
          </span>
        </div>


        <div className="p-1 rounded-lg bg-gray-100 flex flex-auto mx-1 md:mx-16 lg:mx-48">
          <div
            class="rounded-full hover:bg-gray-200 px-3 py-2 cursor-pointer "
          >
            <i class="fa-solid fa-magnifying-glass text-md"></i>
          </div>
          <input type="text" placeholder="Rechercher" className="bg-transparent mx-3 focus:border-0 w-full text-gray-500 text-md outline-none" />
        </div>


        <div className="flex "></div>
        <div
          class="rounded-full hover:bg-gray-100  px-4  py-3 mr-2 cursor-pointer hidden md:block"
        >
          <i class="fa-solid fa-braille text-lg"></i>
        </div>
        <div
          onClick={() => setShowmodalProfile(!showModalProfile)}
          class="rounded-full hover:bg-gray-200 px-1  my-3 cursor-pointer"
        >

          <Image

            // src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            src={image}
            alt="profile image"
            width={37}
            height={37}
            className="rounded-full h-9 object-cover"
          />
        </div>

      </div>}


      {children}

    </>
  )
}
