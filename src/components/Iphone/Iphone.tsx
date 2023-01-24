import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";

import { Model } from "./Model";

type IphoneProps = JSX.IntrinsicElements["group"] & {
  children?: React.ReactNode;
  src?: string;
};

export function Iphone({
  children,
  src = "https://storage.googleapis.com/abernier-portfolio/loreal-screencast.mp4", // https://console.cloud.google.com/storage/browser/abernier-portfolio?project=portfolio-375123
  ...props
}: IphoneProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  globalThis.videoRef = videoRef;

  //
  // VideoTexture map
  //
  const map = useMemo(() => {
    const video = document.createElement("video");
    video.src = src;
    video.crossOrigin = "anonymous";
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    videoRef.current = video;

    video.load();
    video.addEventListener("canplaythrough", () => video.play());

    const texture = new THREE.VideoTexture(video);
    texture.encoding = THREE.sRGBEncoding;

    return texture;
  }, [src]);

  //
  // [space] play/pause
  //

  const [subscribeKeys, getKeys] = useKeyboardControls(); // see: https://github.com/pmndrs/drei#keyboardcontrols
  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state: any) => state.spc,
      (value) => {
        if (value) {
          console.log("space", videoRef.current);

          const { current: video } = videoRef;
          if (!video) return;

          if (!video.paused) {
            video.pause();
          } else {
            video.play();
          }
        }
      }
    );

    return () => unsubscribeJump();
  }, [subscribeKeys]);

  return (
    <>
      <Model {...props}>
        <meshStandardMaterial map={map} />
      </Model>
    </>
  );
}
