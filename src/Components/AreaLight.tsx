import React, { useEffect, useRef } from 'react';
import { RectAreaLight } from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { Vector3 } from 'three';

RectAreaLightUniformsLib.init();

interface AreaLightProps {
  width?: number;
  height?: number;
  color?: string;
  intensity?: number;
  position?: [number, number, number];
  lookAtVector?: Vector3;
}

const AreaLight: React.FC<AreaLightProps> = ({
  width = 10,
  height = 10,
  color = '#eeeeff',
  intensity = 5,
  position = [5, 5, 0],
  lookAtVector = new Vector3(0, 0, 0),
}) => {
  const lightRef = useRef<RectAreaLight>(null);

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.lookAt(lookAtVector);
    }
  }, [lookAtVector]);

  return (
    <rectAreaLight
      ref={lightRef}
      width={width}
      height={height}
      color={color}
      intensity={intensity}
      position={position}
    />
  );
};

export default AreaLight;
