import ContinueOrRoll from "../individual/buttons/brownPowerDialog/ContinueOrRoll";
import CacheOrSupply from "../individual/buttons/brownPowerDialog/CacheOrSupplyBtn";
import DrawOrSkipBtn from "../individual/buttons/brownPowerDialog/DrawOrSkipBtn";
import TuckOrSkipBtn from "../individual/buttons/brownPowerDialog/TuckOrSkipBtn";
import DiscardOrSkipBtn from "../individual/buttons/brownPowerDialog/DiscardOrSkipBtn";
import MoveOrSkipBtn from "../individual/buttons/brownPowerDialog/MoveOrSkipBtn";
import SkipWhitePower from "../individual/buttons/brownPowerDialog/SkipWhitePower";

const BrownPowerDialog = ({ brownBirdSupply }) => {
  const dialog = brownBirdSupply.brownBirdCopy.dialog;

  const dialogDisplay = () => {
    switch (dialog) {
      case "roll":
        return <ContinueOrRoll brownBirdSupply={brownBirdSupply} />;
      case "cache":
        return <CacheOrSupply brownBirdSupply={brownBirdSupply} />;
      case "discardLater":
        return <DrawOrSkipBtn brownBirdSupply={brownBirdSupply} />;
      case "tuck":
        return <TuckOrSkipBtn brownBirdSupply={brownBirdSupply} />;
      case "discard":
        return <DiscardOrSkipBtn brownBirdSupply={brownBirdSupply} />;
      case "move":
        return <MoveOrSkipBtn brownBirdSupply={brownBirdSupply} />;
      case "skip":
        return <SkipWhitePower brownBirdSupply={brownBirdSupply} />;
      default:
        break;
    }
  };

  return <div>{dialogDisplay()}</div>;
};

export default BrownPowerDialog;
