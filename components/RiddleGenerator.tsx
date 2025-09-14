'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateRiddles } from '@/lib/riddle-generator';
import { GenerationState } from '@/lib/types';
import RiddleCard from './RiddleCard';

export default function RiddleGenerator() {
  const [theme, setTheme] = useState('');
  const [state, setState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    results: null
  });

  const handleGenerate = async () => {
    if (!theme.trim()) return;

    setState({ isLoading: true, error: null, results: null });

    try {
      const results = await generateRiddles(theme.trim(), 4);
      setState({ isLoading: false, error: null, results });
    } catch (error) {
      setState({ 
        isLoading: false, 
        error: 'Failed to generate riddles. Please try again.', 
        results: null 
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !state.isLoading) {
      handleGenerate();
    }
  };

  return (
    <section id="generator" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Generator Input */}
        <motion.div 
          className="bg-gray-50 rounded-3xl p-8 sm:p-12 mb-12 border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Generate Your Riddles
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Enter any theme and watch AI create mind-bending riddles instantly
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter a theme (e.g., space, animals, technology...)"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="h-14 text-lg px-6 rounded-2xl border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-200"
                  disabled={state.isLoading}
                />
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleGenerate}
                  disabled={!theme.trim() || state.isLoading}
                  className="h-14 px-8 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.isLoading ? (
                    <motion.div 
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>AI Generating...</span>
                    </motion.div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Generate with AI</span>
                    </div>
                  )}
                </Button>
              </motion.div>
            </div>

            {/* Quick Theme Suggestions */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-3">Popular themes:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['space', 'animals', 'technology', 'food', 'mystery', 'history'].map((suggestedTheme) => (
                  <motion.button
                    key={suggestedTheme}
                    onClick={() => setTheme(suggestedTheme)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-purple-300 hover:text-purple-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={state.isLoading}
                  >
                    {suggestedTheme}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
        <AnimatePresence>
          {state.error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-center"
            >
              <p className="font-medium">⚠️ {state.error}</p>
              <p className="text-sm mt-1 text-red-500">
                {state.error.includes('Failed to generate') ? 
                  'Using fallback riddles. Check if your backend server is running on port 3001.' : 
                  'Please try again with a different theme.'
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {state.results && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                    Generated Riddles for "{state.results.theme}"
                  </span>
                </h3>
                <p className="text-gray-600">
                  ⚡ Generated in {state.results.totalTime}ms • {state.results.riddles.length} riddles • Powered by Cerebras AI
                </p>
              </div>

              {/* Riddles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {state.results.riddles.map((riddle, index) => (
                  <motion.div
                    key={riddle.id}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: 'easeOut'
                    }}
                  >
                    <RiddleCard riddle={riddle} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}