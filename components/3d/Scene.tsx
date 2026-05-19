"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Float } from "@react-three/drei";
import { Suspense } from "react";
import { ChessBoard } from "./ChessBoard";
import { ChessPiece } from "./ChessPiece";

interface SceneProps {
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
  // Gold side — represent the user
  { type: "king", pos: [-0.5, 0.05, -2.5], section: "about", color: "gold" },
  { type: "queen", pos: [0.5, 0.05, -2.5], section: "experience", color: "gold" },
  { type: "knight", pos: [-1.5, 0.05, -2.5], section: "skills", color: "gold" },
  { type: "rook", pos: [-2.5, 0.05, -2.5], section: "projects", color: "gold" },
  { type: "bishop", pos: [1.5, 0.05, -2.5], section: "education", color: "gold" },
  { type: "bishop", pos: [-3.5, 0.05, -2.5], section: "publications", color: "gold" },
  { type: "knight", pos: [2.5, 0.05, -2.5], section: "languages", color: "gold" },
  { type: "rook", pos: [3.5, 0.05, -2.5], section: "contact", color: "gold" },

  // Onyx pawns (decorative — opponents)
  { type: "pawn", pos: [-3.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [-2.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [-1.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [-0.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [0.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [1.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [2.5, 0.05, 1.5], section: "", color: "onyx" },
  { type: "pawn", pos: [3.5, 0.05, 1.5], section: "", color: "onyx" },
];

export function Scene({ activeSection, onPieceClick, interactive = true }: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 6, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.25} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          color="#fff8e0"
        />
        <pointLight position={[-5, 4, -5]} intensity={0.6} color="#d4af37" />
        <pointLight position={[5, 4, 5]} intensity={0.4} color="#ffeaa7" />
        <spotLight
          position={[0, 12, 0]}
          intensity={1.2}
          angle={0.6}
          penumbra={0.8}
          color="#fff5d6"
          castShadow
        />

        <Environment preset="night" />

        <ChessBoard />

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
