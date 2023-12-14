const EggReq = ({ count }) => {
  return (
    <div className="col-span-2  border-2 flex flex-col items-center py-5 px-10 rounded-lg text-lg font-semibold justify-center text-center h-full w-full">
      <p className="">{count} eggs</p>
    </div>
  );
};

export default EggReq;
