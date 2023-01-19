import styled from "@emotion/styled";
import { Canvas, useThree } from "@react-three/fiber";

import Layout from "./Layout";
import Ground from "./components/Ground";
import { Bounds, Float, Html, Sparkles, Stage } from "@react-three/drei";

import gsap from "gsap";

import { Model as Iphone } from "./components/Iphone";
import { useEffect, useRef } from "react";

function App() {
  return (
    <Styled>
      <Canvas
      // shadows
      >
        <Layout>
          <Scene />
        </Layout>
      </Canvas>
    </Styled>
  );
}
export const Styled = styled.div`
  position: fixed;
  inset: 0;
`;
export default App;

function Scene() {
  const { camera } = useThree();
  globalThis.camera = camera;

  useEffect(() => {
    return;
    const pos0 = {
      x: 0.44815883201976203,
      y: 1.1098319534086936,
      z: 1.348606238040144,
    };
    const pos1 = {
      x: 3.3402040042198546,
      y: 1.665227491297859,
      z: 0.8238778382846002,
    };
    const pos2 = {
      x: 2.0052064877296,
      y: 1.1198408313891113,
      z: -0.17134287979506932,
    };

    const duration = 1;

    gsap.set(camera.position, pos0);
    const tw1 = gsap.to(camera.position, { ...pos1, duration: 1 });
    const tw2 = gsap.to(camera.position, { ...pos2 });

    const tl = gsap.timeline({ paused: false });
    tl.add(tw1, 0);
    tl.add(tw2, "toto+=0");

    gsap.to(tl, { time: tl.duration(), duration: 2, ease: "power4.InOut" });
  }, [camera.position]);

  return (
    <>
      {/* <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        // floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      > */}
      <Iphone scale={40} rotation-y={Math.PI} rotation-x={-Math.PI / 12} />

      <Sparkles
        count={20}
        scale={[5, 8, 1]}
        size={4}
        rotation-x={-Math.PI / 12}
        position-y={4}
      />
      {/* </Float> */}
    </>
  );
}
