import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import RotatingCube from "./Components/RotatingCube";
import {
  Backdrop,
  CycleRaycast,
  OrbitControls,
  SoftShadows,
} from "@react-three/drei";
import { Vector3 } from "three";
import GravitySphere from "./Components/GravitySphere";
import { Physics, PublicApi } from "@react-three/cannon";
import GlobalClickListener from "./Components/GlobalClickListener";
// import AreaLight from './Components/AreaLight';

function App() {
  const config = {
    size: 30,
    focus: 1.5,
    samples: 30,
  };

  const sphereRefs = useRef<{ api: PublicApi }[]>([]);

  const handlePointerDown = (event: React.PointerEvent) => {
    const explosionForce = 3;
    const { clientX, clientY } = event;
    const explosionPosition = new Vector3(
      (clientX / window.innerWidth) * 2 - 1,
      -(clientY / window.innerHeight) * 2 + 1,
      0
    );
    console.log("explosionPosition", explosionPosition);

    sphereRefs.current.forEach((ref) => {
      ref.api.applyImpulse(
        [explosionForce, explosionForce, explosionForce],
        [explosionPosition.x, explosionPosition.y, explosionPosition.z]
      );
    });
  };

  return (
    <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }} onPointerDown={handlePointerDown}
    >
      <CycleRaycast
        preventDefault={true} // Call event.preventDefault() (default: true)
        scroll={true} // Wheel events (default: true)
        keyCode={9} // Keyboard events (default: 9 [Tab])
      />
      {/* Enable soft shadows with drei */}
      <SoftShadows
        size={config.size}
        samples={config.samples}
        focus={config.focus}
      />

      <directionalLight
        position={[5, 5, 3]}
        color={"white"}
        intensity={1}
        castShadow
      />

      {/* Soft ambient light */}
      <ambientLight intensity={0.5} />

      {/* Rotating cube casting shadows */}
      <RotatingCube position={new Vector3(-2, 0, 0)} />
      <RotatingCube position={new Vector3(2, 0, 0)} />

      {/* Backdrop behind the scene */}
      <Backdrop
        floor={1} // Position the backdrop slightly behind the cube
        position={[0, -2, -2]} // Adjust position to fit the scene
        scale={[30, 10, 10]} // Scale backdrop to cover the whole scene
        receiveShadow // Ensure the backdrop can receive shadows
      >
        <meshStandardMaterial color={"white"} />
      </Backdrop>

      <Physics gravity={[0, 0, 0]}>
        <GravitySphere
          ref={(ref) => ref && sphereRefs.current.push(ref)}
          position={[3, 3, 0]}
        />
        <GravitySphere
          ref={(ref) => ref && sphereRefs.current.push(ref)}
          position={[2, 2, 2]}
        />
        <GravitySphere
          ref={(ref) => ref && sphereRefs.current.push(ref)}
          position={[-2, -2, 0]}
        />
      </Physics>

      {/* Add OrbitControls for easier interaction */}
      <OrbitControls />
    </Canvas>
  );
}

export default App;
