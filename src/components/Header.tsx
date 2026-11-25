import React from 'react';
import { Terminal, Cpu, Radio, ShieldAlert } from 'lucide-react';
import { GameStage } from '../types';

interface HeaderProps {
  stage: GameStage;
  roundName?: string;
  totalPlayers: number;
}

export const Header: React.FC<HeaderProps> = ({ stage, roundName, totalPlayers }) => {
  return (
    <header className="w-full bg-[#060912] border-b border-[#00f3ff]/30 px-4 py-3 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[#00f3ff] font-orbitron font-bold tracking-wider">
            <Terminal className="w-4 h-4 text-[#39ff14] animate-pulse" />
            <span>SHINRA_NET // TERMINAL_v7.2</span>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#39ff14]/10 border border-[#39ff14]/40 text-[#39ff14] text-[11px] font-mono">
            SYS.STATUS: INFILTRATED
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          {stage !== 'LOBBY' && (
            <div className="flex items-center gap-1.5 text-[#00f3ff]">
              <Radio className="w-3.5 h-3.5 text-[#39ff14] animate-pulse" />
              <span className="font-orbitron font-semibold text-[#39ff14]">{roundName}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-zinc-400">
            <Cpu className="w-3.5 h-3.5 text-[#00f3ff]" />
            <span>OPERATIVES: <span className="text-[#39ff14] font-bold">{totalPlayers}</span>/4</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span className="text-[10px] tracking-wider font-orbitron">SECURITY: LEVEL 5</span>
          </div>
        </div>
      </div>
    </header>
  );
};
