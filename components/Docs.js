import { useRouter } from 'next/router'

import React, { useState } from 'react'
import { db } from '../firebase';
import { useAuth } from './contexts/authContext';

function Docs({ docName, author, createdAt, docId, partager, owner }) {
  const route = useRouter();
  const { user } = useAuth();
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [showUpdateModal, setShowUpdateModal] = useState(false);
  const [input, setInput] = useState('')
  let disabled = false;
  if (owner) {
    if (owner == user.email) {
      disabled = true;
    }
  }

  //todo : update doc fnction
  const updateDoc = () => {
    if (user) {
      if (partager) {
        db
          .collection('userDocsPartager')
          .doc(docId)
          .set({
            docName: input
          },
            {
              merge: true
            }
          ).then(() => {
            setShowUpdateModal(false);
          })
      } else {
        db
          .collection('userDocs')
          .doc(user?.email)
          .collection('docs')
          .doc(docId)
          .set({
            docName: input
          },
            {
              merge: true
            }
          ).then(() => {
            setShowUpdateModal(false);
          })
      }

    }

  }
  //todo: delete doc funtion
  const deleteDoc = () => {
    if (user) {
      if (partager) {
        //! owner le seul qui peu supprimer le doc
        db.collection('userDocsPartager')
          .doc(docId)
          .delete()
          .then(() => {
            setInput('')
            console.log('document is deleted');
            setShowDeleteModal(false)
          })
          .catch((error) => { console.log("Error deleting document: ", error) })
      } else {
        db.collection('userDocs')
          .doc(user?.email)
          .collection('docs')
          .doc(docId)
          .delete()
          .then(() => {
            setInput('')
            console.log('document is deleted');
            setShowDeleteModal(false)
          })
          .catch((error) => { console.log("Error deleting document: ", error) })
      }

    }

  }

  // todo :modal for create a new doc 
  let updateModal = () => {
    if (showUpdateModal == true) {
      return <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

            <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-xs sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-3 capitalize " id="modal-title"><i class="fa-solid fa-marker text-blue-400 pr-2"></i>modifier le doc</h3>
                <input
                  onChange={(e) => setInput(e.target.value)}
                  class="shadow appearance-none border-gray-300 rounded w-full py-2 px-3  leading-tight focus:outline-none  focus:shadow-outline bg-gray-100 text-gray-500 focus:border-blue-200" id="docName" type="text" placeholder="Nouveau Nom Du Doc" />
              </div>
              <div class="bg-gray-50 px-4 py-3  sm:px-6 sm:flex sm:flex-row-reverse place-content-center">
                <button
                  onClick={() => updateDoc()}
                  class="px-8 button button-orange font-semibold" data-ripple-light="true">
                  Modifier
                </button>
                <button onClick={() => setShowUpdateModal(false)} class="button button-white shadow-md mr-4 text-blue-500 font-semibold" data-ripple-light="true">
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


  //todo : modal for delet function
  let deleteModal = () => {
    if (showDeleteModal == true) {
      return <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">

            <div class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-3 capitalize" id="modal-title"><i class="fa-solid fa-circle-exclamation text-red-400 pr-2"></i>suppresion du doc</h3>
                <p className="text-gray-500">vous etes sure que vous voulez supprimer ce doc</p>
              </div>
              <div class="bg-gray-50 px-4 py-3  sm:px-6 sm:flex sm:flex-row-reverse place-content-center">
                <button
                  onClick={() => deleteDoc()}
                  class="px-8 button button-red font-bold" data-ripple-light="true">
                  Oui
                </button>
                <button onClick={() => setShowDeleteModal(false)} class="button button-white shadow-md mr-4 text-blue-500 font-semibold" data-ripple-light="true">
                  Non
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
    {deleteModal()}
    {updateModal()}
    < div

      className='hover:bg-blue-100 rounded-full'>

      <div className="flex items-center justify-between px-5 py-1 mt-3  rounded-full cursor-pointer">
        <div
          onClick={() => {
            if (partager) {
              route.push(`partager/${docId}`)
            } else {
              route.push(`/${docId}`)
            }
          }}
          className="flex  items-center ">
          <i class="fa-solid fa-file-lines text-3xl mr-5 lg:mr-10 text-blue-500"></i>
          <h1 className="text-gray-700 mr-5 lg:mr-10 w-20 md:w-20">{docName}</h1>
          <i class="fa-solid fa-user-group text-gray-600 "></i>
        </div>

        <div
          onClick={() => {
            if (partager) {
              route.push(`partager/${docId}`)
            } else {
              route.push(`/${docId}`)
            }
          }}
          className="flex items-center ">
          <h1 className="px-10 lg:px-20 text-gray-600">{author} {partager && "et d'autre"}</h1>
          <h1 className="px-10 lg:px-20 text-gray-500 tracking-widest text-sm">{createdAt?.toDate().toLocaleDateString()}</h1>
        </div>
        <div className="">
          {!disabled ? <button
            onClick={() => setShowUpdateModal(true)}
            className="button button-text rounded-full  text-gray-500 hover:text-blue-500 hover:bg-gray-300 my-1 px-3 py-1 p-3 text-lg"
            data-ripple-dark="true"
          >
            <i class="fa-solid fa-file-pen"></i>
          </button> :
            <button

              className="button button-text rounded-full  text-gray-500 hover:text-blue-500 hover:bg-gray-300 my-1 px-3 py-1 p-3 text-lg"
              data-ripple-dark="true"
            >
              <i class="fa-solid fa-minus"></i>
            </button>}

          {!disabled ? <button
            onClick={() => setShowDeleteModal(true)}
            className="button button-text rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-300 my-1 px-3 py-1 p-3 text-lg"
            data-ripple-dark="true"
          >
            <i class="fa-solid fa-trash"></i>  </button> :
            <button

              className="button button-text rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-300 my-1 px-3 py-1 p-3 text-lg"
              data-ripple-dark="true"
            >
              <i class="fa-solid fa-minus"></i></button>
          }

        </div>

      </div>
      <hr className="ml-14 mr-10" />

    </div>
  </>

  )
}

export default Docs
