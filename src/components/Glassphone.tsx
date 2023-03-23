import * as THREE from "three";
import { createContext, useContext, useRef, useLayoutEffect } from "react";
import { RoundedBox, Plane, MeshTransmissionMaterial } from "@react-three/drei";
import { folder, useControls } from "leva";
import { toCreasedNormals } from "three-stdlib/utils/BufferGeometryUtils";

const { DEG2RAD } = THREE.MathUtils;

type ModelProps = JSX.IntrinsicElements["group"] & {
  children?: React.ReactNode;
  screenTexture?: THREE.Texture;
};

type Api = {
  screenWidth: number;
  screenHeight: number;
};
const GlassphoneContext = createContext<Api>({} as Api);

export default function Glassphone({
  children,
  screenTexture,
  ...props
}: ModelProps) {
  const roundedBoxRef = useRef<THREE.Mesh>(null);

  const W = 7.1126;
  const H = 15.4926;
  const D = 1;

  const api = { screenWidth: W, screenHeight: H };

  // MTM: https://github.com/pmndrs/drei#meshtransmissionmaterial
  const mtmConfig = useControls({
    "phone.MTM": folder(
      {
        meshPhysicalMaterial: false,
        transmissionSampler: false,
        backside: false,
        samples: { value: 1, min: 1, max: 32, step: 1 },
        resolution: { value: 2048, min: 256, max: 4096, step: 256 },
        transmission: { value: 1, min: 0, max: 1 },
        roughness: { value: 0.0, min: 0, max: 1, step: 0.01 },
        thickness: { value: D, min: 0, max: 10, step: 0.01 },
        ior: { value: 1.3, min: 1, max: 5, step: 0.01 },
        chromaticAberration: { value: 0, min: 0, max: 1 },
        anisotropy: { value: 0, min: 0, max: 1, step: 0.01 },
        distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
        distortionScale: { value: 0, min: 0.01, max: 1, step: 0.01 },
        temporalDistortion: { value: 0.5, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: 0, min: 0, max: 1 },
        attenuationDistance: { value: 0.5, min: 0, max: 10, step: 0.01 },
        attenuationColor: "#ffffff",
        color: "#ffffff",
        // bg: "#839681",
      }
      // { collapsed: true }
    ),
  });

  useLayoutEffect(() => {
    if (roundedBoxRef.current) {
      toCreasedNormals(roundedBoxRef.current.geometry, 0.4); // // see: https://codesandbox.io/s/roundedbox-smooth-forked-y6291z?file=/src/App.js:1619-1677
    }
  }, []);

  return (
    <GlassphoneContext.Provider value={api}>
      <group {...props} dispose={null}>
        <RoundedBox
          ref={roundedBoxRef}
          args={[W, H, D]}
          radius={Math.min(D / 2, 0.5)}
          smoothness={4}
          position-y={H / 2}
          castShadow
          receiveShadow
        >
          {/* back-side (fill black) */}
          <Plane args={[W - 0.35, H - 0.35]}>
            <meshStandardMaterial color="#00101B" />
          </Plane>
          {/* front-side (video) */}
          <Plane args={[W - 0.35, H - 0.35]} rotation-y={DEG2RAD * 180}>
            <meshStandardMaterial map={screenTexture} />
            <group>{children}</group>
          </Plane>

          {/* <meshStandardMaterial color="orange" /> */}
          <MeshTransmissionMaterial {...mtmConfig} />
        </RoundedBox>
      </group>
    </GlassphoneContext.Provider>
  );
}

export const useGlassphone = () => useContext(GlassphoneContext);
