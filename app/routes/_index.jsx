import { ClientOnly } from "../components/hydration/ClientOnly";
import { Provider } from "jotai";
import { InitialLoad } from "../components/hydration/Fallback";
import Wingspan from "../components/Wingspan";

export const meta = () => {
  return [{ title: "Play Wingspan!" }];
};

export default function Index() {
  return (
    <ClientOnly fallback={<InitialLoad />}>
      <Provider>
        <Wingspan />
      </Provider>
    </ClientOnly>
  );
}
