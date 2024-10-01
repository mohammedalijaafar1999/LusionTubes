import "./App.css";
import { Canvas } from "@react-three/fiber";
import RotatingCube from "./Components/RotatingCube";
import { Backdrop, Environment, OrbitControls, SoftShadows } from "@react-three/drei";

function App() {

  const config = {
    size: 75,
    focus: 1.5,
    samples: 25
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ }}
    >
      {/* Enable soft shadows with drei */}
      <SoftShadows size={config.size} samples={config.samples} focus={config.focus} />

      {/* <fog attach="fog" args={["white", 0, 40]} /> */}
      <directionalLight castShadow position={[2.5, 8, 5]} intensity={1} shadow-mapSize={1024} />
        {/* <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} /> */}

      {/* Soft ambient light */}
      <ambientLight intensity={0.3} />

      {/* Rotating cube casting shadows */}
      <RotatingCube />

      {/* Backdrop behind the scene */}
      <Backdrop
        floor={1} // Position the backdrop slightly behind the cube
        position={[0, -2, -2]} // Adjust position to fit the scene
        scale={[15, 5, 5]} // Scale backdrop to cover the whole scene
        receiveShadow // Ensure the backdrop can receive shadows
      >
        <meshStandardMaterial color={"white"} />
      </Backdrop>

      <Environment preset="city" environmentIntensity={0.3}  />

      {/* Add OrbitControls for easier interaction */}
      <OrbitControls />
    </Canvas>
  );
}

export default App;
