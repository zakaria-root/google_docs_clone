import { useRouter } from 'next/router'

import React from 'react'

function Docs({ docName, author, createdAt, docId, partager }) {
  const route = useRouter();
  return (
    < div
      onClick={() => {
        if (partager) {
          route.push(`partager/${docId}`)
        } else {
          route.push(`/${docId}`)
        }
      }}
      className='hover:bg-blue-100 rounded-full'>
      <div className="flex items-center justify-between px-5 py-1 mt-3  rounded-full cursor-pointer">
        <div className="flex  items-center ">
          <i class="fa-solid fa-file-lines text-3xl mr-5 lg:mr-10 text-blue-500"></i>
          <h1 className="text-gray-700 mr-5 lg:mr-10 w-10 md:w-20">{docName}</h1>
          <i class="fa-solid fa-user-group text-gray-600 "></i>
        </div>

        <div className="flex items-center ">
          <h1 className="px-10 lg:px-20 text-gray-600">{author} {partager && "et d'autre"}</h1>
          <h1 className="px-10 lg:px-20 text-gray-500 tracking-widest text-sm">{createdAt?.toDate().toLocaleDateString()}</h1>
        </div>
        <button
          className="button button-text rounded-full hover:bg-gray-300 my-1 px-4 py-1 p-3 text-lg"
          data-ripple-dark="true"
        >
          <i className="fa-solid fa-ellipsis-vertical text-gray-600"></i>
        </button>
      </div>
      <hr className="ml-14 mr-10" />

    </div>
  )
}

export default Docs
