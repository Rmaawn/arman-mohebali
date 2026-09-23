"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { Suspense, useRef, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import { ChessBoard } from "./ChessBoard";
import { PlayerKnight } from "./PlayerKnight";

function BoardCameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const isDragging = useRef(false);
  const releaseTimer = useRef<NodeJS.Timeout | null>(null);

  const { size } = useThree();
  const aspect = size.width / Math.max(1, size.height);
  const isMobile = size.width < 768 || aspect < 1;

  // Responsive camera scaling:
  // Desktop 16:9 (aspect ~1.77) -> factor = 1 (default pos 0, 8, 11)
  // Mobile portrait (aspect ~0.45-0.56) -> factor ~1.9-2.2 (full 8.8 board width fits with margins)
  const zoomFactor = useMemo(() => {
    if (aspect >= 1.25) return 1;
    return Math.max(1, Math.min(2.35, 1.05 / Math.max(0.42, aspect)));
  }, [aspect]);

  const targetCamPos = useMemo(() => {
    if (isMobile) {
      return new THREE.Vector3(0, 8.2 * zoomFactor, 10.8 * zoomFactor);
    }
    return new THREE.Vector3(0, 8, 11);
  }, [isMobile, zoomFactor]);

  const targetLookAt = useMemo(() => {
    if (isMobile) {
      // Offset target along Z to frame the board comfortably in the upper-middle screen area
      return new THREE.Vector3(0, 0, 0.45);
    }
    return new THREE.Vector3(0, 0, 0);
  }, [isMobile]);

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

  // Update camera and controls when viewport/orientation changes
  useEffect(() => {
    if (controlsRef.current && !isDragging.current) {
      controlsRef.current.object.position.copy(targetCamPos);
      controlsRef.current.target.copy(targetLookAt);
      controlsRef.current.update();
    }
  }, [targetCamPos, targetLookAt]);

  useFrame((_, delta) => {
    if (isDragging.current || !controlsRef.current) return;

    const camera = controlsRef.current.object;
    const target = controlsRef.current.target;

    const posDist = camera.position.distanceTo(targetCamPos);
    const targetDist = target.distanceTo(targetLookAt);

    if (posDist > 0.003 || targetDist > 0.003) {
      // Smooth, responsive spring back (frame-rate independent)
      const t = 1 - Math.exp(-6.5 * delta);
      camera.position.lerp(targetCamPos, t);
      target.lerp(targetLookAt, t);
      controlsRef.current.update();
    } else if (posDist > 0 || targetDist > 0) {
      camera.position.copy(targetCamPos);
      target.copy(targetLookAt);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      zoomSpeed={0.4}
      minDistance={isMobile ? 12 : 8}
      maxDistance={isMobile ? 36 : 18}
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
  hoverCol?: number | null;
  onHoverCell: (cell: { col: number; row: number } | null) => void;
  onSelectCell: (col: number, row: number) => void;
}

export function Scene({ hoverCell, activeCell, hoverCol, onHoverCell, onSelectCell }: SceneProps) {
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
          hoverCol={hoverCol}
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
