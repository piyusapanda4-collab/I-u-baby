import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface RosePetal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  swayAmplitude: number;
  swayFrequency: number;
  swayOffset: number;
}

interface Stardust {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  alpha: number;
}

export const StarrySkyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Stars
    let stars: Star[] = [];
    const initStars = () => {
      const starCount = Math.floor((width * height) / 9000);
      stars = Array.from({ length: Math.min(starCount, 160) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };
    initStars();

    // Rose Petals (floating gently downwards)
    const petals: RosePetal[] = Array.from({ length: 26 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 8 + 6,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * 0.55 + 0.35,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
      opacity: Math.random() * 0.4 + 0.35,
      swayAmplitude: Math.random() * 25 + 15,
      swayFrequency: Math.random() * 0.012 + 0.006,
      swayOffset: Math.random() * 100,
    }));

    // Warm golden stardust (drifting upwards like diya sparks)
    const stardusts: Stardust[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.3,
      speedY: -(Math.random() * 0.4 + 0.15),
      alpha: Math.random() * 0.5 + 0.2,
    }));

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Deep celestial midnight sky background
      const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
      skyGradient.addColorStop(0, '#060B19');
      skyGradient.addColorStop(0.4, '#0A1226');
      skyGradient.addColorStop(0.75, '#1A0815');
      skyGradient.addColorStop(1, '#07050B');
      ctx.fillStyle = skyGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Stars
      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed;
        const currentAlpha = Math.max(0.1, star.alpha + Math.sin(star.twinklePhase) * 0.25);
        ctx.fillStyle = `rgba(253, 249, 238, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Slight star glow on larger stars
        if (star.radius > 1.2) {
          ctx.fillStyle = `rgba(230, 202, 101, ${currentAlpha * 0.3})`;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw Stardust / Diya Embers rising
      for (const spark of stardusts) {
        spark.y += spark.speedY;
        spark.x += Math.sin(tick * 0.02 + spark.alpha * 10) * 0.3;
        if (spark.y < 0) {
          spark.y = height + 10;
          spark.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(245, 230, 190, ${spark.alpha})`;
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Rose Petals drifting down
      for (const petal of petals) {
        petal.y += petal.speedY;
        petal.x += Math.sin(tick * petal.swayFrequency + petal.swayOffset) * 0.45 + petal.speedX;
        petal.rotation += petal.rotationSpeed;

        if (petal.y > height + 20) {
          petal.y = -20;
          petal.x = Math.random() * width;
        }
        if (petal.x > width + 20) petal.x = -20;
        if (petal.x < -20) petal.x = width + 20;

        ctx.save();
        ctx.translate(petal.x, petal.y);
        ctx.rotate(petal.rotation);

        // Draw organic petal shape
        ctx.fillStyle = `rgba(163, 29, 61, ${petal.opacity})`;
        ctx.beginPath();
        ctx.moveTo(0, -petal.size);
        ctx.bezierCurveTo(
          petal.size * 0.8,
          -petal.size * 0.6,
          petal.size * 0.8,
          petal.size * 0.6,
          0,
          petal.size
        );
        ctx.bezierCurveTo(
          -petal.size * 0.8,
          petal.size * 0.6,
          -petal.size * 0.8,
          -petal.size * 0.6,
          0,
          -petal.size
        );
        ctx.fill();

        // Subtle highlight line on petal
        ctx.strokeStyle = `rgba(235, 120, 150, ${petal.opacity * 0.45})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(0, -petal.size * 0.7);
        ctx.lineTo(0, petal.size * 0.7);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
