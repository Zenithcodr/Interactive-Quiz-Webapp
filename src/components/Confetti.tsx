
import React, { useState, useEffect } from 'react';

interface ConfettiPieceProps {
  index: number;
}

const ConfettiPiece: React.FC<ConfettiPieceProps> = ({ index }) => {
  const colors = ["#8B5CF6", "#10B981", "#EF4444", "#F59E0B", "#3B82F6"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  const style = {
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 2}s`,
    backgroundColor: randomColor,
    width: `${Math.random() * 10 + 5}px`,
    height: `${Math.random() * 10 + 5}px`,
    animationDuration: `${Math.random() * 3 + 2}s`
  };

  return (
    <div 
      className="absolute top-0 rounded-sm animate-confetti"
      style={style}
    />
  );
};

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<number[]>([]);

  useEffect(() => {
    setPieces(Array.from({ length: 100 }, (_, i) => i));
    
    const timeout = setTimeout(() => {
      setPieces([]);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((i) => (
        <ConfettiPiece key={i} index={i} />
      ))}
    </div>
  );
};

export default Confetti;
