"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { COLUMNS } from "@/data/cells";

interface Props {
  hoverCell: { col: number; row: number } | null;
  activeCell: { col: number; row: number };
  onHoverCell: (cell: { col: number; row: number } | null) => void;
  onSelectCell: (col: number, row: number) => void;
}

/**
 * 8x8 board with each square individually interactive.
 * Filled cells (data exists) glow softly. Active cell glows strongly.
 */
export function ChessBoard({ hoverCell, activeCell, onHoverCell, onSelectCell }: Props) {
  const lightMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#1f1f1f",
        metalness: 0.45,
        roughness: 0.28,
        clearcoat: 0.7,
        clearcoatRoughness: 0.18,
      }),
    []
  );

  const darkMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#060606",
        metalness: 0.55,
        roughness: 0.18,
        clearcoat: 0.85,
        clearcoatRoughness: 0.12,
        emissive: "#0a0a0a",
      }),
    []
  );

  const frameMat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#d4af37",
        metalness: 1,
        roughness: 0.22,
        clearcoat: 1,
        emissive: "#3a2a05",
        emissiveIntensity: 0.5,
      }),
    []
  );

  const filledRingMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#d4af37",
        transparent: true,
        opacity: 0.65,
        side: THREE.DoubleSide,
      }),
    []
  );

  const hoverDiscMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#f4e4a3",
        transparent: true,
        opacity: 0.18,
        side: THREE.DoubleSide,
      }),
    []
  );

  const activeDiscMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#d4af37",
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      }),
    []
  );

  /**
   * col 0..7  → world X from -3.5 to 3.5 (file A..H, left→right)
   * row 0..7  → world Z from -3.5 to 3.5 (rank 8..1, back→front)
   */
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
        arr.push({
          key: `${col}-${row}`,
          pos: [x, 0, z],
          light: isLight,
          col,
          row,
          filled,
        });
      }
    }
    return arr;
  }, []);

  return (
    <group>
      {squares.map((sq) => {
        const isHover = hoverCell?.col === sq.col && hoverCell?.row === sq.row;
        const isActive = activeCell.col === sq.col && activeCell.row === sq.row;
        return (
          <group key={sq.key} position={sq.pos}>
            <mesh
              material={sq.light ? lightMat : darkMat}
              receiveShadow
              onPointerOver={(e) => {
                e.stopPropagation();
                onHoverCell({ col: sq.col, row: sq.row });
                document.body.style.cursor = "pointer";
              }}
              onPointerOut={() => {
                onHoverCell(null);
                document.body.style.cursor = "default";
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (sq.filled) onSelectCell(sq.col, sq.row);
              }}
            >
              <boxGeometry args={[0.98, 0.1, 0.98]} />
            </mesh>

            {/* hover halo (any square) */}
            {isHover && (
              <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} material={hoverDiscMat}>
                <planeGeometry args={[0.95, 0.95]} />
              </mesh>
            )}

            {/* active halo (selected cell) */}
            {isActive && (
              <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]} material={activeDiscMat}>
                <circleGeometry args={[0.45, 32]} />
              </mesh>
            )}

            {/* indicator dot for filled cells */}
            {sq.filled && !isActive && (
              <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]} material={filledRingMat}>
                <ringGeometry args={[0.07, 0.1, 24]} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Gold ornate frame */}
      {[
        { pos: [0, 0.05, -4.2] as [number, number, number], size: [8.8, 0.18, 0.4] as [number, number, number] },
        { pos: [0, 0.05, 4.2] as [number, number, number], size: [8.8, 0.18, 0.4] as [number, number, number] },
        { pos: [-4.2, 0.05, 0] as [number, number, number], size: [0.4, 0.18, 8] as [number, number, number] },
        { pos: [4.2, 0.05, 0] as [number, number, number], size: [0.4, 0.18, 8] as [number, number, number] },
      ].map((f, i) => (
        <mesh key={i} position={f.pos} material={frameMat} castShadow receiveShadow>
          <boxGeometry args={f.size} />
        </mesh>
      ))}

      {/* corner ornaments */}
      {[
        [-4.2, -4.2],
        [4.2, -4.2],
        [-4.2, 4.2],
        [4.2, 4.2],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.12, z]} material={frameMat} castShadow>
          <sphereGeometry args={[0.22, 16, 16]} />
        </mesh>
      ))}

      {/* reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#080808" roughness={0.45} metalness={0.65} />
      </mesh>
    </group>
  );
}
