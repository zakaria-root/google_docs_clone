import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import Header from "../components/Header";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/@material-tailwind/html@latest/styles/material-tailwind.css"
          rel="stylesheet"
        />
      </Head>
      <section className="bg-slate-100">
        <div className="max-w-2xl mx-auto ">
          <div className="flex items-center justify-between">
            <h2 className="capitalize text-lg text-slate-600 p-3">
              Créer un document
            </h2>
            <div className="">
              <button
                className=" button text-slate-600 rounded-md hover:bg-slate-300 md:mr-2 my-1 px-4 py-1 p-3 text-lg"
                data-ripple-dark="true"
              >
                <span className="capitalize text-sm">galrie de modeles</span>
                <i className="fa-solid fa-sort ml-2 text-sm"></i>
              </button>
              <button
                className=" button button-text rounded-full hover:bg-slate-300 md:mr-2 my-1 px-4 py-1 p-3 text-lg"
                data-ripple-dark="true"
              >
                <i className="fa-solid fa-ellipsis-vertical text-slate-600"></i>
              </button>
            </div>
          </div>
          <div className="relative w-32 h-44 border-slate-200 border-2 hover:border-blue-400 cursor-pointer rounded-md">
            <Image
              src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
              layout="fill"
              className="rounded-md"
            />
          </div>
          <h2 className="text-sm font-semibold p-3">Vide</h2>
        </div>
      </section>
      <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
      <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/script-name.js"></script>
    </>
  );
};

export default Home;
