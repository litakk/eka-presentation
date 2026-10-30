import React, { useEffect, useState } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { SPEAKING_SCRIPTS } from '../data/slides';

interface RehearsalBarProps {
  isOpen: boolean;
  currentSlide: number;
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export const RehearsalBar: React.FC<RehearsalBarProps> = ({
  isOpen,
  currentSlide,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen || !running) return;
    const interval = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isOpen, running]);

  if (!isOpen) return null;

  const currentScript =
    SPEAKING_SCRIPTS[currentSlide - 1] || SPEAKING_SCRIPTS[0];
  const prevEnd =
    currentSlide > 1
      ? SPEAKING_SCRIPTS[currentSlide - 2].cumulativeEndSeconds
      : 0;
  const targetEnd = currentScript.cumulativeEndSeconds;

  // Determine pace status:
  // Green: within [prevEnd - 15, targetEnd + 15]
  // Yellow: within 15..45s off target window
  // Red: > 45s behind or ahead of target window
  let drift = 0;
  if (elapsedSeconds < prevEnd) {
    drift = elapsedSeconds - prevEnd; // negative = ahead of schedule (too fast)
  } else if (elapsedSeconds > targetEnd) {
    drift = elapsedSeconds - targetEnd; // positive = behind schedule (too slow)
  }

  const absDrift = Math.abs(drift);
  let statusBg = 'bg-olive text-paper-cream';
  let statusLabel = 'ON PACE (GREEN)';

  if (absDrift > 45) {
    statusBg = 'bg-tomato text-paper-cream';
    statusLabel =
      drift > 0
        ? `BEHIND +${absDrift}s (SPEED UP)`
        : `AHEAD -${absDrift}s (SLOW DOWN)`;
  } else if (absDrift > 15) {
    statusBg = 'bg-mustard text-ink';
    statusLabel =
      drift > 0 ? `SLIGHTLY BEHIND +${absDrift}s` : `SLIGHTLY AHEAD -${absDrift}s`;
  }

  return (
    <div
      className={`fixed left-1/2 top-11 z-50 flex -translate-x-1/2 flex-wrap items-center gap-3 border-2 border-ink px-4 py-1.5 font-mono text-xs font-extrabold shadow-ink print:hidden ${statusBg}`}
      role="status"
      aria-label="Rehearsal Timer"
    >
      <div className="flex items-center gap-1.5">
        <Timer className="h-4 w-4" />
        <span>REHEARSAL [T]: {formatTime(elapsedSeconds)} / 09:00</span>
      </div>

      <span className="opacity-60">|</span>

      <div>
        SLIDE {String(currentSlide).padStart(2, '0')} TARGET: {currentScript.timeRange} (
        {currentScript.durationSeconds}s)
      </div>

      <span className="opacity-60">|</span>

      <span className="underline decoration-2">{statusLabel}</span>

      <div className="ml-1 flex items-center gap-1">
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="border border-ink bg-paper-cream p-1 text-ink hover:bg-mustard"
          title={running ? 'Pause timer' : 'Resume timer'}
        >
          {running ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>
        <button
          type="button"
          onClick={() => {
            setElapsedSeconds(0);
            setRunning(true);
          }}
          className="border border-ink bg-paper-cream p-1 text-ink hover:bg-mustard"
          title="Reset rehearsal timer"
        >
          <RotateCcw className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
