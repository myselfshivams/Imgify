import { useEffect } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  useEffect(() => {
    
    const cursor = document.querySelector('.cursor') as HTMLElement;
    const cursor2 = document.querySelector('.cursor2') as HTMLElement;

    const updateCursor = (e: MouseEvent) => {
      if (cursor && cursor2) {
        gsap.to(cursor, { duration: 0.2, x: e.clientX - cursor.offsetWidth / 2, y: e.clientY - cursor.offsetHeight / 2 });
        gsap.to(cursor2, { duration: 0.4, x: e.clientX - cursor2.offsetWidth / 2, y: e.clientY - cursor2.offsetHeight / 2 });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, input, .interactive')) {
        if (cursor && cursor2) {
          gsap.to(cursor, { duration: 0.2, scale: 2 });
          gsap.to(cursor2, { duration: 0.4, scale: 2.5 });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, input, .interactive')) {
        if (cursor && cursor2) {
          gsap.to(cursor, { duration: 0.2, scale: 1 });
          gsap.to(cursor2, { duration: 0.4, scale: 1 });
        }
      }
    };

    window.addEventListener('mousemove', updateCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    document.body.style.cursor = 'none';

    return () => {
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <>
      <div className="cursor"></div>
      <div className="cursor2"></div>

      <style jsx>{`
        .cursor, .cursor2 {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s ease; 
        }
        
        .cursor {
          width: 11px;
          height: 11px;
          background: rgba(255, 255, 255, 0.7); 
        }
        
        .cursor2 {
          width: 34px;
          height: 34px;
          background: rgba(255, 255, 255, 0.3); 
        }

        .cursor2:hover {
          transform: scale(1.4); 
        }
        
        .cursor2:active {
          transform: scale(1.6); 
        }
      `}</style>
    </>
  );
};

export default CustomCursor;