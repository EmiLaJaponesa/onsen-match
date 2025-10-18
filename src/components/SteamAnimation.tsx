import { useEffect, useRef, memo } from 'react';
import p5 from 'p5';

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  alpha: number;
  noiseOffset: number;
}

export const SteamAnimation = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5Instance = useRef<p5 | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

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

        // Initialize particles - fewer for better performance
        const isMobile = canvasWidth < 768;
        const particleCount = isMobile ? 20 : 30; // Reduced from 60
        
        for (let i = 0; i < particleCount; i++) {
          particles.push(createParticle());
        }
      };

      p.draw = () => {
        p.clear();

        // Update and draw particles
        for (let i = particles.length - 1; i >= 0; i--) {
          const particle = particles[i];

          // Update position - slower rise for more natural effect
          particle.y -= particle.speed;
          
          // Add natural horizontal movement using Perlin noise - more subtle
          const noiseValue = p.noise(particle.noiseOffset);
          particle.x += (noiseValue - 0.5) * 1; // Reduced from 2
          particle.noiseOffset += 0.01;

          // Fade out as it rises - more subtle fade
          particle.alpha = p.map(particle.y, canvasHeight, 0, 40, 0); // Reduced from 80

          // Grow slightly as it rises - slower growth
          particle.size += 0.01; // Reduced from 0.05

          // Draw particle
          p.fill(255, 255, 255, particle.alpha);
          p.circle(particle.x, particle.y, particle.size);

          // Remove if off screen
          if (particle.y < -50 || particle.x < -50 || particle.x > canvasWidth + 50) {
            particles.splice(i, 1);
          }
        }

        // Add new particles periodically - less frequently for better performance
        const maxParticles = canvasWidth < 768 ? 30 : 40; // Reduced from 80
        if (p.frameCount % 10 === 0 && particles.length < maxParticles) { // Changed from 5
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
          size: p.random(2, 6),        // Reduced from 10-30 for more delicate steam
          speed: p.random(0.2, 0.6),   // Reduced from 0.5-1.5 for slower rise
          alpha: p.random(20, 40),     // Reduced from 80 for more natural transparency
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
      className="steam-animation absolute inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
});

SteamAnimation.displayName = 'SteamAnimation';
