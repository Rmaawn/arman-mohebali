"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface Props {
  isDark?: boolean;
}

export function ChessBoardDecorative({ isDark = true }: Props) {
  const squares = useMemo(() => {
    const arr: { pos: [number, number, number]; light: boolean }[] = [];
    for (let x = 0; x < 8; x++) {
      for (let z = 0; z < 8; z++) {
        arr.push({ pos: [x - 3.5, 0, z - 3.5], light: (x + z) % 2 === 0 });
      }
    }
    return arr;
  }, []);

  const lightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isDark ? "#1a1a1a" : "#c4b890",
        metalness: isDark ? 0.5 : 0.08,
        roughness: isDark ? 0.3  : 0.6,
      }),
    [isDark]
  );

  const darkMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isDark ? "#050505" : "#786050",
        metalness: isDark ? 0.6 : 0.1,
        roughness: isDark ? 0.25 : 0.65,
      }),
    [isDark]
  );

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4af37",
        metalness: 0.95,
        roughness: 0.2,
        emissive: isDark ? "#3a2a00" : "#5a3f00",
        emissiveIntensity: isDark ? 0.15 : 0.1,
      }),
    [isDark]
  );

  const floorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isDark ? "#0a0a0a" : "#cdc0a4",
        roughness: isDark ? 0.4 : 0.75,
        metalness: isDark ? 0.6 : 0.02,
      }),
    [isDark]
  );

  return (
    <group>
      {squares.map((sq, i) => (
        <mesh key={i} position={sq.pos} material={sq.light ? lightMaterial : darkMaterial} receiveShadow>
          <boxGeometry args={[1, 0.1, 1]} />
        </mesh>
      ))}

      {[
        { pos: [0, 0.05, -4.2] as [number,number,number], size: [8.8, 0.15, 0.4] as [number,number,number] },
        { pos: [0, 0.05,  4.2] as [number,number,number], size: [8.8, 0.15, 0.4] as [number,number,number] },
        { pos: [-4.2, 0.05, 0] as [number,number,number], size: [0.4, 0.15, 8]   as [number,number,number] },
        { pos: [ 4.2, 0.05, 0] as [number,number,number], size: [0.4, 0.15, 8]   as [number,number,number] },
      ].map((f, i) => (
        <mesh key={i} position={f.pos} material={frameMaterial} castShadow receiveShadow>
          <boxGeometry args={f.size} />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow material={floorMat}>
        <planeGeometry args={[40, 40]} />
      </mesh>
    </group>
  );
}
