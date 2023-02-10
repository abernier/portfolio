import * as THREE from "three";
import { ReactNode, useState, useTransition } from "react";
import {
  ContactShadows,
  Grid,
  PerspectiveCamera,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  Sphere,
  Center,
} from "@react-three/drei";

import { useControls, folder } from "leva";

import Ground from "./components/Ground";
// import Environment from "./Environment";

type ArrayVec3 = [number, number, number];
const INITIALS = {
  position: [20, 20.0, 50.0] as ArrayVec3,
  target: [0, 7.5, 0] as ArrayVec3,
};

type LayoutProps = {
  children?: ReactNode;
  bg?: string;
};

const Layout = ({ children, bg = "#2d334b" }: LayoutProps) => {
  const [gui, setGui] = useControls(() => ({
    Layout: folder(
      {
        bg,
        grid: true,
        axes: true,
        camera: folder({
          fov: 20,
          position: {
            value: INITIALS.position,
            step: 0.1,
          },
          target: {
            value: INITIALS.target,
            step: 0.1,
          },
        }),
      },
      { collapsed: true }
    ),
  }));
  // console.log("gui=", gui);

  const { gridSize, ...gridConfig } = useControls({
    "Layout.Grid": folder(
      {
        gridSize: [10.5, 10.5],
        cellSize: { value: 0.5, min: 0, max: 10, step: 0.1 },
        cellThickness: { value: 0.5, min: 0, max: 5, step: 0.1 },
        cellColor: "#6f6f6f",
        sectionSize: { value: 5, min: 0, max: 10, step: 0.1 },
        sectionThickness: { value: 1, min: 0, max: 5, step: 0.1 },
        sectionColor: "#6f5ead",
        fadeDistance: { value: 150, min: 0, max: 300, step: 1 },
        fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
        followCamera: false,
        infiniteGrid: true,
      },
      { collapsed: true }
    ),
  });

  const { ...accumulativeShadowsConfig } = useControls({
    "Layout.AccumulativeShadows": folder(
      {
        temporal: false,
        frames: { value: 108, min: 0, max: 400 },
        color: "purple",
        colorBlend: { value: 0.94, min: 0, max: 1 },
        opacity: { value: 2, min: 0, max: 5 },
        scale: { value: 100, min: 0, max: 100 },
        alphaTest: { value: 0.85, min: 0, max: 1 },
      },
      { collapsed: true }
    ),
  });

  const { ...randomizedLightConfig } = useControls({
    "Layout.RandomizedLight": folder(
      {
        amount: { value: 6, min: 0, max: 100 },
        radius: { value: 10, min: 0, max: 100 },
        ambient: { value: 0.58, min: 0, max: 2 },
        position: [8, 2.5, 2],
        // position: [35, 35, 35],
        bias: 0.001,
      },
      { collapsed: true }
    ),
  });

  return (
    <>
      <PerspectiveCamera
        fov={gui.fov}
        makeDefault
        position={INITIALS.position} // initial camera position
        //
      />

      {/* <Environment background>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color={gui.bg} side={THREE.BackSide} />
        </mesh>
      </Environment> */}
      {/* <Environment /> */}
      <Env />

      {/* <spotLight
        position={[35, 35, 35]}
        // angle={0.3}
        penumbra={1}
        castShadow
        intensity={2}
        shadow-bias={-0.0001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <ambientLight intensity={0.2} /> */}
      <AccumulativeShadows {...accumulativeShadowsConfig}>
        <RandomizedLight {...randomizedLightConfig} />
      </AccumulativeShadows>

      {/* {gui.grid && <gridHelper args={[30, 30, 30]} position-y=".01" />} */}
      {gui.grid && (
        <Grid
          position-y={-0.02}
          args={gridSize}
          {...gridConfig}
          //
        />
      )}

      {/* <Ground size={25} circle /> */}
      {/* <ContactShadows
        frames={1}
        opacity={1}
        scale={10}
        blur={5}
        far={10}
        resolution={256}
        color="#000000"
      /> */}
      {/* {gui.axes && <axesHelper args={[5]} />} */}

      {children}
    </>
  );
};
export default Layout;

// see https://codesandbox.io/s/environment-blur-and-transitions-forked-lgcrzw
function Env() {
  const [preset, setPreset] = useState("studio");
  // You can use the "inTransition" boolean to react to the loading in-between state,
  // For instance by showing a message
  const [inTransition, startTransition] = useTransition();
  const { blur } = useControls({
    "Layout.Environment": folder({
      blur: { value: 0.75, min: 0, max: 1 },
      preset: {
        value: preset,
        options: [
          "sunset",
          "dawn",
          "night",
          "warehouse",
          "forest",
          "apartment",
          "studio",
          "city",
          "park",
          "lobby",
        ],
        // If onChange is present the value will not be reactive, see https://github.com/pmndrs/leva/blob/main/docs/advanced/controlled-inputs.md#onchange
        // Instead we transition the preset value, which will prevents the suspense bound from triggering its fallback
        // That way we can hang onto the current environment until the new one has finished loading ...
        onChange: (value) => startTransition(() => setPreset(value)),
      },
    }),
  });
  return <Environment preset={preset} background blur={blur} />;
}
