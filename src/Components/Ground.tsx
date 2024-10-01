import { useRef } from "react";
import { Mesh } from "three";

const Ground: React.FC = () => {
  const groundRef = useRef<Mesh>(null);

  return (
    <mesh
      ref={groundRef}
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[10, 10]} />
      <meshStandardMaterial color="lightgray" />
    </mesh>
  );
};

export default Ground;
