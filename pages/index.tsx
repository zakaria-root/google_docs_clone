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
        <div className="max-w-3xl mx-auto ">
          <div className="flex items-center justify-between">
            <h2 className="capitalize text-lg text-slate-600 p-3">
              start a new document
            </h2>
            <button className=" button button-text rounded-full hover:bg-slate-100 md:mr-2 my-1 px-4 py-1 p-3 text-lg">
              <i className="fa-solid fa-ellipsis-vertical text-slate-600"></i>
            </button>
          </div>
          <div className="flex"></div>
        </div>
        
        
      </section>
      <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></script>
      <script src="https://unpkg.com/@material-tailwind/html@latest/scripts/script-name.js"></script>
    </>
  );
};

export default Home;
