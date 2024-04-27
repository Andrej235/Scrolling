import { useRef } from "react";
import useGLTF from "../../Hooks/UseGLTF";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export default function Cube() {
  const cubeGeometry = useGLTF("/CubeWithHoles.glb").children[0].geometry;
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x = clock.getElapsedTime();
    meshRef.current.rotation.y = clock.getElapsedTime();
  });

  return (
    <mesh geometry={cubeGeometry} ref={meshRef}>
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
