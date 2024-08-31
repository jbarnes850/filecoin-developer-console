'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Wrench, Book, Github, Code, Terminal, Database, Cloud, RefreshCw, Zap, Coins, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTheme } from "next-themes";
import { useToast } from "@/components/ui/use-toast"

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen flex flex-col">
        <header className="mb-8 sm:mb-12">
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

        <main className="flex-grow">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">Welcome to the Filecoin Developer Console</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">Tools and resources to help you build and scale your app on Filecoin</p>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {['dashboard', 'tools', 'learn', 'test-tokens'].map((tab, index) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="text-gray-700 dark:text-gray-300 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:text-[#0090FF] rounded-md transition-all"
                >
                  {tab === 'dashboard' && <Home className="mr-2 h-4 w-4" />}
                  {tab === 'tools' && <Wrench className="mr-2 h-4 w-4" />}
                  {tab === 'learn' && <Book className="mr-2 h-4 w-4" />}
                  {tab === 'test-tokens' && <Coins className="mr-2 h-4 w-4" />}
                  {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="dashboard">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-8">
                <CardHeader>
                  <CardTitle className="text-[#0090FF]">Filecoin Starter Kits</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Select a starter kit to begin your Filecoin development journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <Input
                    type="text"
                    placeholder="Search kits by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white mb-4"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredKits.map((kit) => (
                      <Card key={kit.id} className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer" onClick={() => handleKitChange(kit.id)}>
                        <CardHeader>
                          <CardTitle className="text-[#0090FF] flex items-center justify-between">
                            <span className="flex items-center">
                              {kit.icon}
                              <span className="ml-2">{kit.name}</span>
                            </span>
                            <Link href={kit.repo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                              <Github className="h-5 w-5 text-gray-400 hover:text-[#0090FF] transition-colors" />
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{kit.description}</p>
                          <div className="mt-2 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{kit.difficulty}</span>
                            <span>{kit.setupTime}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
              {activeKit && (
                <>
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 mb-8">
                    <CardHeader>
                      <CardTitle className="text-[#0090FF]">Setup Progress</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Progress value={onboardingProgress} className="w-full" />
                    </CardContent>
                  </Card>
                  {renderKitInterface(activeKit)}
                </>
              )}
            </TabsContent>

            <TabsContent value="tools">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-[#0090FF]">Developer Resources</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">Essential tools and resources for Filecoin development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white w-full">
                      <Link href="https://docs.filecoin.io/" target="_blank" rel="noopener noreferrer">
                        Filecoin Documentation
                      </Link>
                    </Button>
                    <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white w-full">
                      <Link href="https://github.com/filecoin-project" target="_blank" rel="noopener noreferrer">
                        Filecoin GitHub Repositories
                      </Link>
                    </Button>
                    <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white w-full">
                      <Link href="https://data.lighthouse.storage/" target="_blank" rel="noopener noreferrer">
                        FVM Data Depot
                      </Link>
                    </Button>
                    <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white w-full">
                      <Link href="https://faucet.calibration.fildev.network/" target="_blank" rel="noopener noreferrer">
                        Filecoin Faucet (Calibration Testnet)
                      </Link>
                    </Button>
                    <Button asChild className="bg-[#0090FF] hover:bg-[#007ACC] text-white w-full">
                      <Link href="https://filfox.info/en" target="_blank" rel="noopener noreferrer">
                        Filfox Block Explorer
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="learn">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
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
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-[#0090FF]">Obtaining Test Tokens</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">How to acquire test tokens for the Filecoin Calibration testnet</CardDescription>
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
                        Learn More About Test Tokens
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}