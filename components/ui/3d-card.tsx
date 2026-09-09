"use client";

import React, { createContext, useState, useContext, useRef, useEffect } from "react";

const MouseEnterContext = createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined>(undefined);

export const CardContainer = ({
  children,
  className = "",
  containerClassName = "",
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 20;

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame(() => {
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
      }
    });
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={`flex items-center justify-center ${containerClassName}`}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`flex items-center justify-center relative transition-all duration-200 ease-out will-change-transform [transform-style:preserve-3d] ${className}`}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-full [transform-style:preserve-3d] [&_*]:[transform-style:preserve-3d] ${className}`}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className = "",
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: any;
  children?: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  const parseVal = (val: number | string, defaultUnit: string) => {
    if (typeof val === "number") return `${val}${defaultUnit}`;
    if (typeof val === "string") {
      if (val.endsWith("px") || val.endsWith("%") || val.endsWith("deg") || val.endsWith("rem") || val.endsWith("em")) {
        return val;
      }
      return `${val}${defaultUnit}`;
    }
    return `0${defaultUnit}`;
  };

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      const tx = parseVal(translateX, "px");
      const ty = parseVal(translateY, "px");
      const tz = parseVal(translateZ, "px");
      const rx = parseVal(rotateX, "deg");
      const ry = parseVal(rotateY, "deg");
      const rz = parseVal(rotateZ, "deg");
      ref.current.style.transform = `translateX(${tx}) translateY(${ty}) translateZ(${tz}) rotateX(${rx}) rotateY(${ry}) rotateZ(${rz})`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [isMouseEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ]);

  return (
    <Tag
      ref={ref}
      className={`transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a CardContainer");
  }
  return context;
};
