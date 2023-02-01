import * as THREE from "three";
import styled from "@emotion/styled";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

import Layout from "./Layout";
import {
  CameraControls,
  CatmullRomLine,
  Sparkles,
  useKeyboardControls,
} from "@react-three/drei";
import { Line2 } from "three-stdlib";

// import CameraControlsImpl from "camera-controls";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GSDevTools } from "gsap/GSDevTools";

import Iphone from "./components/Iphone";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

gsap.ticker.remove(gsap.updateRoot); // https://greensock.com/docs/v3/GSAP/gsap.updateRoot()
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(GSDevTools);

// globalThis.THREE = THREE;
// globalThis.gsap = gsap;

function App() {
  return (
    <Styled>
      <Canvas
      // shadows
      >
        <Scene />
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
  const cameraControlsRef = useRef<CameraControls | null>(null);
  const controls = useThree(
    (state) => state.controls as unknown as CameraControls
  );

  useFrame(({ clock }) => gsap.updateRoot(clock.getElapsedTime()));

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      const gsDevTools = GSDevTools.create();

      const tl = gsap.timeline({ paused: true });

      //
      // 🎞️ tlVideo
      //

      const tlVideo = gsap.timeline();

      tlVideo
        .add(
          gsap.fromTo(
            video,
            { currentTime: 0 },
            { currentTime: 5, duration: 5, ease: "linear" }
          ),
          "label00"
        )
        .add(
          gsap.fromTo(
            video,
            { currentTime: 5 },
            { currentTime: 10, duration: 3, ease: "linear" }
          ),
          "label01"
        )
        .add(
          gsap.fromTo(
            video,
            { currentTime: 10 },
            { currentTime: 20, duration: 10, ease: "linear" }
          ),
          "label02"
        );

      // tlVideo.add(() => void console.log("coucou label00"), "label00");
      tlVideo.call(
        () => {
          console.log("label00");
          cameraControlsRef.current?.setPosition(4, 4, 8, true);
        },
        ["custom messge"],
        "label00"
      );

      tlVideo.call(
        () => {
          console.log("label01");
          cameraControlsRef.current?.setPosition(-4, -4, 8, true);
        },
        ["custom messge"],
        "label01"
      );

      tlVideo.call(
        () => {
          console.log("label02");
          cameraControlsRef.current?.setPosition(-4, 8, 8, true);
        },
        ["custom messge"],
        "label02"
      );

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

      //
      // 🎥 twCamera
      //

      const tlCamera = gsap.timeline();

      tl.add(tlCamera);

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

  //
  // curve
  //

  // const curve1Ref = useRef<Line2 | null>(null);

  // const curve1CallbackRef = useCallback((instance: Line2) => {
  //   curve1Ref.current = instance;
  //   console.log("curve1Ref", instance);
  // }, []);

  //
  // [space] play/pause
  //

  // const [subscribeKeys, getKeys] = useKeyboardControls(); // see: https://github.com/pmndrs/drei#keyboardcontrols
  // useEffect(() => {
  //   const unsubscribeJump = subscribeKeys(
  //     (state: any) => state.spc,
  //     (value) => {
  //       if (value) {
  //         console.log("space");

  //         // const { current: video } = videoRef;
  //         // if (!video) return;

  //         // if (!video.paused) {
  //         //   video.pause();
  //         // } else {
  //         //   video.play();
  //         // }
  //       }
  //     }
  //   );

  //   return () => unsubscribeJump();
  // }, [subscribeKeys]);

  return (
    <Layout>
      <CameraControls
        ref={cameraControlsCallbackRef}
        // smoothTime={1}
        // azimuthRotateSpeed={1}
        // polarRotateSpeed={1}
      />
      <Iphone
        scale={40}
        rotation-y={Math.PI}
        rotation-x={-Math.PI / 12}
        screenTexture={videoTexture}
      />

      {/* <CatmullRomLine
        ref={curve1CallbackRef}
        points={[
          [-3, 2, 1],
          [2, 2, 0],
          [-1, 0, 3],
          [2, -1, 0],
        ]} // Array of Points
        color="#ec36a0"
        lineWidth={3} // In pixels (default)
        segments={64}
      /> */}

      <Sparkles
        count={20}
        scale={[5, 8, 1]}
        size={4}
        rotation-x={-Math.PI / 12}
        position-y={4}
      />
    </Layout>
  );
}
