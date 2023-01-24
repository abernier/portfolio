import { ReactNode, useRef } from "react";
import * as THREE from "three";
import { useFrame, extend, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Grid,
  PerspectiveCamera,
  CameraControls,
} from "@react-three/drei";

import { useControls, folder } from "leva";

import gsap from "gsap";

import Ground from "./components/Ground";

gsap.ticker.remove(gsap.updateRoot); // https://greensock.com/docs/v3/GSAP/gsap.updateRoot()

type ArrayVec3 = [number, number, number];
const INITIALS = {
  position: [7, 4.0, 21.0] as ArrayVec3,
  target: [0, 3, 0] as ArrayVec3,
};

function Layout({
  children,
  bg = "#2d334b",
}: {
  children?: ReactNode;
  bg?: string;
}) {
  const cameraControlsRef = useRef<CameraControls | null>(null);
  globalThis.cameraControlsRef = cameraControlsRef;

  useFrame(({ clock }) => gsap.updateRoot(clock.getElapsedTime()));

  const [gui, setGui] = useControls(() => ({
    Layout: folder(
      {
        bg,
        grid: true,
        axes: true,
        lerpTarget: true,
        lerpPosition: true,
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
        fadeDistance: { value: 50, min: 0, max: 100, step: 1 },
        fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
        followCamera: false,
        infiniteGrid: true,
      },
      { collapsed: true }
    ),
  });

  // useFrame(({ camera }) => {
  //   if (gui.lerpTarget) {
  //     // console.log("looking at", gui.target, orbitControlsRef.current.target);
  //     orbitControlsRef.current?.target.lerp(
  //       new THREE.Vector3(...gui.target),
  //       0.005
  //     );
  //   }

  //   if (gui.lerpPosition) {
  //     camera.position.lerp(new THREE.Vector3(...gui.position), 0.005);
  //   }
  // });

  return (
    <>
      <PerspectiveCamera
        fov={gui.fov}
        makeDefault
        position={INITIALS.position} // initial camera position
        //
      />
      <CameraControls
        ref={(instance) => {
          if (!instance) return;

          cameraControlsRef.current = instance;

          instance.setTarget(...INITIALS.target); // initial camera target
        }}
      />

      <Environment background>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshBasicMaterial color={gui.bg} side={THREE.BackSide} />
        </mesh>
      </Environment>

      <spotLight
        position={[15, 15, 15]}
        // angle={0.3}
        penumbra={1}
        castShadow
        intensity={2}
        shadow-bias={-0.0001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <ambientLight intensity={0.2} />

      {/* {gui.grid && <gridHelper args={[30, 30, 30]} position-y=".01" />} */}
      {gui.grid && (
        <Grid
          position-y={-0.01}
          args={gridSize}
          {...gridConfig}
          //
        />
      )}

      <Ground size={10} circle />
      <ContactShadows
        frames={1}
        opacity={1}
        scale={10}
        blur={5}
        far={10}
        resolution={256}
        color="#000000"
      />
      {/* {gui.axes && <axesHelper args={[5]} />} */}

      {children}
    </>
  );
}

export default Layout;
