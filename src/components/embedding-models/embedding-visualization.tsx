"use client";

import { useEffect, useState } from "react";

interface EmbeddingVisualizationProps {
  currentStep: number;
}

export function EmbeddingVisualization({
  currentStep,
}: EmbeddingVisualizationProps) {
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    setAnimationPhase(0);
    const timer = setTimeout(() => setAnimationPhase(1), 500);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Text Input
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Input Text</div>
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                <div className="text-white font-mono text-sm">
                  The cat sat on the mat
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className={`w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  animationPhase > 0
                    ? "scale-150 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-400">
              Raw text enters the system
            </div>
          </div>
        );

      case 1: // Tokenization
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Tokenization</div>
              <div className="flex flex-wrap justify-center gap-2">
                {["The", "cat", "sat", "on", "the", "mat"].map(
                  (token, index) => (
                    <div
                      key={index}
                      className={`bg-purple-600/20 border border-purple-500/30 rounded px-2 py-1 text-xs text-white font-mono transition-all duration-500 ${
                        animationPhase > 0 ? "scale-110" : "scale-100"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {token}
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className={`w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  animationPhase > 0
                    ? "scale-150 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-400">
              Text broken into tokens
            </div>
          </div>
        );

      case 2: // Neural Processing
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">
                Neural Processing
              </div>
              <div className="relative">
                {/* Neural Network Layers */}
                <div className="flex justify-center space-x-4">
                  {[1, 2, 3].map((layer) => (
                    <div key={layer} className="flex flex-col space-y-1">
                      {[1, 2, 3].map((node) => (
                        <div
                          key={node}
                          className={`w-3 h-3 rounded-full transition-all duration-500 ${
                            animationPhase > 0
                              ? "bg-green-500 shadow-lg shadow-green-500/50"
                              : "bg-gray-600"
                          }`}
                          style={{
                            animationDelay: `${(layer + node) * 100}ms`,
                          }}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <defs>
                    <linearGradient
                      id="connection"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                      <stop
                        offset="50%"
                        stopColor="#10b981"
                        stopOpacity="0.5"
                      />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {animationPhase > 0 && (
                    <>
                      <line
                        x1="25%"
                        y1="25%"
                        x2="50%"
                        y2="25%"
                        stroke="url(#connection)"
                        strokeWidth="2"
                      />
                      <line
                        x1="25%"
                        y1="50%"
                        x2="50%"
                        y2="25%"
                        stroke="url(#connection)"
                        strokeWidth="2"
                      />
                      <line
                        x1="25%"
                        y1="75%"
                        x2="50%"
                        y2="25%"
                        stroke="url(#connection)"
                        strokeWidth="2"
                      />
                      <line
                        x1="50%"
                        y1="25%"
                        x2="75%"
                        y2="25%"
                        stroke="url(#connection)"
                        strokeWidth="2"
                      />
                      <line
                        x1="50%"
                        y1="50%"
                        x2="75%"
                        y2="25%"
                        stroke="url(#connection)"
                        strokeWidth="2"
                      />
                      <line
                        x1="50%"
                        y1="75%"
                        x2="75%"
                        y2="25%"
                        stroke="url(#connection)"
                        strokeWidth="2"
                      />
                    </>
                  )}
                </svg>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className={`w-8 h-8 bg-green-500 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  animationPhase > 0
                    ? "scale-150 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-400">
              Hidden representations learned
            </div>
          </div>
        );

      case 3: // Vector Output
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-sm text-gray-400 mb-2">Vector Output</div>
              <div className="bg-orange-600/20 border border-orange-500/30 rounded-lg p-4">
                <div className="text-white font-mono text-xs leading-relaxed">
                  <div className="mb-2">[0.2, -0.5, 0.8, 0.1, -0.3, 0.7,</div>
                  <div className="mb-2"> 0.4, -0.2, 0.9, 0.0, -0.6, 0.3,</div>
                  <div className="mb-2"> 0.1, 0.8, -0.4, 0.5, -0.1, 0.2,</div>
                  <div> ... 384 dimensions]</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <div
                className={`w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center transition-all duration-1000 ${
                  animationPhase > 0
                    ? "scale-150 opacity-0"
                    : "scale-100 opacity-100"
                }`}
              >
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-400">
              Final embedding vector generated
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full h-64 bg-gray-800/30 rounded-lg border border-gray-700 flex items-center justify-center p-6">
      <div className="w-full max-w-xs">{renderStep()}</div>
    </div>
  );
}
