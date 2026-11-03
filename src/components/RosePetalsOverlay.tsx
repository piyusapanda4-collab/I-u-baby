import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface PetalConfig {
  id: number;
  startX: number;
  size: number;
  duration: number;
  delay: number;
  swayAmount: number;
  rotationSpeed: number;
  opacity: number;
  variant: number;
}

interface HeartParticleConfig {
  id: number;
  startX: number;
  size: number;
  duration: number;
  delay: number;
  swayAmount: number;
  rotationSpeed: number;
  opacity: number;
  colorGrad: 'crimson' | 'gold' | 'rose' | 'ruby';
  depthLayer: 'background' | 'midground' | 'foreground';
  floatDirection: 'up' | 'down';
  blurPx: number;
  isOutline?: boolean;
}

export const RosePetalsOverlay: React.FC = () => {
  // Generate random petals across varying depths
  const petals = useMemo<PetalConfig[]>(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      startX: Math.random() * 100,
      size: Math.random() * 16 + 14, // 14px to 30px
      duration: Math.random() * 9 + 10, // 10s to 19s
      delay: Math.random() * 12,
      swayAmount: (Math.random() - 0.5) * 85,
      rotationSpeed: (Math.random() - 0.5) * 420,
      opacity: Math.random() * 0.45 + 0.35,
      variant: i % 3,
    }));
  }, []);

  // Generate randomized floating hearts with multi-layered depth & organic variation
  const hearts = useMemo<HeartParticleConfig[]>(() => {
    const grads: HeartParticleConfig['colorGrad'][] = ['crimson', 'gold', 'rose', 'ruby'];

    return Array.from({ length: 24 }).map((_, i) => {
      // Create 3 organic depth layers: background (distant/slow), midground, foreground (near/crisp)
      const depthType = i % 3 === 0 ? 'foreground' : i % 3 === 1 ? 'midground' : 'background';

      let size = 16;
      let duration = 12;
      let opacity = 0.6;
      let blurPx = 0;
      let rotationSpeed = (Math.random() - 0.5) * 90;

      if (depthType === 'background') {
        size = Math.random() * 5 + 8; // 8px to 13px (distant tiny stars/hearts)
        duration = Math.random() * 8 + 18; // 18s to 26s (very slow, gentle drift)
        opacity = Math.random() * 0.25 + 0.25; // 0.25 to 0.5 (soft translucent)
        blurPx = 1.2;
        rotationSpeed = (Math.random() - 0.5) * 45; // gentle rocking
      } else if (depthType === 'midground') {
        size = Math.random() * 8 + 14; // 14px to 22px
        duration = Math.random() * 6 + 11; // 11s to 17s
        opacity = Math.random() * 0.3 + 0.5; // 0.5 to 0.8
        blurPx = 0;
        rotationSpeed = (Math.random() - 0.5) * 120;
      } else {
        // foreground
        size = Math.random() * 10 + 24; // 24px to 34px (bold, prominent floating hearts)
        duration = Math.random() * 4 + 7.5; // 7.5s to 11.5s (faster visual speed)
        opacity = Math.random() * 0.25 + 0.75; // 0.75 to 1.0 (crisp and radiant)
        blurPx = 0;
        rotationSpeed = (Math.random() - 0.5) * 260; // 3D slow tumble
      }

      return {
        id: i + 100,
        startX: Math.random() * 96 + 2,
        size,
        duration,
        delay: Math.random() * 10,
        swayAmount: (Math.random() - 0.5) * (depthType === 'foreground' ? 90 : 50),
        rotationSpeed,
        opacity,
        colorGrad: grads[i % grads.length],
        depthLayer: depthType,
        floatDirection: i % 4 === 0 ? 'up' : 'down',
        blurPx,
        isOutline: i % 5 === 0,
      };
    });
  }, []);

  // Generate sweet floating kiss phrases & emojis that drift softly across the screen
  const kisses = useMemo(() => {
    const kissPhrases = [
      'ummmaaaaa 😘',
      'baby ummaaa 💋',
      'ummmaaaah ❤️',
      'I ❤️ u baby',
      '😘😘😘😘',
      'ummmaaaaa',
      'baby ummaaa',
      'ummmaaaah',
    ];
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i + 300,
      startX: Math.random() * 90 + 5,
      duration: Math.random() * 6 + 14,
      delay: Math.random() * 8,
      swayAmount: (Math.random() - 0.5) * 60,
      opacity: Math.random() * 0.25 + 0.35,
      text: kissPhrases[i % kissPhrases.length],
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Rose Petals */}
      {petals.map((petal) => (
        <motion.div
          key={`petal-${petal.id}`}
          initial={{
            y: '-10vh',
            x: `${petal.startX}vw`,
            rotate: 0,
            rotateX: 0,
            rotateY: 0,
            opacity: 0,
          }}
          animate={{
            y: '110vh',
            x: [
              `${petal.startX}vw`,
              `${petal.startX + petal.swayAmount * 0.4}vw`,
              `${petal.startX - petal.swayAmount * 0.6}vw`,
              `${petal.startX + petal.swayAmount}vw`,
            ],
            rotate: [0, petal.rotationSpeed * 0.5, petal.rotationSpeed],
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
            opacity: [0, petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            width: petal.size,
            height: petal.size * 1.3,
            willChange: 'transform, opacity',
          }}
        >
          {petal.variant === 0 && (
            <svg
              viewBox="0 0 30 40"
              className="w-full h-full drop-shadow-[0_2px_8px_rgba(163,29,61,0.4)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 0C8 8 0 18 0 26C0 33.7279 6.71573 40 15 40C23.2843 40 30 33.7279 30 26C30 18 22 8 15 0Z"
                fill={`url(#roseGrad-${petal.id})`}
              />
              <path
                d="M15 6C13 14 11 22 15 36"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id={`roseGrad-${petal.id}`}
                  x1="0"
                  y1="0"
                  x2="30"
                  y2="40"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#C42B50" />
                  <stop offset="50%" stopColor="#8C1D38" />
                  <stop offset="100%" stopColor="#4A0818" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {petal.variant === 1 && (
            <svg
              viewBox="0 0 32 38"
              className="w-full h-full drop-shadow-[0_2px_8px_rgba(163,29,61,0.4)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 1C9 6 2 15 1 24C0 31.7 6.5 37 16 37C25.5 37 32 31.7 31 24C30 15 23 6 16 1Z"
                fill={`url(#roseGrad-${petal.id})`}
              />
              <path
                d="M16 8C14.5 16 13 24 16 33"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id={`roseGrad-${petal.id}`}
                  x1="5"
                  y1="0"
                  x2="28"
                  y2="38"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#D94F70" />
                  <stop offset="45%" stopColor="#A31D3D" />
                  <stop offset="100%" stopColor="#5E0B1F" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {petal.variant === 2 && (
            <svg
              viewBox="0 0 28 36"
              className="w-full h-full drop-shadow-[0_2px_8px_rgba(163,29,61,0.4)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 0C8 7 1 15 2 24C3 31 8 36 14 36C20 36 25 31 26 24C27 15 20 7 14 0Z"
                fill={`url(#roseGrad-${petal.id})`}
              />
              <path
                d="M14 7C13 14 12 22 14 31"
                stroke="rgba(255,240,245,0.25)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id={`roseGrad-${petal.id}`}
                  x1="0"
                  y1="5"
                  x2="28"
                  y2="36"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#E85D75" />
                  <stop offset="50%" stopColor="#9C1736" />
                  <stop offset="100%" stopColor="#4A0615" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>
      ))}

      {/* 2. Multi-Layered Floating Romantic Hearts */}
      {hearts.map((heart) => {
        const isUpward = heart.floatDirection === 'up';

        return (
          <motion.div
            key={`heart-${heart.id}`}
            initial={{
              y: isUpward ? '106vh' : '-6vh',
              x: `${heart.startX}vw`,
              scale: heart.depthLayer === 'foreground' ? 0.9 : 0.7,
              rotate: 0,
              rotateY: 0,
              opacity: 0,
            }}
            animate={{
              y: isUpward ? '-12vh' : '110vh',
              x: [
                `${heart.startX}vw`,
                `${heart.startX + heart.swayAmount * 0.5}vw`,
                `${heart.startX - heart.swayAmount * 0.5}vw`,
                `${heart.startX + heart.swayAmount}vw`,
              ],
              scale:
                heart.depthLayer === 'foreground'
                  ? [0.9, 1.15, 0.95, 1.05]
                  : [0.7, 0.95, 0.75, 0.85],
              rotate: [0, heart.rotationSpeed * 0.5, heart.rotationSpeed],
              rotateY: heart.depthLayer === 'foreground' ? [0, 180, 360] : [0, 90, 0],
              opacity: [0, heart.opacity, heart.opacity * 0.9, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              width: heart.size,
              height: heart.size,
              filter: heart.blurPx > 0 ? `blur(${heart.blurPx}px)` : undefined,
              zIndex: heart.depthLayer === 'foreground' ? 25 : heart.depthLayer === 'midground' ? 20 : 15,
              willChange: 'transform, opacity',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-full h-full ${
                heart.depthLayer === 'foreground'
                  ? 'drop-shadow-[0_0_12px_rgba(230,202,101,0.65)]'
                  : 'drop-shadow-[0_0_6px_rgba(230,202,101,0.35)]'
              }`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {heart.isOutline ? (
                /* Delicate Shimmering Outline Heart */
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  stroke={`url(#heartGrad-${heart.id})`}
                  strokeWidth="1.8"
                  fill="rgba(255,255,255,0.06)"
                />
              ) : (
                /* Full Lustrous Gradient Heart */
                <>
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill={`url(#heartGrad-${heart.id})`}
                  />
                  {/* Subtle Curved Light Sheen */}
                  <circle cx="7.5" cy="7" r="1.5" fill="rgba(255,255,255,0.45)" />
                </>
              )}

              <defs>
                {heart.colorGrad === 'gold' && (
                  <linearGradient id={`heartGrad-${heart.id}`} x1="0" y1="0" x2="24" y2="24">
                    <stop offset="0%" stopColor="#FFFDF8" />
                    <stop offset="35%" stopColor="#F5E6BE" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                )}
                {heart.colorGrad === 'rose' && (
                  <linearGradient id={`heartGrad-${heart.id}`} x1="0" y1="0" x2="24" y2="24">
                    <stop offset="0%" stopColor="#FFCCD5" />
                    <stop offset="50%" stopColor="#FF758F" />
                    <stop offset="100%" stopColor="#C9184A" />
                  </linearGradient>
                )}
                {heart.colorGrad === 'crimson' && (
                  <linearGradient id={`heartGrad-${heart.id}`} x1="0" y1="0" x2="24" y2="24">
                    <stop offset="0%" stopColor="#FF4D6D" />
                    <stop offset="60%" stopColor="#A4133C" />
                    <stop offset="100%" stopColor="#590D22" />
                  </linearGradient>
                )}
                {heart.colorGrad === 'ruby' && (
                  <linearGradient id={`heartGrad-${heart.id}`} x1="0" y1="0" x2="24" y2="24">
                    <stop offset="0%" stopColor="#E6CA65" />
                    <stop offset="50%" stopColor="#A31D3D" />
                    <stop offset="100%" stopColor="#540819" />
                  </linearGradient>
                )}
              </defs>
            </svg>
          </motion.div>
        );
      })}

      {/* 3. Floating Kiss Notes & Emojis */}
      {kisses.map((kiss) => (
        <motion.div
          key={`kiss-${kiss.id}`}
          initial={{
            y: '105vh',
            x: `${kiss.startX}vw`,
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            y: '-10vh',
            x: [
              `${kiss.startX}vw`,
              `${kiss.startX + kiss.swayAmount}vw`,
              `${kiss.startX - kiss.swayAmount * 0.5}vw`,
              `${kiss.startX + kiss.swayAmount * 0.8}vw`,
            ],
            opacity: [0, kiss.opacity, kiss.opacity, 0],
            scale: [0.8, 1.05, 0.95, 1],
          }}
          transition={{
            duration: kiss.duration,
            delay: kiss.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            zIndex: 18,
            willChange: 'transform, opacity',
          }}
          className="text-[11px] sm:text-xs font-serif-cormorant font-semibold text-[#FFB6C1]/70 select-none whitespace-nowrap bg-black/30 backdrop-blur-xs px-2 py-0.5 rounded-full border border-[#E6CA65]/20 shadow-[0_0_8px_rgba(255,107,139,0.3)]"
        >
          {kiss.text}
        </motion.div>
      ))}
    </div>
  );
};
