import React from 'react'

function Docs({ docName, author, createdAt }) {
  return (
    < div className='hover:bg-blue-100 rounded-full'>
      <div className="flex items-center justify-between px-5 py-1 mt-3  rounded-full">
        <div className="flex items-center ">
          <i class="fa-solid fa-file-lines text-3xl mr-5 lg:mr-10 text-blue-500"></i>
          <h1 className="text-gray-700 mr-5 lg:mr-10">{docName}</h1>
          <i class="fa-solid fa-user-group text-gray-600 "></i>
        </div>

        <div className="flex items-center ">
          <h1 className="px-10 lg:px-20 text-gray-600">{author}</h1>
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
