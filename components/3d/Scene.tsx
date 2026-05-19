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
      dpr={[1, 2]}
      camera={{ position: [0, 7, 9.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <Suspense fallback={null}>
        {/* premium studio lighting */}
        <ambientLight intensity={0.22} />
        <hemisphereLight args={["#fff5d6", "#0a0a0a", 0.4]} />
        <directionalLight
          position={[6, 14, 5]}
          intensity={1.6}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-bias={-0.0005}
          color="#fff5d6"
        />
        <directionalLight position={[-7, 9, -5]} intensity={0.45} color="#d4af37" />
        <pointLight position={[0, 4, 4]} intensity={0.9} color="#ffeaa7" distance={22} decay={1.2} />
        <pointLight position={[-4, 2, -3]} intensity={0.55} color="#d4af37" distance={14} decay={1.5} />
        <spotLight
          position={[0, 14, 0]}
          intensity={1.5}
          angle={0.55}
          penumbra={0.85}
          color="#fff5d6"
          castShadow
          shadow-bias={-0.0005}
        />

        <ChessBoard
          hoverCell={hoverCell}
          activeCell={activeCell}
          onHoverCell={onHoverCell}
          onSelectCell={onSelectCell}
        />

        <PlayerKnight col={activeCell.col} row={activeCell.row} />

        <ContactShadows
          position={[0, -0.05, 0]}
          opacity={0.6}
          scale={22}
          blur={2.6}
          far={5}
          color="#000"
        />

        <OrbitControls
          enablePan={false}
          enableZoom
          zoomSpeed={0.4}
          minDistance={8}
          maxDistance={18}
          minPolarAngle={Math.PI / 5}
          maxPolarAngle={Math.PI / 2.15}
        />
      </Suspense>
    </Canvas>
  );
}
