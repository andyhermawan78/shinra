/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Player, GameStage } from './types';
import { Header } from './components/Header';
import { Lobby } from './components/Lobby';
import { RoundOne } from './components/RoundOne';
import { RoundTwo } from './components/RoundTwo';
import { HandoffScreen } from './components/HandoffScreen';
import { RoundSummary } from './components/RoundSummary';
import { ResultsScreen } from './components/ResultsScreen';

const INITIAL_PLAYERS: Player[] = [
  { id: '1', name: 'Cloud', avatar: '1', r1Score: 0, r2Score: 0, totalScore: 0 },
  { id: '2', name: 'Tifa', avatar: '2', r1Score: 0, r2Score: 0, totalScore: 0 },
];

export default function App() {
  const [stage, setStage] = useState<GameStage>('LOBBY');
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [r2CorrectCount, setR2CorrectCount] = useState(0);

  // Player Management in Lobby
  const handleAddPlayer = (name: string) => {
    if (players.length >= 4) return;
    const newPlayer: Player = {
      id: Date.now().toString(),
      name,
      avatar: (players.length + 1).toString(),
      r1Score: 0,
      r2Score: 0,
      totalScore: 0,
    };
    setPlayers([...players, newPlayer]);
  };

  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  // Start Mission
  const handleStartMission = () => {
    if (players.length < 2) return;
    // Reset any previous match data
    setPlayers(players.map(p => ({
      ...p,
      r1Answer: undefined,
      r1Correct: undefined,
      r1Score: 0,
      r2Answer: undefined,
      r2Correct: undefined,
      r2Score: 0,
      totalScore: 0,
    })));
    setCurrentPlayerIndex(0);
    setR2CorrectCount(0);
    setStage('R1_PLAY');
  };

  // Round 1 Logic
  const handleR1Answer = (answer: string, isCorrect: boolean) => {
    const score = isCorrect ? 50 : 0;
    
    // Update current player
    const updated = [...players];
    updated[currentPlayerIndex] = {
      ...updated[currentPlayerIndex],
      r1Answer: answer,
      r1Correct: isCorrect,
      r1Score: score,
      totalScore: updated[currentPlayerIndex].totalScore + score,
    };
    setPlayers(updated);

    // Check if more players need to play Round 1
    if (currentPlayerIndex < players.length - 1) {
      setStage('R1_HANDOFF');
    } else {
      setStage('R1_SUMMARY');
    }
  };

  const handleR1HandoffProceed = () => {
    setCurrentPlayerIndex(prev => prev + 1);
    setStage('R1_PLAY');
  };

  const handleProceedToRound2 = () => {
    setCurrentPlayerIndex(0);
    setR2CorrectCount(0);
    setStage('R2_PLAY');
  };

  // Round 2 Logic
  const handleR2Answer = (answer: string, isCorrect: boolean, timeLeft: number) => {
    let score = 0;
    let newCorrectCount = r2CorrectCount;

    if (isCorrect) {
      const scoringTiers = [100, 75, 50, 25];
      score = scoringTiers[r2CorrectCount] || 25;
      newCorrectCount = r2CorrectCount + 1;
      setR2CorrectCount(newCorrectCount);
    }

    const updated = [...players];
    updated[currentPlayerIndex] = {
      ...updated[currentPlayerIndex],
      r2Answer: answer,
      r2Correct: isCorrect,
      r2Score: score,
      r2TimeLeft: timeLeft,
      totalScore: updated[currentPlayerIndex].totalScore + score,
    };
    setPlayers(updated);

    // Check if more players need to play Round 2
    if (currentPlayerIndex < players.length - 1) {
      setStage('R2_HANDOFF');
    } else {
      setStage('R2_SUMMARY');
    }
  };

  const handleR2HandoffProceed = () => {
    setCurrentPlayerIndex(prev => prev + 1);
    setStage('R2_PLAY');
  };

  const handleProceedToResults = () => {
    setStage('RESULTS');
  };

  // Reset Game
  const handlePlayAgain = (keepPlayers: boolean) => {
    if (keepPlayers) {
      setPlayers(players.map(p => ({
        ...p,
        r1Answer: undefined,
        r1Correct: undefined,
        r1Score: 0,
        r2Answer: undefined,
        r2Correct: undefined,
        r2Score: 0,
        totalScore: 0,
      })));
      setCurrentPlayerIndex(0);
      setR2CorrectCount(0);
      setStage('R1_PLAY');
    } else {
      setPlayers(INITIAL_PLAYERS);
      setStage('LOBBY');
    }
  };

  // Get current active round name for header
  const getRoundName = () => {
    if (stage.startsWith('R1')) return 'ROUND 1: THE SKIM SCAN';
    if (stage.startsWith('R2')) return 'ROUND 2: THE DATA HUNT';
    if (stage === 'RESULTS') return 'MISSION DEBRIEF: FINAL ARCHIVES';
    return '';
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#39ff14] shinra-grid-bg scanlines flex flex-col justify-between selection:bg-[#39ff14] selection:text-[#0a0e1a] overflow-x-hidden">
      {/* Top Header */}
      <Header
        stage={stage}
        roundName={getRoundName()}
        totalPlayers={players.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center py-4 px-2 sm:px-4">
        {stage === 'LOBBY' && (
          <Lobby
            players={players}
            onAddPlayer={handleAddPlayer}
            onRemovePlayer={handleRemovePlayer}
            onStartMission={handleStartMission}
          />
        )}

        {stage === 'R1_PLAY' && players[currentPlayerIndex] && (
          <RoundOne
            currentPlayer={players[currentPlayerIndex]}
            playerIndex={currentPlayerIndex}
            totalPlayers={players.length}
            onAnswerSubmit={handleR1Answer}
          />
        )}

        {stage === 'R1_HANDOFF' && (
          <HandoffScreen
            previousPlayerName={players[currentPlayerIndex]?.name || 'Previous Operative'}
            nextPlayer={players[currentPlayerIndex + 1]}
            nextPlayerIndex={currentPlayerIndex + 1}
            totalPlayers={players.length}
            roundTitle="Round 1: The Skim Scan"
            onProceed={handleR1HandoffProceed}
          />
        )}

        {stage === 'R1_SUMMARY' && (
          <RoundSummary
            round={1}
            players={players}
            onProceed={handleProceedToRound2}
          />
        )}

        {stage === 'R2_PLAY' && players[currentPlayerIndex] && (
          <RoundTwo
            currentPlayer={players[currentPlayerIndex]}
            playerIndex={currentPlayerIndex}
            totalPlayers={players.length}
            correctAnswersSoFar={r2CorrectCount}
            onAnswerSubmit={handleR2Answer}
          />
        )}

        {stage === 'R2_HANDOFF' && (
          <HandoffScreen
            previousPlayerName={players[currentPlayerIndex]?.name || 'Previous Operative'}
            nextPlayer={players[currentPlayerIndex + 1]}
            nextPlayerIndex={currentPlayerIndex + 1}
            totalPlayers={players.length}
            roundTitle="Round 2: The Data Hunt"
            onProceed={handleR2HandoffProceed}
          />
        )}

        {stage === 'R2_SUMMARY' && (
          <RoundSummary
            round={2}
            players={players}
            onProceed={handleProceedToResults}
          />
        )}

        {stage === 'RESULTS' && (
          <ResultsScreen
            players={players}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </main>

      {/* Retro Terminal Footer */}
      <footer className="w-full bg-[#060912] border-t border-zinc-800/80 px-4 py-2.5 text-center text-[11px] font-mono text-zinc-500 relative z-10 flex flex-wrap items-center justify-between gap-2 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14]" />
          <span>AVALANCHE MIDGAR UNDERGROUND SEC-7</span>
        </div>
        <div className="text-zinc-600 hidden sm:block">
          NO CLOUD SYNC • LOCAL MULTIPLAYER SYSTEM
        </div>
        <div className="text-[#00f3ff]">
          MAKO ENERGY ARCHIVES v1.0
        </div>
      </footer>
    </div>
  );
}
