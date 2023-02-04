import * as THREE from "three";
import styled from "@emotion/styled";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";

import Layout from "./Layout";
import { CameraControls, Sparkles } from "@react-three/drei";

import { easing } from "maath";

// import CameraControlsImpl from "camera-controls";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap/GSDevTools";

import Iphone from "./components/Iphone";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Leva, folder, useControls, button } from "leva";

gsap.ticker.remove(gsap.updateRoot); // https://greensock.com/docs/v3/GSAP/gsap.updateRoot()
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);

// globalThis.THREE = THREE;
// globalThis.gsap = gsap;

const H = 15.4926;

function clamp(x: number, min: number, max: number) {
  return Math.min(Math.max(x, min), max);
}

function App() {
  return (
    <Styled>
      <Canvas
      // shadows
      >
        <Scene />
      </Canvas>
      <Leva
      // collapsed={true}
      />
    </Styled>
  );
}
export const Styled = styled.div`
  position: fixed;
  inset: 0;
`;
export default App;

function Scene() {
  const cameraControlsRef = useRef<CameraControls | null>(null);
  globalThis.cameraControlsRef = cameraControlsRef;
  // const controls = useThree(
  //   (state) => state.controls as unknown as CameraControls
  // );

  const cameraFrameRef = useRef<CameraFrameAPI>(null);
  globalThis.cameraFrameRef = cameraFrameRef;

  const {
    y: cameraFrameY,
    w: cameraFrameW,
    h: cameraFrameH,
    rotX: iphoneRotX,
    showBoundingSphere,
    showBoundingBox,
    fitting,
    centering,
    dezoomFactor,
  } = useControls({
    cameraFrame: folder(
      {
        y: { value: 0, min: -H / 2, max: H / 2, step: 0.1 },
        h: { value: 5, min: 0.5, max: H, step: 0.1 },
        w: { value: 7, min: 0.5, max: 7, step: 0.1 },
      }
      // { collapsed: true }
    ),
    showBoundingSphere: true,
    showBoundingBox: true,
    fitting: true,
    centering: true,
    dezoomFactor: { value: 0, min: 0, max: 5, step: 0.1 },
    iphone: folder(
      {
        rotX: { value: -Math.PI / 12, min: -Math.PI / 2, max: 0 },
      },
      { collapsed: true }
    ),
  });

  useFrame((_, delta) => {
    if (!cameraControlsRef.current || !cameraFrameRef.current) return;

    const cameraControls = cameraControlsRef.current;
    const cameraFrame = cameraFrameRef.current;

    const d = cameraControls.getDistanceToFitSphere(cameraFrame.bs.radius);
    const target = cameraFrame.bs.center;

    if (fitting) {
      // update distance (aka. radius)
      easing.damp(cameraControls._sphericalEnd, "radius", d, 2, delta);
      cameraControls._spherical.radius = cameraControls._sphericalEnd.radius;
    }

    if (centering) {
      // update target
      easing.damp3(cameraControls._targetEnd, target, 1, delta);
      cameraControls._target.copy(cameraControls._targetEnd);
    }
  });

  const [video] = useState(() => {
    const el = document.createElement("video");
    // el.src = new URL("/loreal-screencast-001.mp4", import.meta.url).toString();
    el.src =
      "https://storage.googleapis.com/abernier-portfolio/loreal-screencast-001.mp4"; // https://console.cloud.google.com/storage/browser/abernier-portfolio?project=portfolio-375123;
    el.crossOrigin = "anonymous";
    el.autoplay = true;
    el.loop = true;
    el.muted = true;
    el.playsInline = true;

    return el;
  });
  // globalThis.video = video;

  //
  // video texture
  //

  useEffect(() => {
    // console.log("useEffect video", video);

    video.load();
    // video.addEventListener("canplaythrough", () => video.play());

    function handleLoadedmetadata() {
      // console.log("loadedmetadata", video.duration);
    }

    video.addEventListener("loadedmetadata", handleLoadedmetadata);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedmetadata);
    };
  }, [video]);

  const videoTexture = useMemo(() => {
    const texture = new THREE.VideoTexture(video);
    texture.encoding = THREE.sRGBEncoding;

    return texture;
  }, [video]);

  //
  // gsap
  //

  useFrame(({ clock }) => gsap.updateRoot(clock.getElapsedTime()));

  // GSDevTools (see: https://greensock.com/forums/topic/35589-gsdevtools-and-react-18/)
  useEffect(() => {
    const gsDevTools = GSDevTools.create();

    // @ts-ignore
    return () => void gsDevTools.kill();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      //
      // 🎞️ tlVideo
      //

      const tlVideo = gsap.timeline();

      tlVideo.add(
        gsap.fromTo(
          video,
          { currentTime: 0 },
          { currentTime: 93, duration: 93, ease: "linear" }
        ),
        "label00"
      );
      // .add(
      //   gsap.fromTo(
      //     video,
      //     { currentTime: 0 },
      //     { currentTime: 5, duration: 5, ease: "linear" }
      //   ),
      //   "label00"
      // )
      // .add(
      //   gsap.fromTo(
      //     video,
      //     { currentTime: 5 },
      //     { currentTime: 10, duration: 3, ease: "linear" }
      //   ),
      //   "label01"
      // )
      // .add(
      //   gsap.fromTo(
      //     video,
      //     { currentTime: 10 },
      //     { currentTime: 20, duration: 10, ease: "linear" }
      //   ),
      //   "label02"
      // );

      // tlVideo
      //   .call(
      //     () => {
      //       console.log("0");
      //       // cameraControlsRef.current?.setPosition(4.37, 1.15, 8.42, true);
      //       cameraControlsRef.current?.setTarget(0.3, 0.72, 0.21, true);
      //     },
      //     ["custom messge"],
      //     0
      //   )
      //   .call(
      //     () => {
      //       console.log("4");
      //       // cameraControlsRef.current?.setPosition(-10.73, 8.4, 18.62, true);
      //       cameraControlsRef.current?.setTarget(0, 3, 0, true);
      //     },
      //     ["custom messge"],
      //     4
      //   )
      //   .call(
      //     () => {
      //       // cameraControlsRef.current?.setPosition(-6.02, 5.66, 11.06, true);
      //       cameraControlsRef.current?.setTarget(-0.29, 2.86, -0.12, true);
      //     },
      //     ["custom messge"],
      //     8.2
      //   )

      //   .call(
      //     () => {
      //       // cameraControlsRef.current?.setPosition(5.59, 4.61, 12.64, true);
      //       cameraControlsRef.current?.setTarget(0.27, 1.91, -0.15, true);
      //     },
      //     ["custom messge"],
      //     15.3
      //   )
      //   .call(
      //     () => {
      //       // cameraControlsRef.current?.setPosition(5.9, 3.63, 12.72, true);
      //       cameraControlsRef.current?.setTarget(0.49, 3, -0.29, true);
      //     },
      //     ["custom messge"],
      //     17.8
      //   )
      //   .call(
      //     () => {
      //       // cameraControlsRef.current?.setPosition(8.16, 3.9, 18.15, true);
      //       cameraControlsRef.current?.setTarget(0.49, 3, -0.29, true);
      //     },
      //     ["custom messge"],
      //     24
      //   );

      // ScrollTrigger.create({
      //   trigger: document.body,
      //   start: "top top",
      //   end: "bottom bottom",
      //   markers: true,
      //   animation: tlVideo,
      //   snap: "labels", // snap to 10% increments
      //   scrub: 1,
      //   onUpdate(st) {
      //     // console.log("scrollTrigger", st.progress);
      //     tlVideo.progress(st.progress);
      //   },
      // });

      tl.add(tlVideo);

      //
      // 🎥 twCamera
      //

      // const tlCamera = gsap.timeline();

      // tl.add(tlCamera);

      //
      //
      //

      tl.play();
    });

    return () => ctx.revert();
  }, [video]);

  const cameraControlsCallbackRef = useCallback((instance: CameraControls) => {
    cameraControlsRef.current = instance;
    if (!instance) return;

    instance.setTarget(0, 3, 0);
    // instance.mouseButtons.wheel = CameraControlsImpl.ACTION.NONE; // disable wheel
    // instance.mouseButtons.wheel = 0; // disable wheel
  }, []);
  // useEffect(() => {
  //   if (!controls) return;

  //   controls?.setTarget(0, 3, 0);
  //   controls.mouseButtons.wheel = CameraControlsImpl.ACTION.NONE; // disable wheel
  // }, [controls]);

  let _cameraFrameY = cameraFrameY;
  let _cameraFrameH = cameraFrameH;
  // limit _cameraFrameH
  _cameraFrameH = clamp(cameraFrameH, 0, H);
  console.log(_cameraFrameH);
  // limit _cameraFrameY
  const min = -H / 2 + _cameraFrameH / 2;
  const max = H / 2 - _cameraFrameH / 2;
  _cameraFrameY = clamp(cameraFrameY, min, max);

  return (
    <Layout>
      <CameraControls
        ref={cameraControlsCallbackRef}
        smoothTime={1}
        // azimuthRotateSpeed={1}
        // polarRotateSpeed={1}
      />

      <Iphone
        scale={40}
        rotation-y={Math.PI}
        rotation-x={iphoneRotX}
        screenTexture={videoTexture}
      >
        <CameraFrame
          ref={cameraFrameRef}
          y={_cameraFrameY}
          w={cameraFrameW}
          h={_cameraFrameH}
          showBoundingSphere={showBoundingSphere}
          showBoundingBox={showBoundingBox}
          dezoomFactor={dezoomFactor}
        />
      </Iphone>
      <Stars rotation-x={-Math.PI / 12} position-y={4} />
    </Layout>
  );
}

