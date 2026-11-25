import React from 'react';
import { Player } from '../types';
import { CheckCircle2, XCircle, ArrowRight, ShieldAlert, Sparkles, Terminal } from 'lucide-react';

interface RoundSummaryProps {
  round: 1 | 2;
  players: Player[];
  onProceed: () => void;
}

export const RoundSummary: React.FC<RoundSummaryProps> = ({
  round,
  players,
  onProceed,
}) => {
  const isR1 = round === 1;

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4 flex flex-col items-center">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/40 text-[#00f3ff] text-xs font-mono mb-2">
          <Terminal className="w-3.5 h-3.5" />
          MISSION DEBRIEF // ROUND {round} COMPLETE
        </div>
        <h2 className="font-orbitron text-2xl sm:text-3xl font-extrabold text-[#39ff14] glow-text-green uppercase">
          {isR1 ? 'ROUND 1: THE SKIM SCAN - RECAP' : 'ROUND 2: THE DATA HUNT - RECAP'}
        </h2>
      </div>

      {/* Answer Key Box */}
      <div className="w-full bg-[#060912] border border-[#00f3ff]/40 rounded-xl p-5 mb-6 text-left shadow-md">
        <div className="text-[11px] font-mono text-[#00f3ff] uppercase tracking-wider mb-2">
          SHINRA ARCHIVE VERIFICATION
        </div>

        {isR1 ? (
          <div>
            <div className="text-sm font-mono text-zinc-300 mb-2">
              <span className="text-zinc-500">Query:</span> Which section of the memo is about the PROBLEMS with Mako energy?
            </div>
            <div className="flex items-center gap-2 text-base font-orbitron font-bold text-[#39ff14]">
              <CheckCircle2 className="w-5 h-5 text-[#39ff14]" />
              <span>Correct Answer: Option B (Third paragraph)</span>
            </div>
            <div className="mt-2 text-xs font-mono text-zinc-400 bg-[#0e1424] p-3 rounded-lg border border-zinc-800 italic">
              "However, recent studies indicate that Mako extraction depletes the planet's life force, causing desertification in surrounding areas..."
            </div>
          </div>
        ) : (
          <div>
            <div className="text-sm font-mono text-zinc-300 mb-2">
              <span className="text-zinc-500">Query:</span> What is the emergency shutdown override code?
            </div>
            <div className="flex items-center gap-2 text-base font-orbitron font-bold text-[#39ff14]">
              <CheckCircle2 className="w-5 h-5 text-[#39ff14]" />
              <span>Correct Override Code: 1983</span>
            </div>
            <div className="mt-2 text-xs font-mono text-zinc-400 bg-[#0e1424] p-3 rounded-lg border border-zinc-800">
              Prof. Hojo's dossier: <span className="text-[#00f3ff] font-bold">EMERGENCY SHUTDOWN OVERRIDE: 1983</span> (Promoted to Head of Science Division 1982).
            </div>
          </div>
        )}
      </div>

      {/* Operative Performance List */}
      <div className="w-full bg-[#0e1424]/90 rounded-xl terminal-border p-5 mb-8">
        <h3 className="font-orbitron font-bold text-sm text-[#00f3ff] uppercase tracking-wider mb-4 flex items-center justify-between">
          <span>OPERATIVE SCORES THIS ROUND</span>
          <span className="text-xs font-mono text-zinc-400">Total Mako Crystals</span>
        </h3>

        <div className="flex flex-col gap-3">
          {players.map((player, idx) => {
            const isCorrect = isR1 ? player.r1Correct : player.r2Correct;
            const chosenAnswer = isR1 ? player.r1Answer : player.r2Answer;
            const roundScore = isR1 ? player.r1Score : player.r2Score;

            return (
              <div
                key={player.id}
                id={`summary-player-${idx}`}
                className="flex items-center justify-between p-3.5 bg-[#060912] border border-zinc-800 rounded-lg hover:border-zinc-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center font-orbitron font-bold text-xs text-white">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-orbitron font-bold text-white text-sm sm:text-base flex items-center gap-2">
                      <span>{player.name}</span>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-[#39ff14] bg-[#39ff14]/10 px-2 py-0.5 rounded border border-[#39ff14]/30">
                          <CheckCircle2 className="w-3 h-3" />
                          SUCCESS
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-red-400 bg-red-950/40 px-2 py-0.5 rounded border border-red-500/30">
                          <XCircle className="w-3 h-3" />
                          FAILED
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-zinc-400">
                      Answered: <span className="text-zinc-200 font-bold">{chosenAnswer || 'No response'}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-orbitron font-bold text-base text-[#39ff14]">
                    {roundScore > 0 ? `+${roundScore}` : '0'} ◆
                  </div>
                  <div className="text-[11px] font-mono text-zinc-400">
                    Total: {player.totalScore} ◆
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Proceed Button */}
      <button
        id="round-summary-proceed-btn"
        onClick={onProceed}
        className="w-full sm:w-auto min-w-[280px] py-4 px-8 bg-[#39ff14] hover:bg-[#32e012] text-[#0a0e1a] rounded-xl font-orbitron font-black text-base tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(57,255,20,0.5)] transition hover:shadow-[0_0_35px_rgba(57,255,20,0.8)] active:scale-95 cursor-pointer"
      >
        <span>{isR1 ? 'Proceed to Round 2: The Data Hunt' : 'View Final Leaderboard'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
