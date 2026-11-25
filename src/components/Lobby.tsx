import React, { useState } from 'react';
import { Player } from '../types';
import { UserPlus, Trash2, Play, ShieldAlert, Sparkles, UserCheck } from 'lucide-react';

interface LobbyProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
  onStartMission: () => void;
}

const PRESET_OPERATIVES = ['Cloud', 'Tifa', 'Barret', 'Aerith', 'Jessie', 'Biggs', 'Wedge'];

export const Lobby: React.FC<LobbyProps> = ({
  players,
  onAddPlayer,
  onRemovePlayer,
  onStartMission,
}) => {
  const [nameInput, setNameInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setErrorMsg('Operative codename required.');
      return;
    }
    if (players.length >= 4) {
      setErrorMsg('Terminal capacity reached (Max 4 operatives).');
      return;
    }
    if (players.some(p => p.name.toLowerCase() === trimmed.toLowerCase())) {
      setErrorMsg('Operative with this codename already registered.');
      return;
    }

    onAddPlayer(trimmed);
    setNameInput('');
    setErrorMsg('');
  };

  const handleQuickAdd = (preset: string) => {
    if (players.length >= 4) return;
    if (players.some(p => p.name.toLowerCase() === preset.toLowerCase())) return;
    onAddPlayer(preset);
    setErrorMsg('');
  };

  const canStart = players.length >= 2 && players.length <= 4;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4 flex flex-col items-center">
      {/* Title & Subtitle */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-[#00f3ff]/10 border border-[#00f3ff]/40 text-[#00f3ff] text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          Sector 7 Sector Infiltration Mode
        </div>
        <h1 
          id="main-title"
          className="font-orbitron font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#39ff14] glow-text-green tracking-wide uppercase leading-tight"
        >
          MIDGAR ARCHIVES
        </h1>
        <p className="font-orbitron text-lg sm:text-xl text-[#00f3ff] glow-text-blue font-bold tracking-widest mt-1">
          SHINRA DATA HUNT
        </p>
        <p className="text-zinc-400 font-mono text-sm sm:text-base mt-2 tracking-wide">
          Enter your name to join AVALANCHE
        </p>
      </div>

      {/* Registration Terminal */}
      <div className="w-full bg-[#0e1424]/90 rounded-xl terminal-border p-5 sm:p-7 backdrop-blur-md mb-8">
        <div className="flex items-center justify-between border-b border-[#39ff14]/20 pb-3 mb-5">
          <div className="flex items-center gap-2 text-xs font-mono text-[#00f3ff]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39ff14] animate-ping" />
            <span>TERMINAL ACCESS PORT: 0x77-MIDGAR</span>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            OPERATIVES: <span className="text-[#39ff14] font-bold">{players.length}</span> / 4
          </span>
        </div>

        {/* Input Form */}
        {players.length < 4 ? (
          <form onSubmit={handleJoin} className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1 relative">
              <input
                id="player-name-input"
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                maxLength={16}
                placeholder="Enter Operative Name..."
                className="w-full bg-[#060912] border border-[#00f3ff]/50 focus:border-[#39ff14] focus:ring-2 focus:ring-[#39ff14]/30 rounded-lg px-4 py-3 text-[#39ff14] font-mono text-base outline-none transition placeholder:text-zinc-600 shadow-inner"
                autoFocus
              />
              <span className="absolute right-3 top-3.5 text-xs text-zinc-500 font-mono">
                {nameInput.length}/16
              </span>
            </div>

            <button
              id="join-button"
              type="submit"
              className="px-6 py-3 bg-[#00f3ff]/20 hover:bg-[#00f3ff]/30 text-[#00f3ff] border border-[#00f3ff] rounded-lg font-orbitron font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] active:scale-95 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Join
            </button>
          </form>
        ) : (
          <div className="p-3 bg-[#00f3ff]/10 border border-[#00f3ff]/40 rounded-lg text-center text-xs text-[#00f3ff] font-mono mb-4">
            Squad roster full (4/4 Operatives ready).
          </div>
        )}

        {/* Quick select presets */}
        {players.length < 4 && (
          <div className="flex flex-wrap items-center gap-2 pt-1 mb-5">
            <span className="text-xs font-mono text-zinc-500 mr-1">Quick Select:</span>
            {PRESET_OPERATIVES.filter(p => !players.some(pl => pl.name.toLowerCase() === p.toLowerCase())).slice(0, 5).map(preset => (
              <button
                key={preset}
                type="button"
                onClick={() => handleQuickAdd(preset)}
                className="px-2.5 py-1 text-xs font-mono rounded bg-[#060912] border border-zinc-700 hover:border-[#39ff14] text-zinc-300 hover:text-[#39ff14] transition cursor-pointer"
              >
                + {preset}
              </button>
            ))}
          </div>
        )}

        {errorMsg && (
          <div className="p-2.5 rounded bg-red-950/60 border border-red-500/50 text-red-400 font-mono text-xs mb-4 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Roster of Joined Players */}
        <div className="mt-4">
          <h2 className="text-xs font-orbitron tracking-widest text-[#00f3ff] mb-3 uppercase flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-[#39ff14]" />
            AVALANCHE SQUAD ROSTER ({players.length}/4)
          </h2>

          {players.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-zinc-800 rounded-lg text-zinc-500 font-mono text-sm">
              No operatives registered yet. Enter at least 2 names to initiate mission.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {players.map((player, idx) => (
                <div
                  key={player.id}
                  id={`player-card-${idx}`}
                  className="flex items-center justify-between p-3.5 bg-[#060912] border border-[#39ff14]/30 rounded-lg hover:border-[#39ff14]/70 transition shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#39ff14]/10 border border-[#39ff14]/50 flex items-center justify-center font-orbitron font-bold text-[#39ff14] text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-orbitron font-bold text-white text-sm sm:text-base">
                          {player.name}
                        </span>
                        {idx === 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-[#ffd700]/20 border border-[#ffd700]/50 text-[#ffd700] text-[10px] font-mono uppercase">
                            Host
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-[#00f3ff]">
                        Operative Status: READY
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemovePlayer(player.id)}
                    title="Remove operative"
                    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-950/40 rounded transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Start Mission Button Area */}
      <div className="w-full flex flex-col items-center">
        {canStart ? (
          <button
            id="start-mission-btn"
            onClick={onStartMission}
            className="w-full sm:w-auto min-w-[280px] px-8 py-4 bg-[#39ff14] hover:bg-[#32e012] text-[#0a0e1a] rounded-xl font-orbitron font-black text-lg tracking-wider uppercase transition shadow-[0_0_25px_rgba(57,255,20,0.5)] hover:shadow-[0_0_35px_rgba(57,255,20,0.8)] active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-current" />
            Start Mission
          </button>
        ) : (
          <div className="text-center p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-500 font-mono text-xs sm:text-sm">
            {players.length === 0 
              ? 'Awaiting at least 2 operatives to unlock mission launch.' 
              : players.length === 1 
              ? '1 more operative required to begin multiplayer data hunt.' 
              : 'Ready to launch.'}
          </div>
        )}

        {/* Quick Instructions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-xs font-mono text-zinc-400">
          <div className="p-3.5 bg-[#060912]/80 border border-zinc-800 rounded-lg">
            <span className="text-[#39ff14] font-bold font-orbitron block mb-1">ROUND 1: THE SKIM SCAN</span>
            Read the leaked Shinra internal memo within 45s and identify the critical problem section for +50 ◆ Mako Crystals.
          </div>
          <div className="p-3.5 bg-[#060912]/80 border border-zinc-800 rounded-lg">
            <span className="text-[#00f3ff] font-bold font-orbitron block mb-1">ROUND 2: THE DATA HUNT</span>
            Extract Professor Hojo's emergency shutdown override code within 45s. Speed matters: +100/75/50/25 ◆ crystals!
          </div>
        </div>
      </div>
    </div>
  );
};
