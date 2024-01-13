const MoveOrSkipBtn = ({ brownBirdSupply }) => {
  const moveClick = () => {
    brownBirdSupply.setCurrentActionText(
      `Select a different habitat for your bird (not ${brownBirdSupply.brownBirdCopy.location})`
    );
    brownBirdSupply.setDisableClick((state) => ({
      ...state,
      habitats: false,
    }));
    brownBirdSupply.setBrownPowerContinueBtn(false);
  };

  return (
    <div className="flex gap-5">
      <button
        className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={moveClick}
      >
        Move Bird
      </button>
    </div>
  );
};

export default MoveOrSkipBtn;
