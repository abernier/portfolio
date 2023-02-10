import * as THREE from "three";
import styled from "@emotion/styled";
import { Canvas, useFrame } from "@react-three/fiber";

import Layout from "./Layout";
import { CameraControls, Sparkles, Stats } from "@react-three/drei";

import { easing } from "maath";

import { AngleIcon } from "@radix-ui/react-icons";

// import CameraControlsImpl from "camera-controls";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap/GSDevTools";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Leva, folder, useControls, buttonGroup } from "leva";

import Iphone, { useIphone } from "./components/Iphone";

import CameraFrame from "./components/CameraFrame";

gsap.ticker.remove(gsap.updateRoot); // https://greensock.com/docs/v3/GSAP/gsap.updateRoot()
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);

const { DEG2RAD } = THREE.MathUtils;

// globalThis.THREE = THREE;
// globalThis.gsap = gsap;

function App() {
  return (
    <Styled>
      <Canvas shadows>
        <Scene />
      </Canvas>
      <Leva
      // collapsed={true}
      />
      <Stats />
    </Styled>
  );
}
export const Styled = styled.div`
  position: fixed;
  inset: 0;
`;
export default App;

function Scene() {
  const ccRef = useRef<CameraControls | null>(null);
  globalThis.ccRef = ccRef;
  // const controls = useThree(
  //   (state) => state.controls as unknown as CameraControls
  // );

  const cameraFrameRef = useRef<CameraFrameAPI>(null);
  globalThis.cameraFrameRef = cameraFrameRef;

  const {
    rotX: iphoneRotX,
    fitting,
    centering,
    smoothTime,
    ...gui
  } = useControls({
    fitting: true,
    centering: true,
    smoothTime: { value: 1, min: 0, max: 2, step: 0.1 },

    gsdevtools: true,
    iphone: folder(
      {
        rotX: { value: -Math.PI / 12, min: -Math.PI / 2, max: 0 },
      },
      { collapsed: true }
    ),
    presets: folder({
      a: { value: 30, min: 0, max: 90, label: "↕️" },
      b: { value: 30, min: 0, max: 90, label: "↔️" },
      p1: buttonGroup({
        label: <AngleIcon />,
        opts: {
          tl: (get) =>
            ccRef.current?.rotateTo(
              -get("presets.b") * DEG2RAD,
              (90 - get("presets.a")) * DEG2RAD,
              true
            ),
          tc: (get) =>
            ccRef.current?.rotateTo(
              0 * DEG2RAD,
              (90 - get("presets.a")) * DEG2RAD,
              true
            ),
          tr: (get) =>
            ccRef.current?.rotateTo(
              get("presets.b") * DEG2RAD,
              (90 - get("presets.a")) * DEG2RAD,
              true
            ),
        },
      }),
      p2: buttonGroup({
        label: "",
        opts: {
          cl: (get) =>
            ccRef.current?.rotateTo(
              -get("presets.b") * DEG2RAD,
              90 * DEG2RAD,
              true
            ),
          cc: (get) => ccRef.current?.rotateTo(0 * DEG2RAD, 90 * DEG2RAD, true),
          cr: (get) =>
            ccRef.current?.rotateTo(
              get("presets.b") * DEG2RAD,
              90 * DEG2RAD,
              true
            ),
        },
      }),
      p3: buttonGroup({
        label: "",
        opts: {
          bl: (get) =>
            ccRef.current?.rotateTo(
              -get("presets.b") * DEG2RAD,
              (90 + get("presets.a")) * DEG2RAD,
              true
            ),
          bc: (get) =>
            ccRef.current?.rotateTo(
              0 * DEG2RAD,
              (90 + get("presets.a")) * DEG2RAD,
              true
            ),

          br: (get) =>
            ccRef.current?.rotateTo(
              get("presets.b") * DEG2RAD,
              (90 + get("presets.a")) * DEG2RAD,
              true
            ),
        },
      }),
    }),
  });

  useFrame((_, delta) => {
    if (!ccRef.current || !cameraFrameRef.current) return;

    const cc = ccRef.current;
    const cameraFrame = cameraFrameRef.current;

    if (fitting) {
      const d = cc.getDistanceToFitSphere(cameraFrame.bs.radius);
      // update distance (aka. radius)
      easing.damp(cc, "distance", d, 2, delta);
    }

    if (centering) {
      const target = cameraFrame.bs.center;
      // update target
      easing.damp3(cc._targetEnd, target, 1, delta);
      cc._target.copy(cc._targetEnd);
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
    let gsDevTools: GSDevTools | undefined;

    if (gui.gsdevtools) {
      gsDevTools = GSDevTools.create();
    }

    return () => {
      // @ts-ignore
      gsDevTools?.kill();
    };
  }, [gui.gsdevtools]);

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
      //       // ccRef.current?.setPosition(4.37, 1.15, 8.42, true);
      //       ccRef.current?.setTarget(0.3, 0.72, 0.21, true);
      //     },
      //     ["custom messge"],
      //     0
      //   )
      //   .call(
      //     () => {
      //       console.log("4");
      //       // ccRef.current?.setPosition(-10.73, 8.4, 18.62, true);
      //       ccRef.current?.setTarget(0, 3, 0, true);
      //     },
      //     ["custom messge"],
      //     4
      //   )
      //   .call(
      //     () => {
      //       // ccRef.current?.setPosition(-6.02, 5.66, 11.06, true);
      //       ccRef.current?.setTarget(-0.29, 2.86, -0.12, true);
      //     },
      //     ["custom messge"],
      //     8.2
      //   )

      //   .call(
      //     () => {
      //       // ccRef.current?.setPosition(5.59, 4.61, 12.64, true);
      //       ccRef.current?.setTarget(0.27, 1.91, -0.15, true);
      //     },
      //     ["custom messge"],
      //     15.3
      //   )
      //   .call(
      //     () => {
      //       // ccRef.current?.setPosition(5.9, 3.63, 12.72, true);
      //       ccRef.current?.setTarget(0.49, 3, -0.29, true);
      //     },
      //     ["custom messge"],
      //     17.8
      //   )
      //   .call(
      //     () => {
      //       // ccRef.current?.setPosition(8.16, 3.9, 18.15, true);
      //       ccRef.current?.setTarget(0.49, 3, -0.29, true);
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

  const ccCallbackRef = useCallback((instance: CameraControls) => {
    ccRef.current = instance;
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

  return (
    <Layout>
      <CameraControls
        ref={ccCallbackRef}
        smoothTime={smoothTime}
        // azimuthRotateSpeed={1}
        // polarRotateSpeed={1}
      />

      <Iphone
        rotation-y={Math.PI}
        rotation-x={iphoneRotX}
        screenTexture={videoTexture}
      >
        <CameraFrame ref={cameraFrameRef} />
        <Stars />
      </Iphone>
    </Layout>
  );
}

const Stars = memo((props) => {
  const { screenWidth, screenHeight } = useIphone();

  return (
    <Sparkles
      count={20}
      scale={[screenWidth * 1.2, screenHeight * 1.2, 1]}
      size={10}
      position-z={-1.2}
      {...props}
    />
  );
});
