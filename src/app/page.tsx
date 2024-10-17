'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, progress } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Wrench, Book, Github, Code, Terminal, Database, Cloud, RefreshCw, Zap, Coins, Moon, Sun, Copy, Search, MessageSquare, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function AppPage() {
  const [activeKit, setActiveKit] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [onboardingProgress, setOnboardingProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const starterKits = [
    { 
      id: 'fevm-hardhat', 
      name: 'FEVM Hardhat Kit', 
      repo: 'https://github.com/filecoin-project/fevm-hardhat-kit',
      icon: <Code className="h-6 w-6" />,
      description: 'Develop and deploy smart contracts on Filecoin using Hardhat, a popular Ethereum development environment.',
      difficulty: 'Beginner',
      setupTime: '~10 minutes',
      path: 'src/fevm-hardhat-kit',
    },
    { 
      id: 'fevm-foundry', 
      name: 'FEVM Foundry Kit', 
      repo: 'https://github.com/filecoin-project/fevm-foundry-kit',
      icon: <Terminal className="h-6 w-4" />,
      description: 'Build and test smart contracts on Filecoin using Foundry, a blazing fast, portable and modular toolkit.',
      difficulty: 'Intermediate',
      setupTime: '~15 minutes',
      path: 'src/fevm-foundry-kit',
    },
    { 
      id: 'fvm-deal-making', 
      name: 'FVM Deal Making Kit', 
      repo: 'https://github.com/filecoin-project/fvm-starter-kit-deal-making',
      icon: <Database className="h-6 w-6" />,
      description: 'Learn to create and manage storage deals on Filecoin, interacting directly with storage providers.',
      difficulty: 'Advanced',
      setupTime: '~20 minutes',
      path: 'src/fvm-starter-kit-deal-making',
    },
    { 
      id: 'raas', 
      name: 'RaaS Starter Kit', 
      repo: 'https://github.com/filecoin-project/raas-starter-kit',
      icon: <Cloud className="h-6 w-6" />,
      description: 'Explore Filecoin\'s Retrieval as a Service (RaaS) for efficient data retrieval and distribution.',
      difficulty: 'Intermediate',
      setupTime: '~15 minutes',
      path: 'src/raas-starter-kit',
    },
    { 
      id: 'state-storage', 
      name: 'State Storage Starter Kit', 
      repo: 'https://github.com/filecoin-project/state-storage-starter-kit',
      icon: <RefreshCw className="h-6 w-6" />,
      description: 'Dive deep into Filecoin\'s state storage mechanisms and learn to interact with the network\'s state.',
      difficulty: 'Advanced',
      setupTime: '~25 minutes',
      path: 'src/state-storage-starter-kit',
    },
  ];
  
  useEffect(() => {
    if (activeKit) {
      const timer = setInterval(() => {
        setOnboardingProgress((oldProgress) => {
          const newProgress = Math.min(oldProgress + 10, 100);
          if (newProgress === 100) {
            clearInterval(timer);
            toast({
              title: "Onboarding Complete!",
              description: "You're now ready to start building with Filecoin.",
            });
          }
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [activeKit, toast]);

  const handleKitChange = (kitId: string) => {
    setActiveKit(kitId);
    setOnboardingProgress(0);
    const selectedKit = starterKits.find(kit => kit.id === kitId);
    if (selectedKit) {
      toast({
        title: "Starter Kit Selected",
        description: `You've selected the ${selectedKit.name}. Let's get started!`,
      });
    }
  };

  const filteredKits = starterKits.filter(kit => 
    kit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kit.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderKitInterface = (kitId: string) => {
    const kit = starterKits.find(k => k.id === kitId);
    if (!kit) return null;

    return (
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mt-8">
        <CardHeader>
          <CardTitle className="text-[#0090FF] flex items-center">
            {kit.icon}
            <span className="ml-2">{kit.name}</span>
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">{kit.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label className="text-gray-600 dark:text-gray-400">Difficulty</Label>
              <p className="text-gray-900 dark:text-white font-semibold">{kit.difficulty}</p>
            </div>
            <div>
              <Label className="text-gray-600 dark:text-gray-400">Setup Time</Label>
              <p className="text-gray-900 dark:text-white font-semibold">{kit.setupTime}</p>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="features">
              <AccordionTrigger className="text-[#0090FF]">Key Features</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  {renderKitFeatures(kitId)}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="quickstart">
              <AccordionTrigger className="text-[#0090FF]">Quick Start Guide</AccordionTrigger>
              <AccordionContent>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  <li>Clone the repository: <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">git clone https://github.com/filecoin-project/filecoin-starter-kits.git</code></li>
                  <li>Navigate to the kit directory: <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">cd {kit.path}</code></li>
                  <li>Install dependencies: <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">npm install</code> or <code className="bg-gray-100 dark:bg-gray-700 p-1 rounded">yarn</code></li>
                  <li>Follow the specific setup instructions in the kit&apos;s README.md file for further configuration and usage details.</li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white">
            <Link href={kit.repo} target="_blank" rel="noopener noreferrer">
              Explore Kit Repository
            </Link>
          </Button>
          <Button onClick={() => handleStartKit(kitId)} className="bg-green-600 hover:bg-green-700 text-white">
            Start Development
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const renderKitFeatures = (kitId: string) => {
    switch (kitId) {
      case 'fevm-hardhat':
        return (
          <>
            <li>Preconfigured Hardhat development environment for Filecoin</li>
            <li>Sample Solidity smart contracts optimized for Filecoin</li>
            <li>Integration with Filecoin&apos;s EVM-compatible APIs</li>
            <li>Automated testing suite with examples</li>
            <li>Deployment scripts for Filecoin mainnet and testnets</li>
          </>
        );
      case 'fevm-foundry':
        return (
          <>
            <li>Foundry development framework setup for Filecoin</li>
            <li>High-performance contract compilation and testing</li>
            <li>Filecoin-specific Solidity contract examples and patterns</li>
            <li>Custom Filecoin utilities and testing helpers</li>
            <li>Seamless integration with Filecoin testnets</li>
          </>
        );
      case 'fvm-deal-making':
        return (
          <>
            <li>End-to-end storage deal creation workflow</li>
            <li>Examples of interacting with Filecoin storage providers</li>
            <li>Deal status monitoring and management utilities</li>
            <li>Data retrieval examples and best practices</li>
            <li>Integration with Filecoin&apos;s deal-making APIs and actor calls</li>
          </>
        );
      case 'raas':
        return (
          <>
            <li>RaaS integration examples and implementation patterns</li>
            <li>Optimized data retrieval techniques for Filecoin</li>
            <li>Caching strategies to enhance retrieval performance</li>
            <li>RaaS performance benchmarking tools and metrics</li>
            <li>Examples of integrating RaaS with decentralized applications</li>
          </>
        );
      case 'state-storage':
        return (
          <>
            <li>Comprehensive Filecoin state querying examples</li>
            <li>State modification patterns and best practices</li>
            <li>Demonstrations of interactions with various Filecoin actors</li>
            <li>Utilities for navigating and analyzing the Filecoin state tree</li>
            <li>Examples of common state-related operations on the Filecoin network</li>
          </>
        );
      default:
        return null;
    }
  };

  const handleStartKit = (kitId: string) => {
    const selectedKit = starterKits.find(kit => kit.id === kitId);
    if (selectedKit) {
      toast({
        title: "Initializing Development Environment",
        description: `Setting up the ${selectedKit.name}. Follow the instructions in your terminal to proceed.`,
      });
    }
    // Here you would typically trigger the actual setup process
  };

  const renderKitExamples = (kitId: string) => {
    switch (kitId) {
      case 'fevm-hardhat':
        return (
          <Card className="w-full bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Deploy a Smart Contract on Filecoin with FEVM Hardhat Kit</CardTitle>
              <CardDescription>
                Develop and deploy smart contracts on Filecoin using Hardhat, a popular Ethereum development environment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This kit provides a preconfigured Hardhat environment for Filecoin, sample Solidity smart contracts, 
                integration with Filecoin&apos;s EVM-compatible APIs, an automated testing suite, and deployment scripts 
                for Filecoin mainnet and testnets.
              </p>
              <SyntaxHighlighter language="javascript" style={atomOneDark} customStyle={{
                backgroundColor: 'transparent',
                padding: '1rem',
                borderRadius: '0.5rem',
              }}>
                {`
// Deploy.js
const hre = require("hardhat");

async function main() {
  const SimpleCoin = await hre.ethers.getContractFactory("SimpleCoin");
  const simpleCoin = await SimpleCoin.deploy();

  await simpleCoin.deployed();

  console.log("SimpleCoin deployed to:", simpleCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
                `}
              </SyntaxHighlighter>
              <p className="mt-4 text-sm text-gray-400">
                This script deploys a SimpleCoin contract to the Filecoin network using Hardhat. It&apos;s your first step into Filecoin smart contract development!
              </p>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">Difficulty: <span className="text-blue-400">Beginner</span></p>
                  <p className="text-sm font-semibold">Setup Time: <span className="text-blue-400">~10 minutes</span></p>
                </div>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="https://github.com/filecoin-project/fevm-hardhat-kit" target="_blank" rel="noopener noreferrer">
                    Explore Kit Repository
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 'fevm-foundry':
        return (
          <Card className="w-full bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Build and Test Smart Contracts with FEVM Foundry Kit</CardTitle>
              <CardDescription>
                Develop smart contracts on Filecoin using Foundry, a blazing fast, portable and modular toolkit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This kit offers a Foundry development framework setup for Filecoin, enabling high-performance 
                contract compilation and testing. It includes Filecoin-specific Solidity contract examples, 
                custom Filecoin utilities, and seamless integration with Filecoin testnets.
              </p>
              <SyntaxHighlighter language="solidity" style={atomOneDark} customStyle={{
                backgroundColor: 'transparent',
                padding: '1rem',
                borderRadius: '0.5rem',
              }}>
                {`
// Example Filecoin-specific Solidity contract
pragma solidity ^0.8.17;

contract FilecoinStorage {
    mapping(bytes => bool) public files;

    function storeFile(bytes memory cid) public {
        files[cid] = true;
    }

    function checkFile(bytes memory cid) public view returns (bool) {
        return files[cid];
    }
}
              `}
              </SyntaxHighlighter>
              <p className="mt-4 text-sm text-gray-400">
                This simple contract demonstrates how to store and check file CIDs on the Filecoin network using Solidity.
              </p>
              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold">Difficulty: <span className="text-blue-400">Intermediate</span></p>
                  <p className="text-sm font-semibold">Setup Time: <span className="text-blue-400">~15 minutes</span></p>
                </div>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="https://github.com/filecoin-project/fevm-foundry-kit" target="_blank" rel="noopener noreferrer">
                    Explore Kit Repository
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      case 'fvm-deal-making':
        return (
          <Card className="w-full bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Create and Manage Storage Deals with FVM Deal Making Kit</CardTitle>
              <CardDescription>
                Learn to create and manage storage deals on Filecoin, interacting directly with storage providers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This kit provides an end-to-end storage deal creation workflow, examples of interacting with 
                Filecoin storage providers, deal status monitoring and management utilities, data retrieval 
                examples, and integration with Filecoin&apos;s deal-making APIs and actor calls.
              </p>
              <SyntaxHighlighter language="javascript" style={atomOneDark} customStyle={{
                backgroundColor: 'transparent',
                padding: '1rem',
                borderRadius: '0.5rem',
              }}>
                {`
// Example of creating a storage deal
async function createStorageDeal(cid, durationInEpochs) {
  const deal = await client.createDeal({
    cid: cid,
    miner: selectedMiner,
    duration: durationInEpochs,
  });
  console.log("Storage deal created:", deal.id);
  return deal;
}

createStorageDeal('QmExampleCID', 2880); // 2880 epochs ≈ 1 day
              `}
              </SyntaxHighlighter>
              <p className="mt-4 text-sm text-gray-400">
                This example demonstrates how to programmatically create a storage deal with a Filecoin storage provider.
              </p>
            </CardContent>
          </Card>
        );
      case 'raas':
        return (
          <Card className="w-full bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Efficient Data Retrieval with RaaS Starter Kit</CardTitle>
              <CardDescription>
                Explore Filecoin&apos;s Retrieval as a Service (RaaS) for efficient data retrieval and distribution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This kit provides RaaS integration examples, optimized data retrieval techniques for Filecoin, 
                caching strategies to enhance retrieval performance, RaaS performance benchmarking tools, 
                and examples of integrating RaaS with decentralized applications.
              </p>
              <SyntaxHighlighter language="javascript" style={atomOneDark} customStyle={{
                backgroundColor: 'transparent',
                padding: '1rem',
                borderRadius: '0.5rem',
              }}>
                {`
// Example of retrieving data using RaaS
async function retrieveData(cid) {
  const raasClient = new RaaSClient(config);
  const retrievalJob = await raasClient.retrieve(cid);
  
  retrievalJob.on('progress', (progress) => {
    console.log(\`Retrieval progress: \${progress}%\`);
  });

  const data = await retrievalJob.waitForCompletion();
  console.log("Data retrieved successfully");
  return data;
}

retrieveData('QmExampleCID');
              `}
              </SyntaxHighlighter>
              <p className="mt-4 text-sm text-gray-400">
                This example shows how to retrieve data using the RaaS client, with progress tracking.
              </p>
            </CardContent>
          </Card>
        );
      case 'state-storage':
        return (
          <Card className="w-full bg-gray-900 text-white">
            <CardHeader>
              <CardTitle>Interact with Filecoin State using State Storage Starter Kit</CardTitle>
              <CardDescription>
                Dive deep into Filecoin&apos;s state storage mechanisms and learn to interact with the network&apos;s state.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This kit offers comprehensive Filecoin state querying examples, state modification patterns 
                and best practices, demonstrations of interactions with various Filecoin actors, utilities for 
                navigating and analyzing the Filecoin state tree, and examples of common state-related operations.
              </p>
              <SyntaxHighlighter language="javascript" style={atomOneDark} customStyle={{
                backgroundColor: 'transparent',
                padding: '1rem',
                borderRadius: '0.5rem',
              }}>
                {`
// Example of querying Filecoin state
async function queryMinerPower(minerAddress) {
  const lotus = new LotusRPC(lotusEndpoint, token);
  const minerPower = await lotus.stateMinerPower(minerAddress, null);
  
  console.log("Miner Power:", {
    rawBytePower: minerPower.MinerPower.RawBytePower,
    qualityAdjPower: minerPower.MinerPower.QualityAdjPower
  });
  
  return minerPower;
}

queryMinerPower('f01234');
              `}
              </SyntaxHighlighter>
              <p className="mt-4 text-sm text-gray-400">
                This example demonstrates how to query a miner&apos;s power from the Filecoin network state.
              </p>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen flex flex-col">
        <header className="mb-24">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center mb-4 sm:mb-0"
            >
              <Image
                src="/Filecoin.png"
                alt="Filecoin Logo"
                width={50}
                height={50}
                className="mr-4"
              />
              <h1 className="text-3xl sm:text-4xl font-bold text-[#0090FF]">Filecoin Developer Console</h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center space-x-4"
            >
              <Button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                variant="outline"
                size="icon"
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800"
              >
                {mounted && (
                  theme === 'dark' ? (
                    <Sun className="h-5 w-5 text-gray-800 dark:text-white" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-800 dark:text-white" />
                  )
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white dark:bg-[#007ACC] dark:hover:bg-[#0090FF]">
                <Link href="https://docs.filecoin.io/" target="_blank" rel="noopener noreferrer">
                  Explore Filecoin Docs
                </Link>
              </Button>
            </motion.div>
          </div>
        </header>

        <main className="flex-grow space-y-32">
          {/* Hero Section */}
          <section className="text-center mb-32">
            <div className="flex flex-col items-center gap-10 text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white max-w-4xl leading-tight">
                Everything you need to
                <br />
                build dApps on Filecoin
              </h2>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
                A comprehensive toolkit for developers to explore, build, and scale decentralized applications on the Filecoin network.
              </p>
            </div>

            <div className="flex flex-col items-center gap-10 w-full mt-8">
              <div className="flex items-center bg-gray-900 rounded-lg shadow-md max-w-fit overflow-hidden">
                <div className="flex">
                  <div className="px-4 py-3 bg-gray-800 text-gray-400 text-sm font-mono">
                    git clone
                  </div>
                  <div className="px-4 py-3 bg-gray-900 text-blue-400 text-sm font-mono">
                    https://github.com/FIL-Builders/fil-frame
                  </div>
                </div>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText('git clone https://github.com/FIL-Builders/fil-frame');
                    toast({
                      title: "Copied to clipboard",
                      description: "The git clone command has been copied to your clipboard.",
                    });
                  }}
                  className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-300"
                >
                  <Copy className="h-5 w-5" />
                  <span className="sr-only">Copy to clipboard</span>
                </Button>
              </div>

              <div className="flex gap-6">
                <Button asChild size="lg" className="text-lg px-8 py-4 bg-[#0090FF] hover:bg-[#007ACC] text-white">
                  <Link href="https://docs.filecoin.io/" target="_blank" rel="noopener noreferrer">
                    Docs
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 bg-gray-800 text-white hover:bg-gray-700">
                  <Link href="https://github.com/FIL-Builders/fil-frame" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Github className="h-6 w-6" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Quick Start Guide */}
          <section className="mb-32">
            <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">Get Started with Filecoin</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Quick Start Guide */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg shadow-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Quick Start Guide</h3>
                <div className="space-y-4">
                  {[
                    "Set up your development environment",
                    "Choose a starter kit that fits your needs",
                    "Build your first Filecoin-powered app",
                    "Deploy and test your application"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center bg-blue-600 rounded-lg p-4 transition-transform transform hover:scale-105">
                      <div className="flex-shrink-0 w-8 h-8 bg-white rounded-full flex items-center justify-center mr-4">
                        <span className="text-blue-600 font-bold">{index + 1}</span>
                      </div>
                      <p className="text-white">{step}</p>
                    </div>
                  ))}
                </div>
                <Button asChild size="lg" className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50">
                  <Link href="https://docs.filecoin.io/builder-cookbook/overview">Explore Builder Cookbook</Link>
                </Button>
              </div>

              {/* Why Use Filecoin Developer Console */}
              <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg shadow-xl p-6">
                <h3 className="text-2xl font-bold text-white mb-6">Why Use Filecoin Developer Console?</h3>
                <div className="space-y-4">
                  {[
                    "Access curated starter kits for various use cases",
                    "Explore essential developer tools and resources",
                    "Learn Filecoin's core concepts through guided content",
                    "Connect with the Filecoin developer community"
                  ].map((reason, index) => (
                    <div key={index} className="flex items-center bg-gray-800 rounded-lg p-4 transition-transform transform hover:scale-105">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white">{reason}</p>
                    </div>
                  ))}
                </div>
                <Button asChild size="lg" className="w-full mt-6 bg-blue-500 text-white hover:bg-blue-600">
                  <Link href="#starter-kits">Explore Starter Kits</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Builder Cookbook */}
          <section className="mb-32">
            <h2 className="text-3xl font-bold text-gray-100 mb-12">Builder Cookbook: Essential Recipes for Developers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[
                { title: "Store Data on Filecoin", href: "https://docs.filecoin.io/builder-cookbook/data-storage/store-data#incentivized-data-storage" },
                { title: "Retrieve Data from Filecoin", href: "https://docs.filecoin.io/builder-cookbook/data-storage/retrieve-data" },
                { title: "Implement Data Privacy", href: "https://docs.filecoin.io/builder-cookbook/data-storage/privacy-and-access-control" },
                { title: "Build Decentralized Database", href: "https://docs.filecoin.io/builder-cookbook/dapps/decentralized-database" },
                { title: "Integrate Cross-Chain Bridges", href: "https://docs.filecoin.io/builder-cookbook/dapps/cross-chain-bridges" },
                { title: "Develop Smart Contracts", href: "https://docs.filecoin.io/smart-contracts/fundamentals/basics/" },
              ].map((recipe, index) => (
                <Card 
                  key={index} 
                  className={`
                    ${index % 2 === 0 ? 'bg-blue-50 dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-600'}
                    hover:bg-blue-100 dark:hover:bg-gray-500 
                    transition-colors duration-200 
                    border border-gray-200 dark:border-gray-500
                    shadow-sm hover:shadow-md
                  `}
                >
                  <CardHeader>
                    <CardTitle className="text-[#0090FF] flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-gray-600 rounded-full flex items-center justify-center">
                        <Code className="w-5 h-5 text-blue-500 dark:text-blue-300" />
                      </div>
                      <span>{recipe.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Learn how to {recipe.title.toLowerCase()} using Filecoin&apos;s powerful features.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full mt-2 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700"
                    >
                      <Link href={recipe.href}>View Recipe</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Button asChild size="lg" className="bg-[#0090FF] hover:bg-[#007ACC] text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="https://docs.filecoin.io/builder-cookbook/table-of-contents">View All Recipes</Link>
              </Button>
            </div>
          </section>

          {/* Get Started Command */}
          <section className="mb-32">
            <h2 className="text-3xl font-bold text-gray-100 mb-8">Get Started with One Command</h2>
            <div className="flex items-center bg-gray-900 rounded-lg shadow-md max-w-fit overflow-hidden">
              <div className="flex">
                <div className="px-4 py-3 bg-gray-800 text-gray-400 text-sm font-mono">
                  npx create-filecoin-app my-fil-app
                </div>
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText('npx create-filecoin-app my-fil-app');
                  toast({
                    title: "Copied to clipboard",
                    description: "The command has been copied to your clipboard.",
                  });
                }}
                className="p-3 bg-gray-800 hover:bg-gray-700 text-gray-300"
              >
                <Copy className="h-5 w-5" />
                <span className="sr-only">Copy to clipboard</span>
              </Button>
            </div>
          </section>

          {/* Main Tabs */}
          <Tabs defaultValue="starter-kits" className="w-full">
            <TabsList className="flex justify-between items-center w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-12">
              {[
                { id: 'starter-kits', icon: <Code className="w-5 h-5" />, label: 'Starter Kits' },
                { id: 'developer-tools', icon: <Wrench className="w-5 h-5" />, label: 'Developer Tools' },
                { id: 'learn', icon: <Book className="w-5 h-5" />, label: 'Learn' },
                { id: 'test-tokens', icon: <Coins className="w-5 h-5" />, label: 'Testnet Faucet' },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out
                             text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white
                             data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-[#0090FF]"
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="starter-kits">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {starterKits.map((kit) => (
                  <Card 
                    key={kit.id} 
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    onClick={() => handleKitChange(kit.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-[#0090FF] flex items-center space-x-2">
                        <div className="w-6 h-6">{kit.icon}</div>
                        <span>{kit.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{kit.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{kit.difficulty}</span>
                        <span>{kit.setupTime}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        asChild 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Link href={kit.repo} target="_blank" rel="noopener noreferrer">
                          View Repository
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              {activeKit && renderKitExamples(activeKit)}
            </TabsContent>

            <TabsContent value="developer-tools">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-12">
                <CardHeader>
                  <CardTitle className="text-[#0090FF]">Developer Resources</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Essential tools and resources to accelerate your Filecoin development journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-[#0090FF] flex items-center space-x-2">
                          <Book className="w-5 h-5" />
                          <span>Filecoin Documentation</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Comprehensive guides, API references, and tutorials to help you build on Filecoin.</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-[#0090FF] hover:bg-[#007ACC] text-white">
                          <Link href="https://docs.filecoin.io/" target="_blank" rel="noopener noreferrer">
                            Explore Documentation
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-[#0090FF] flex items-center space-x-2">
                          <Github className="w-5 h-5" />
                          <span>Filecoin GitHub</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Access Filecoin&apos;s open-source repositories, contribute to the ecosystem, and collaborate with the community.</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-[#0090FF] hover:bg-[#007ACC] text-white">
                          <Link href="https://github.com/filecoin-project" target="_blank" rel="noopener noreferrer">
                            Explore Repositories
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-[#0090FF] flex items-center space-x-2">
                          <Database className="w-5 h-5" />
                          <span>FVM Data Depot</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Access and analyze on-chain data from the Filecoin Virtual Machine (FVM) for your dApps and research.</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-[#0090FF] hover:bg-[#007ACC] text-white">
                          <Link href="https://data.lighthouse.storage/" target="_blank" rel="noopener noreferrer">
                            Explore FVM Data
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-[#0090FF] flex items-center space-x-2">
                          <Coins className="w-5 h-5" />
                          <span>Calibration Testnet Faucet</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Obtain testnet tokens to develop and test your Filecoin applications in a safe environment.</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-[#0090FF] hover:bg-[#007ACC] text-white">
                          <Link href="https://faucet.calibnet.chainsafe-fil.io/" target="_blank" rel="noopener noreferrer">
                            Get Testnet Tokens
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-[#0090FF] flex items-center space-x-2">
                          <Search className="w-5 h-5" />
                          <span>Filfox Block Explorer</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Inspect transactions, blocks, and smart contracts on the Filecoin network in real-time.</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-[#0090FF] hover:bg-[#007ACC] text-white">
                          <Link href="https://filfox.info/en" target="_blank" rel="noopener noreferrer">
                            Explore Transactions
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-[#0090FF] flex items-center space-x-2">
                          <MessageSquare className="w-5 h-5" />
                          <span>Developer Community</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Connect with other Filecoin developers, get support, and share your projects.</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-[#0090FF] hover:bg-[#007ACC] text-white">
                          <Link href="https://filecoin.io/slack" target="_blank" rel="noopener noreferrer">
                            Join Slack Community
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="learn">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-12">
                <CardHeader>
                  <CardTitle className="text-[#0090FF]">Learn Filecoin</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Educational resources and tutorials for Filecoin developers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-[#0090FF]">Filecoin Fundamentals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Understand the core concepts of Filecoin&apos;s decentralized storage network and its underlying technology.</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white">
                          <Link href="https://docs.filecoin.io/basics/what-is-filecoin/" target="_blank" rel="noopener noreferrer">
                            Explore Fundamentals
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-[#0090FF]">Smart Contract Development</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Learn to develop and deploy smart contracts on the Filecoin Virtual Machine (FVM).</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white">
                          <Link href="https://docs.filecoin.io/smart-contracts/fundamentals/basics/" target="_blank" rel="noopener noreferrer">
                            Dive into FVM
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                    <Card className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-[#0090FF]">Filecoin Storage Providers</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Discover the crucial role of storage providers in the Filecoin ecosystem and how to interact with them.</p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white">
                          <Link href="https://docs.filecoin.io/storage-providers/basics/how-providing-works/" target="_blank" rel="noopener noreferrer">
                            Explore Storage Provision
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="test-tokens">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-12">
                <CardHeader>
                  <CardTitle className="text-[#0090FF]">Obtaining Testnet Tokens</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">How to acquire testnet tokens for the Filecoin Calibration testnet</CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-4">
                    <li>Configure MetaMask for the Filecoin Calibration testnet. Follow the detailed <Link href="https://docs.filecoin.io/smart-contracts/developing-contracts/metamask-setup/" target="_blank" rel="noopener noreferrer" className="text-[#0090FF] hover:underline">MetaMask setup guide</Link>.</li>
                    <li>Open MetaMask in your browser and copy your Ethereum-style address (starting with 0x).</li>
                    <li>Navigate to the <Link href="https://faucet.calibnet.chainsafe-fil.io/" target="_blank" rel="noopener noreferrer" className="text-[#0090FF] hover:underline">Calibration testnet faucet</Link>.</li>
                    <li>Click &quot;Send Funds&quot;, paste your Ethereum-style address into the address field, and submit the request.</li>
                    <li>The faucet will provide a transaction ID. Use this ID to track your transaction in a Filecoin block explorer.</li>
                  </ol>
                  <div className="mt-6">
                    <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white">
                      <Link href="https://docs.filecoin.io/smart-contracts/developing-contracts/get-test-tokens" target="_blank" rel="noopener noreferrer">
                        Learn More About Testnet Tokens
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>

        <footer className="mt-32 py-12 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">What can we do to improve?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Suggest a feature, give us feedback, or just say hello!
              </p>
            </div>
            <Button asChild className="bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300">
              <Link href="https://filecoin.io/slack" target="_blank" rel="noopener noreferrer" className="flex items-center">
                <Image
                  src="/Slack icon.png"
                  alt="Slack"
                  width={24}
                  height={24}
                  className="mr-2 filter grayscale"
                />
                Join us on Slack
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}