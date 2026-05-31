"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { useTheme } from "next-themes";
import { ChessBoardDecorative } from "./ChessBoardDecorative";
import { ChessPiece } from "./ChessPiece";

interface HeroSceneProps {
  activeSection?: string | null;
  onPieceClick?: (section: string) => void;
  interactive?: boolean;
}

const PIECES: Array<{
  type: "king" | "queen" | "rook" | "knight" | "bishop" | "pawn";
  pos: [number, number, number];
  section: string;
  color: "gold" | "onyx";
}> = [
  { type: "king",   pos: [-0.5, 0.05, -2.5], section: "about",        color: "gold" },
  { type: "queen",  pos: [ 0.5, 0.05, -2.5], section: "experience",   color: "gold" },
  { type: "knight", pos: [-1.5, 0.05, -2.5], section: "skills",       color: "gold" },
  { type: "rook",   pos: [-2.5, 0.05, -2.5], section: "projects",     color: "gold" },
  { type: "bishop", pos: [ 1.5, 0.05, -2.5], section: "education",    color: "gold" },
  { type: "bishop", pos: [-3.5, 0.05, -2.5], section: "publications", color: "gold" },
  { type: "knight", pos: [ 2.5, 0.05, -2.5], section: "languages",    color: "gold" },
  { type: "rook",   pos: [ 3.5, 0.05, -2.5], section: "contact",      color: "gold" },

  { type: "pawn", pos: [-3.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [-2.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [-1.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [-0.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [ 0.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [ 1.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [ 2.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [ 3.5, 0.05, 1.5], section: "", color: "onyx" },
];

export function HeroScene({ activeSection, onPieceClick, interactive = true }: HeroSceneProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 6, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        {/* Lighting adapts to theme */}
        <ambientLight intensity={isDark ? 0.3 : 0.7} />
        <hemisphereLight
          args={isDark ? ["#fff5d6", "#0a0a0a", 0.5] : ["#ffffff", "#c8b896", 0.6]}
        />
        <directionalLight
          position={[6, 12, 5]}
          intensity={isDark ? 1.5 : 1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0005}
          color={isDark ? "#fff5d6" : "#ffffff"}
        />
        <directionalLight
          position={[-6, 8, -4]}
          intensity={isDark ? 0.5 : 0.4}
          color={isDark ? "#d4af37" : "#c8a828"}
        />
        <pointLight
          position={[0, 6, 0]}
          intensity={isDark ? 0.8 : 0.5}
          color={isDark ? "#fff5d6" : "#ffffff"}
          distance={20}
          decay={2}
        />

        <ChessBoardDecorative isDark={isDark} />

        {PIECES.map((piece, i) => (
          <ChessPiece
            key={i}
            type={piece.type}
            position={piece.pos}
            color={piece.color}
            scale={0.55}
            active={activeSection === piece.section}
            onClick={() => piece.section && onPieceClick?.(piece.section)}
            floatDelay={i * 0.5}
            isDark={isDark}
          />
        ))}

        <ContactShadows
          position={[0, -0.05, 0]}
          opacity={isDark ? 0.5 : 0.3}
          scale={14}
          blur={1.5}
          far={4}
          color={isDark ? "#000" : "#5a4020"}
        />

        {interactive && (
          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.2}
            autoRotate
            autoRotateSpeed={0.4}
          />
        )}
      </Suspense>
    </Canvas>
  );
}
