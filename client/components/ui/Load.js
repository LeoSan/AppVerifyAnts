import { Fragment } from "react";

const Load = () => {
  return (

    <Fragment>
      <div className=" flex justify-center items-center pt-5">
        <div className="rounded animate-spin ease duration-100 w-5 h-5 border-4 bg-yellow-500"></div>
        <div className="rounded animate-spin ease duration-200 w-5 h-5 border-4 bg-yellow-500"></div>
        <div className="rounded animate-spin ease duration-300 w-5 h-5 border-4 bg-yellow-500"></div>
        <div className="rounded animate-spin ease duration-700 w-5 h-5 border-4 bg-yellow-500"></div>
      </div>
    </Fragment>

  );
}

export default Load;