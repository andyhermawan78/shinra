import React from 'react';
import { Player } from '../types';
import { Trophy, Medal, RotateCcw, Sparkles, Award, ShieldCheck, Users } from 'lucide-react';

interface ResultsScreenProps {
  players: Player[];
  onPlayAgain: (keepPlayers: boolean) => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  players,
  onPlayAgain,
}) => {
  // Sort players by total score descending
  const sortedPlayers = [...players].sort((a, b) => b.totalScore - a.totalScore);
  const winner = sortedPlayers[0];

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return {
          title: 'SOLDIER 1ST CLASS',
          color: 'text-[#ffd700]',
          bg: 'bg-[#ffd700]/10',
          border: 'border-[#ffd700]',
          shadow: 'shadow-[0_0_20px_rgba(255,215,0,0.3)]',
          icon: <Trophy className="w-6 h-6 text-[#ffd700]" />,
          medal: 'GOLD MEDAL',
        };
      case 1:
        return {
          title: 'SOLDIER 2ND CLASS',
          color: 'text-[#e2e8f0]',
          bg: 'bg-slate-500/10',
          border: 'border-slate-400',
          shadow: 'shadow-[0_0_15px_rgba(226,232,240,0.2)]',
          icon: <Medal className="w-6 h-6 text-slate-300" />,
          medal: 'SILVER MEDAL',
        };
      case 2:
        return {
          title: 'AVALANCHE ELITE',
          color: 'text-[#cd7f32]',
          bg: 'bg-amber-900/10',
          border: 'border-[#cd7f32]',
          shadow: 'shadow-[0_0_15px_rgba(205,127,50,0.2)]',
          icon: <Medal className="w-6 h-6 text-[#cd7f32]" />,
          medal: 'BRONZE MEDAL',
        };
      default:
        return {
          title: 'AVALANCHE RECRUIT',
          color: 'text-zinc-400',
          bg: 'bg-zinc-900',
          border: 'border-zinc-700',
          shadow: '',
          icon: <Award className="w-6 h-6 text-zinc-500" />,
          medal: 'RUNNER UP',
        };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 flex flex-col items-center">
      {/* Victory Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/40 text-[#ffd700] text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          MISSION ARCHIVE EXTRACTION COMPLETE
        </div>
        <h1 className="font-orbitron font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#ffd700] glow-text-gold tracking-wide uppercase">
          FINAL STANDINGS
        </h1>
        <p className="text-zinc-400 font-mono text-sm sm:text-base mt-2">
          Shinra records breached. Final Mako Crystal yield calculated.
        </p>
      </div>

      {/* Champion Spotlight Card */}
      {winner && (
        <div className="w-full bg-[#0e1424]/90 rounded-2xl terminal-border-gold p-6 sm:p-8 mb-8 text-center relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <Trophy className="w-48 h-48 text-[#ffd700]" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd700]/20 border border-[#ffd700]/50 text-[#ffd700] font-orbitron font-bold text-xs uppercase tracking-widest mb-3">
            <Trophy className="w-4 h-4 text-[#ffd700]" />
            MISSION TOP OPERATIVE
          </div>

          <h2 className="font-orbitron font-black text-2xl sm:text-4xl text-white mb-1">
            {winner.name}
          </h2>
          <div className="font-orbitron text-sm text-[#ffd700] tracking-wider mb-4">
            RANK: SOLDIER 1ST CLASS
          </div>

          <div className="inline-flex items-center gap-3 bg-[#060912] border border-[#ffd700]/40 px-6 py-3 rounded-xl shadow-inner">
            <span className="text-xs font-mono text-zinc-400 uppercase">MAKO CRYSTALS HARVESTED:</span>
            <span className="font-orbitron font-black text-2xl sm:text-3xl text-[#ffd700] glow-text-gold">
              {winner.totalScore} ◆
            </span>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
            <span>Round 1 (Skim Scan): <span className="text-[#39ff14] font-bold">+{winner.r1Score} ◆</span></span>
            <span>•</span>
            <span>Round 2 (Data Hunt): <span className="text-[#00f3ff] font-bold">+{winner.r2Score} ◆</span></span>
          </div>
        </div>
      )}

      {/* Leaderboard Grid */}
      <div className="w-full bg-[#060912] rounded-xl terminal-border p-5 sm:p-7 mb-8">
        <h3 className="font-orbitron font-bold text-sm text-[#00f3ff] uppercase tracking-wider mb-5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#39ff14]" />
            AVALANCHE ARCHIVES LEADERBOARD
          </span>
          <span className="text-xs font-mono text-zinc-400">Ranked by Total ◆</span>
        </h3>

        <div className="flex flex-col gap-3.5">
          {sortedPlayers.map((player, index) => {
            const badge = getRankBadge(index);
            return (
              <div
                key={player.id}
                id={`leaderboard-rank-${index + 1}`}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border transition ${badge.bg} ${badge.border} ${badge.shadow}`}
              >
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <div className="w-10 h-10 rounded-lg bg-[#060912] border border-zinc-700 flex items-center justify-center font-orbitron font-extrabold text-lg">
                    {badge.icon}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-orbitron font-bold text-lg text-white">
                        {player.name}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${badge.color} border-current/40`}>
                        {badge.medal}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-zinc-400 mt-0.5">
                      {badge.title} • R1: +{player.r1Score} ◆ | R2: +{player.r2Score} ◆
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-zinc-800">
                  <span className="sm:hidden text-xs font-mono text-zinc-500">TOTAL:</span>
                  <div className="font-orbitron font-black text-xl sm:text-2xl text-[#39ff14] glow-text-green">
                    {player.totalScore} ◆
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
        <button
          id="play-again-same-squad-btn"
          onClick={() => onPlayAgain(true)}
          className="w-full sm:w-auto min-w-[220px] px-6 py-4 bg-[#39ff14] hover:bg-[#32e012] text-[#0a0e1a] rounded-xl font-orbitron font-black text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(57,255,20,0.5)] transition hover:shadow-[0_0_30px_rgba(57,255,20,0.7)] active:scale-95 cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again (Same Squad)
        </button>

        <button
          id="play-again-new-squad-btn"
          onClick={() => onPlayAgain(false)}
          className="w-full sm:w-auto min-w-[200px] px-6 py-4 bg-[#0e1424] hover:bg-[#151f38] text-[#00f3ff] border border-[#00f3ff]/50 rounded-xl font-orbitron font-bold text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-2 transition hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] active:scale-95 cursor-pointer"
        >
          <Users className="w-5 h-5" />
          New Operatives
        </button>
      </div>
    </div>
  );
};
