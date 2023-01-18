function Ground() {
  return (
    <mesh receiveShadow position-y={-0.1 / 2} rotation={[-Math.PI / 2, 0, 0]}>
      <boxGeometry args={[100, 100, 0.1]} />
      <meshStandardMaterial color="gray" transparent opacity={0.8} />
    </mesh>
  );
}

export default Ground;
