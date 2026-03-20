"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { ReactNode, useRef, MouseEvent } from "react";

interface BrowserFrameProps {
  children?: ReactNode;
  image?: string;
  alt?: string;
  className?: string;
  interactive?: boolean;
  imagePriority?: boolean;
}

export function BrowserFrame({
  children,
  image,
  alt = "App screenshot",
  className = "",
  interactive = false,
  imagePriority = false,
}: BrowserFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the tilt
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -5]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), {
    stiffness: 150,
    damping: 20,
  });

  // Glare effect opacity based on tilt
  const glareOpacity = useTransform(rotateY, [-10, 10], [0, 0.4]);
  const glareX = useTransform(rotateY, [-10, 10], ["0%", "100%"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !interactive) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized position (-0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    x.set(0);
    y.set(0);
  };

  const containerVariants = {
    initial: { 
      opacity: 0, 
      y: 20,
      rotateX: interactive ? 5 : 0,
      rotateY: interactive ? -5 : 0,
    },
    animate: { 
      opacity: 1, 
      y: 0,
      rotateX: interactive ? 5 : 0,
      rotateY: interactive ? -5 : 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate="animate"
      variants={containerVariants}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className={`relative ${className}`}
      style={{
        perspective: interactive ? 1000 : "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={
          interactive
            ? {
                y: [0, -15, 0],
              }
            : undefined
        }
        transition={
          interactive
            ? {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
        style={interactive ? {
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        } : undefined}
        className={`rounded-xl border border-slate-200 overflow-hidden bg-white ${
          interactive ? "shadow-2xl shadow-indigo-500/20" : "shadow-xl"
        }`}
      >
        {/* Glare Effect */}
        {interactive && (
          <motion.div 
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.4) 40%, transparent 60%)",
              opacity: glareOpacity,
              x: glareX,
            }}
          />
        )}

        {/* Browser Header */}
        <div className="h-10 bg-slate-50 border-b border-slate-200 flex items-center px-4 relative z-10">
          {/* macOS Window Controls */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          {/* Optional: URL bar simulation */}
          <div className="flex-1 mx-4">
            <div className="max-w-md mx-auto bg-white rounded border border-slate-200 px-3 py-1">
              <div className="h-3 w-full bg-slate-100 rounded" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative bg-white z-0">
          {image ? (
            <Image
              src={image}
              alt={alt}
              width={1920}
              height={1080}
              className="w-full h-auto block"
              priority={imagePriority}
            />
          ) : (
            children
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
