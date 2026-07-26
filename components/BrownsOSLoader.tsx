"use client";

import { useEffect, useState } from "react";
import BrownsOS from "./BrownsOS";

export default function BrownsOSLoader() {
  const [loadingText, setLoadingText] = useState("");
  const [progress, setProgress] = useState(0);
  const [showOverlay, setShowOverlay] = useState(true);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // 1. Progress Bar counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 90);

    // 2. Terminal-like log sequence
    const logs = [
      { t: 0, msg: "> INITIALIZING BROWNS ACADEMY ENGINE..." },
      { t: 500, msg: "> COMPILING 11 PREMIUM CURRICULUMS..." },
      { t: 1000, msg: "> LOADING CRYPTOGRAPHIC CERTIFICATION REGISTRY..." },
      { t: 1500, msg: "> ESTABLISHING AGENTIAL SIMULATION WORKSPACES..." },
      { t: 2000, msg: "> SYSTEM READY. ENJOY LEARNING." }
    ];

    logs.forEach((log) => {
      setTimeout(() => {
        setLoadingText((prev) => prev + "\n" + log.msg);
      }, log.t);
    });

    // 3. Close & Fade overlay
    setTimeout(() => {
      setFade(true);
      setTimeout(() => {
        setShowOverlay(false);
      }, 500); // match duration-500
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <BrownsOS />
      {showOverlay && (
        <div 
          className={`fixed inset-0 z-[9999] bg-[#050506] flex flex-col items-center justify-center font-mono text-[10px] sm:text-xs text-[#00f0ff] p-6 transition-opacity duration-500 ${
            fade ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="w-full max-w-sm sm:max-w-md space-y-6">
            {/* Logo placeholder icon */}
            <div className="flex justify-center mb-4">
              <div className="w-10 h-10 rounded-xl border border-[#00f0ff]/30 bg-[#00f0ff]/5 flex items-center justify-center animate-pulse">
                <span className="text-[#00f0ff] font-bold text-sm font-display">B</span>
              </div>
            </div>

            {/* Terminal output */}
            <div className="h-32 overflow-y-auto bg-[#0a0a0c] border border-white/5 rounded-xl p-4 text-[#9e9e9e] leading-relaxed whitespace-pre-wrap font-mono">
              {loadingText}
            </div>

            {/* Progress counter */}
            <div className="space-y-2">
              <div className="flex justify-between text-[#00f0ff] font-bold">
                <span>ACADEMY BOOTSTRAP</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ffffff] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
