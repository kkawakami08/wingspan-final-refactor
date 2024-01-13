const TuckOrSkipBtn = ({ brownBirdSupply }) => {
  const drawBirdCardClick = () => {
    switch (brownBirdSupply.brownBirdVariable) {
      case "hand":
        brownBirdSupply.setDisableClick((state) => ({
          ...state,
          birdHand: false,
        }));
        brownBirdSupply.setCurrentActionText(
          "Select a bird from your hand to tuck."
        );
        brownBirdSupply.setBrownPowerContinueBtn(false);
        //power 30 specific?
        brownBirdSupply.setBrownBirdCopy((state) => ({
          ...state,
          sameBird: true,
          copy: [...state.copy, state.currentSpace],
        }));
        break;
    }
  };

  return (
    <div className="flex gap-5">
      <button
        className="bg-amber-900 text-white text-lg font-semibold rounded-lg p-3 disabled:bg-slate-300"
        onClick={drawBirdCardClick}
      >
        Tuck Bird Card
      </button>
    </div>
  );
};

export default TuckOrSkipBtn;
