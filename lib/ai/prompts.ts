/**
 * AI Prompt Templates for Quiz Question Generation
 * Optimized for Hugging Face text generation models
 */

import { QuestionDifficulty, QuestionCategory } from '@/types/game';

export interface PromptOptions {
  difficulty: QuestionDifficulty;
  category: QuestionCategory;
  count?: number;
  avoidTopics?: string[];
}

/**
 * System prompt that sets the context for the AI
 */
export const SYSTEM_PROMPT = `You are an expert quiz question generator for "Who Wants To Be A Rainbownaire", a Web3 quiz game for the Rainbow Wallet community. Your task is to generate engaging, accurate, and educational multiple-choice questions about Web3, cryptocurrency, blockchain, NFTs, DeFi, and the Rainbow Wallet ecosystem.

IMPORTANT RULES:
1. Each question must have exactly 4 answer options (A, B, C, D)
2. Only ONE answer should be correct
3. Questions should be factually accurate and up-to-date
4. Avoid outdated information or deprecated technologies
5. Make incorrect answers plausible but clearly wrong
6. Use clear, concise language
7. Include relevant context when needed
8. Make questions engaging and fun for the Rainbow community
9. Avoid overly technical jargon unless appropriate for difficulty level

OUTPUT FORMAT (JSON):
{
  "question": "What is the main purpose of Rainbow Wallet?",
  "options": [
    "To mine Bitcoin",
    "To manage Ethereum and other crypto assets",
    "To create NFTs",
    "To run blockchain nodes"
  ],
  "correct_answer": "To manage Ethereum and other crypto assets",
  "explanation": "Rainbow Wallet is a mobile-first wallet designed to easily manage Ethereum and other crypto assets with a beautiful, user-friendly interface.",
  "difficulty": "easy",
  "category": "rainbow_wallet"
}`;

/**
 * Generate prompt for creating quiz questions
 */
export function generateQuestionPrompt(options: PromptOptions): string {
  const { difficulty, category, count = 1, avoidTopics = [] } = options;

  const difficultyGuidelines = getDifficultyGuidelines(difficulty);
  const categoryContext = getCategoryContext(category);
  const avoidanceNote = avoidTopics.length > 0
    ? `\n\nAVOID these topics that have been covered recently: ${avoidTopics.join(', ')}`
    : '';

  return `${SYSTEM_PROMPT}

TASK: Generate ${count} quiz question(s) with the following specifications:

DIFFICULTY: ${difficulty}
${difficultyGuidelines}

CATEGORY: ${category}
${categoryContext}${avoidanceNote}

Generate ${count} question(s) in valid JSON format. If generating multiple questions, return a JSON array.

EXAMPLES:

Easy Question:
{
  "question": "What blockchain network does Rainbow Wallet primarily support?",
  "options": [
    "Bitcoin",
    "Ethereum",
    "Cardano",
    "Solana"
  ],
  "correct_answer": "Ethereum",
  "explanation": "Rainbow Wallet is built primarily for the Ethereum ecosystem, supporting ETH and ERC-20 tokens.",
  "difficulty": "easy",
  "category": "rainbow_wallet"
}

Medium Question:
{
  "question": "What does 'gas' refer to in the Ethereum network?",
  "options": [
    "The fuel used to power mining rigs",
    "The transaction fee paid to validators",
    "A type of cryptocurrency token",
    "The speed of the blockchain"
  ],
  "correct_answer": "The transaction fee paid to validators",
  "explanation": "Gas is the fee required to execute transactions or smart contracts on the Ethereum network, paid to validators who process the transactions.",
  "difficulty": "medium",
  "category": "web3_basics"
}

Hard Question:
{
  "question": "What is the primary purpose of EIP-1559 in Ethereum?",
  "options": [
    "To increase the total supply of ETH",
    "To make transaction fees more predictable and burn a portion of fees",
    "To enable smart contract upgrades",
    "To reduce block time"
  ],
  "correct_answer": "To make transaction fees more predictable and burn a portion of fees",
  "explanation": "EIP-1559 introduced a base fee mechanism that makes gas fees more predictable and burns a portion of each transaction fee, making ETH potentially deflationary.",
  "difficulty": "hard",
  "category": "web3_basics"
}

Now generate ${count} ${difficulty} question(s) about ${category}:`;
}

/**
 * Get difficulty-specific guidelines
 */
function getDifficultyGuidelines(difficulty: QuestionDifficulty): string {
  switch (difficulty) {
    case 'easy':
      return `- Basic concepts and terminology
- Well-known facts about Web3 and Rainbow Wallet
- Questions a beginner could answer
- Common use cases and features
- Simple "what is" or "which" questions`;

    case 'medium':
      return `- Intermediate concepts requiring some Web3 knowledge
- Understanding of how technologies work together
- Practical scenarios and use cases
- Comparison between different options
- Questions requiring analytical thinking`;

    case 'hard':
      return `- Advanced technical concepts
- Deep understanding of protocols and mechanisms
- Edge cases and nuanced details
- Questions requiring expert-level knowledge
- Complex scenarios and problem-solving`;

    default:
      return '';
  }
}

/**
 * Get category-specific context
 */
function getCategoryContext(category: QuestionCategory): string {
  switch (category) {
    case 'rainbow_wallet':
      return `Focus on Rainbow Wallet features, functionality, and the Rainbow ecosystem:
- Wallet features and capabilities
- Mobile app functionality
- Token management and swaps
- NFT display and management
- Rainbow branding and community
- Integration with DeFi protocols`;

    case 'web3_basics':
      return `Focus on fundamental Web3 concepts:
- Blockchain technology basics
- Cryptocurrency fundamentals
- Wallet types and security
- Public/private keys
- Transaction concepts
- Decentralization principles`;

    case 'defi':
      return `Focus on Decentralized Finance concepts:
- DeFi protocols and platforms
- Liquidity pools and AMMs
- Yield farming and staking
- Lending and borrowing
- DEXs vs CEXs
- DeFi risks and opportunities`;

    case 'nfts':
      return `Focus on Non-Fungible Tokens:
- NFT standards (ERC-721, ERC-1155)
- NFT marketplaces
- Digital art and collectibles
- NFT utility and use cases
- Minting and trading
- NFT communities and culture`;

    case 'security':
      return `Focus on Web3 security best practices:
- Wallet security
- Private key management
- Scam and phishing prevention
- Smart contract risks
- Safe transaction practices
- Recovery and backup methods`;

    default:
      return 'Generate questions about general Web3 topics.';
  }
}

/**
 * Prompt for validating generated questions
 */
export function generateValidationPrompt(question: any): string {
  return `Analyze this quiz question for quality and accuracy:

${JSON.stringify(question, null, 2)}

Check for:
1. Factual accuracy
2. Clear, unambiguous wording
3. Exactly one correct answer
4. Plausible but incorrect distractors
5. Appropriate difficulty level
6. Grammar and spelling

Respond with JSON:
{
  "valid": true/false,
  "issues": ["list of any issues found"],
  "suggestions": ["list of improvements"]
}`;
}

/**
 * Extract JSON from AI response (handles cases where AI adds extra text)
 */
export function extractJSON(text: string): any {
  try {
    // Try to parse directly first
    return JSON.parse(text);
  } catch {
    // Look for JSON object in the text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Look for JSON array in the text
    const arrayMatch = text.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      return JSON.parse(arrayMatch[0]);
    }

    throw new Error('No valid JSON found in response');
  }
}
