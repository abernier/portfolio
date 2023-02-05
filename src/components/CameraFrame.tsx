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

type CameraFrameProps = {
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
  ({ showBoundingBox, showBoundingSphere, dezoomFactor = 1 }, ref) => {
    const { screenHeight: H } = useIphone();

    const { y, w, h } = useControls({
      cameraFrame: folder(
        {
          y: { value: 0, min: -H / 2, max: H / 2, step: 0.1 },
          h: { value: 5, min: 0.5, max: H, step: 0.1 },
          w: { value: 7, min: 0.5, max: 7, step: 0.1 },
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

    useFrame(() => {
      // Compute bbox and bs (from boxRef)
      if (!boxRef?.current) return; // https://stackoverflow.com/a/62238917/133327
      bbox.setFromObject(boxRef.current);
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

    let _y = y;
    let _h = h;
    // limit _h
    _h = clamp(h, 0, H);
    // limit _y
    const min = -H / 2 + _h / 2;
    const max = H / 2 - _h / 2;
    _y = clamp(y, min, max);

    return (
      <group position-y={_y}>
        <mesh ref={boxRef}>
          <boxGeometry args={[w, _h, 1]} />
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
  }
);

export default CameraFrame;
