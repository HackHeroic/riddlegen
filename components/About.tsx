'use client';

import { motion } from 'framer-motion';
import { Brain, Zap, Sparkles, Target } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered',
      description: 'Advanced AI algorithms create unique, challenging riddles tailored to your interests.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant results powered by Cerebras technology - riddles generated in milliseconds.'
    },
    {
      icon: Sparkles,
      title: 'Endless Variety',
      description: 'From space to animals to technology - explore riddles across unlimited themes.'
    },
    {
      icon: Target,
      title: 'Difficulty Levels',
      description: 'Riddles are automatically categorized by difficulty to match your skill level.'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              Why Choose RiddleGen?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the future of brain training with our AI-powered riddle generator. 
            Challenge your mind, expand your thinking, and have fun with personalized puzzles.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="text-center group"
            >
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 group-hover:shadow-xl group-hover:border-purple-200 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Ready to Challenge Your Mind?
              </span>
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              Join thousands of users who are already expanding their thinking with RiddleGen. 
              Start generating personalized riddles today and discover how fun learning can be.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('generator');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-purple-200 transition-all duration-200"
            >
              Start Generating Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}