import { Fragment } from "react";
import { CogIcon } from '@heroicons/react/solid'

const Load = () => {
  return (

    <Fragment>
      <div className=" flex justify-center items-center pt-5 animate-pulse">
      <div className="rounded animate-spin ease duration-100 w-10 h-10 border-4 bg-yellow-500"> <CogIcon></CogIcon>  </div>
        <div className="rounded animate-spin ease duration-200 w-9 h-9 border-4 bg-yellow-500">   <CogIcon></CogIcon> </div>
        <div className="rounded animate-spin ease duration-300 w-8 h-8 border-4 bg-yellow-500">   <CogIcon></CogIcon> </div>
        <div className="rounded animate-spin ease duration-400 w-7 h-7 border-4 bg-yellow-500">   <CogIcon></CogIcon> </div>
        <div className="rounded animate-spin ease duration-500 w-6 h-6 border-4 bg-yellow-500">   <CogIcon></CogIcon> </div>
        <div className="rounded animate-spin ease duration-600 w-5 h-5 border-4 bg-yellow-500">   <CogIcon></CogIcon> </div>
        <div className="rounded animate-spin ease duration-700 w-4 h-4 border-4 bg-yellow-500">  <CogIcon></CogIcon> </div>
      </div>
    </Fragment>

  );
}

export default Load;