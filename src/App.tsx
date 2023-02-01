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
  // const [tl] = useState(() => gsap.timeline({ id: "main", paused: true }));
  // globalThis.tl = tl;

  // useEffect(() => {
  //   console.log("GSDevTools");
  //   const gsDevTools = GSDevTools.create({ animation: tl });

  //   return () => {
  //     console.log("kill");
  //     gsDevTools.kill();
  //   };
  // }, [tl]);

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
  // const controls = useThree(
  //   (state) => state.controls as unknown as CameraControls
  // );

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
    console.log("useEffect video", video);

    video.load();
    // video.addEventListener("canplaythrough", () => video.play());

    function handleLoadedmetadata() {
      console.log("loadedmetadata", video.duration);
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
      const tl = gsap.timeline({ paused: true });

      //
      // 🎞️ tlVideo
      //

      const tlVideo = gsap.timeline();

      const twsVideo = {
        label01: gsap.fromTo(
          video,
          { currentTime: 0 },
          { currentTime: 5, duration: 5, ease: "linear" }
        ),
        label02: gsap.fromTo(
          video,
          { currentTime: 25 },
          { currentTime: 25, duration: 10, ease: "linear" }
        ),
      };

      // Add all tweens to the timeline
      Object.entries(twsVideo).forEach(([label, tw]) => tlVideo.add(tw, label));

      // ScrollTrigger.create({
      //   trigger: document.body,
      //   start: "top top",
      //   end: "bottom bottom",
      //   markers: true,
      //   snap: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // snap to 10% increments
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

      const twCamera = gsap.timeline();

      tl.add(twCamera);

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
    instance.mouseButtons.wheel = 0; // disable wheel
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
      <CameraControls ref={cameraControlsCallbackRef} />
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
