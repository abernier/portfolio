import { getUnit } from "gsap";
import { useControls } from "leva";

function Ground() {
  const gui = useControls({
    color: "#999",
  });
  return (
    <mesh
      //receiveShadow
      position-y={-0.02}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {/* <boxGeometry args={[100, 100, 0.1]} /> */}
      <circleGeometry args={[10, 32]} />
      <meshStandardMaterial
        color={gui.color}
        // transparent
        //opacity={0.8}
      />
    </mesh>
  );
}

export default Ground;
