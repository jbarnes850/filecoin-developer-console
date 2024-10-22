'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Code, Terminal, Database, Cloud, RefreshCw, Copy, Users, Zap, Check, Lock, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast"

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

export default function AppPage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<PackageManager>('npm');
  const [copied, setCopied] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied to clipboard",
      description: "The command has been copied to your clipboard.",
    });
  };

  const installCommands: Record<PackageManager, string> = {
    npm: 'npm install @FIL-Builders/fil-frame',
    yarn: 'yarn add @FIL-Builders/fil-frame',
    pnpm: 'pnpm add @FIL-Builders/fil-frame',
    bun: 'bun add @FIL-Builders/fil-frame'
  };

  // Add this useEffect to show the survey after a delay
  React.useEffect(() => {
    const timer = setTimeout(() => setShowSurvey(true), 60000); // Show survey after 1 minute
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#0D0E12] via-[#1A1B26] to-[#2E3348] text-gray-100">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#0D0E12]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0D0E12]/60">
        <div className="container mx-auto px-4 flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/Filecoin icon.png" alt="Filecoin Logo" width={32} height={32} />
            <span className="font-bold text-2xl text-white">FIL-Frame</span>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-gray-300 hover:text-white">Features</Link>
            <Link href="#get-started" className="text-sm font-medium text-gray-300 hover:text-white">Get Started</Link>
            <Link href="https://github.com/FIL-Builders/fil-frame" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6 text-gray-300 hover:text-white" />
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <motion.h1 
            className="text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            FIL-Frame
          </motion.h1>
          <motion.p 
            className="text-xl mb-12 text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your quickstart for building apps on Filecoin with ready-to-use React components and TypeScript utilities.
          </motion.p>
          <motion.div 
            className="mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-[#1E2029] border-[#2E3039]">
              <CardContent className="p-0">
                <div className="flex border-b border-[#2E3039]">
                  {Object.keys(installCommands).map((cmd) => (
                    <button
                      key={cmd}
                      className={`flex-1 p-2 text-sm font-medium ${activeTab === cmd ? 'bg-[#2E3039] text-white' : 'text-gray-400 hover:text-white'}`}
                      onClick={() => setActiveTab(cmd as PackageManager)}
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
                <div className="p-4 relative">
                  <pre className="text-left overflow-x-auto whitespace-pre-wrap break-words">
                    <code className="text-sm font-mono text-gray-200">
                      {installCommands[activeTab]}
                    </code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(installCommands[activeTab])}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="flex justify-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full">
              <Link href="#get-started">Get Started</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 hover:border-gray-500 px-8 py-2 rounded-full"
            >
              <Link href="https://github.com/FIL-Builders/fil-frame" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Link>
            </Button>
          </motion.div>
        </section>

        <section id="features" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Ready-to-use Filecoin components</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            <FeatureCard 
              icon={<Code className="h-10 w-10 text-blue-400" />} 
              title="Storage Deals" 
              link="https://docs.filecoin.io/builder-cookbook/data-storage/store-data"
            />
            <FeatureCard 
              icon={<Terminal className="h-10 w-10 text-blue-400" />} 
              title="Retrieval" 
              link="https://docs.filecoin.io/builder-cookbook/data-storage/retrieve-data"
            />
            <FeatureCard 
              icon={<Database className="h-10 w-10 text-blue-400" />} 
              title="Data DAOs" 
              link="https://docs.filecoin.io/builder-cookbook/dapps/decentralized-database"
            />
            <FeatureCard 
              icon={<Cloud className="h-10 w-10 text-blue-400" />} 
              title="FVM" 
              link="https://docs.filecoin.io/smart-contracts/fundamentals/basics/"
            />
            <FeatureCard 
              icon={<RefreshCw className="h-10 w-10 text-blue-400" />} 
              title="Proofs" 
              link="https://docs.filecoin.io/basics/how-storage-works/filecoin-plus"
            />
          </div>
        </section>

        <section id="integrations" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Ecosystem Integrations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <IntegrationCard
              icon={<Image src="/Lighthouse Logo.jpg" alt="Lighthouse" width={64} height={64} className="rounded-full" />}
              title="Lighthouse"
              description="Decentralized storage solutions with perpetual file storage and built-in encryption"
              link="https://www.lighthouse.storage/"
            />
            <IntegrationCard
              icon={<Image src="/Axelar Logo.svg" alt="Axelar" width={64} height={64} />}
              title="Axelar"
              description="Secure cross-chain communication for Web3 applications and assets"
              link="https://axelar.network/"
            />
            <IntegrationCard
              icon={<Image src="/Lit Logomark White.svg" alt="Lit Protocol" width={64} height={64} />}
              title="Lit Protocol"
              description="Decentralized key management network for blockchain-based access control"
              link="https://litprotocol.com/"
            />
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-full text-lg">
              <Link href="https://github.com/FIL-Builders/fil-frame#ecosystem-integrations">
                Explore All Integrations
              </Link>
            </Button>
          </div>
        </section>

        <section id="community" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Build in Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-[#1E2029] border-[#2E3039] hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="h-16 w-16 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">Join the Discussion</h3>
                <p className="text-gray-300 mb-6">Connect with other Filecoin developers, share ideas, and get help on our community platforms.</p>
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full">
                  <Link href="https://t.me/filecoindevs" target="_blank" rel="noopener noreferrer">
                    Join Telegram Group
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-[#1E2029] border-[#2E3039] hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Github className="h-16 w-16 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">Contribute to FIL-Frame</h3>
                <p className="text-gray-300 mb-6">Help improve FIL-Frame by contributing to our open-source repository on GitHub.</p>
                <Button asChild size="lg" className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-2 rounded-full">
                  <Link href="https://github.com/FIL-Builders/fil-frame" target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="enhanced-experience" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center text-white">Enhanced dApp Development Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-[#1E2029] border-[#2E3039] hover:border-blue-500 transition-all duration-300">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold mb-4 text-white">Supercharged Workflow</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Pre-configured development environment for Filecoin</li>
                  <li>Ready-to-use React components tailored for Filecoin</li>
                  <li>TypeScript utilities for enhanced productivity</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-[#1E2029] border-[#2E3039] hover:border-blue-500 transition-all duration-300">
              <CardContent className="p-6">
                <RefreshCw className="h-12 w-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold mb-4 text-white">Seamless Integration</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Easy access to Filecoin&apos;s unique features and APIs</li>
                  <li>Simplified storage deal creation and management</li>
                  <li>Built-in support for FVM (Filecoin Virtual Machine)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-full text-lg">
              <Link href="#get-started">Start Building Now</Link>
            </Button>
          </div>
        </section>

        <section id="get-started" className="container mx-auto px-4 py-20">
          <h2 className="text-5xl font-bold mb-12 text-center text-white">Get Started in Minutes</h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-[#1E2029] border-[#2E3039]">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <Step 
                    number={1} 
                    title="Create a new FIL-Frame project"
                    command="npx create-fil-frame my-fil-app"
                  />
                  <Step 
                    number={2} 
                    title="Navigate to your project directory"
                    command="cd my-fil-app"
                  />
                  <Step 
                    number={3} 
                    title="Install dependencies"
                    command="npm install"
                  />
                  <Step 
                    number={4} 
                    title="Start the development server"
                    command="npm run dev"
                  />
                </div>
                <div className="mt-12 text-center">
                  <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-3 rounded-full text-lg">
                    <Link href="https://docs.filecoin.io/developers/fil-frame/quickstart">View Full Documentation</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="bg-[#1E2029] py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <span className="text-sm text-gray-400">Built with <Heart size={16} className="inline-block mx-1 text-red-500" /> by <Link href="https://x.com/FILBuilders" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">FIL-B</Link></span>
          <div className="flex space-x-6">
            <Link href="https://github.com/FIL-Builders/fil-frame" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6 text-gray-400 hover:text-white" />
            </Link>
            <Link href="https://discord.gg/filecoin" target="_blank" rel="noopener noreferrer">
              <Image src="/Discord Icon.png" alt="Discord" width={24} height={24} className="text-gray-400 hover:text-white" />
            </Link>
            <Link href="https://x.com/FILBuilders" target="_blank" rel="noopener noreferrer">
              <Image src="/Twitter icon.png" alt="Twitter" width={24} height={24} className="text-gray-400 hover:text-white" />
            </Link>
          </div>
        </div>
      </footer>

      {showSurvey && (
        <DevSurvey onClose={() => setShowSurvey(false)} />
      )}
    </div>
  );
}

function FeatureCard({ icon, title, link }: { icon: React.ReactNode; title: string; link: string }) {
  return (
    <Card className="bg-[#1E2029] border-gray-700 hover:border-blue-500 transition-colors">
      <CardHeader>
        <CardTitle className="flex flex-col items-center text-center">
          {icon}
          <Link href={link} target="_blank" rel="noopener noreferrer" className="mt-4 text-lg text-gray-200 hover:text-blue-400">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

function DevSurvey({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-[#1E2029] border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Developer Survey</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-200">We&apos;d love to hear your feedback on FIL-Frame!</p>
          {/* Add your survey questions here */}
        </CardContent>
        <div className="flex justify-end space-x-4 p-6 bg-[#2E3348]">
          <Button onClick={onClose} variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-400">Close</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Submit</Button>
        </div>
      </Card>
    </div>
  );
}

function IntegrationCard({ icon, title, description, link }: { icon: React.ReactNode; title: string; description: string; link: string }) {
  return (
    <Card className="bg-[#1E2029] border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            Learn More →
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

const LighthouseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M1,10.5h2.75l1.25,1.25L7.25,10.5H11l1.25,1.25L14.5,10.5H22c0.55,0,1,0.45,1,1v8c0,0.55-0.45,1-1,1H2c-0.55,0-1-0.45-1-1 V10.5z M6,18.5h12v-1.5H6V18.5z M5.58,2.19L4.16,3.61l2.55,2.55L4.16,8.72l1.42,1.42L8.14,7.58l2.55,2.55l1.42-1.42L9.55,6.16 l2.55-2.55L10.69,2.19L8.14,4.74L5.58,2.19z"/>
  </svg>
)

function Step({ number, title, command }: { number: number; title: string; command: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
        {number}
      </div>
      <div className="flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <div className="bg-[#2E3039] rounded-lg p-3 flex items-center justify-between">
          <code className="text-sm font-mono text-gray-200">{command}</code>
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
