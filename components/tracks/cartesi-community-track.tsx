import { Physics } from "@react-three/rapier";
import { useControls } from "leva";

import type { Auth } from "~/types/auth";

import { useLocalStorage } from "~/hooks/use-local-storage";

// import { SinglePlayer } from "../players/single-player";
import { CartesiModel } from "./cartesi-model";

export const CartesiCommunityTrack: React.FC = () => {
  const { debugPhysics } = useControls("Debug Tools", {
    debugPhysics: false,
  });

  const [auth] = useLocalStorage<Auth | null>("auth", null);

  return (
    <Physics debug={debugPhysics} colliders="trimesh">
      <CartesiModel />
      {/* {auth && <SinglePlayer from="gold" auth={auth} />} */}
    </Physics>
  );
};
