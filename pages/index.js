
import Head from "next/head";
import Image from "next/image";



import { useEffect } from "react";
import { useAuth } from "../components/contexts/authContext";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import Docs from '../components/Docs';

const Home = () => {
  // const route = useRouter()
  const { user } = useAuth();
  const { signOut } = useAuth();
  console.log(user);
  // if (user) {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
          rel="stylesheet"
        />
      </Head>
      {/* banner */}
      <section className="bg-gray-100 px-8 md:px-24 py-3">
        <div className="max-w-5xl mx-auto ">
          <div className="flex items-center justify-between">
            <h2 className="capitalize text-lg text-gray-600 p-3">
              Créer un document
            </h2>
            <div className="">
              <button
                className=" button text-gray-600 rounded-md hover:bg-gray-300 md:mr-2 my-1 px-4 py-1 p-3 text-lg"
                data-ripple-dark="true"
              >
                <span className="capitalize text-sm">galrie de modeles</span>
                <i className="fa-solid fa-sort ml-2 text-sm"></i>
              </button>
              <button
                className=" button button-text rounded-full hover:bg-gray-300 md:mr-2 my-1 px-4 py-1 p-3 text-lg"
                data-ripple-dark="true"
              >
                <i className="fa-solid fa-ellipsis-vertical text-gray-600"></i>
              </button>
            </div>
          </div>
          <div className="relative w-32 h-44 border-gray-200 border-2  hover:border-blue-400 cursor-pointer rounded-md">
            <Image
              src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              layout="fill"
              className="rounded-md"
            />
          </div>
          <h2 className="text-sm font-semibold p-3">Vide</h2>
        </div>

        {/* <button onClick={signOut}>
          logout...
        </button> */}
      </section >

      {/* body */}
      <section className="max-w-5xl mx-auto px-8 md:px-24 lg:px-5 py-3 mt-3">
        {/* header of the body */}
        <div className="flex justify-between items-center mb-5" >
          <h1 className="text-md font-semibold">Les 30 jours précédents</h1>

          <div className="flex items-center">
            <select name="filterDocs" id="docs-select" className="text-sm h-6 w-14 hover:bg-gray-300 mr-5">
              <option value="">Tout</option>
              <option value="dog">Cree Par Moi</option>
              <option value="cat">Non Cree par Moi</option>
            </select>
            < h1 className="text-sm font-semibold mr-5">Dernière ouverture par moi</h1>
            <button
              className=" button text-gray-600 rounded-full hover:bg-gray-300 md:mr-2 my-1 px-3 py-1 p-3 text-lg"
              data-ripple-dark="true"
            >
              <i class="fa-solid fa-qrcode "></i>
            </button>
            <button
              className=" button text-gray-600 rounded-full hover:bg-gray-300 md:mr-2 my-1 px-3 py-1 p-3 text-lg"
              data-ripple-dark="true"
            >
              <i class="fa-solid fa-arrow-down-a-z"></i>
            </button>
            <button
              className=" button text-gray-600 rounded-full hover:bg-gray-300 md:mr-2 my-1 px-3 py-1 p-3 text-lg"
              data-ripple-dark="true"
            >
              <i class="fa-solid fa-folder-closed"></i>
            </button>
          </div>
        </div>
        {/* content of the body */}
        <Docs/>
        <Docs/>
        <Docs/>
        <Docs/>
      </section >


      <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
      <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/script-name.js"></script>
    </>
  )
  // } else {
  // route.push('/login')
  // }
};

export default Home;
