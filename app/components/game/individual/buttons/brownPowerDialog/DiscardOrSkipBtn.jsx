const DiscardOrSkipBtn = ({ brownBirdSupply }) => {
  const discardClick = () => {
    brownBirdSupply.setBrownBirdCopy((state) => ({
      ...state,
      sameBird: true,
      copy: [...state.copy, state.currentSpace],
    }));
    brownBirdSupply.setBrownPowerContinueBtn(false);
    brownBirdSupply.setDisableClick((state) => ({
      ...state,
      playerFood: false,
    }));
    brownBirdSupply.setCurrentActionText(
      `Discard ${brownBirdSupply.resourceQuantity} ${brownBirdSupply.brownBirdVariable}.`
    );
  };
  console.log("brownbird from discard", brownBirdSupply.brownBirdVariable);
  return (
    <div className="flex gap-5">
      <button
        className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={discardClick}
      >
        Discard
      </button>
    </div>
  );
};

export default DiscardOrSkipBtn;
