import { useLoader } from "@react-three/fiber";
//@ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function useGLTF(url: string) {
  const { scene } = useLoader(GLTFLoader, url);
  return scene;
}
