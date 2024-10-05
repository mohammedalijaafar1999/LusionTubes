import "./App.css";
import { Canvas } from "@react-three/fiber";
import RotatingCube from "./Components/RotatingCube";
import { Backdrop, OrbitControls, SoftShadows } from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import GravitySphere from "./Components/GravitySphere";
import { Physics } from "@react-three/cannon";
import { useRef } from "react";
// import AreaLight from "./Components/AreaLight";

function App() {
  const config = {
    size: 30,
    focus: 1.5,
    samples: 30,
  };


  const sphereRefs = useRef<React.MutableRefObject<Mesh>[]>([]);

  const handlePointerDown = (event: React.PointerEvent) => {
    const explosionForce = 100;
    const { x, y } = event;
    const explosionPosition = new Vector3((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1, 0);

    sphereRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.api.applyImpulse([explosionForce, explosionForce, explosionForce], [explosionPosition.x, explosionPosition.y, explosionPosition.z]);
      }
    });
  };

  return (
    <Canvas shadows camera={{ position: [0, 0, 6], fov: 50 }}>
      {/* Enable soft shadows with drei */}
      <SoftShadows
        size={config.size}
        samples={config.samples}
        focus={config.focus}
      />

      {/* <fog attach="fog" args={["white", 0, 50]} /> */}
      {/* <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} /> */}

      {/* <AreaLight intensity={1} position={[-5, 7, 0]} lookAtVector={new Vector3(0, 0, 0)} color="#ffeeee"/>
      <AreaLight intensity={1} position={[5, 5, 0]} lookAtVector={new Vector3(0, 0, 0)} /> */}

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
        {/* <GravitySphere position={[0, 0, 0]} /> */}
        <GravitySphere ref={(ref) => ref && sphereRefs.current.push(ref)} position={[3, 3, 0]} />
        <GravitySphere position={[2, 2, 2]} />
        <GravitySphere position={[-2, -2, 0]} />


      </Physics>

      {/* <Environment preset="city" environmentIntensity={0.3}  /> */}

      {/* Add OrbitControls for easier interaction */}
      <OrbitControls />
    </Canvas>
  );
}

export default App;
