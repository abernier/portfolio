import styled from "@emotion/styled";
import { Canvas } from "@react-three/fiber";

import Layout from "./Layout";
import Ground from "./components/Ground";
import { Float, Html, Sparkles, Stage } from "@react-three/drei";

import { Model as Iphone } from "./components/Iphone";
import { useRef } from "react";

function App() {
  return (
    <Styled>
      <Canvas>
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
  return (
    <>
      {/* <Stage
        adjustCamera={1.75}
        intensity={0.5}
        shadows="contact"
        environment="city"
      > */}

      <Float
        speed={1} // Animation speed, defaults to 1
        rotationIntensity={0.5} // XYZ rotation intensity, defaults to 1
        floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
        // floatingRange={[1, 10]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
      >
        <Iphone scale={40} rotation-y={Math.PI} rotation-x={-Math.PI / 12} />
      </Float>

      {/* <Ground /> */}

      {/* </Stage> */}
    </>
  );
}
