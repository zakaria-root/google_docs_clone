import React from 'react'

function Docs() {
  return (
    <>
      <div className="flex items-center justify-between p-2 mt-5">
          <div className="flex items-center">
            <i class="fa-solid fa-file-lines text-3xl mr-5 lg:mr-10 text-blue-500"></i>
            <h1 className="text-gray-700 mr-5 lg:mr-10">Document Name</h1>
            <i class="fa-solid fa-user-group text-gray-600 "></i>
          </div>

          <div className="flex items-center ">
            <h1 className="px-10 lg:px-20">auther name</h1>
            <h1 className="px-10 lg:px-20">timestamp</h1>

          </div>
          <button
            className="button button-text rounded-full hover:bg-gray-300 my-1 px-4 py-1 p-3 text-lg"
            data-ripple-dark="true"
          >
            <i className="fa-solid fa-ellipsis-vertical text-gray-600"></i>
          </button>
        </div>
        <hr className="ml-14 mt-2" />
    </>
  )
}

export default Docs