const Stars = memo((props) => (
  <Sparkles count={20} scale={[5, 8, 1]} size={4} {...props} />
));

//
// <CameraFrame>
//
//
//

type CameraFrameProps = {
  y?: number;
  w?: number;
  h?: number;
  showBoundingBox: boolean;
  showBoundingSphere: boolean;
  dezoomFactor?: number;
};

// https://stackoverflow.com/a/73748435/133327
const useForwardRef = <T,>(
  ref: React.ForwardedRef<T>,
  initialValue: any = null
) => {
  const targetRef = useRef<T>(initialValue);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(targetRef.current);
    } else {
      ref.current = targetRef.current;
    }
  }, [ref]);

  return targetRef;
};

type CameraFrameAPI = {
  box: THREE.Mesh | null;
  bbox: THREE.Box3;
  bs: THREE.Sphere;
};

const CameraFrame = forwardRef<CameraFrameAPI, CameraFrameProps>(
  (
    {
      y = 0,
      w = 7,
      h = 5,
      showBoundingBox,
      showBoundingSphere,
      dezoomFactor = 0,
    },
    ref
  ) => {
    // const boxRef = useForwardRef(ref);
    const boxRef = useRef<THREE.Mesh>(null);

    const { scene } = useThree();

    const [bbox] = useState(new THREE.Box3());
    const [bs] = useState(new THREE.Sphere());
    const [center] = useState(new THREE.Vector3());

    const boxHelperRef = useRef<THREE.BoxHelper>(null);
    const sphereRef = useRef<THREE.Mesh>(null);
    // globalThis.sphereRef = boxRef;

    // https://stackoverflow.com/a/61388453/133327
    useImperativeHandle(ref, () => ({
      get box() {
        return boxRef.current;
      },
      get bbox() {
        return bbox;
      },
      get bs() {
        return bs;
      },
    }));

    useFrame(() => {
      // Compute bbox and bs (from boxRef)
      if (!boxRef?.current) return; // https://stackoverflow.com/a/62238917/133327
      bbox.setFromObject(boxRef.current);
      bbox.getBoundingSphere(bs);
      bs.radius *= 1 + dezoomFactor;

      // Update boxHelper
      if (boxHelperRef.current) boxHelperRef.current.update();

      // Update our debug sphere (position and scale)
      if (sphereRef.current) {
        bbox.getCenter(center);
        sphereRef.current.position.copy(center);
        sphereRef.current.scale.setScalar(bs.radius);
      }
    });

    return (
      <group position-y={y}>
        <mesh ref={boxRef}>
          <boxGeometry args={[w, h, 1]} />
          <meshStandardMaterial color="red" wireframe />
        </mesh>

        {boxRef?.current &&
          createPortal(
            <>
              {/* Bounding box */}
              {showBoundingBox && (
                <boxHelper
                  ref={boxHelperRef}
                  args={[boxRef.current, 0x0000ff]}
                />
              )}

              {/* Bounding sphere */}
              {showBoundingSphere && (
                <mesh ref={sphereRef}>
                  <sphereGeometry args={[1]} />
                  <meshBasicMaterial
                    color="#00ff00"
                    transparent
                    // opacity={0.5}
                    wireframe
                  />
                </mesh>
              )}
            </>,
            scene
          )}
      </group>
    );
  }
);
