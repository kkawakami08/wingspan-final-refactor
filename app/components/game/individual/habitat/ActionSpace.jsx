import React from "react";

const ActionSpace = ({ space, num }) => {
  let actionSpaceContainerCSS =
    num === "5"
      ? "col-span-1  border-2 flex flex-col items-center py-5 px-10 rounded-lg text-lg font-semibold justify-center text-center h-full w-full"
      : "col-span-2  border-2 flex flex-col items-center py-5 px-10 rounded-lg text-lg font-semibold justify-center text-center h-full w-full";

  return (
    <div className={`${actionSpaceContainerCSS}`}>
      <p className="">
        {space.action.quantity} {space.action.type}
      </p>
      {space.action.discard !== "none" && (
        <p className="pt-3 justify-self-center font-normal">
          {space.action.discard} = {space.action.type}
        </p>
      )}
    </div>
  );
};

export default ActionSpace;
