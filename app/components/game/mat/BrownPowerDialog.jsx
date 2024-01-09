import ContinueOrRoll from "../individual/buttons/brownPowerDialog/ContinueOrRoll";
import CacheOrSupply from "../individual/buttons/brownPowerDialog/CacheOrSupplyBtn";

const BrownPowerDialog = ({ brownBirdSupply }) => {
  const dialog = brownBirdSupply.brownBirdCopy.dialog;

  const dialogDisplay = () => {
    switch (dialog) {
      case "roll":
        return <ContinueOrRoll brownBirdSupply={brownBirdSupply} />;
      case "cache":
        return <CacheOrSupply brownBirdSupply={brownBirdSupply} />;
      default:
        break;
    }
  };

  return <div>{dialogDisplay()}</div>;
};

export default BrownPowerDialog;
