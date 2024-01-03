import { useAtom } from "jotai";
import { brownBirdCopyAtom } from "../../../utils/jotaiStore";
import ContinueOrRoll from "../individual/buttons/brownPowerDialog/ContinueOrRoll";
import CacheOrSupply from "../individual/buttons/brownPowerDialog/CacheOrSupplyBtn";

const BrownPowerDialog = () => {
  const [brownBirdCopy] = useAtom(brownBirdCopyAtom);
  const dialog = brownBirdCopy.dialog;

  const dialogDisplay = () => {
    switch (dialog) {
      case "roll":
        return <ContinueOrRoll />;
      case "cache":
        return <CacheOrSupply />;
      default:
        break;
    }
  };

  return <div>{dialogDisplay()}</div>;
};

export default BrownPowerDialog;
