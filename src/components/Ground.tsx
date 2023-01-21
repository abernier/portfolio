import { useControls } from "leva";

function Ground({
  size = 10,
  circle = false,
}: {
  size?: number;
  circle?: boolean;
}) {
  const gui = useControls({
    color: "#999",
  });
  return (
    <mesh
      //receiveShadow
      position-y={-0.02}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {circle ? (
        <circleGeometry args={[size, 32]} />
      ) : (
        <boxGeometry args={[size, size, 0.1]} />
      )}

      <meshStandardMaterial
        color={gui.color}
        // transparent
        //opacity={0.8}
      />
    </mesh>
  );
}

export default Ground;
