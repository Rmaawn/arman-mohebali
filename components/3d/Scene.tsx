"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { ChessBoard } from "./ChessBoard";
import { PlayerKnight } from "./PlayerKnight";

const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 8, 11);
const DEFAULT_TARGET = new THREE.Vector3(0, 0, 0);

function BoardCameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const isDragging = useRef(false);
  const releaseTimer = useRef<NodeJS.Timeout | null>(null);

  const handleStart = () => {
    isDragging.current = true;
    if (releaseTimer.current) {
      clearTimeout(releaseTimer.current);
      releaseTimer.current = null;
    }
  };

  const handleEnd = () => {
    // Return smoothly to default viewing angle shortly after drag release
    releaseTimer.current = setTimeout(() => {
      isDragging.current = false;
    }, 100);
  };

  useEffect(() => {
    const handlePointerUp = () => {
      if (isDragging.current) {
        releaseTimer.current = setTimeout(() => {
          isDragging.current = false;
        }, 100);
      }
    };
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("touchend", handlePointerUp);
    return () => {
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
      if (releaseTimer.current) clearTimeout(releaseTimer.current);
    };
  }, []);

  useFrame((_, delta) => {
    if (isDragging.current || !controlsRef.current) return;

    const camera = controlsRef.current.object;
    const target = controlsRef.current.target;

    const posDist = camera.position.distanceTo(DEFAULT_CAMERA_POS);
    const targetDist = target.distanceTo(DEFAULT_TARGET);

    if (posDist > 0.003 || targetDist > 0.003) {
      // Smooth, responsive spring back (frame-rate independent)
      const t = 1 - Math.exp(-6.5 * delta);
      camera.position.lerp(DEFAULT_CAMERA_POS, t);
      target.lerp(DEFAULT_TARGET, t);
      controlsRef.current.update();
    } else if (posDist > 0 || targetDist > 0) {
      camera.position.copy(DEFAULT_CAMERA_POS);
      target.copy(DEFAULT_TARGET);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      zoomSpeed={0.4}
      minDistance={8}
      maxDistance={18}
      minPolarAngle={Math.PI / 4.5}
      maxPolarAngle={Math.PI / 2.25}
      minAzimuthAngle={-Math.PI / 3.5}
      maxAzimuthAngle={Math.PI / 3.5}
      enableDamping={false}
      onStart={handleStart}
      onEnd={handleEnd}
    />
  );
}

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

        <BoardCameraController />
      </Suspense>
    </Canvas>
  );
}
