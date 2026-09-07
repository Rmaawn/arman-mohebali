"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  /** target cell — world position computed from col/row */
  col: number;
  row: number;
}

// Pawn (سرباز) Lathe Profile
function getPawnProfile(): THREE.Vector2[] {
  return [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.38, 0),
    new THREE.Vector2(0.40, 0.06),
    new THREE.Vector2(0.32, 0.12),
    new THREE.Vector2(0.22, 0.25),
    new THREE.Vector2(0.16, 0.52),
    new THREE.Vector2(0.24, 0.56),
    new THREE.Vector2(0.20, 0.60),
    new THREE.Vector2(0, 0.62),
  ];
}

// Queen (وزیر) Lathe Profile
function getQueenProfile(): THREE.Vector2[] {
  return [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.44, 0),
    new THREE.Vector2(0.46, 0.08),
    new THREE.Vector2(0.40, 0.16),
    new THREE.Vector2(0.25, 0.45),
    new THREE.Vector2(0.32, 0.72),
    new THREE.Vector2(0.36, 0.78),
    new THREE.Vector2(0.26, 0.84),
    new THREE.Vector2(0, 0.86),
  ];
}

export function PlayerKnight({ col, row }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const queenGroupRef = useRef<THREE.Group>(null);
  const pawnGroupRef = useRef<THREE.Group>(null);
  const targetY = useRef(0.05);

  // Promoted to Queen when reaching row 0 (the top rank / final destination)
  const isQueen = row === 0;

  const pawnProfile = useMemo(() => getPawnProfile(), []);
  const queenProfile = useMemo(() => getQueenProfile(), []);

  // Golden Pawn Material
  const goldMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#f4e4a3",
        metalness: 0.95,
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        emissive: "#5a3f08",
        emissiveIntensity: 0.45,
      }),
    []
  );

  // Royal Queen Gold Material (Brighter, richer gold with golden glow)
  const queenGoldMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#ffd700",
        metalness: 0.98,
        roughness: 0.08,
        clearcoat: 1,
        clearcoatRoughness: 0.02,
        emissive: "#8b6508",
        emissiveIntensity: 0.75,
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

  const queenAuraMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#ffd700",
        transparent: true,
        opacity: 0.75,
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

    // Arc jump animation during movement
    const liftTarget = distance > 0.05 ? 0.65 + Math.sin(t * 6) * 0.05 : 0.05;
    targetY.current = THREE.MathUtils.lerp(targetY.current, liftTarget, 0.14);

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      Math.min(0.14, delta * 7)
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      Math.min(0.14, delta * 7)
    );
    groupRef.current.position.y = 0.05 + targetY.current + Math.sin(t * 1.4) * 0.02;

    // Continuous smooth rotation (faster spin for Queen)
    groupRef.current.rotation.y += delta * (isQueen ? 0.9 : 0.6);

    // Smooth Pawn / Queen scaling morph
    if (pawnGroupRef.current) {
      const pScale = THREE.MathUtils.lerp(
        pawnGroupRef.current.scale.x,
        isQueen ? 0 : 1,
        0.12
      );
      pawnGroupRef.current.scale.setScalar(pScale);
      pawnGroupRef.current.visible = pScale > 0.01;
    }

    if (queenGroupRef.current) {
      const qScale = THREE.MathUtils.lerp(
        queenGroupRef.current.scale.x,
        isQueen ? 1 : 0,
        0.12
      );
      queenGroupRef.current.scale.setScalar(qScale);
      queenGroupRef.current.visible = qScale > 0.01;
    }
  });

  return (
    <group ref={groupRef} scale={0.7}>
      {/* ── PAWN (سرباز) ───────────────────────── */}
      <group ref={pawnGroupRef}>
        {/* Pawn Body Base */}
        <mesh material={goldMaterial} castShadow>
          <latheGeometry args={[pawnProfile, 48]} />
        </mesh>
        {/* Pawn Head Ball */}
        <mesh position={[0, 0.76, 0]} material={goldMaterial} castShadow>
          <sphereGeometry args={[0.22, 32, 32]} />
        </mesh>
        {/* Top Pin */}
        <mesh position={[0, 0.98, 0]} material={goldMaterial} castShadow>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>
      </group>

      {/* ── QUEEN (وزیر) PROMOTION ───────────────── */}
      <group ref={queenGroupRef} scale={0}>
        {/* Queen Royal Body Base */}
        <mesh material={queenGoldMaterial} castShadow>
          <latheGeometry args={[queenProfile, 48]} />
        </mesh>

        {/* Queen Crown Flared Bowl */}
        <group position={[0, 0.84, 0]}>
          <mesh material={queenGoldMaterial} castShadow position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.34, 0.22, 0.24, 32]} />
          </mesh>

          {/* Crown Spikes (6 crenellations around crown rim) */}
          {Array.from({ length: 6 }).map((_, i) => {
            const angle = (i * Math.PI * 2) / 6;
            const r = 0.32;
            const x = Math.cos(angle) * r;
            const z = Math.sin(angle) * r;
            return (
              <mesh
                key={i}
                position={[x, 0.28, z]}
                rotation={[0, -angle, 0.2]}
                material={queenGoldMaterial}
                castShadow
              >
                <coneGeometry args={[0.05, 0.14, 12]} />
              </mesh>
            );
          })}

          {/* Queen Royal Orb */}
          <mesh position={[0, 0.30, 0]} material={queenGoldMaterial} castShadow>
            <sphereGeometry args={[0.12, 24, 24]} />
          </mesh>

          {/* Royal Cross Top Emblem */}
          <mesh position={[0, 0.44, 0]} material={queenGoldMaterial} castShadow>
            <boxGeometry args={[0.04, 0.12, 0.04]} />
          </mesh>
          <mesh position={[0, 0.46, 0]} material={queenGoldMaterial} castShadow>
            <boxGeometry args={[0.1, 0.04, 0.04]} />
          </mesh>
        </group>

        {/* Queen Floating Royal Halo */}
        <mesh position={[0, 1.35, 0]} rotation={[-Math.PI / 2, 0, 0]} material={queenAuraMat}>
          <ringGeometry args={[0.2, 0.32, 32]} />
        </mesh>

        <pointLight position={[0, 1.2, 0]} intensity={2.8} color="#ffd700" distance={4} />
      </group>

      {/* Ring under base */}
      <mesh
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={isQueen ? queenAuraMat : glowMat}
      >
        <ringGeometry args={[0.45, 0.65, 32]} />
      </mesh>

      {isQueen && (
        <pointLight position={[0, 0.5, 0]} intensity={2.0} color="#ffd700" distance={3.5} />
      )}
    </group>
  );
}
