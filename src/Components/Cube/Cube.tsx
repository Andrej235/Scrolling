import { useEffect, useRef } from "react";
import useGLTF from "../../Hooks/UseGLTF";
import { Mesh } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import Observer from "gsap/Observer";
import { Center } from "@react-three/drei";
gsap.registerPlugin(Observer);

export default function Cube() {
  const currentStep = useRef(0);
  const cubeGeometry = useGLTF("/CubeWithHoles.glb").children[0].geometry;
  const meshRef = useRef<Mesh>(null);

  const { width: sceneWidth, height: sceneHeight } = useThree(
    (state) => state.viewport
  );

  useEffect(() => {
    Observer.create({
      target: document,
      onDown: () => {
        currentStep.current++;
        meshRef.current!.geometry.computeBoundingBox();
        console.log(meshRef.current!.geometry.boundingBox!.max);
        console.log(sceneHeight, sceneWidth);

        gsap.to(meshRef.current!.position, {
          x: -sceneWidth / 2 + 1.5,
          y: sceneHeight / 2 - 1.5,
          duration: 0.5,
        });

        gsap.to(meshRef.current!.scale, {
          x: 0.5,
          y: 0.5,
          z: 0.5,
          duration: 0.5,
        });
      },
    });
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x = clock.getElapsedTime();
    meshRef.current.rotation.y = clock.getElapsedTime();
  });

  return (
    <Center top left >
      <mesh geometry={cubeGeometry} ref={meshRef}>
        <meshStandardMaterial color="red" />
      </mesh>
    </Center>
  );
}
