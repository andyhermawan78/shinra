import React, { useState, useEffect, useCallback } from 'react';
import { Player } from '../types';
import { Clock, Key, ShieldAlert, Terminal, HelpCircle, Send } from 'lucide-react';

interface RoundTwoProps {
  currentPlayer: Player;
  playerIndex: number;
  totalPlayers: number;
  correctAnswersSoFar: number;
  onAnswerSubmit: (answer: string, isCorrect: boolean, timeLeft: number) => void;
}

const DATABASE_ENTRY = `SHINRA PERSONNEL DATABASE - ENTRY #4472
EMPLOYEE: Hojo, Professor
DEPARTMENT: Science & Research
STATUS: Active

EMPLOYMENT HISTORY:
- 1976: Joined Shinra as Junior Researcher
- 1982: Promoted to Head of Science Division
- 1990: Appointed to the Jenova Project
- 1995: Transferred to Nibelheim Reactor
- 1997: Returned to Midgar HQ

CLEARANCE LEVEL: Omega
SECURITY CODE: ********
EMERGENCY SHUTDOWN OVERRIDE: 1983

NOTES: Subject has been involved in multiple classified projects. Access to this file requires Level 5 authorization. Any unauthorized access will be logged and reported.`;

const CORRECT_ANSWER = '1983';
const TIME_LIMIT = 45;

export const RoundTwo: React.FC<RoundTwoProps> = ({
  currentPlayer,
  playerIndex,
  totalPlayers,
  correctAnswersSoFar,
  onAnswerSubmit,
}) => {
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [inputAnswer, setInputAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Timer logic
  useEffect(() => {
    setTimeLeft(TIME_LIMIT);
    setInputAnswer('');
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
      onAnswerSubmit('TIMEOUT', false, 0);
    }
  }, [submitted, onAnswerSubmit]);

  useEffect(() => {
    if (timeLeft === 0 && !submitted) {
      handleTimeout();
    }
  }, [timeLeft, submitted, handleTimeout]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) return;
    const trimmed = inputAnswer.trim();
    if (!trimmed) return;

    setSubmitted(true);
    const isCorrect = trimmed === CORRECT_ANSWER;
    onAnswerSubmit(trimmed, isCorrect, timeLeft);
  };

  const timerPercentage = (timeLeft / TIME_LIMIT) * 100;
  const isUrgent = timeLeft <= 10;

  // Potential points if answered correctly right now
  const potentialPoints = [100, 75, 50, 25][correctAnswersSoFar] || 25;

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

      {/* Round Header & Reward Tiers */}
      <div className="text-center mb-4">
        <h2 className="font-orbitron text-xl sm:text-2xl font-bold text-[#39ff14] glow-text-green tracking-wider uppercase">
          ROUND 2: THE DATA HUNT
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2 text-xs font-mono">
          <span className="text-zinc-400">Scoring Tiers:</span>
          <span className="px-2 py-0.5 rounded bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/40 font-bold">1st: 100 ◆</span>
          <span className="px-2 py-0.5 rounded bg-[#00f3ff]/20 text-[#00f3ff] border border-[#00f3ff]/40">2nd: 75 ◆</span>
          <span className="px-2 py-0.5 rounded bg-[#39ff14]/20 text-[#39ff14] border border-[#39ff14]/40">3rd: 50 ◆</span>
          <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">4th: 25 ◆</span>
        </div>
      </div>

      {/* Shinra Personnel Database Window */}
      <div className="w-full bg-[#060912] rounded-xl terminal-border p-4 sm:p-6 mb-6 relative">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#00f3ff]">
            <Terminal className="w-4 h-4 text-[#39ff14]" />
            <span>SHINRA_MAINFRAME // HOJO_RECORD_4472.DAT</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/50 text-red-400 font-mono text-[10px] uppercase tracking-wider">
            LEVEL 5 CLASSIFIED
          </span>
        </div>

        {/* Database Content */}
        <pre className="font-mono text-xs sm:text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[300px] sm:max-h-[360px] pr-2">
          {DATABASE_ENTRY}
        </pre>
      </div>

      {/* Question & Input Form */}
      <div className="w-full bg-[#0e1424]/90 rounded-xl terminal-border-blue p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-5">
          <Key className="w-5 h-5 text-[#00f3ff] shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-mono text-[#00f3ff] uppercase tracking-wider block">
              DATA EXTRACTION QUERY:
            </span>
            <h3 className="font-orbitron font-bold text-base sm:text-lg text-white">
              What is the emergency shutdown override code?
            </h3>
          </div>
        </div>

        {/* Override Code Input */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              id="override-code-input"
              type="text"
              value={inputAnswer}
              disabled={submitted}
              onChange={(e) => setInputAnswer(e.target.value)}
              placeholder="Enter override code (e.g., numbers/digits)..."
              className="w-full bg-[#060912] border border-[#00f3ff]/50 focus:border-[#39ff14] focus:ring-2 focus:ring-[#39ff14]/30 rounded-lg px-4 py-3.5 text-[#39ff14] font-mono text-base outline-none transition placeholder:text-zinc-600 tracking-wider"
              autoFocus
            />
          </div>

          <button
            id="submit-code-btn"
            type="submit"
            disabled={submitted || !inputAnswer.trim()}
            className={`px-8 py-3.5 bg-[#39ff14] hover:bg-[#32e012] text-[#0a0e1a] rounded-lg font-orbitron font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition shadow-[0_0_15px_rgba(57,255,20,0.4)] ${
              submitted || !inputAnswer.trim() ? 'opacity-50 cursor-not-allowed' : 'active:scale-95 cursor-pointer'
            }`}
          >
            <Send className="w-4 h-4" />
            Submit Code
          </button>
        </form>

        <div className="mt-3 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>Target Code Value in Database</span>
          <span className="text-[#ffd700]">Next Correct Award: {potentialPoints} ◆</span>
        </div>

        {submitted && (
          <div className="mt-4 p-3 bg-[#39ff14]/10 border border-[#39ff14]/40 rounded-lg text-center font-mono text-xs text-[#39ff14] animate-pulse">
            Override code submitted! Handing over terminal...
          </div>
        )}
      </div>
    </div>
  );
};
