import "./App.css";
import { Canvas } from "@react-three/fiber";
import RotatingCube from "./Components/RotatingCube";
import { Backdrop, OrbitControls, SoftShadows } from "@react-three/drei";
import { Vector3 } from "three";
// import AreaLight from "./Components/AreaLight";

function App() {
  const config = {
    size: 30,
    focus: 1.5,
    samples: 30,
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

      <directionalLight position={[5, 5, 3]} color={"white"} intensity={1} castShadow />

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

      {/* <Environment preset="city" environmentIntensity={0.3}  /> */}

      {/* Add OrbitControls for easier interaction */}
      <OrbitControls />
    </Canvas>
  );
}

export default App;
