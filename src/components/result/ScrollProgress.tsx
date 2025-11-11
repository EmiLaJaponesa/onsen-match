import { useState, useEffect, useRef } from 'react';

export const ScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number>();
  const lastUpdateRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // 前回のrAFをキャンセル
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // 次のフレームで更新
      rafRef.current = requestAnimationFrame(() => {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const progress = Math.round((currentScroll / totalScroll) * 100);
        
        // 1%以上変化した場合のみ更新（再レンダリング削減）
        if (Math.abs(progress - lastUpdateRef.current) >= 1) {
          setScrollProgress(progress);
          lastUpdateRef.current = progress;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
      <div 
        className="h-full bg-primary will-change-transform origin-left"
        style={{ 
          transform: `scaleX(${scrollProgress / 100})`,
          transition: 'transform 0.1s ease-out'
        }}
      />
    </div>
  );
};
