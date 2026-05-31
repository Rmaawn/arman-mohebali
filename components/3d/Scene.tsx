"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import { useTheme } from "next-themes";
import { ChessBoard } from "./ChessBoard";
import { PlayerKnight } from "./PlayerKnight";

interface SceneProps {
  hoverCell: { col: number; row: number } | null;
  activeCell: { col: number; row: number };
  onHoverCell: (cell: { col: number; row: number } | null) => void;
  onSelectCell: (col: number, row: number) => void;
}

export function Scene({ hoverCell, activeCell, onHoverCell, onSelectCell }: SceneProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";

  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 8, 11], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={isDark ? 0.3 : 0.75} />
        <hemisphereLight
          args={isDark ? ["#fff5d6", "#0a0a0a", 0.5] : ["#ffffff", "#c8b896", 0.65]}
        />
        <directionalLight
          position={[6, 14, 5]}
          intensity={isDark ? 1.5 : 1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0005}
          color={isDark ? "#fff5d6" : "#ffffff"}
        />
        <directionalLight
          position={[-7, 9, -5]}
          intensity={isDark ? 0.5 : 0.35}
          color={isDark ? "#d4af37" : "#c8a828"}
        />
        <pointLight
          position={[0, 5, 4]}
          intensity={isDark ? 0.9 : 0.5}
          color={isDark ? "#ffeaa7" : "#ffffff"}
          distance={22}
          decay={2}
        />

        <ChessBoard
          hoverCell={hoverCell}
          activeCell={activeCell}
          onHoverCell={onHoverCell}
          onSelectCell={onSelectCell}
          isDark={isDark}
        />

        <PlayerKnight col={activeCell.col} row={activeCell.row} />

        <ContactShadows
          position={[0, -0.05, 0]}
          opacity={isDark ? 0.5 : 0.28}
          scale={16}
          blur={1.8}
          far={5}
          color={isDark ? "#000" : "#5a4020"}
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
