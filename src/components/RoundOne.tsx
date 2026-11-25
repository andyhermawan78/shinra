import React, { useState, useEffect, useCallback } from 'react';
import { Player } from '../types';
import { Clock, CheckCircle2, ShieldAlert, Terminal, HelpCircle } from 'lucide-react';

interface RoundOneProps {
  currentPlayer: Player;
  playerIndex: number;
  totalPlayers: number;
  onAnswerSubmit: (answer: string, isCorrect: boolean) => void;
}

const MEMO_TEXT = `SHINRA ELECTRIC POWER COMPANY - INTERNAL MEMO
CLASSIFICATION: RESTRICTED

SUBJECT: Mako Energy Extraction Report

Mako energy extraction continues to be Shinra's primary source of power generation, providing energy to 85% of Midgar's sectors. The extraction process involves drawing energy from the planet's Lifestream, which has raised significant environmental concerns among scientists.

The primary benefits of Mako energy include its efficiency and low operational costs compared to traditional fossil fuels. One reactor can power an entire sector for up to 50 years with minimal maintenance.

However, recent studies indicate that Mako extraction depletes the planet's life force, causing desertification in surrounding areas. The once-fertile lands near Reactor 1 have become barren wastelands.

To address these concerns, Shinra has developed a "sustainable extraction" initiative, though critics argue this is merely a public relations campaign. The true environmental cost remains classified.`;

const OPTIONS = [
  { id: 'A', label: 'A. First paragraph' },
  { id: 'B', label: 'B. Third paragraph' },
  { id: 'C', label: 'C. Fourth paragraph' },
];

const CORRECT_ANSWER = 'B';
const TIME_LIMIT = 45;

export const RoundOne: React.FC<RoundOneProps> = ({
  currentPlayer,
  playerIndex,
  totalPlayers,
  onAnswerSubmit,
}) => {
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Timer logic
  useEffect(() => {
    setTimeLeft(TIME_LIMIT);
    setSelectedOption(null);
    setSubmitted(false);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayer.id]);

  const handleTimeout = useCallback(() => {
    if (!submitted) {
      setSubmitted(true);
      onAnswerSubmit('TIMEOUT', false);
    }
  }, [submitted, onAnswerSubmit]);

  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      handleTimeout();
    }
  }, [timeLeft, submitted, handleTimeout]);

  const handleSelectOption = (optionId: string) => {
    if (submitted) return;
    setSelectedOption(optionId);
    setSubmitted(true);
    const isCorrect = optionId === CORRECT_ANSWER;
    onAnswerSubmit(optionId, isCorrect);
  };

  const timerPercentage = (timeLeft / TIME_LIMIT) * 100;
  const isUrgent = timeLeft <= 10;

  return (
    <div className="w-full max-w-4xl mx-auto py-4 px-4 flex flex-col items-center">
      {/* Turn Banner & Status */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0e1424] border border-[#00f3ff]/40 rounded-xl p-4 mb-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#39ff14]/10 border border-[#39ff14] flex items-center justify-center font-orbitron font-extrabold text-[#39ff14]">
            {playerIndex + 1}
          </div>
          <div>
            <div className="text-[11px] font-mono text-[#00f3ff] uppercase tracking-wider">
              ACTIVE OPERATIVE ({playerIndex + 1} OF {totalPlayers})
            </div>
            <div className="font-orbitron font-bold text-lg sm:text-xl text-white flex items-center gap-2">
              <span>{currentPlayer.name}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#39ff14]/20 border border-[#39ff14]/40 text-[#39ff14] font-mono">
                CURRENT SCORE: {currentPlayer.totalScore} ◆
              </span>
            </div>
          </div>
        </div>

        {/* 45s Countdown Timer */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] font-mono text-zinc-400 uppercase">TIME REMAINING</div>
            <div className={`font-orbitron font-black text-2xl ${isUrgent ? 'text-red-500 animate-pulse' : 'text-[#39ff14]'}`}>
              {timeLeft}s
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-zinc-800 flex items-center justify-center relative">
            <Clock className={`w-6 h-6 ${isUrgent ? 'text-red-500 animate-spin' : 'text-[#00f3ff]'}`} />
          </div>
        </div>
      </div>

      {/* Timer Progress Bar */}
      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden mb-5 border border-zinc-800">
        <div 
          className={`h-full transition-all duration-1000 ${isUrgent ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-[#39ff14] shadow-[0_0_10px_#39ff14]'}`}
          style={{ width: `${timerPercentage}%` }}
        />
      </div>

      {/* Round Header */}
      <div className="text-center mb-4">
        <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-[#39ff14] glow-text-green tracking-wider uppercase">
          ROUND 1: THE SKIM SCAN
        </h2>
        <p className="text-xs font-mono text-[#00f3ff] mt-1">
          Scan the leaked Shinra internal memo and extract the problem section. Correct answer: <span className="text-[#ffd700] font-bold">+50 ◆</span>
        </p>
      </div>

      {/* Leaked Memo Terminal Window */}
      <div className="w-full bg-[#060912] rounded-xl terminal-border p-4 sm:p-6 mb-6 relative">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#00f3ff]">
            <Terminal className="w-4 h-4 text-[#39ff14]" />
            <span>FILE: MEMO_MAKO_085.DOC</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/50 text-red-400 font-mono text-[10px] uppercase tracking-wider">
            RESTRICTED ARCHIVE
          </span>
        </div>

        {/* Memo Content */}
        <pre className="font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[300px] sm:max-h-[360px] pr-2">
          {MEMO_TEXT}
        </pre>
      </div>

      {/* Question & Interactive Options */}
      <div className="w-full bg-[#0e1424]/90 rounded-xl terminal-border-blue p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-5">
          <HelpCircle className="w-5 h-5 text-[#00f3ff] shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-mono text-[#00f3ff] uppercase tracking-wider block">
              MISSION OBJECTIVE:
            </span>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white">
              Which section of the memo is about the PROBLEMS with Mako energy?
            </h3>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3">
          {OPTIONS.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <button
                key={opt.id}
                id={`option-btn-${opt.id}`}
                disabled={submitted}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-4 rounded-xl border text-left font-mono text-sm sm:text-base font-bold transition flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#39ff14]/20 border-[#39ff14] text-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.3)]'
                    : 'bg-[#060912] border-[#00f3ff]/40 text-zinc-200 hover:border-[#00f3ff] hover:bg-[#00f3ff]/10 hover:text-white'
                } ${submitted ? 'opacity-80 cursor-not-allowed' : 'active:scale-[0.99]'}`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <span className="flex items-center gap-1.5 text-xs font-orbitron text-[#39ff14]">
                    <CheckCircle2 className="w-4 h-4" />
                    REGISTERED
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {submitted && (
          <div className="mt-4 p-3 bg-[#39ff14]/10 border border-[#39ff14]/40 rounded-lg text-center font-mono text-xs text-[#39ff14] animate-pulse">
            Transmission logged! Preparing terminal handoff...
          </div>
        )}
      </div>
    </div>
  );
};
