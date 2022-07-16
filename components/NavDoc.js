import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Script from 'next/script'
import React, { useState } from 'react'
import { db } from '../firebase'
import { useAuth } from './contexts/authContext'
import firebase from 'firebase'

function NavDoc({ userImage, docName, docId, owner }) {
  const image = userImage || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
  const route = useRouter()
  let { user } = useAuth();
  const [showModalPartage, setshowModalPartage] = useState(false)
  const [input, setInput] = useState('')
  const [doc, setDoc] = useState(null)
  let disabled = false
  console.log(owner);
  if (owner) {
    if (owner != user?.email) {
      disabled = true
    }
  }

  //todo : la fonction du partage
  const partager = () => {
    if (user) {
      db
        .collection('userDocs')
        .doc(user?.email)
        .collection('docs')
        .doc(docId)
        .get()
        .then((Sdoc) => {

          db
            .collection('userDocsPartager')
            .add({
              docName: Sdoc.data().docName,
              timstamp: firebase.firestore.FieldValue.serverTimestamp(),
              editorState: Sdoc.data().editorState,
              emails: [user?.email, 'elmourtazakzakaria@gmail.com'],
              owner: user?.email
            }).then((docRef) => {
              // console.log("Document shered with ID: ", docRef.id);
              db.collection('userDocs')
                .doc(user?.email)
                .collection('docs')
                .doc(docId)
                .delete()
                .then(() => {
                  setInput('')
                  console.log('document is deleted');
                  setshowModalPartage(false)
                  route.replace('/');
                })
                .catch((error) => { console.log("Error deleting document: ", error) })

            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        })


    }

  }

  //todo : modal de partage
  let modalPartage = () => {
    if (showModalPartage == true) {
      return <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

            <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xs sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-3 capitalize" id="modal-title">partager par</h3>
                <input
                  // type="email"
                  onChange={(e) => setInput(e.target.value)}
                  class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3  leading-tight focus:outline-none  focus:shadow-outline bg-gray-100 text-gray-500 focus:border-blue-200" id="docName" type="email" placeholder="entre une email" />
              </div>
              <div class="bg-gray-50 px-4 py-3  sm:px-6 sm:flex sm:flex-row-reverse place-content-center">
                <button
                  onClick={() => partager()}
                  class="px-8 button button-blue font-semibold" data-ripple-light="true">
                  Partager
                </button>
                <button onClick={() => setshowModalPartage(false)} class="button button-white shadow-md mr-4 text-blue-500 font-semibold" data-ripple-light="true">
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

  return (<>
    {modalPartage()}
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
      <div className="flex items-center ">
        <button
          onClick={() => { !disabled && setshowModalPartage(true) }}
          // {disbaled ==true ? 'class="button  button-blue mt-1 my-3 mr-3 font-bold text-md  " ' : 'class='}
          class={!disabled ? "button  button-blue mt-1 my-3 mr-3 font-bold text-md" : "button  button-red mt-1 my-3 mr-3 font-bold text-md "}

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
