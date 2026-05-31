"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { COLUMNS } from "@/data/cells";

interface Props {
  hoverCell: { col: number; row: number } | null;
  activeCell: { col: number; row: number };
  onHoverCell: (cell: { col: number; row: number } | null) => void;
  onSelectCell: (col: number, row: number) => void;
  isDark?: boolean;
}

export function ChessBoard({ hoverCell, activeCell, onHoverCell, onSelectCell, isDark = true }: Props) {
  const lightMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isDark ? "#1f1f1f" : "#c8b896",
        metalness: isDark ? 0.45 : 0.1,
        roughness: isDark ? 0.28 : 0.55,
      }),
    [isDark]
  );

  const darkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isDark ? "#060606" : "#7a5c3a",
        metalness: isDark ? 0.55 : 0.15,
        roughness: isDark ? 0.18 : 0.6,
      }),
    [isDark]
  );

  const frameMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d4af37",
        metalness: 0.95,
        roughness: 0.2,
        emissive: isDark ? "#3a2a05" : "#5a3f00",
        emissiveIntensity: isDark ? 0.4 : 0.2,
      }),
    [isDark]
  );

  const filledRingMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: isDark ? "#d4af37" : "#986e0a",
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
      }),
    [isDark]
  );

  const hoverDiscMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: isDark ? "#f4e4a3" : "#c9a030",
        transparent: true,
        opacity: isDark ? 0.18 : 0.22,
        side: THREE.DoubleSide,
      }),
    [isDark]
  );

  const activeDiscMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: isDark ? "#d4af37" : "#986e0a",
        transparent: true,
        opacity: isDark ? 0.35 : 0.4,
        side: THREE.DoubleSide,
      }),
    [isDark]
  );

  const floorMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: isDark ? "#080808" : "#d0c4a8",
        roughness: isDark ? 0.45 : 0.7,
        metalness: isDark ? 0.65 : 0.05,
      }),
    [isDark]
  );

  const squares = useMemo(() => {
    const arr: {
      key: string;
      pos: [number, number, number];
      light: boolean;
      col: number;
      row: number;
      filled: boolean;
    }[] = [];
    for (let col = 0; col < 8; col++) {
      for (let row = 0; row < 8; row++) {
        const x = col - 3.5;
        const z = row - 3.5;
        const isLight = (col + row) % 2 === 0;
        const filled = COLUMNS[col].cells[row] !== null;
        arr.push({ key: `${col}-${row}`, pos: [x, 0, z], light: isLight, col, row, filled });
      }
    }
    return arr;
  }, []);

  return (
    <group>
      {squares.map((sq) => {
        const isHover  = hoverCell?.col  === sq.col && hoverCell?.row  === sq.row;
        const isActive = activeCell.col  === sq.col && activeCell.row  === sq.row;
        return (
          <group key={sq.key} position={sq.pos}>
            <mesh
              material={sq.light ? lightMat : darkMat}
              receiveShadow
              onPointerOver={(e) => { e.stopPropagation(); onHoverCell({ col: sq.col, row: sq.row }); document.body.style.cursor = "pointer"; }}
              onPointerOut={() => { onHoverCell(null); document.body.style.cursor = "default"; }}
              onClick={(e) => { e.stopPropagation(); if (sq.filled) onSelectCell(sq.col, sq.row); }}
            >
              <boxGeometry args={[0.98, 0.1, 0.98]} />
            </mesh>

            {isHover && (
              <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} material={hoverDiscMat}>
                <planeGeometry args={[0.95, 0.95]} />
              </mesh>
            )}
            {isActive && (
              <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]} material={activeDiscMat}>
                <circleGeometry args={[0.45, 32]} />
              </mesh>
            )}
            {sq.filled && !isActive && (
              <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]} material={filledRingMat}>
                <ringGeometry args={[0.07, 0.1, 24]} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Gold frame */}
      {[
        { pos: [0, 0.05, -4.2] as [number,number,number], size: [8.8, 0.18, 0.4] as [number,number,number] },
        { pos: [0, 0.05,  4.2] as [number,number,number], size: [8.8, 0.18, 0.4] as [number,number,number] },
        { pos: [-4.2, 0.05, 0] as [number,number,number], size: [0.4, 0.18, 8]   as [number,number,number] },
        { pos: [ 4.2, 0.05, 0] as [number,number,number], size: [0.4, 0.18, 8]   as [number,number,number] },
      ].map((f, i) => (
        <mesh key={i} position={f.pos} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={f.size} />
        </mesh>
      ))}

      {[[-4.2,-4.2],[4.2,-4.2],[-4.2,4.2],[4.2,4.2]].map(([x,z],i) => (
        <mesh key={i} position={[x, 0.12, z]} material={frameMat} castShadow>
          <sphereGeometry args={[0.22, 12, 12]} />
        </mesh>
      ))}

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow material={floorMat}>
        <planeGeometry args={[60, 60]} />
      </mesh>
    </group>
  );
}
