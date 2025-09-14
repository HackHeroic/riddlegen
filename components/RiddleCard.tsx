'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lightbulb, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Riddle } from '@/lib/types';

interface RiddleCardProps {
  riddle: Riddle;
}

export default function RiddleCard({ riddle }: RiddleCardProps) {
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card className="h-full bg-gradient-to-br from-white to-purple-50/30 border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between mb-3">
            <Badge className={`text-xs font-medium border ${getDifficultyColor(riddle.difficulty)}`}>
              {riddle.difficulty}
            </Badge>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Zap className="w-3 h-3 text-purple-500" />
              <span className="text-purple-600 font-medium">{riddle.generationTimeMs}ms</span>
            </div>
          </div>
          <CardTitle className="text-lg leading-tight text-gray-800 min-h-[3rem] flex items-start">
            {riddle.question}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0 space-y-4">
          {/* Hint Section */}
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <div className="flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-blue-700 mb-1">Hint:</p>
                <p className="text-sm text-blue-600">{riddle.hint}</p>
              </div>
            </div>
          </div>

          {/* Answer Section */}
          <div className="space-y-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => setIsAnswerRevealed(!isAnswerRevealed)}
                variant="outline"
                className="w-full flex items-center space-x-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-colors"
              >
                {isAnswerRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{isAnswerRevealed ? 'Hide Answer' : 'Reveal Answer'}</span>
              </Button>
            </motion.div>

            <AnimatePresence>
              {isAnswerRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200 rounded-xl">
                    <p className="text-sm font-medium text-purple-700 mb-1">Answer:</p>
                    <p className="text-lg font-bold text-purple-800">{riddle.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Generation Info */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Generated {riddle.generatedAt.toLocaleTimeString()}</span>
              </div>
              <span className="text-purple-600 font-medium">{riddle.theme}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}