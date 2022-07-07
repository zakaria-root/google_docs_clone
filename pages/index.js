
import Head from "next/head";
import Image from "next/image";



import { useEffect, useState } from "react";
import { useAuth } from "../components/contexts/authContext";
import { useRouter } from "next/router";
import { auth, db } from "../firebase";
import Docs from '../components/Docs';
import Script from "next/script";
import firebase from "firebase"

const Home = () => {
  const route = useRouter()
  const [input, setInput] = useState('')
  const [docs, setDocs] = useState([])
  const [docPartager, setdocPartager] = useState([])
  let [showModal, setShowmodal] = useState(false);
  const { user } = useAuth();
  const { signOut } = useAuth();

  // TODO : create docs for pirtucaler user 
  const createDosHandler = () => {
    if (user) {
      db.collection('userDocs').doc(user?.email).collection('docs').add({
        docName: input,
        timstamp: firebase.firestore.FieldValue.serverTimestamp(),
      }).then((docRef) => {
        setShowmodal(false);
        setInput('');
        console.log("Document written with ID: ", docRef.id);
      })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }

  }

  // TODO :get all docs for the user 
  useEffect(() => {
    function getAllDocs() {
      if (user) {
        db
          .collection('userDocs')
          .doc(user?.email)
          .collection('docs')
          .orderBy("timstamp", 'desc')
          .onSnapshot((querySnapshot) => {
            let docsSnapshot = []
            querySnapshot.forEach((doc) => {
              if (doc) {
                docsSnapshot.push({ id: doc.id, data: doc.data() })
              }
            });
            setDocs(docsSnapshot);
            // console.log(docs);
          })
        db
          .collection('userDocsPartager')
          .orderBy("timstamp", 'desc')
          .onSnapshot((querySnapshot) => {
            let docsSnapshot = []
            querySnapshot.forEach((doc) => {
              if (doc) {
                docsSnapshot.push({ id: doc.id, data: doc.data() })
              }
            });
            setdocPartager(docsSnapshot);
            // console.log(docs);
          })
      }
    }

    getAllDocs(docs)
  }, [showModal])

  // todo :modal for create a new doc 
  let modal = () => {
    if (showModal == true) {
      return <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

            <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xs sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-3" id="modal-title">Nouveau Doc</h3>
                <input
                  onChange={(e) => setInput(e.target.value)}
                  class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3  leading-tight focus:outline-none  focus:shadow-outline bg-gray-100 text-gray-500 focus:border-blue-200" id="docName" type="text" placeholder="Nom du Doc" />
              </div>
              <div class="bg-gray-50 px-4 py-3  sm:px-6 sm:flex sm:flex-row-reverse place-content-center">
                <button
                  onClick={() => createDosHandler()}
                  class="px-8 button button-blue font-semibold" data-ripple-light="true">
                  Cree
                </button>
                <button onClick={() => setShowmodal(false)} class="button button-white shadow-md mr-4 text-blue-500 font-semibold" data-ripple-light="true">
                  Fermer
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    } else {
      return <></>
    }
  }

  // if (user) {
  return (
    <>

      {/* banner */}
      {modal()}
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
          <button type="button" onClick={() => setShowmodal(true)}>
            <div className="relative w-32 h-44 border-gray-200 border-2  hover:border-blue-400 cursor-pointer rounded-md">
              <Image

                src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
                layout="fill"
                className="rounded-md"
              />

            </div>
          </button>
          <h2 className="text-sm font-semibold p-3">Vide</h2>
        </div>


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
        {docs.map((doc) => {
          return <Docs
            key={doc.id}
            docId={doc?.id}
            docName={doc?.data?.docName}
            author={user?.displayName}
            createdAt={doc?.data?.timstamp}
            partager={false}
          />
        })}
        {docPartager.map((doc) => {
          const exist = doc?.data?.emails.filter(email => (user?.email == email))
          console.log(exist)
          if (exist.length > 0) {
            return <Docs
              key={doc.id}
              docId={doc?.id}
              docName={doc?.data?.docName}
              author={user?.displayName}
              createdAt={doc?.data?.timstamp}
              partager={true}
            />
          }

        })}
      </section >


      <Script src="https://unpkg.com/flowbite@1.4.7/dist/flowbite.js"></Script>
      <Script src="https://unpkg.com/@material-tailwind/html@latest/scripts/ripple.js"></Script>
      <Script src="https://unpkg.com/@material-tailwind/html@latest/scripts/script-name.js"></Script>
    </>
  )
  // } else {
  //   route.push('/login')
  // }
};

export default Home;
