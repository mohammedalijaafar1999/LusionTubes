import { forwardRef, useImperativeHandle } from 'react';
import { useFrame } from '@react-three/fiber';
import { PublicApi, useSphere } from '@react-three/cannon';
import { Mesh, Vector3 } from 'three';

interface SphereProps {
  position?: [number, number, number];
  forceMagnitude?: number;
}

const GravitySphere = forwardRef<{ api: PublicApi }, SphereProps>(({ position = [0, 0, 0], forceMagnitude = 10 }, ref) => {
  const [sphereRef, api] = useSphere<Mesh>(() => ({ mass: 1, position, linearDamping: 0.4 }));
//   const { pointer, size } = useThree();

  useImperativeHandle(ref, () => ({ api }), [api]);

  useFrame(() => {
    const center = new Vector3(0, 0, 0);
    if (sphereRef.current) {
      const spherePosition = new Vector3();
      sphereRef.current.getWorldPosition(spherePosition);
      const forceDirection = center.clone().sub(spherePosition).normalize();
      api.applyForce(
        [forceDirection.x * forceMagnitude, forceDirection.y * forceMagnitude, forceDirection.z * forceMagnitude],
        [0, 0, 0]
      );
    }
  });

  return (
    <mesh ref={sphereRef} castShadow receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="orange" roughness={0.1} />
    </mesh>
  );
});

export default GravitySphere;
