import { useEffect, useRef } from 'react';
import p5 from 'p5';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  noiseOffset: number;
}

export const SteamAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sketch = (p: p5) => {
      let particles: Particle[] = [];
      let canvasWidth: number;
      let canvasHeight: number;

      p.setup = () => {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        p.createCanvas(canvasWidth, canvasHeight);
        p.frameRate(30);
        p.noStroke();

        // Initialize particles
        for (let i = 0; i < 60; i++) {
          particles.push(createParticle());
        }
      };

      p.draw = () => {
        p.clear();

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];

          // Update position
          particle.y -= particle.speed;
          
          // Add natural horizontal movement using Perlin noise
          const noiseValue = p.noise(particle.noiseOffset);
          particle.x += (noiseValue - 0.5) * 2;
          particle.noiseOffset += 0.01;

          // Fade out as it rises
          particle.alpha = p.map(particle.y, canvasHeight, 0, 80, 0);

          // Grow slightly as it rises
          particle.size += 0.05;

          // Draw particle
          p.fill(255, 255, 255, particle.alpha);
          p.circle(particle.x, particle.y, particle.size);

          // Remove if off screen
          if (particle.y < -50 || particle.x < -50 || particle.x > canvasWidth + 50) {
            particles.splice(i, 1);
          }
        }

        // Add new particles periodically
        if (p.frameCount % 5 === 0 && particles.length < 80) {
          particles.push(createParticle());
        }
      };

      p.windowResized = () => {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        p.resizeCanvas(canvasWidth, canvasHeight);
      };

      function createParticle(): Particle {
        return {
          x: p.random(canvasWidth),
          y: canvasHeight + p.random(0, 50),
          size: p.random(10, 30),
          speed: p.random(0.5, 1.5),
          alpha: 80,
          noiseOffset: p.random(1000),
        };
      }
    };

    p5Instance.current = new p5(sketch, containerRef.current);

    return () => {
      p5Instance.current?.remove();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
};
