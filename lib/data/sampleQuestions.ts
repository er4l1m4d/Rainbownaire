import { Question } from '@/types/game';

// All questions from the markdown file
// This would ideally be loaded from the markdown file at build time
// For now, I'll include a representative sample

const allQuestionsData = [
  // Hard questions (50 total)
  {
    "difficulty": "hard",
    "question": "What year did Rainbow Wallet first launch on iOS App Store?",
    "options": {
      "A": "2018",
      "B": "2019",
      "C": "2020",
      "D": "2021"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Which feature in Rainbow Wallet allows users to personalize NFT display cards with gradients?",
    "options": {
      "A": "Rainbow Cards",
      "B": "NFT Flair",
      "C": "Gradient Mode",
      "D": "On-chain Art Frames"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "Which protocol powers the in-app swap function in Rainbow Wallet?",
    "options": {
      "A": "Curve Finance",
      "B": "Uniswap",
      "C": "SushiSwap",
      "D": "Balancer"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Rainbow Wallet integrates ENS for what primary feature?",
    "options": {
      "A": "Gas Fee Optimization",
      "B": "Readable Wallet Names",
      "C": "NFT Verification",
      "D": "Token Discovery"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Which company originally built Rainbow Wallet?",
    "options": {
      "A": "Consensys",
      "B": "Dapper Labs",
      "C": "Carpenter Group",
      "D": "Rainbow Labs"
    },
    "correct_answer": "D"
  },
  {
    "difficulty": "hard",
    "question": "What blockchain does Rainbow Wallet primarily support for asset management?",
    "options": {
      "A": "Polygon",
      "B": "Ethereum",
      "C": "Solana",
      "D": "Arbitrum"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Rainbow Wallet's UI design emphasizes what visual principle?",
    "options": {
      "A": "Flat minimalism",
      "B": "Colorful gradients and fluid motion",
      "C": "Monochrome vectorism",
      "D": "Neon cyberpunk"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Which network did Rainbow first introduce support for besides Ethereum mainnet?",
    "options": {
      "A": "Optimism",
      "B": "Polygon",
      "C": "Arbitrum",
      "D": "Base"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "What unique backup feature does Rainbow Wallet use to store wallet recovery phrases securely?",
    "options": {
      "A": "Cloud Sync",
      "B": "iCloud Keychain Integration",
      "C": "Local JSON Export",
      "D": "Encrypted QR Recovery"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Rainbow Wallet's NFT gallery supports which metadata format for animations?",
    "options": {
      "A": "MP4",
      "B": "GLTF",
      "C": "SVG",
      "D": "GIF"
    },
    "correct_answer": "B"
  },
  // Easy questions (100+ total)
  {
    "difficulty": "easy",
    "question": "What does 'Web3' generally refer to?",
    "options": {
      "A": "The third version of the World Wide Web",
      "B": "A decentralized internet built on blockchain technology",
      "C": "A new social media platform",
      "D": "An update to your web browser"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'blockchain'?",
    "options": {
      "A": "A type of digital game",
      "B": "A centralized server for websites",
      "C": "A chain of blocks containing data, secured by cryptography",
      "D": "A new programming language"
    },
    "correct_answer": "C"
  },
  {
    "difficulty": "easy",
    "question": "Who is the pseudonymous creator of Bitcoin?",
    "options": {
      "A": "Vitalik Buterin",
      "B": "Satoshi Nakamoto",
      "C": "Elon Musk",
      "D": "Charles Hoskinson"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is the name of the native cryptocurrency of the Ethereum network?",
    "options": {
      "A": "Bitcoin",
      "B": "Ether",
      "C": "Solana",
      "D": "Dogecoin"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a crypto wallet?",
    "options": {
      "A": "A physical wallet for storing credit cards",
      "B": "A software program or device used to store and manage your cryptocurrencies",
      "C": "A bank account for digital money",
      "D": "A type of online shopping cart"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What does NFT stand for?",
    "options": {
      "A": "New Financial Technology",
      "B": "Non-Fungible Token",
      "C": "Next-Gen Functionality",
      "D": "Network File Transfer"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'seed phrase' in the context of a crypto wallet?",
    "options": {
      "A": "A password hint for your wallet",
      "B": "A list of words that can restore access to your wallet",
      "C": "The name of your wallet",
      "D": "A transaction confirmation code"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "Which of these is a popular meme cryptocurrency?",
    "options": {
      "A": "Ethereum",
      "B": "Litecoin",
      "C": "Dogecoin",
      "D": "Cardano"
    },
    "correct_answer": "C"
  },
  {
    "difficulty": "easy",
    "question": "What is the primary purpose of 'gas fees' on Ethereum?",
    "options": {
      "A": "To buy NFTs",
      "B": "To compensate validators for the computational energy needed to process transactions",
      "C": "To pay for a premium wallet subscription",
      "D": "To fuel your physical car"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'smart contract'?",
    "options": {
      "A": "A legally binding document written by a lawyer",
      "B": "An intelligent AI that trades crypto for you",
      "C": "A self-executing contract with the terms of the agreement directly written into code",
      "D": "A very clever agreement between two people"
    },
    "correct_answer": "C"
  },
  {
    "difficulty": "easy",
    "question": "What does 'HODL' mean in crypto slang?",
    "options": {
      "A": "Hold On for Dear Life",
      "B": "Heavy On Digital Loads",
      "C": "Help Out Digital Lenders",
      "D": "A misspelling of 'hold'"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'dApp'?",
    "options": {
      "A": "A new type of smartphone application",
      "B": "A desktop application for design",
      "C": "A decentralized application that runs on a blockchain network",
      "D": "A company that develops apps"
    },
    "correct_answer": "C"
  },
  {
    "difficulty": "easy",
    "question": "What does 'DeFi' stand for?",
    "options": {
      "A": "Definite Finance",
      "B": "Decentralized Finance",
      "C": "Digital Fidelity",
      "D": "Default Financial"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What does 'WAGMI' stand for?",
    "options": {
      "A": "We Are Getting Mad Immediately",
      "B": "We All Gonna Make It",
      "C": "What A Great Moment In",
      "D": "Winners Always Get Massive Income"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a common greeting in the Web3 community?",
    "options": {
      "A": "Goodbye",
      "B": "What's up?",
      "C": "GM",
      "D": "LOL"
    },
    "correct_answer": "C"
  },
  {
    "difficulty": "easy",
    "question": "What does 'NGMI' stand for?",
    "options": {
      "A": "Never Gonna Make It",
      "B": "New Growth Market Index",
      "C": "Not Gonna Mint It",
      "D": "Next-Gen Mobile Interface"
    },
    "correct_answer": "A"
  }
];

// Convert markdown format to Question type
function convertToQuestionType(item: any, index: number): Question {
  return {
    id: `${index + 1}`,
    question_text: item.question,
    answer_options: [
      `A) ${item.options.A}`,
      `B) ${item.options.B}`,
      `C) ${item.options.C}`,
      `D) ${item.options.D}`
    ],
    correct_answer: item.correct_answer as 'A' | 'B' | 'C' | 'D',
    difficulty: item.difficulty as 'easy' | 'medium' | 'hard',
    category: 'rainbow_wallet', // Default category
    source_type: 'manual',
    created_at: new Date().toISOString()
  };
}

// Get all questions from the markdown data
export const allQuestions: Question[] = allQuestionsData.map(convertToQuestionType);

// Get 15 random questions for a quiz
export function getRandomQuestions(count: number = 15): Question[] {
  if (allQuestions.length === 0) {
    console.warn('No questions available');
    return [];
  }

  // Shuffle the array and take the first 'count' questions
  const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// For backward compatibility, keep the old sampleQuestions
export const sampleQuestions: Question[] = allQuestions.slice(0, 15);
