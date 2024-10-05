import React from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { Mesh, Vector3 } from "three";

interface SphereProps {
  position?: [number, number, number];
}

const GravitySphere: React.FC<SphereProps> = ({ position = [0, 0, 0] }) => {
  const [ref, api] = useSphere<Mesh>(() => ({ mass: 0.1, position }));
  const { pointer, size } = useThree();

  useFrame(() => {
    const center = new Vector3(0, 0, 0);
    if (ref.current) {
      const spherePosition = new Vector3();
      ref.current.getWorldPosition(spherePosition);
      const forceDirection = center.clone().sub(spherePosition).normalize();
      console.log(forceDirection);
      api.applyForce(
        [forceDirection.x, forceDirection.y, forceDirection.z],
        [0, 0, 0]
      );
    }
  });

  const handleClick = () => {
    const explosionForce = 2;
    const explosionPosition = new Vector3(
      (pointer.x * size.width) / 2,
      (pointer.y * size.height) / 2,
      0
    );
    api.applyImpulse(
      [explosionForce, explosionForce, explosionForce],
      [explosionPosition.x, explosionPosition.y, explosionPosition.z]
    );
  };

  return (
    <mesh ref={ref} castShadow receiveShadow onClick={handleClick}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default GravitySphere;
