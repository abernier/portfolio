import { ReactNode, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Grid,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

import { OrbitControls as OrbitControlsImpl } from "three-stdlib"; // https://github.com/pmndrs/drei/discussions/719

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
  const orbitControlsRef = useRef<OrbitControlsImpl>(null);
  globalThis.orbitControlsRef = orbitControlsRef;

  // const [position] = useState(new THREE.Vector3());
  // const [target] = useState(new THREE.Vector3());

  useFrame(({ clock }) => gsap.updateRoot(clock.getElapsedTime()));

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
        cellSize: { value: 0.6, min: 0, max: 10, step: 0.1 },
        cellThickness: { value: 0.5, min: 0, max: 5, step: 0.1 },
        cellColor: "#6f6f6f",
        sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
        sectionThickness: { value: 1, min: 0, max: 5, step: 0.1 },
        sectionColor: "#6f5ead",
        fadeDistance: { value: 75, min: 0, max: 100, step: 1 },
        fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
        followCamera: false,
        infiniteGrid: true,
      },
      { collapsed: true }
    ),
  });

  useFrame(({ camera }) => {
    // console.log("looking at", gui.target, orbitControlsRef.current.target);
    orbitControlsRef.current?.target.lerp(
      new THREE.Vector3(...gui.target),
      0.05
    );

    camera.position.lerp(new THREE.Vector3(...gui.position), 0.01);
  });

  return (
    <>
      <PerspectiveCamera
        fov={gui.fov}
        makeDefault
        position={INITIALS.position} // initial camera position
        //
      />
      <OrbitControls target={INITIALS.target} ref={orbitControlsRef} />

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

      {/* <Ground /> */}
      <ContactShadows
        frames={1}
        opacity={1}
        scale={10}
        blur={5}
        far={10}
        resolution={256}
        color="#000000"
      />
      {gui.axes && <axesHelper args={[5]} />}

      {children}
    </>
  );
}

export default Layout;
