import { Riddle, GenerationResult } from './types';

// API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com' // Replace with your production backend URL
  : 'http://localhost:3001';

interface BackendRiddle {
  riddle: string;
  hint: string;
  answer: string;
}

interface BackendResponse {
  riddles: BackendRiddle[];
  generatedIn: string;
}

const difficulties: ('easy' | 'medium' | 'hard')[] = ['easy', 'medium', 'hard'];

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function mapBackendRiddleToRiddle(backendRiddle: BackendRiddle, theme: string, generationTimeMs: number): Riddle {
  return {
    id: generateId(),
    question: backendRiddle.riddle,
    hint: backendRiddle.hint,
    answer: backendRiddle.answer,
    difficulty: getRandomElement(difficulties), // Random difficulty since backend doesn't provide it
    theme,
    generatedAt: new Date(),
    generationTimeMs
  };
}

export async function generateRiddles(theme: string, count: number = 4): Promise<GenerationResult> {
  const startTime = Date.now();
  
  try {
    const response = await fetch(`${API_BASE_URL}/generate_riddle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ theme }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BackendResponse = await response.json();
    const totalTime = Date.now() - startTime;
    const averageTimePerRiddle = Math.round(totalTime / data.riddles.length);

    const riddles: Riddle[] = data.riddles.map(backendRiddle => 
      mapBackendRiddleToRiddle(backendRiddle, theme, averageTimePerRiddle)
    );

    return {
      riddles,
      totalTime,
      theme
    };
  } catch (error) {
    console.error('Error generating riddles:', error);
    
    // Fallback to mock data if backend is unavailable
    console.warn('Falling back to mock riddle generation');
    return generateMockRiddles(theme, count);
  }
}

// Fallback mock generation for development/offline use
async function generateMockRiddles(theme: string, count: number = 4): Promise<GenerationResult> {
  const startTime = Date.now();
  
  // Mock riddle templates for different themes
  const riddleTemplates = {
    space: [
      {
        riddle: "I have no atmosphere, yet I pull you down. What am I?",
        hint: "Think about what keeps your feet on the ground",
        answer: "Gravity"
      },
      {
        riddle: "I'm made of ice and rock, with a tail of light. I visit rarely, what a sight!",
        hint: "I come from the outer solar system",
        answer: "Comet"
      },
      {
        riddle: "I'm the closest star, yet I'm so far. Without me, Earth would be bizarre.",
        hint: "You see me every day (weather permitting)",
        answer: "The Sun"
      },
      {
        riddle: "I'm a red planet, fourth from the sun. Humans dream of visiting me one day, won't that be fun?",
        hint: "Named after the Roman god of war",
        answer: "Mars"
      }
    ],
    animals: [
      {
        riddle: "I change my colors but I'm not a mood ring. I catch flies with my tongue's swing.",
        hint: "I'm a small reptile that can climb walls",
        answer: "Chameleon"
      },
      {
        riddle: "I build dams but I'm not an engineer. My teeth are sharp and my tail is clear.",
        hint: "I'm known for my flat, paddle-like tail",
        answer: "Beaver"
      },
      {
        riddle: "I'm black and white but not a movie. I waddle around looking quite groovy.",
        hint: "I live in cold places and can't fly despite having wings",
        answer: "Penguin"
      },
      {
        riddle: "I'm the king of the jungle, but I don't live there. My mane is my crown, magnificent and fair.",
        hint: "I'm actually found in savannas, not jungles",
        answer: "Lion"
      }
    ],
    technology: [
      {
        riddle: "I connect the world but I'm not a bridge. I store all knowledge on every ridge.",
        hint: "You're probably using me right now",
        answer: "The Internet"
      },
      {
        riddle: "I think without a brain, I process without pain. In silicon I reign.",
        hint: "I'm the brain of every computer",
        answer: "CPU/Processor"
      },
      {
        riddle: "I remember everything but I can forget in an instant. What am I, assistant?",
        hint: "I temporarily hold information for quick access",
        answer: "RAM/Memory"
      },
      {
        riddle: "I'm artificial but I try to be smart. I learn from data, that's my art.",
        hint: "I can chat with you and generate text",
        answer: "AI/Artificial Intelligence"
      }
    ],
    food: [
      {
        riddle: "I'm yellow when I'm ready, green when I'm not. In smoothies I'm steady, in splits I'm hot.",
        hint: "Monkeys love me and I grow in bunches",
        answer: "Banana"
      },
      {
        riddle: "I'm round and flat, with sauce and cheese. Add toppings to me, if you please.",
        hint: "I'm often delivered in a box",
        answer: "Pizza"
      },
      {
        riddle: "I'm white inside and brown outside. Crack me open, don't let me hide.",
        hint: "I grow on palm trees and contain milk",
        answer: "Coconut"
      },
      {
        riddle: "I'm sweet and cold, a summer treat. In cones or cups, I can't be beat.",
        hint: "I come in many flavors and melt in heat",
        answer: "Ice Cream"
      }
    ],
    mystery: [
      {
        riddle: "The more you take away from me, the bigger I become. What am I?",
        hint: "Think about excavation or digging",
        answer: "A hole"
      },
      {
        riddle: "I have keys but no locks. I have space but no room. You can enter but not go inside.",
        hint: "You use me to type and communicate",
        answer: "A keyboard"
      },
      {
        riddle: "I'm tall when I'm young, short when I'm old. What am I?",
        hint: "I provide light and melt as I work",
        answer: "A candle"
      },
      {
        riddle: "I speak without a mouth and hear without ears. I have no body, but come alive with fears.",
        hint: "You might hear me in mountains or empty rooms",
        answer: "An echo"
      }
    ]
  };

  // Simulate realistic API delay
  const delay = Math.random() * 800 + 400; // 400-1200ms
  await new Promise(resolve => setTimeout(resolve, delay));
  
  // Normalize theme for template matching
  const normalizedTheme = theme.toLowerCase();
  let availableTemplates = riddleTemplates.mystery; // Default fallback
  
  // Find best matching template
  Object.entries(riddleTemplates).forEach(([key, templates]) => {
    if (normalizedTheme.includes(key)) {
      availableTemplates = templates;
    }
  });
  
  const riddles: Riddle[] = [];
  const totalTime = Date.now() - startTime;
  const averageTimePerRiddle = Math.round(totalTime / count);
  
  for (let i = 0; i < count; i++) {
    const template = getRandomElement(availableTemplates);
    const difficulty = getRandomElement(difficulties);
    
    riddles.push({
      id: generateId(),
      question: template.riddle,
      hint: template.hint,
      answer: template.answer,
      difficulty,
      theme,
      generatedAt: new Date(),
      generationTimeMs: averageTimePerRiddle
    });
  }
  
  return {
    riddles,
    totalTime,
    theme
  };
}