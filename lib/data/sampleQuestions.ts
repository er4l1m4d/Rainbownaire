import { Question } from '@/types/game';

// Import all questions from the markdown file
// This creates a large, diverse question pool for better randomization

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
  {
    "difficulty": "hard",
    "question": "Which Ethereum upgrade introduced Proof-of-Stake to replace Proof-of-Work?",
    "options": {
      "A": "London",
      "B": "The Merge",
      "C": "Shanghai",
      "D": "Berlin"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Which EIP introduced account abstraction concepts for smart contract wallets?",
    "options": {
      "A": "EIP-1559",
      "B": "EIP-4337",
      "C": "EIP-2981",
      "D": "EIP-1014"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Who proposed the concept of Decentralized Autonomous Organizations (DAOs) before Ethereum launched?",
    "options": {
      "A": "Vitalik Buterin",
      "B": "Gavin Wood",
      "C": "Dan Larimer",
      "D": "Joseph Lubin"
    },
    "correct_answer": "C"
  },
  {
    "difficulty": "hard",
    "question": "What is the pseudorandom selection method used by Ethereum validators?",
    "options": {
      "A": "VRF",
      "B": "RANDAO",
      "C": "Beacon Sync",
      "D": "Slot Shuffling"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Which opcode executes message calls to other contracts in the EVM?",
    "options": {
      "A": "CALL",
      "B": "DELEGATECALL",
      "C": "STATICCALL",
      "D": "LOG1"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "Which EIP introduced fee burning on Ethereum?",
    "options": {
      "A": "EIP-4844",
      "B": "EIP-1559",
      "C": "EIP-3074",
      "D": "EIP-2981"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "What term describes profit extracted by validators from transaction ordering?",
    "options": {
      "A": "Flashbots",
      "B": "MEV",
      "C": "Frontrunning",
      "D": "Sandwiching"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Which zero-knowledge proof type allows succinct verification of large computations?",
    "options": {
      "A": "zk-SNARK",
      "B": "zk-STARK",
      "C": "Bulletproof",
      "D": "Halo2"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "Which DeFi protocol introduced the concept of flash loans?",
    "options": {
      "A": "Aave",
      "B": "Compound",
      "C": "MakerDAO",
      "D": "Balancer"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "The ERC-4626 standard defines a tokenized interface for what DeFi primitive?",
    "options": {
      "A": "Vaults",
      "B": "AMMs",
      "C": "Bridges",
      "D": "Stablecoins"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "What consensus mechanism does Optimism use to secure transactions?",
    "options": {
      "A": "Fraud proofs",
      "B": "Validity proofs",
      "C": "Proof-of-Stake",
      "D": "ZK Aggregation"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "In the context of Ethereum, what is a 'slot' used for?",
    "options": {
      "A": "NFT minting",
      "B": "Validator assignment timing",
      "C": "Gas tracking",
      "D": "Merkle proofs"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "What technology enables privacy-preserving transactions on Tornado Cash?",
    "options": {
      "A": "zk-SNARKs",
      "B": "Ring Signatures",
      "C": "Homomorphic Encryption",
      "D": "Merkle Trees"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "What component of Ethereum is responsible for transaction ordering before block production?",
    "options": {
      "A": "Builder",
      "B": "Proposer",
      "C": "Relayer",
      "D": "Sequencer"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "Which upgrade will introduce data sharding to Ethereum?",
    "options": {
      "A": "The Surge",
      "B": "The Verge",
      "C": "The Purge",
      "D": "The Splurge"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "What year was the ERC-721 standard introduced?",
    "options": {
      "A": "2016",
      "B": "2017",
      "C": "2018",
      "D": "2019"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Which protocol pioneered automated market making (AMM)?",
    "options": {
      "A": "Balancer",
      "B": "Uniswap",
      "C": "Curve",
      "D": "Kyber"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "What does EIP-4844 introduce to improve rollup efficiency?",
    "options": {
      "A": "Blob transactions",
      "B": "Slot rotation",
      "C": "Validator caching",
      "D": "Merkle compression"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "What gas-saving opcode replaced SELFDESTRUCT in EIP-6780?",
    "options": {
      "A": "STOP",
      "B": "CLEAR",
      "C": "REVERT",
      "D": "No replacement"
    },
    "correct_answer": "D"
  },
  {
    "difficulty": "hard",
    "question": "Which term describes using smart contracts to automate yield farming?",
    "options": {
      "A": "Auto-compounding",
      "B": "DeFi looping",
      "C": "Vaulting",
      "D": "Liquidity routing"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "Who co-founded the Ethereum Foundation alongside Vitalik Buterin?",
    "options": {
      "A": "Joseph Lubin",
      "B": "Charles Hoskinson",
      "C": "Anthony Di Iorio",
      "D": "All of the above"
    },
    "correct_answer": "D"
  },
  {
    "difficulty": "hard",
    "question": "What is the native token used for paying gas fees on Arbitrum?",
    "options": {
      "A": "ARB",
      "B": "ETH",
      "C": "ARBx",
      "D": "RBT"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Which Ethereum layer 2 solution relies on zk-rollups for validation?",
    "options": {
      "A": "Optimism",
      "B": "zkSync",
      "C": "Arbitrum",
      "D": "Base"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "What algorithm does Ethereum 2.0 use for consensus finality?",
    "options": {
      "A": "Casper FFG",
      "B": "Raft",
      "C": "Snowman",
      "D": "HoneyBadger BFT"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "Which Web3 meme originated as a daily greeting among crypto communities?",
    "options": {
      "A": "WAGMI",
      "B": "GM",
      "C": "NGMI",
      "D": "LFG"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "ENS domains are stored on which Ethereum contract standard?",
    "options": {
      "A": "ERC-1155",
      "B": "ERC-20",
      "C": "ERC-721",
      "D": "ERC-777"
    },
    "correct_answer": "C"
  },
  {
    "difficulty": "hard",
    "question": "The first major DAO hack in 2016 resulted in the creation of which blockchain split?",
    "options": {
      "A": "Ethereum Classic",
      "B": "Polygon",
      "C": "Avalanche",
      "D": "Optimism"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "Rainbow Wallet's swap aggregator routes trades through which primary AMM?",
    "options": {
      "A": "Curve",
      "B": "Uniswap",
      "C": "Balancer",
      "D": "SushiSwap"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "What Ethereum improvement proposal standardized royalty info for NFTs?",
    "options": {
      "A": "EIP-2981",
      "B": "EIP-4337",
      "C": "EIP-4626",
      "D": "EIP-721"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "In Web3, what does 'signing a message' without gas fees typically do?",
    "options": {
      "A": "Broadcast a transaction",
      "B": "Authenticate an identity off-chain",
      "C": "Burn tokens",
      "D": "Mint NFTs"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "What token standard supports both fungible and non-fungible tokens?",
    "options": {
      "A": "ERC-721",
      "B": "ERC-1155",
      "C": "ERC-20",
      "D": "ERC-4626"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Which component ensures Rainbow Wallet can decode on-chain transaction metadata?",
    "options": {
      "A": "The Graph",
      "B": "Ethers.js",
      "C": "ABI Parser",
      "D": "Solidity Compiler"
    },
    "correct_answer": "C"
  },
  {
    "difficulty": "hard",
    "question": "What on-chain data structure guarantees data integrity for Ethereum blocks?",
    "options": {
      "A": "Merkle Tree",
      "B": "B-Tree",
      "C": "Patricia Trie",
      "D": "AVL Tree"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "What does 'Rainbow.me' primarily serve as?",
    "options": {
      "A": "Social Feed",
      "B": "Portfolio Viewer",
      "C": "Community Gateway",
      "D": "DeFi Dashboard"
    },
    "correct_answer": "C"
  },
  {
    "difficulty": "hard",
    "question": "Which Ethereum network upgrade was designed to reduce calldata costs for rollups?",
    "options": {
      "A": "EIP-4844",
      "B": "EIP-1559",
      "C": "EIP-3074",
      "D": "EIP-6780"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "What core Rainbow Wallet feature helps visualize DeFi token balances in-app?",
    "options": {
      "A": "Portfolio Tracker",
      "B": "Token Gradient Charts",
      "C": "Smart Token View",
      "D": "DeFi Insight Engine"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "Which type of rollup uses cryptographic proofs instead of fraud proofs?",
    "options": {
      "A": "Optimistic Rollups",
      "B": "ZK-Rollups",
      "C": "Hybrid Rollups",
      "D": "Modular Chains"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "hard",
    "question": "Which gas metric measures execution cost of an Ethereum operation?",
    "options": {
      "A": "Basefee",
      "B": "Gwei",
      "C": "Opcode Weight",
      "D": "Gas Units"
    },
    "correct_answer": "D"
  },
  {
    "difficulty": "hard",
    "question": "What does 'RainbowKit' provide for developers?",
    "options": {
      "A": "SDK for Rainbow Wallet integration",
      "B": "NFT minting tool",
      "C": "ENS resolver",
      "D": "Bridge API"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "hard",
    "question": "What happens if a validator fails to propose a block during its slot in Ethereum PoS?",
    "options": {
      "A": "It's slashed",
      "B": "It misses rewards",
      "C": "It loses ETH balance",
      "D": "It triggers reorg"
    },
    "correct_answer": "B"
  },

  // Easy questions (50+ total)
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
  },
  {
    "difficulty": "easy",
    "question": "Which of these is a major NFT marketplace?",
    "options": {
      "A": "Amazon",
      "B": "OpenSea",
      "C": "eBay",
      "D": "Etsy"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is an 'airdrop' in crypto?",
    "options": {
      "A": "When a crypto project sends free tokens to wallet addresses",
      "B": "A sudden crash in a token's price",
      "C": "A type of malware",
      "D": "A way to send crypto to a friend"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'public key'?",
    "options": {
      "A": "A secret password for your wallet",
      "B": "An address you can safely share with others to receive funds",
      "C": "A key that unlocks a physical vault",
      "D": "The username for your exchange account"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'private key'?",
    "options": {
      "A": "Your public wallet address",
      "B": "A secret key that gives you access to your crypto, which you should never share",
      "C": "A key to a public bathroom",
      "D": "The password to your email"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'cold wallet'?",
    "options": {
      "A": "A wallet that is connected to the internet",
      "B": "A hardware device for storing crypto offline",
      "C": "A wallet that only holds 'cold' coins",
      "D": "A software wallet on your phone"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'hot wallet'?",
    "options": {
      "A": "A wallet stored on a physical device offline",
      "B": "A software wallet connected to the internet",
      "C": "A wallet that is very popular",
      "D": "A wallet that only holds Bitcoin"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'DAO'?",
    "options": {
      "A": "Decentralized Autonomous Organization",
      "B": "Digital Asset Oracle",
      "C": "Direct Action Order",
      "D": "Dynamic Algorithmic Output"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "Which of these is a type of consensus mechanism?",
    "options": {
      "A": "Proof-of-Stake",
      "B": "Proof-of-Purchase",
      "C": "Proof-of-Identity",
      "D": "Proof-of-Workshop"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'stablecoin'?",
    "options": {
      "A": "A cryptocurrency designed to have a stable value, usually pegged to a fiat currency",
      "B": "A coin that never changes in price",
      "C": "A very old and established cryptocurrency",
      "D": "A coin used only for staking"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'token' in the context of blockchain?",
    "options": {
      "A": "A physical coin used in arcades",
      "B": "A digital asset built on an existing blockchain",
      "C": "A secret code",
      "D": "A piece of paper money"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'Layer 1' blockchain?",
    "options": {
      "A": "A secondary blockchain built on top of another",
      "B": "A base blockchain, like Bitcoin or Ethereum",
      "C": "A private company's internal network",
      "D": "A type of security protocol"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "Who created Ethereum?",
    "options": {
      "A": "Satoshi Nakamoto",
      "B": "Vitalik Buterin",
      "C": "Brian Armstrong",
      "D": "Jed McCaleb"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is 'minting' an NFT?",
    "options": {
      "A": "Destroying an NFT",
      "B": "The process of publishing a digital item on the blockchain for the first time",
      "C": "Trading an NFT on a marketplace",
      "D": "Buying an NFT"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is the 'metaverse'?",
    "options": {
      "A": "A single video game",
      "B": "A network of 3D virtual worlds focused on social connection",
      "C": "A new type of internet search engine",
      "D": "A documentary about the internet"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is 'FUD'?",
    "options": {
      "A": "Fear, Uncertainty, and Doubt",
      "B": "Functional Universal Design",
      "C": "Future User Development",
      "D": "Fundamental Unit of Data"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "Which wallet is known for its colorful and user-friendly interface on mobile?",
    "options": {
      "A": "Ledger",
      "B": "Rainbow Wallet",
      "C": "MetaMask",
      "D": "Coinbase Wallet"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is an 'exchange' in crypto?",
    "options": {
      "A": "A place to swap one cryptocurrency for another",
      "B": "A type of wallet",
      "C": "A blockchain network",
      "D": "A smart contract"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What does 'DYOR' stand for?",
    "options": {
      "A": "Do Your Own Research",
      "B": "Don't Yield On Returns",
      "C": "Digital Yield Offering Ratio",
      "D": "Deposit Your Ordinary Rubles"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'whitepaper' in crypto?",
    "options": {
      "A": "A document with a white background",
      "B": "An authoritative report or guide that informs readers concisely about a complex issue",
      "C": "A legal contract for an ICO",
      "D": "A blog post about a project"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'hard fork'?",
    "options": {
      "A": "A software update that is not backward compatible",
      "B": "A type of utensil",
      "C": "A temporary split in the network",
      "D": "A security breach"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'soft fork'?",
    "options": {
      "A": "A software update that is backward compatible",
      "B": "A major split creating a new coin",
      "C": "A hack of the network",
      "D": "A new type of wallet"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What does 'P2P' stand for?",
    "options": {
      "A": "Pay-to-Play",
      "B": "Peer-to-Peer",
      "C": "Path-to-Profit",
      "D": "Product-to-Person"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is the name of the token that governs the Aave protocol?",
    "options": {
      "A": "AAVE",
      "B": "LEND",
      "C": "MKR",
      "D": "COMP"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'yield farm'?",
    "options": {
      "A": "A place where digital crops are grown",
      "B": "A strategy of lending crypto to earn rewards",
      "C": "A hardware wallet manufacturer",
      "D": "A type of airdrop"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'liquidity pool'?",
    "options": {
      "A": "A swimming pool for crypto whales",
      "B": "A collection of funds locked in a smart contract to facilitate trading",
      "C": "A bank's reserve of cash",
      "D": "A group of investors in a startup"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is 'sharding' in blockchain?",
    "options": {
      "A": "Breaking a database into smaller, faster, more manageable parts",
      "B": "A type of security attack",
      "C": "A way to create NFTs",
      "D": "A consensus mechanism"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is the 'Ethereum Name Service' (ENS)?",
    "options": {
      "A": "A service that provides .eth domain names",
      "B": "A company that names new Ethereum projects",
      "C": "The official naming service for Vitalik Buterin",
      "D": "A list of all Ethereum wallets"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'bear market'?",
    "options": {
      "A": "A market where prices are falling",
      "B": "A market where prices are rising",
      "C": "A market that is stable",
      "D": "A market only for animal-themed NFTs"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'bull market'?",
    "options": {
      "A": "A market where prices are rising",
      "B": "A market where prices are falling",
      "C": "A market that is not moving",
      "D": "A market for livestock"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is 'cryptography'?",
    "options": {
      "A": "The study of ancient writing",
      "B": "The practice and study of techniques for secure communication",
      "C": "A type of computer hardware",
      "D": "The art of drawing graphs"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "Which of these is a popular hardware wallet?",
    "options": {
      "A": "Rainbow",
      "B": "MetaMask",
      "C": "Ledger",
      "D": "Trust Wallet"
    },
    "correct_answer": "C"
  },
  {
    "difficulty": "easy",
    "question": "What is 'staking'?",
    "options": {
      "A": "Locking up crypto to support the network and earn rewards",
      "B": "Betting on the price of a cryptocurrency",
      "C": "Creating a new cryptocurrency",
      "D": "Sending crypto to a scam address"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'node' on a blockchain network?",
    "options": {
      "A": "A computer that participates in the network",
      "B": "A type of cryptocurrency",
      "C": "A smart contract",
      "D": "A user's wallet"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is a 'genesis block'?",
    "options": {
      "A": "The very first block in a blockchain",
      "B": "The most recent block",
      "C": "A block with an error in it",
      "D": "A block that is very large"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What does 'altcoin' mean?",
    "options": {
      "A": "A coin that is an alternative to Bitcoin",
      "B": "A coin from an alternate universe",
      "C": "A very old coin",
      "D": "A coin that is no longer active"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What is the main function of Rainbow Wallet?",
    "options": {
      "A": "To store, send, and receive Ethereum and ERC-20 tokens",
      "B": "To mine Bitcoin",
      "C": "To trade stocks",
      "D": "To be a social media app"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "What kind of wallet is Rainbow?",
    "options": {
      "A": "A custodial wallet where a company holds your keys",
      "B": "A non-custodial wallet where you control your keys",
      "C": "A bank account",
      "D": "An exchange wallet"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "Rainbow Wallet is particularly known for its focus on what?",
    "options": {
      "A": "Advanced trading charts",
      "B": "User experience (UX) and design",
      "C": "Mining operations",
      "D": "Corporate banking"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "easy",
    "question": "What is a common feature that makes Rainbow Wallet popular for NFT collectors?",
    "options": {
      "A": "Its built-in NFT gallery",
      "B": "Its ability to create NFTs for free",
      "C": "Its NFT price prediction tool",
      "D": "Its integration with OpenSea pro"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "easy",
    "question": "On which platform did Rainbow Wallet first gain major popularity?",
    "options": {
      "A": "Android",
      "B": "Web browser extension",
      "C": "iOS",
      "D": "Windows desktop"
    },
    "correct_answer": "C"
  },

  // Medium questions (30+ total)
  {
    "difficulty": "medium",
    "question": "Which of these KOLs lack the 'bald' trait?",
    "options": {
      "A": "LoshmiOnChain",
      "B": "Walewoosh",
      "C": "Banditxbt",
      "D": "Ripchillpill"
    },
    "correct_answer": "B"
  },
  {
    "difficulty": "medium",
    "question": "What does 'ser' mean in crypto Twitter?",
    "options": {
      "A": "A respectful way to address someone",
      "B": "An abbreviation for 'Serial'",
      "C": "A type of token",
      "D": "The name of a blockchain"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is a 'Degen' in Web3 culture?",
    "options": {
      "A": "A person who takes high-risk, speculative trades in DeFi/NFTs",
      "B": "A developer for a blockchain project",
      "C": "A person who is new to crypto",
      "D": "A security expert"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What does 'probably nothing' often imply on crypto Twitter?",
    "options": {
      "A": "It's probably something significant or a hint",
      "B": "The information is definitely false",
      "C": "The post is a mistake",
      "D": "It's a joke with no meaning"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is 'Lambo' short for in the crypto community?",
    "options": {
      "A": "Lamborghini, a symbol of extreme wealth",
      "B": "Laminate flooring",
      "C": "Lamb, a type of animal",
      "D": "Lambolet, a type of car"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is 'shill'?",
    "options": {
      "A": "To enthusiastically and excessively promote a cryptocurrency or NFT project",
      "B": "To secretly sell a token",
      "C": "To criticize a project",
      "D": "To create a new project"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is the 'floor price' of an NFT collection?",
    "options": {
      "A": "The lowest price for any NFT currently available for sale in that collection",
      "B": "The average price of all NFTs in the collection",
      "C": "The highest price ever paid for an NFT in the collection",
      "D": "The price to mint a new NFT"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is the 'block time'?",
    "options": {
      "A": "The time it takes to create a new block in a blockchain",
      "B": "The time you have to cancel a transaction",
      "C": "The time a block remains active",
      "D": "The time of day when most transactions occur"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is a 'multi-sig' wallet?",
    "options": {
      "A": "A wallet that requires multiple signatures (approvals) to execute a transaction",
      "B": "A wallet that holds multiple types of cryptocurrencies",
      "C": "A wallet that is owned by multiple people",
      "D": "A wallet with a very long password"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is a 'testnet'?",
    "options": {
      "A": "A separate blockchain network used for testing and development",
      "B": "The main public blockchain",
      "C": "A competition between blockchains",
      "D": "A network for testing internet speed"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is the 'mainnet'?",
    "options": {
      "A": "The main public blockchain where real transactions occur",
      "B": "A private network for developers",
      "C": "A secondary blockchain",
      "D": "A test network"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is 'phishing' in the context of crypto?",
    "options": {
      "A": "Attempting to trick users into revealing their private keys or seed phrases",
      "B": "A type of DeFi strategy",
      "C": "A legitimate way to receive free tokens",
      "D": "A way to earn rewards"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is a 'rug pull'?",
    "options": {
      "A": "A type of scam where developers abandon a project and run away with investors' funds",
      "B": "A technical term for a network upgrade",
      "C": "A sudden drop in gas fees",
      "D": "A feature of some DeFi protocols"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What does 'IRL' stand for?",
    "options": {
      "A": "In Real Life",
      "B": "Initial Roadmap Launch",
      "C": "Interactive Reality Layer",
      "D": "Internal Revenue Ledger"
    },
    "correct_answer": "A"
  },
  {
    "difficulty": "medium",
    "question": "What is a '51% attack'?",
    "options": {
      "A": "When a group of miners controls over 50% of a network's mining/hash rate",
      "B": "A hack that steals 51% of the tokens",
      "C": "A 51% discount on a token sale",
      "D": "A proposal that gets 51% of the votes in a DAO"
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

// Get all questions from the comprehensive database
export const allQuestions: Question[] = allQuestionsData.map(convertToQuestionType);

// Improved randomization with proper seeding and difficulty distribution
export function getRandomQuestions(count: number = 15, seed?: string): Question[] {
  if (allQuestions.length === 0) {
    console.warn('No questions available');
    return [];
  }

  // Create a seeded random number generator for more predictable but varied results
  const seededRandom = seed ? createSeededRandom(seed) : Math.random;

  // Separate questions by difficulty for balanced distribution
  const easyQuestions = allQuestions.filter(q => q.difficulty === 'easy');
  const mediumQuestions = allQuestions.filter(q => q.difficulty === 'medium');
  const hardQuestions = allQuestions.filter(q => q.difficulty === 'hard');

  // Calculate distribution (aim for balanced mix)
  const easyCount = Math.floor(count * 0.4); // 40% easy
  const mediumCount = Math.floor(count * 0.3); // 30% medium
  const hardCount = count - easyCount - mediumCount; // Remaining for hard

  const selectedQuestions: Question[] = [];

  // Select from each difficulty level
  if (easyQuestions.length > 0) {
    const shuffledEasy = [...easyQuestions].sort(() => seededRandom() - 0.5);
    selectedQuestions.push(...shuffledEasy.slice(0, Math.min(easyCount, easyQuestions.length)));
  }

  if (mediumQuestions.length > 0) {
    const shuffledMedium = [...mediumQuestions].sort(() => seededRandom() - 0.5);
    selectedQuestions.push(...shuffledMedium.slice(0, Math.min(mediumCount, mediumQuestions.length)));
  }

  if (hardQuestions.length > 0) {
    const shuffledHard = [...hardQuestions].sort(() => seededRandom() - 0.5);
    selectedQuestions.push(...shuffledHard.slice(0, Math.min(hardCount, hardQuestions.length)));
  }

  // If we don't have enough questions from distribution, fill with random from remaining pool
  const remainingNeeded = count - selectedQuestions.length;
  if (remainingNeeded > 0) {
    const remainingQuestions = allQuestions.filter(q => !selectedQuestions.includes(q));
    if (remainingQuestions.length > 0) {
      const shuffledRemaining = [...remainingQuestions].sort(() => seededRandom() - 0.5);
      selectedQuestions.push(...shuffledRemaining.slice(0, remainingNeeded));
    }
  }

  // Final shuffle of all selected questions
  return selectedQuestions.sort(() => seededRandom() - 0.5);
}

// Create a seeded random number generator
function createSeededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return function() {
    hash = Math.sin(hash) * 10000;
    return hash - Math.floor(hash);
  };
}

// For backward compatibility, keep the old sampleQuestions (now uses the full database)
export const sampleQuestions: Question[] = getRandomQuestions(15);
