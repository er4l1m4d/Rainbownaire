import React from 'react';

interface ScorecardProps {
  score: number;
  totalQuestions: number;
  percentage: number;
  rank: string;
}

export const ScorecardForGeneration: React.FC<ScorecardProps> = ({
  score,
  totalQuestions,
  percentage,
  rank
}) => {
  return (
    <div className="scorecard-container">
      {/* Header */}
      <div className="scorecard-header">
        <h1 className="scorecard-title rainbow-text-scorecard">
          Congratulations!
        </h1>
        <p className="scorecard-subtitle">
          You've completed the quiz! 🎉
        </p>
      </div>

      {/* Score Display */}
      <div className="score-display">
        <div className="score-number">{score}</div>
        <div className="score-rank">{rank}</div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-label">Your Progress</div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="progress-text">{percentage}% of max score</div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-value">{totalQuestions}</div>
          <div className="stat-label">Questions</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💯</div>
          <div className="stat-value">{percentage}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
      </div>

      {/* Footer */}
      <div className="scorecard-footer">
        🌈 Powered by Rainbownaire - The Ultimate Web3 Quiz Experience
      </div>
    </div>
  );
};
