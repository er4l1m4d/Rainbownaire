'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuestionDifficulty, QuestionCategory } from '@/types/game';

interface GeneratedQuestion {
  question: string;
  options: string[];
  correct_answer: string;
  explanation: string;
  difficulty: QuestionDifficulty;
  category: QuestionCategory;
}

export default function AdminPage() {
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>('easy');
  const [category, setCategory] = useState<QuestionCategory>('rainbow_wallet');
  const [count, setCount] = useState(3);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const capitalizeFirst = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formatCategory = (category: string): string => {
    // Convert snake_case to title case and handle special cases
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setSuccessMessage(null);
    setGeneratedQuestions([]);

    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          difficulty,
          category,
          count,
          saveToDb: false, // Preview first
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      setGeneratedQuestions(data.questions || []);
      setSuccessMessage(`✅ Successfully generated ${data.generated} questions!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveToDatabase = async () => {
    if (generatedQuestions.length === 0) return;

    setIsGenerating(true);
    setError(null);

    try {
      // Re-generate with saveToDb flag
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          difficulty,
          category,
          count,
          saveToDb: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save questions');
      }

      setSuccessMessage(`💾 Saved ${data.saved?.saved || 0} questions to database!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Rainbownaire
            </span>
            {' '}Admin Panel
          </h1>
          <p className="text-black text-lg">🤖 AI Question Generation Dashboard (Powered by Google Gemini)</p>
        </motion.div>

        {/* Generation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-gray-200 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-black mb-6">Generate Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Difficulty Selector */}
            <div>
              <label className="block text-black font-bold mb-2">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as QuestionDifficulty)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-black font-bold focus:border-purple-500 focus:outline-none"
                disabled={isGenerating}
              >
                <option value="easy">🟢 Easy</option>
                <option value="medium">🟡 Medium</option>
                <option value="hard">🔴 Hard</option>
              </select>
            </div>

            {/* Category Selector */}
            <div>
              <label className="block text-black font-bold mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as QuestionCategory)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-black font-bold focus:border-purple-500 focus:outline-none"
                disabled={isGenerating}
              >
                <option value="rainbow_wallet">🌈 Rainbow Wallet</option>
                <option value="web3_basics">🌐 Web3 Basics</option>
                <option value="defi">💰 DeFi</option>
                <option value="nfts">🖼️ NFTs</option>
                <option value="security">🔒 Security</option>
              </select>
            </div>

            {/* Count Selector */}
            <div>
              <label className="block text-black font-bold mb-2">
                Count ({count})
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                disabled={isGenerating}
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isGenerating ? '⏳ Generating...' : '🤖 Generate Questions'}
          </button>

          {/* Status Messages */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-xl text-red-700 font-bold">
              ❌ {error}
            </div>
          )}
          {successMessage && (
            <div className="mt-4 p-4 bg-green-100 border-2 border-green-300 rounded-xl text-green-700 font-bold">
              {successMessage}
            </div>
          )}
        </motion.div>

        {/* Generated Questions Display */}
        {generatedQuestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">
                Generated Questions ({generatedQuestions.length})
              </h2>
              <button
                onClick={handleSaveToDatabase}
                disabled={isGenerating}
                className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-bold hover:bg-yellow-500 transition-colors disabled:opacity-50"
              >
                💾 Save All to Database
              </button>
            </div>

            {generatedQuestions.map((q, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-black flex-1">
                    {index + 1}. {q.question}
                  </h3>
                  <span className={`ml-4 px-3 py-1 rounded-full text-sm font-bold ${
                    q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                    q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {capitalizeFirst(q.difficulty)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {q.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-3 rounded-xl border-2 ${
                        option === q.correct_answer
                          ? 'bg-green-100 border-green-400 font-bold'
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <span className="text-black">
                        {String.fromCharCode(65 + optIndex)}. {option}
                        {option === q.correct_answer && ' ✓'}
                      </span>
                    </div>
                  ))}
                </div>

                {q.explanation && (
                  <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                    <p className="text-sm font-bold text-blue-900 mb-1">📖 Explanation:</p>
                    <p className="text-sm text-blue-800">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        )}

        {/* Instructions */}
        {generatedQuestions.length === 0 && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-600 mt-12"
          >
            <p className="text-lg mb-2">👆 Select parameters above and click Generate</p>
            <p className="text-sm">Questions will be powered by Google Gemini AI ⚡</p>
            <p className="text-sm mt-4 text-gray-500">
              ⚠️ Note: Get your free API key at{' '}
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline font-bold"
              >
                aistudio.google.com/app/apikey
              </a>
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
