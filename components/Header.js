import { Button } from "@material-tailwind/react"
import { Icon } from "@material-tailwind/react"
import Head from "next/head"
import Script from 'next/script'
import React from 'react'

export default function Header({ children }) {
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

      {/* nave bare  */}
      <div className="top-0 flex p-1 justify-between shadow-md items-center bg-white px-3">
        <div className="flex ">
          <button
            class="button button-text rounded-full hover:bg-slate-100 md:mr-2 my-1 px-4 py-1 hidden md:block "
            data-ripple-dark="true"
          >
            <i class="fa-solid fa-bars text-xl text-slate-600 py-2"></i>
          </button>
          <button
            class="button button-text button-dark mr-3 p-0"
            data-ripple-light="true"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png" alt="docs icon" width="40px" className="object-cover h-11" />
          </button>
          <span className="capitalize text-2xl mt-4 text-slate-500 hidden md:block">
            docs
          </span>
        </div>


        <div className="p-1 rounded-lg bg-slate-100 flex flex-auto mx-1 md:mx-20">
          <div
            class="rounded-full hover:bg-slate-200 px-3 py-2 cursor-pointer "
          >
            <i class="fa-solid fa-magnifying-glass text-md"></i>
          </div>
          <input type="text" placeholder="Rechercher" className="bg-transparent mx-3 focus:border-0 w-full text-slate-500 text-md outline-none" />
        </div>
        <div className="flex "></div>
        <div
          class="rounded-full hover:bg-slate-100  px-4  py-3 mr-2 cursor-pointer hidden md:block"
        >
          <i class="fa-solid fa-braille text-lg"></i>
        </div>
        <div
          class="rounded-full hover:bg-slate-200 px-1  my-3 cursor-pointer"
        >
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt="profile image"
            width="37px"
            className="rounded-full h-9 object-cover"
          />
        </div>

      </div>

      {children}
      <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
      <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/script-name.js"></script>
    </>
  )
}
