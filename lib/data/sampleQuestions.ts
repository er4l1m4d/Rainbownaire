import { Question } from '@/types/game';

// Sample questions for testing the quiz game
// In production, these will come from Supabase (AI-generated)
export const sampleQuestions: Question[] = [
  {
    id: '1',
    question_text: 'What is Rainbow Wallet primarily known for?',
    answer_options: [
      'A) A mobile-first Ethereum wallet',
      'B) A cryptocurrency exchange',
      'C) A blockchain network',
      'D) A DeFi protocol'
    ],
    correct_answer: 'A',
    difficulty: 'easy',
    category: 'rainbow',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    question_text: 'What does NFT stand for?',
    answer_options: [
      'A) New Financial Technology',
      'B) Non-Fungible Token',
      'C) Network File Transfer',
      'D) Next-Gen Funding Tool'
    ],
    correct_answer: 'B',
    difficulty: 'easy',
    category: 'nfts',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    question_text: 'Which network does Rainbow Wallet support?',
    answer_options: [
      'A) Only Ethereum',
      'B) Only Polygon',
      'C) Multiple EVM chains',
      'D) Only Bitcoin'
    ],
    correct_answer: 'C',
    difficulty: 'medium',
    category: 'wallets',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    question_text: 'What is the primary purpose of a seed phrase?',
    answer_options: [
      'A) To create new wallets',
      'B) To recover wallet access',
      'C) To speed up transactions',
      'D) To reduce gas fees'
    ],
    correct_answer: 'B',
    difficulty: 'easy',
    category: 'security',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    question_text: 'What is gas in Ethereum?',
    answer_options: [
      'A) A type of cryptocurrency',
      'B) Transaction fee paid to miners',
      'C) A wallet feature',
      'D) A security protocol'
    ],
    correct_answer: 'B',
    difficulty: 'medium',
    category: 'web3',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    question_text: 'What does DeFi stand for?',
    answer_options: [
      'A) Digital Finance',
      'B) Decentralized Finance',
      'C) Defined Finance',
      'D) Direct Finance'
    ],
    correct_answer: 'B',
    difficulty: 'easy',
    category: 'defi',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    question_text: 'Which of these is a Layer 2 scaling solution?',
    answer_options: [
      'A) Bitcoin',
      'B) Ethereum',
      'C) Polygon',
      'D) Cardano'
    ],
    correct_answer: 'C',
    difficulty: 'medium',
    category: 'web3',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    question_text: 'What is the main benefit of using a hardware wallet?',
    answer_options: [
      'A) Faster transactions',
      'B) Lower fees',
      'C) Enhanced security',
      'D) More storage'
    ],
    correct_answer: 'C',
    difficulty: 'easy',
    category: 'security',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '9',
    question_text: 'What does ENS provide?',
    answer_options: [
      'A) Faster transaction speeds',
      'B) Human-readable Ethereum addresses',
      'C) Lower gas fees',
      'D) Wallet security'
    ],
    correct_answer: 'B',
    difficulty: 'medium',
    category: 'web3',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '10',
    question_text: 'What is a smart contract?',
    answer_options: [
      'A) A legal document',
      'B) Self-executing code on blockchain',
      'C) A type of wallet',
      'D) A trading strategy'
    ],
    correct_answer: 'B',
    difficulty: 'medium',
    category: 'web3',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '11',
    question_text: 'What makes Rainbow Wallet unique?',
    answer_options: [
      'A) Beautiful design and UX',
      'B) Cheapest fees',
      'C) Most blockchains supported',
      'D) Built-in exchange'
    ],
    correct_answer: 'A',
    difficulty: 'easy',
    category: 'rainbow',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '12',
    question_text: 'What is the purpose of slippage tolerance in trading?',
    answer_options: [
      'A) To reduce gas fees',
      'B) To protect against price changes during transaction',
      'C) To speed up trades',
      'D) To increase profits'
    ],
    correct_answer: 'B',
    difficulty: 'hard',
    category: 'defi',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '13',
    question_text: 'What does "Web3" refer to?',
    answer_options: [
      'A) The third version of the internet',
      'B) A web hosting service',
      'C) A programming language',
      'D) A blockchain network'
    ],
    correct_answer: 'A',
    difficulty: 'medium',
    category: 'web3',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '14',
    question_text: 'What is the main risk of sharing your private key?',
    answer_options: [
      'A) Slower transactions',
      'B) Higher fees',
      'C) Complete loss of funds',
      'D) Wallet malfunction'
    ],
    correct_answer: 'C',
    difficulty: 'easy',
    category: 'security',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
  {
    id: '15',
    question_text: 'What is the primary use of governance tokens?',
    answer_options: [
      'A) To pay for gas',
      'B) To vote on protocol decisions',
      'C) To stake for rewards only',
      'D) To buy NFTs'
    ],
    correct_answer: 'B',
    difficulty: 'hard',
    category: 'defi',
    source_type: 'manual',
    created_at: new Date().toISOString(),
  },
];
