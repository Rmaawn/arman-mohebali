"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { ChessBoard } from "./ChessBoard";
import { PlayerKnight } from "./PlayerKnight";

interface SceneProps {
  hoverCell: { col: number; row: number } | null;
  activeCell: { col: number; row: number };
  onHoverCell: (cell: { col: number; row: number } | null) => void;
  onSelectCell: (col: number, row: number) => void;
}

export function Scene({ hoverCell, activeCell, onHoverCell, onSelectCell }: SceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 8, 11], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <hemisphereLight args={["#fff5d6", "#0a0a0a", 0.5]} />
        <directionalLight
          position={[6, 14, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0005}
          color="#fff5d6"
        />
        <directionalLight position={[-7, 9, -5]} intensity={0.5} color="#d4af37" />
        <pointLight position={[0, 5, 4]} intensity={0.9} color="#ffeaa7" distance={22} decay={2} />

        <ChessBoard
          hoverCell={hoverCell}
          activeCell={activeCell}
          onHoverCell={onHoverCell}
          onSelectCell={onSelectCell}
        />

        <PlayerKnight col={activeCell.col} row={activeCell.row} />

        <ContactShadows
          position={[0, -0.05, 0]}
          opacity={0.5}
          scale={16}
          blur={1.8}
          far={5}
          color="#000"
        />

        <OrbitControls
          enablePan={false}
          enableZoom
          zoomSpeed={0.4}
          minDistance={7}
          maxDistance={20}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.1}
        />
      </Suspense>
    </Canvas>
  );
}
