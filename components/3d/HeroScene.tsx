"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Float } from "@react-three/drei";
import { Suspense } from "react";
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
  { type: "king", pos: [-0.5, 0.05, -2.5], section: "about", color: "gold" },
  { type: "queen", pos: [0.5, 0.05, -2.5], section: "experience", color: "gold" },
  { type: "knight", pos: [-1.5, 0.05, -2.5], section: "skills", color: "gold" },
  { type: "rook", pos: [-2.5, 0.05, -2.5], section: "projects", color: "gold" },
  { type: "bishop", pos: [1.5, 0.05, -2.5], section: "education", color: "gold" },
  { type: "bishop", pos: [-3.5, 0.05, -2.5], section: "publications", color: "gold" },
  { type: "knight", pos: [2.5, 0.05, -2.5], section: "languages", color: "gold" },
  { type: "rook", pos: [3.5, 0.05, -2.5], section: "contact", color: "gold" },

  { type: "pawn", pos: [-3.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [-2.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [-1.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [-0.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [0.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [1.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [2.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [3.5, 0.05, 1.5], section: "", color: "onyx" },
];

export function HeroScene({ activeSection, onPieceClick, interactive = true }: HeroSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 6, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.22} />
        <hemisphereLight args={["#fff5d6", "#0a0a0a", 0.4]} />
        <directionalLight
          position={[6, 12, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
          color="#fff5d6"
        />
        <directionalLight position={[-6, 8, -4]} intensity={0.45} color="#d4af37" />
        <pointLight position={[-5, 4, -5]} intensity={0.6} color="#d4af37" distance={20} decay={1.3} />
        <pointLight position={[5, 4, 5]} intensity={0.45} color="#ffeaa7" distance={20} decay={1.3} />
        <spotLight
          position={[0, 12, 0]}
          intensity={1.4}
          angle={0.6}
          penumbra={0.85}
          color="#fff5d6"
          castShadow
          shadow-bias={-0.0005}
        />

        <ChessBoardDecorative />

        {PIECES.map((piece, i) => (
          <Float key={i} speed={1.5} rotationIntensity={0} floatIntensity={0.15}>
            <ChessPiece
              type={piece.type}
              position={piece.pos}
              color={piece.color}
              scale={0.55}
              active={activeSection === piece.section}
              onClick={() => piece.section && onPieceClick?.(piece.section)}
              floatDelay={i * 0.5}
            />
          </Float>
        ))}

        <ContactShadows
          position={[0, -0.05, 0]}
          opacity={0.6}
          scale={20}
          blur={2.5}
          far={4}
          color="#000"
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
