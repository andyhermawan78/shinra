import React from 'react';
import { Player } from '../types';
import { ArrowRight, Shield, User, Lock } from 'lucide-react';

interface HandoffScreenProps {
  previousPlayerName: string;
  nextPlayer: Player;
  nextPlayerIndex: number;
  totalPlayers: number;
  roundTitle: string;
  onProceed: () => void;
}

export const HandoffScreen: React.FC<HandoffScreenProps> = ({
  previousPlayerName,
  nextPlayer,
  nextPlayerIndex,
  totalPlayers,
  roundTitle,
  onProceed,
}) => {
  return (
    <div className="w-full max-w-lg mx-auto py-12 px-4 flex flex-col items-center text-center">
      {/* Privacy Shield Icon */}
      <div className="w-20 h-20 rounded-2xl bg-[#0e1424] border border-[#00f3ff]/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,243,255,0.25)]">
        <Lock className="w-10 h-10 text-[#00f3ff] animate-pulse" />
      </div>

      <div className="inline-block px-3 py-1 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/40 text-[#39ff14] text-xs font-mono mb-3">
        DATA TRANSMISSION ENCRYPTED
      </div>

      <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-white mb-2">
        PASS TERMINAL
      </h2>

      <p className="text-zinc-400 font-mono text-sm mb-6">
        Turn complete for <span className="text-[#39ff14] font-bold">{previousPlayerName}</span>. Please pass the device to the next operative.
      </p>

      {/* Next Player Highlight Card */}
      <div className="w-full bg-[#060912] border border-[#39ff14]/40 rounded-xl p-6 mb-8 text-left">
        <div className="text-[11px] font-mono text-[#00f3ff] uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          UP NEXT: OPERATIVE {nextPlayerIndex + 1} OF {totalPlayers}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#39ff14]/10 border border-[#39ff14] flex items-center justify-center font-orbitron font-black text-xl text-[#39ff14]">
            {nextPlayerIndex + 1}
          </div>
          <div>
            <div className="font-orbitron font-bold text-xl text-white">
              {nextPlayer.name}
            </div>
            <div className="text-xs font-mono text-[#ffd700]">
              Score: {nextPlayer.totalScore} ◆ Mako Crystals
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-zinc-800 text-xs font-mono text-zinc-500">
          Mission Target: <span className="text-zinc-300 font-bold">{roundTitle}</span> (45s Timer)
        </div>
      </div>

      {/* Ready Button */}
      <button
        id="handoff-proceed-btn"
        onClick={onProceed}
        className="w-full py-4 px-6 bg-[#39ff14] hover:bg-[#32e012] text-[#0a0e1a] rounded-xl font-orbitron font-black text-base tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(57,255,20,0.5)] transition hover:shadow-[0_0_35px_rgba(57,255,20,0.8)] active:scale-95 cursor-pointer"
      >
        <span>I Am {nextPlayer.name} - Open Terminal</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      <p className="text-[11px] font-mono text-zinc-600 mt-4">
        Ensure other operatives cannot see the screen during your turn.
      </p>
    </div>
  );
};
