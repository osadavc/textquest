import { useState, useEffect } from "react";

import { CiFolderOn } from "react-icons/ci";

const NoTextbooks = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-44">
      <CiFolderOn className="text-6xl text-gray-600" />
      <h4 className="mt-6 text-xl font-medium capitalize">
        No Textbooks are Uploaded
      </h4>
      <p className="mt-1 text-gray-600">
        Upload a textbook to start generating questions from it
      </p>
    </div>
  );
};

export default NoTextbooks;
