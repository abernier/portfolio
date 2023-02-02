import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useKeyboardControls } from "@react-three/drei";

import { Model } from "./Model";
import { VideoTexture } from "three";

type IphoneProps = JSX.IntrinsicElements["group"] & {
  children?: React.ReactNode;
  screenTexture?: VideoTexture;
};

export function Iphone({ children, screenTexture, ...props }: IphoneProps) {
  return (
    <>
      <Model screenTexture={screenTexture} {...props}>
        {children}
      </Model>
    </>
  );
}
