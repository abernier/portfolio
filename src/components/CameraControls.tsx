//
// <CameraControls />
//
// type CameraControlsProps = {
//   camera?: PerspectiveCamera | OrthographicCamera
//   domElement?: HTMLElement
// }
//
// Inspired from https://github.com/pmndrs/drei/blob/master/src/core/OrbitControls.tsx
//
// also see the discussion: https://github.com/yomotsu/camera-controls/issues/262#issuecomment-1399305886
//

import * as THREE from "three";
import type { PerspectiveCamera, OrthographicCamera } from "three";

import { forwardRef, useMemo, useEffect } from "react";
import {
  extend,
  useFrame,
  useThree,
  ReactThreeFiber,
  EventManager,
} from "@react-three/fiber";

import CameraControlsImpl from "camera-controls";

CameraControlsImpl.install({ THREE });
extend({ CameraControlsImpl });

export type CameraControlsProps = Omit<
  ReactThreeFiber.Overwrite<
    ReactThreeFiber.Node<CameraControlsImpl, typeof CameraControlsImpl>,
    {
      camera?: PerspectiveCamera | OrthographicCamera;
      domElement?: HTMLElement;
    }
  >,
  "ref"
>;

export const CameraControls = forwardRef<
  CameraControlsImpl,
  CameraControlsProps
>((props, ref) => {
  const { camera, domElement, ...restProps } = props;

  const defaultCamera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  const events = useThree((state) => state.events) as EventManager<HTMLElement>;

  const explCamera = camera || defaultCamera;
  const explDomElement = (domElement ||
    events.connected ||
    gl.domElement) as HTMLElement;

  const cameraControls = useMemo(
    () => new CameraControlsImpl(explCamera, explDomElement),
    [explCamera, explDomElement]
  );

  useFrame((state, delta) => {
    if (cameraControls.enabled) cameraControls.update(delta);
  }, -1);

  useEffect(() => {
    return () => void cameraControls.dispose();
  }, [explDomElement, cameraControls, invalidate]);

  return <primitive ref={ref} object={cameraControls} {...restProps} />;
});

export type CameraControls = CameraControlsImpl;
