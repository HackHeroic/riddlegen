import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RiddleGen - Blazing-Fast AI Riddle Generator',
  description: 'Supercharge your brain with AI-powered riddles. Enter a theme and generate instant riddles powered by blazing-fast Cerebras AI technology.',
  keywords: 'riddles, AI, brain games, puzzles, riddle generator, cerebras, artificial intelligence, brain training',
  authors: [{ name: 'RiddleGen' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#A855F7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-white relative overflow-x-hidden">
          {/* Grid Background Pattern */}
          <div 
            className="fixed inset-0 pointer-events-none z-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(168, 85, 247, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(168, 85, 247, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}