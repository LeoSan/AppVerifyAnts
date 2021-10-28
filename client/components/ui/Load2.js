import { Fragment } from "react";

const Load = () => {
    return (

        <Fragment>

            <div className="min-h-screen flex justify-center items-center bg-black">

                <div className="loader bg-white p-5 rounded-full flex space-x-3">
                    <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
                    <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
                    <div className="w-5 h-5 bg-gray-800 rounded-full animate-bounce"></div>
                </div>

            </div>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-400">

          
            <div className="w-64 bg-white rounded shadow-2xl">
          
              
              <div className="h-32 bg-gray-200 rounded-tr rounded-tl animate-pulse"></div>
          
              <div className="p-5">
              
                <div className="h-6 rounded-sm bg-gray-200 animate-pulse mb-4"></div>
          
               
                <div className="grid grid-cols-4 gap-1">
                  <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                  <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          
                  <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                  <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
          
                  <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                  <div className="col-span-3 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                  <div className="col-span-2 h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                  <div className="h-4 rounded-sm bg-gray-200 animate-pulse"></div>
                </div>
          
              </div>
          
            </div>
          
          </div>            

        </Fragment>

    );
}

export default Load;