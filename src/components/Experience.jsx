import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Book } from "./Book";

const PILLAR_X_OFFSET = 2.5;
const PILLAR_HEIGHT = 7.2;
const PILLAR_RADIUS = 0.55;
const PILLAR_Y = -2.2;
const BASE_Y = -1.2;
const BASE_RADIUS = 1.2;
const BASE_HEIGHT = 0.35;
const RIM_HEIGHT = 0.12;
const WALKWAY_WIDTH = 1.0;
const WALKWAY_LENGTH = 6.0;
const WALKWAY_HEIGHT = 0.08;
const PILLAR_RING_OFFSETS_LEFT = [-2.7, -1.35, -0.1, 1.1, 2.6];
const PILLAR_RING_OFFSETS_RIGHT = [-2.2, -0.6, 0.7, 2.1, 3.0];
const PILLAR_GLOW_OFFSETS_LEFT = [-2.0, -0.3, 1.4, 2.9];
const PILLAR_GLOW_OFFSETS_RIGHT = [-1.7, 0.4, 1.9, 2.7];
const PILLAR_GLOW_THICKNESS = 0.06;

const Pillar = ({ x, rings, glows, tilt }) => {
  return (
    <group position={[x, 0, 0]} rotation-z={tilt}>
      <mesh position={[0, PILLAR_Y, 0]} castShadow receiveShadow>
        <cylinderGeometry
          args={[PILLAR_RADIUS * 0.88, PILLAR_RADIUS * 1.05, PILLAR_HEIGHT, 32]}
        />
        <meshStandardMaterial color="#0c1c17" roughness={0.7} metalness={0.08} />
      </mesh>

      <mesh position={[0, PILLAR_Y + PILLAR_HEIGHT * 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry
          args={[PILLAR_RADIUS * 0.55, PILLAR_RADIUS * 0.8, PILLAR_HEIGHT * 0.9, 28]}
        />
        <meshStandardMaterial color="#0f2a22" roughness={0.65} metalness={0.12} />
      </mesh>

      {rings.map((offset, index) => (
        <mesh
          key={`ring-${offset}`}
          position={[0, PILLAR_Y + offset, 0]}
          rotation-x={Math.PI / 2}
          rotation-z={index % 2 === 0 ? 0.15 : -0.1}
          castShadow
          receiveShadow
        >
          <torusGeometry args={[PILLAR_RADIUS * (1.02 + index * 0.02), 0.045 + index * 0.006, 16, 48]} />
          <meshStandardMaterial color="#14352a" roughness={0.55} metalness={0.14} />
        </mesh>
      ))}

      {glows.map((offset, index) => (
        <mesh
          key={`glow-${offset}`}
          position={[0, PILLAR_Y + offset, 0]}
          rotation-y={index * 0.6}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            args={[PILLAR_RADIUS * (1.01 + index * 0.01), PILLAR_RADIUS * (1.01 + index * 0.01), PILLAR_GLOW_THICKNESS, 48]}
          />
          <meshStandardMaterial
            color="#163a2d"
            emissive="#5bffcc"
            emissiveIntensity={0.75}
            roughness={0.35}
            metalness={0.18}
          />
        </mesh>
      ))}

      {glows.map((offset, index) => (
        <mesh
          key={`node-${offset}`}
          position={[0, PILLAR_Y + offset + 0.15, PILLAR_RADIUS * 0.65]}
          rotation-z={index * 0.4}
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[0.12 + index * 0.03, 24, 24]} />
          <meshStandardMaterial
            color="#1b3b2e"
            emissive="#7cffd5"
            emissiveIntensity={0.9}
            roughness={0.25}
            metalness={0.2}
          />
        </mesh>
      ))}

      <mesh position={[0, PILLAR_Y + PILLAR_HEIGHT / 2 + 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[PILLAR_RADIUS * 1.18, PILLAR_RADIUS * 1.12, 0.36, 32]} />
        <meshStandardMaterial color="#133328" roughness={0.5} metalness={0.15} />
      </mesh>
    </group>
  );
};
export const Experience = () => {
  return (
    <>
      <group>
        <mesh position={[0, BASE_Y, 0]} receiveShadow>
          <cylinderGeometry args={[BASE_RADIUS, BASE_RADIUS, BASE_HEIGHT, 64]} />
          <meshStandardMaterial color="#0b1f1a" roughness={0.7} metalness={0.05} />
        </mesh>
        <mesh position={[0, BASE_Y + BASE_HEIGHT / 2 + RIM_HEIGHT / 2, 0]} receiveShadow>
          <cylinderGeometry args={[BASE_RADIUS * 1.08, BASE_RADIUS * 1.08, RIM_HEIGHT, 64]} />
          <meshStandardMaterial color="#123025" roughness={0.6} metalness={0.1} />
        </mesh>
        <mesh
          position={[0, BASE_Y + WALKWAY_HEIGHT / 2, BASE_RADIUS + WALKWAY_LENGTH / 2 - 0.1]}
          receiveShadow
        >
          <boxGeometry args={[WALKWAY_WIDTH, WALKWAY_HEIGHT, WALKWAY_LENGTH]} />
          <meshStandardMaterial color="#0e2a22" roughness={0.65} metalness={0.08} />
        </mesh>
      </group>

      <group>
        <Pillar
          x={-PILLAR_X_OFFSET}
          rings={PILLAR_RING_OFFSETS_LEFT}
          glows={PILLAR_GLOW_OFFSETS_LEFT}
          tilt={0.04}
        />
        <Pillar
          x={PILLAR_X_OFFSET}
          rings={PILLAR_RING_OFFSETS_RIGHT}
          glows={PILLAR_GLOW_OFFSETS_RIGHT}
          tilt={-0.03}
        />
      </group>
      <Float
        rotation-x={-Math.PI / 4}
        floatIntensity={1}
        speed={2}
        rotationIntensity={2}
      >
        <Book position-y={0.2} />
      </Float>
      <OrbitControls />
      <Environment preset="studio"></Environment>
      <directionalLight
        position={[2, 5, 2]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};