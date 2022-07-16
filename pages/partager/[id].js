import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../components/contexts/authContext';
import NavDoc from '../../components/NavDoc'
import { db } from '../../firebase';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from 'next/dynamic';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
// import { setInterval } from 'timers/promises';

const Editor = dynamic(() => import("react-draft-wysiwyg").then(module => module.Editor), {
  ssr: false,
})

function Doc() {


  const { user } = useAuth()
  const route = useRouter()
  const docId = route.asPath.substring(1 + "partager".length)

  const [doc, setDoc] = useState(null)
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  //todo: change the data in editor state
  const onEditorStateChange = async (e) => {

    setEditorState(e);
    await db
      .collection('userDocsPartager')
      .doc(docId)
      .set({
        editorState: convertToRaw(editorState.getCurrentContent())
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
        .collection('userDocsPartager')
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

    return getDoc()
  }, [!editorState])

  function getDoc() {
    let state = null
    db
      .collection('userDocsPartager')
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

  // setInterval(() => {
  //    getDoc()
  // }, 1000);

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



      <NavDoc userImage={user?.photoURL} docName={doc?.data?.docName} docId={docId} owner={doc?.data?.owner} />
      <div className="min-h-screen bg-gray-100 mb-3" >
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

