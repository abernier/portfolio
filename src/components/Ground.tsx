function Ground() {
  return (
    <mesh
      //receiveShadow
      position-y={-0.02}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {/* <boxGeometry args={[100, 100, 0.1]} /> */}
      <circleGeometry args={[100, 32]} />
      <meshStandardMaterial
        color="#999"
        // transparent
        //opacity={0.8}
      />
    </mesh>
  );
}

export default Ground;
