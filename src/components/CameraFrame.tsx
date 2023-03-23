import * as THREE from "three";
import { createPortal, useFrame, useThree } from "@react-three/fiber";

// import CameraControlsImpl from "camera-controls";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { folder, useControls } from "leva";
import { useIphone } from "./Iphone";

const { clamp } = THREE.MathUtils;

type CameraFrameProps = {};

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

export type CameraFrameAPI = {
  box: THREE.Mesh | null;
  bbox: THREE.Box3;
  bs: THREE.Sphere;
};

const CameraFrame = forwardRef<CameraFrameAPI, CameraFrameProps>((_, ref) => {
  const { screenHeight: H, screenWidth: W } = useIphone();

  const { x, y, w, h, dezoomFactor, showBoundingBox, showBoundingSphere } =
    useControls({
      cameraFrame: folder(
        {
          w: { value: W, min: 0.5, max: W, step: 0.1 },
          h: { value: 5, min: 0.5, max: H, step: 0.1 },
          x: { value: 0, min: -W / 2, max: W / 2, step: 0.1 },
          y: { value: 0, min: -H / 2, max: H / 2, step: 0.1 },
          dezoomFactor: { value: 1, min: 1, max: 5, step: 0.1 },
          showBoundingSphere: true,
          showBoundingBox: true,
        }
        // { collapsed: true }
      ),
    });

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

  useEffect(() => {
    if (!boxRef?.current) return;
    // ensure the bounding box is initially computed for its geometry
    // boxRef.current.geometry.computeBoundingBox();

    //
    boxRef.current.updateWorldMatrix(true, false);
  }, []);

  useFrame(() => {
    if (!boxRef?.current) return;

    // Compute bbox
    bbox.setFromObject(boxRef.current);
    // bbox
    //   .copy(boxRef.current.geometry.boundingBox)
    //   .applyMatrix4(boxRef.current.matrixWorld);

    // Compute bs
    bbox.getBoundingSphere(bs);
    bs.radius *= dezoomFactor;

    // Update boxHelper
    if (boxHelperRef.current) boxHelperRef.current.update();

    // Update our debug sphere (position and scale)
    if (sphereRef.current) {
      bbox.getCenter(center);
      sphereRef.current.position.copy(center);
      sphereRef.current.scale.setScalar(bs.radius);
    }
  });

  let _x = x;
  let _y = y;
  let _w = w;
  let _h = h;
  // limit _w
  _w = clamp(w, 0, W);
  // limit _h
  _h = clamp(h, 0, H);
  // limit _x
  const minx = -W / 2 + _w / 2;
  const maxx = W / 2 - _w / 2;
  _x = clamp(x, minx, maxx);
  console.log("_x", _x);
  // limit _y
  const miny = -H / 2 + _h / 2;
  const maxy = H / 2 - _h / 2;
  _y = clamp(y, miny, maxy);

  return (
    <group position-x={-_x} position-y={_y}>
      <mesh ref={boxRef}>
        <boxGeometry args={[_w, _h, 1]} />
        <meshStandardMaterial color="red" wireframe />
      </mesh>

      {boxRef?.current &&
        createPortal(
          <>
            {/* Bounding box */}
            {showBoundingBox && (
              <boxHelper ref={boxHelperRef} args={[boxRef.current, 0x0000ff]} />
            )}

            {/* Bounding sphere */}
            {showBoundingSphere && (
              <mesh ref={sphereRef}>
                <sphereGeometry args={[1]} />
                <meshBasicMaterial
                  color="#00ff00"
                  transparent
                  opacity={0.25}
                  wireframe
                />
              </mesh>
            )}
          </>,
          scene
        )}
    </group>
  );
});

export default CameraFrame;
