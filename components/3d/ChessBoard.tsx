"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function ChessBoard() {
  const squares = useMemo(() => {
    const arr: { pos: [number, number, number]; light: boolean }[] = [];
    for (let x = 0; x < 8; x++) {
      for (let z = 0; z < 8; z++) {
        arr.push({
          pos: [x - 3.5, 0, z - 3.5],
          light: (x + z) % 2 === 0,
        });
      }
    }
    return arr;
  }, []);

  const lightMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#1a1a1a",
        metalness: 0.4,
        roughness: 0.3,
        clearcoat: 0.6,
        clearcoatRoughness: 0.2,
      }),
    []
  );

  const darkMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#050505",
        metalness: 0.5,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.15,
        emissive: "#0a0a0a",
      }),
    []
  );

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#d4af37",
        metalness: 1,
        roughness: 0.25,
        clearcoat: 1,
      }),
    []
  );

  return (
    <group>
      {/* Squares */}
      {squares.map((sq, i) => (
        <mesh
          key={i}
          position={sq.pos}
          material={sq.light ? lightMaterial : darkMaterial}
          receiveShadow
        >
          <boxGeometry args={[1, 0.1, 1]} />
        </mesh>
      ))}

      {/* Gold frame */}
      {[
        { pos: [0, 0.05, -4.2] as [number, number, number], size: [8.8, 0.15, 0.4] as [number, number, number] },
        { pos: [0, 0.05, 4.2] as [number, number, number], size: [8.8, 0.15, 0.4] as [number, number, number] },
        { pos: [-4.2, 0.05, 0] as [number, number, number], size: [0.4, 0.15, 8] as [number, number, number] },
        { pos: [4.2, 0.05, 0] as [number, number, number], size: [0.4, 0.15, 8] as [number, number, number] },
      ].map((f, i) => (
        <mesh key={i} position={f.pos} material={frameMaterial} castShadow receiveShadow>
          <boxGeometry args={f.size} />
        </mesh>
      ))}

      {/* Floor reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}
