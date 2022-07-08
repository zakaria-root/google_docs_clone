import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../components/contexts/authContext';
import NavDoc from '../components/NavDoc'
import { db } from '../firebase';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from 'next/dynamic';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import Head from 'next/head';
import * as htmlToImage from "html-to-image";
import Document from 'next/document';

const Editor = dynamic(() => import("react-draft-wysiwyg").then(module => module.Editor), {
  ssr: false,
})

function Doc() {


  const { user } = useAuth()
  const route = useRouter()
  const docId = route.asPath.substring(1)

  const [doc, setDoc] = useState(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  //todo : take a screen to the image 
  
  // setInterval(() => {
  //   function screenGenerator() {
  //     var node = document.querySelector('#doc')
  //     htmlToImage
  //       .toPng(node)
  //       .then(function (dataUrl) {
  //         // var img = new Image();
  //         // img.src = dataUrl;
  //         console.log(dataUrl);
  //         db
  //           .collection('userDocs')
  //           .doc(user?.email)
  //           .collection('docs')
  //           .doc(docId)
  //           .set({
  //             image: dataUrl
  //           },
  //             {
  //               merge: true
  //             }
  //           )
  //       })
  //       .catch(function (error) {
  //         console.error("oops, something went wrong!", error);
  //       });
  //   }
  //   screenGenerator()
  // }, 1000);



  //todo: change the data in editor state
  const onEditorStateChange = async (e) => {

    setEditorState(e);
    await db
      .collection('userDocs')
      .doc(user?.email)
      .collection('docs')
      .doc(docId)
      .set({
        editorState: convertToRaw(editorState.getCurrentContent()),
      },
        {
          merge: true
        }
      )
  }

  // todo: get the doc with the uid 
  useEffect(() => {
    function getDoc() {
      let state = null
      db
        .collection('userDocs')
        .doc(user?.email)
        .collection('docs')
        .doc(docId)
        .get()
        .then((Sdoc) => {
          setDoc({
            id: Sdoc.id, data: Sdoc.data()
          })

          if (Sdoc?.data()?.editorState) {

            state = Sdoc?.data()?.editorState
            setEditorState(EditorState.createWithContent(convertFromRaw(state)))
          }

        })
    }

    return () => getDoc()
  }, [])
  function getDoc() {
    let state = null
    db
      .collection('userDocs')
      .doc(user?.email)
      .collection('docs')
      .doc(docId)
      .get()
      .then((Sdoc) => {
        setDoc({
          id: Sdoc.id, data: Sdoc.data()
        })

        if (Sdoc?.data()?.editorState) {

          state = Sdoc?.data()?.editorState
          setEditorState(EditorState.createWithContent(convertFromRaw(state)))
        }

      })
  }
  if (!(document.readyState === "complete")) {

    window.addEventListener("load", getDoc());
    // Remove the event listener when component unmounts
    return () => window.removeEventListener("load", getDoc());
  }




  if (!user) {
    return route.replace('/login')
  }

  return (
    <div>



      <NavDoc userImage={user?.photoURL} docName={doc?.data?.docName} docId={docId} />
      <div id="doc" className="min-h-screen bg-gray-100 mb-3" >
        <Editor
          editorState={editorState}
          toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
          // wrapperClassName="wrapperClassName"
          editorClassName="max-w-5xl bg-white mt-5 p-8 mx-auto shadow-md rounded-sm mb-12 border"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </div>
  )
}

export default Doc

