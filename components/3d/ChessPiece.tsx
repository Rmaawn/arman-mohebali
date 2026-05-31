"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type PieceType = "king" | "queen" | "rook" | "knight" | "bishop" | "pawn";

interface ChessPieceProps {
  type: PieceType;
  position: [number, number, number];
  color: "gold" | "onyx";
  scale?: number;
  active?: boolean;
  onClick?: () => void;
  floatDelay?: number;
}

// Build piece silhouettes via Lathe geometry profiles
function getPieceProfile(type: PieceType): THREE.Vector2[] {
  switch (type) {
    case "king":
      return [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.45, 0),
        new THREE.Vector2(0.5, 0.08),
        new THREE.Vector2(0.42, 0.12),
        new THREE.Vector2(0.32, 0.18),
        new THREE.Vector2(0.28, 0.6),
        new THREE.Vector2(0.22, 0.7),
        new THREE.Vector2(0.2, 1.0),
        new THREE.Vector2(0.26, 1.05),
        new THREE.Vector2(0.32, 1.1),
        new THREE.Vector2(0.36, 1.18),
        new THREE.Vector2(0.34, 1.22),
        new THREE.Vector2(0.28, 1.25),
        new THREE.Vector2(0.22, 1.3),
        new THREE.Vector2(0.18, 1.4),
        new THREE.Vector2(0, 1.42),
      ];
    case "queen":
      return [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.42, 0),
        new THREE.Vector2(0.48, 0.08),
        new THREE.Vector2(0.4, 0.12),
        new THREE.Vector2(0.3, 0.18),
        new THREE.Vector2(0.26, 0.55),
        new THREE.Vector2(0.22, 0.65),
        new THREE.Vector2(0.2, 0.95),
        new THREE.Vector2(0.28, 1.0),
        new THREE.Vector2(0.34, 1.08),
        new THREE.Vector2(0.32, 1.18),
        new THREE.Vector2(0.24, 1.22),
        new THREE.Vector2(0.18, 1.28),
        new THREE.Vector2(0.1, 1.32),
        new THREE.Vector2(0, 1.34),
      ];
    case "bishop":
      return [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.4, 0),
        new THREE.Vector2(0.44, 0.08),
        new THREE.Vector2(0.36, 0.12),
        new THREE.Vector2(0.28, 0.18),
        new THREE.Vector2(0.22, 0.5),
        new THREE.Vector2(0.2, 0.6),
        new THREE.Vector2(0.24, 0.7),
        new THREE.Vector2(0.22, 0.85),
        new THREE.Vector2(0.16, 1.0),
        new THREE.Vector2(0.1, 1.1),
        new THREE.Vector2(0.06, 1.18),
        new THREE.Vector2(0, 1.22),
      ];
    case "rook":
      return [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.42, 0),
        new THREE.Vector2(0.46, 0.08),
        new THREE.Vector2(0.36, 0.12),
        new THREE.Vector2(0.3, 0.18),
        new THREE.Vector2(0.28, 0.7),
        new THREE.Vector2(0.32, 0.78),
        new THREE.Vector2(0.36, 0.85),
        new THREE.Vector2(0.36, 0.95),
        new THREE.Vector2(0, 0.95),
      ];
    case "pawn":
      return [
        new THREE.Vector2(0, 0),
        new THREE.Vector2(0.34, 0),
        new THREE.Vector2(0.38, 0.06),
        new THREE.Vector2(0.3, 0.1),
        new THREE.Vector2(0.22, 0.16),
        new THREE.Vector2(0.18, 0.5),
        new THREE.Vector2(0.22, 0.58),
        new THREE.Vector2(0.22, 0.68),
        new THREE.Vector2(0, 0.72),
      ];
    case "knight":
      // simpler base profile; the head is added separately
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
}

export function ChessPiece({
  type,
  position,
  color,
  scale = 1,
  active = false,
  onClick,
  floatDelay = 0,
}: ChessPieceProps) {
  const groupRef = useRef<THREE.Group>(null);
  const hoverRef = useRef(false);

  const profile = useMemo(() => getPieceProfile(type), [type]);

  const material = useMemo(() => {
    if (color === "gold") {
      return new THREE.MeshStandardMaterial({
        color: "#d4af37",
        metalness: 0.9,
        roughness: 0.2,
        emissive: "#3a2a05",
        emissiveIntensity: 0.25,
      });
    }
    return new THREE.MeshStandardMaterial({
      color: "#0d0d0d",
      metalness: 0.7,
      roughness: 0.25,
    });
  }, [color]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime() + floatDelay;
    const targetY = position[1] + Math.sin(t * 1.2) * 0.04 + (active || hoverRef.current ? 0.3 : 0);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      hoverRef.current || active ? t * 0.5 : 0,
      0.05
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        hoverRef.current = true;
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        hoverRef.current = false;
        document.body.style.cursor = "default";
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <mesh castShadow receiveShadow material={material}>
        <latheGeometry args={[profile, 20]} />
      </mesh>

      {/* Knight head as a simple block on top */}
      {type === "knight" && (
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
      )}

      {/* Cross on top of king */}
      {type === "king" && (
        <group position={[0, 1.5, 0]}>
          <mesh material={material} castShadow>
            <boxGeometry args={[0.06, 0.2, 0.06]} />
          </mesh>
          <mesh position={[0, 0.05, 0]} material={material} castShadow>
            <boxGeometry args={[0.16, 0.06, 0.06]} />
          </mesh>
        </group>
      )}

      {/* Crown points on queen */}
      {type === "queen" && (
        <group position={[0, 1.36, 0]}>
          <mesh material={material} castShadow>
            <sphereGeometry args={[0.07, 8, 8]} />
          </mesh>
        </group>
      )}

      {/* Top ball on pawn */}
      {type === "pawn" && (
        <mesh position={[0, 0.78, 0]} material={material} castShadow>
          <sphereGeometry args={[0.18, 12, 12]} />
        </mesh>
      )}

      {/* Bishop top */}
      {type === "bishop" && (
        <>
          <mesh position={[0, 1.26, 0]} material={material} castShadow>
            <sphereGeometry args={[0.06, 8, 8]} />
          </mesh>
        </>
      )}

      {/* Rook battlements */}
      {type === "rook" && (
        <>
          {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
            <mesh
              key={i}
              position={[Math.cos(angle) * 0.26, 1.05, Math.sin(angle) * 0.26]}
              material={material}
              castShadow
            >
              <boxGeometry args={[0.14, 0.18, 0.14]} />
            </mesh>
          ))}
        </>
      )}

      {/* Glow ring under active piece */}
      {active && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.7, 32]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}
