import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
  CubeCamera,
  WebGLCubeRenderTarget,
  Mesh,
  RGBFormat,
  LinearMipmapLinearFilter,
  Vector3,
} from "three";

interface RotatingCubeProps {
  position?: Vector3 | undefined;
}

const RotatingCube: React.FC<RotatingCubeProps> = function ({ position = new Vector3(0,0,0) }) {
  const meshRef = useRef<Mesh>(null);
  const cubeCamRef = useRef<CubeCamera>(null);
  const { gl, scene } = useThree(); // Get the scene and WebGL renderer

  // random number offset to be used for the rotations 
  const offset = Math.random() * 30;

  // Create WebGLCubeRenderTarget once and assign it to the CubeCamera
  const cubeRenderTarget = new WebGLCubeRenderTarget(256, {
    format: RGBFormat,
    generateMipmaps: true,
    minFilter: LinearMipmapLinearFilter,
  });

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.set(offset, offset, 0);
    }
  });

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;

      // Add cosine wave hover motion on the Y axis (up and down)
      meshRef.current.position.y = Math.cos(elapsedTime * 2) * 0.5; // amplitude of 0.5 units
    }

    // Update the CubeCamera to reflect the scene
    if (cubeCamRef.current && meshRef.current) {
      meshRef.current.visible = false; // Temporarily hide the cube to avoid self-reflection
      cubeCamRef.current.update(gl, scene); // Update the CubeCamera's render
      meshRef.current.visible = true; // Show the cube again after reflection capture
    }
  });

  return (
    <>
      {/* CubeCamera for real-time reflections */}
      <cubeCamera
        ref={cubeCamRef}
        args={[0.1, 10, cubeRenderTarget]} // Pass the WebGLCubeRenderTarget to the CubeCamera
        position={[0, 0, 0]}
      />

      {/* Cube mesh */}
      <mesh ref={meshRef} position={position} receiveShadow castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          metalness={0.1}
          roughness={0}
          color="orange"
          envMap={cubeRenderTarget.texture} // Use the cube render target texture as the envMap
        />
      </mesh>
    </>
  );
};

export default RotatingCube;
