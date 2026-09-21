import React, { useState, useEffect } from 'react';
import './QuantizationGrid.css';

const QuantizationGrid = () => {
  const [weights, setWeights] = useState([]);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const initialWeights = Array.from({ length: 64 }, () => 
      (Math.random() * 2 - 1).toFixed(4)
    );
    setWeights(initialWeights);

    const interval = setInterval(() => {
      setIsAnimated(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`quant-wrapper ${isAnimated ? 'is-animated' : ''}`}>
      {/* Floating Chips */}
      <div className="chip chip-android">
        <span className="dot blue"></span>
        <div className="chip-text">
          <strong>Corre en Android</strong>
          <span>Pixel 7 · 11 tok/s</span>
        </div>
      </div>

      <div className="chip chip-accuracy">
        <span className="dot green"></span>
        <div className="chip-text">
          <strong>98.6% de precisión</strong>
          <span>retenida vs. FP16</span>
        </div>
      </div>

      <div className="quant-container">
        
        <div className="quant-board">
          {/* FP16 Grilla */}
          <div className="quant-block fp16-block">
            <div className="quant-header">
              <span className="quant-label">FP16</span>
              <span className="quant-size">16.0 GB</span>
            </div>
            <div className="quant-grid">
              {weights.map((w, i) => {
                const intensity = Math.abs(parseFloat(w));
                const alpha = 0.2 + (intensity * 0.8);
                return (
                  <div 
                    key={`fp16-${i}`} 
                    className="quant-cell"
                    style={{ backgroundColor: `rgba(45, 85, 255, ${alpha})` }}
                  >
                    <div className="quant-tooltip">{w}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flecha Central */}
          <div className="quant-arrow-container">
             <div className="quant-arrow">⟶</div>
             <div className="chip-bits">--bits 4</div>
          </div>

          {/* INT4 Grilla */}
          <div className="quant-block int4-block">
            <div className="quant-header">
              <span className="quant-label blue-label">INT4</span>
              <span className="quant-size blue-size">4.3 GB</span>
            </div>
            <div className="quant-grid int4-grid">
              {weights.map((w, i) => {
                const q = Math.round(parseFloat(w) * 7);
                const intensity = Math.abs(q) / 7;
                const alpha = 0.2 + (intensity * 0.8);
                return (
                  <div 
                    key={`int4-${i}`} 
                    className="quant-cell"
                    style={{ backgroundColor: `rgba(45, 85, 255, ${alpha})` }}
                  >
                    <div className="quant-tooltip">q={q}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <hr className="quant-divider" />

        {/* Memoria */}
        <div className="memory-stats">
          <span className="mem-title">Memoria</span>
          
          <div className="mem-row">
            <div className="mem-bar-wrapper">
              <div className="mem-bar-fill fp16-fill"></div>
            </div>
            <div className="mem-labels">
              <span className="mem-type">FP16</span>
              <span className="mem-val">16.0 GB</span>
            </div>
          </div>

          <div className="mem-row">
            <div className="mem-bar-wrapper">
              <div className="mem-bar-fill int4-fill"></div>
            </div>
            <div className="mem-labels">
              <span className="mem-type blue-type">INT4</span>
              <span className="mem-val blue-val">
                {isAnimated ? (
                  <>4.3 GB <span className="mem-diff">· −73%</span></>
                ) : (
                  '16.0 GB'
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantizationGrid;
