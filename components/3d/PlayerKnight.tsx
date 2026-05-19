"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  /** target cell — world position computed from col/row */
  col: number;
  row: number;
}

function getKnightProfile(): THREE.Vector2[] {
  return [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.4, 0),
    new THREE.Vector2(0.44, 0.08),
    new THREE.Vector2(0.34, 0.12),
    new THREE.Vector2(0.26, 0.18),
    new THREE.Vector2(0.22, 0.5),
    new THREE.Vector2(0.22, 0.6),
    new THREE.Vector2(0, 0.62),
  ];
}

export function PlayerKnight({ col, row }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const targetY = useRef(0.05);
  const prevTargetX = useRef(col - 3.5);
  const prevTargetZ = useRef(row - 3.5);

  const profile = useMemo(() => getKnightProfile(), []);

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f4e4a3",
        metalness: 1,
        roughness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        emissive: "#5a3f08",
        emissiveIntensity: 0.4,
      }),
    []
  );

  const glowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f4e4a3",
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const targetX = col - 3.5;
    const targetZ = row - 3.5;

    const dx = targetX - groupRef.current.position.x;
    const dz = targetZ - groupRef.current.position.z;
    const distance = Math.sqrt(dx * dx + dz * dz);

    // arc-jump: lift up while moving, settle down when close
    const liftTarget = distance > 0.05 ? 0.6 + Math.sin(t * 6) * 0.05 : 0.05;
    targetY.current = THREE.MathUtils.lerp(targetY.current, liftTarget, 0.12);

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      Math.min(0.12, delta * 6)
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      Math.min(0.12, delta * 6)
    );
    groupRef.current.position.y = 0.05 + targetY.current + Math.sin(t * 1.4) * 0.02;

    // face direction of movement
    if (distance > 0.05) {
      const angle = Math.atan2(dx, dz);
      const cur = groupRef.current.rotation.y;
      let diff = angle - cur;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      groupRef.current.rotation.y = cur + diff * 0.15;
    } else {
      groupRef.current.rotation.y += delta * 0.6;
    }

    prevTargetX.current = targetX;
    prevTargetZ.current = targetZ;
  });

  return (
    <group ref={groupRef} scale={0.7}>
      {/* base */}
      <mesh material={material} castShadow>
        <latheGeometry args={[profile, 48]} />
      </mesh>

      {/* knight head — angled blocks */}
      <group position={[0, 0.7, 0]} rotation={[0, 0, -0.2]}>
        <mesh material={material} castShadow>
          <boxGeometry args={[0.35, 0.45, 0.25]} />
        </mesh>
        <mesh position={[0.12, 0.15, 0]} rotation={[0, 0, 0.5]} material={material} castShadow>
          <boxGeometry args={[0.3, 0.18, 0.22]} />
        </mesh>
        <mesh position={[0.22, 0.05, 0]} material={material} castShadow>
          <boxGeometry args={[0.2, 0.15, 0.2]} />
        </mesh>
      </group>

      {/* ring under base */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={glowMat}>
        <ringGeometry args={[0.45, 0.6, 32]} />
      </mesh>
    </group>
  );
}
