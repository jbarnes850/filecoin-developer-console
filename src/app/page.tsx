'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Code, Terminal, Database, Cloud, RefreshCw, Copy, Users, Zap, Check, Lock, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from "@/components/ui/use-toast"

type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

// Remove Quicksand import and initialization since it's now in layout.tsx

// Rest of your existing code...

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

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSurvey(true), 60000); // Show survey after 1 minute.
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#0D0E12] text-gray-100">
      <header className="fixed top-0 z-50 w-full border-b border-[#2E3039] bg-[#1A1B26]/95 backdrop-blur">
        <div className="container mx-auto px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 flex items-center">
              <Image 
                src="/fil B icon.png"
                alt="Fil B Logo" 
                width={32}
                height={32}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-bold text-xl text-[#0090FF] leading-none">FIL-Frame</span>
          </Link>
          <nav className="flex items-center space-x-8">
            <Link href="#features" onClick={(e) => smoothScroll(e, 'features')} className="text-sm font-medium text-gray-300 hover:text-white">Features</Link>
            <Link href="#integrations" onClick={(e) => smoothScroll(e, 'integrations')} className="text-sm font-medium text-gray-300 hover:text-white">Integrations</Link>
            <Link href="#get-started" onClick={(e) => smoothScroll(e, 'get-started')} className="text-sm font-medium text-gray-300 hover:text-white">Get Started</Link>
            <Link href="https://github.com/FIL-Builders/fil-frame" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6 text-gray-300 hover:text-white" />
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="bg-gradient-to-b from-[#1A1B26] to-[#0D0E12] py-32 relative overflow-hidden">
          {/* Brand geometric shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <Image 
              src="/Red Arrow.png"
              alt=""
              width={120}
              height={120}
              className="absolute top-[35%] right-[10%] transform -rotate-[45deg] opacity-15"
            />
            <Image 
              src="/Blue Square.png"
              alt=""
              width={100}
              height={100}
              className="absolute top-[20%] left-[8%] transform rotate-[13.6deg] opacity-10"
            />
            <Image 
              src="/Yellow Circle.png"
              alt=""
              width={90}
              height={90}
              className="absolute bottom-[35%] right-[15%] transform rotate-[10.38deg] opacity-10"
            />
            <Image 
              src="/Red Star.png"
              alt=""
              width={80}
              height={80}
              className="absolute bottom-[25%] left-[12%] transform rotate-[7.07deg] opacity-10"
            />
          </div>
          <motion.div 
            className="container mx-auto px-6 text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              variants={itemVariants} 
              className="font-balgin text-6xl mb-6 text-white uppercase tracking-none"
            >
              FIL-Frame
            </motion.h1>
            <motion.p variants={itemVariants} className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
              Your quickstart for building apps on Filecoin with ready-to-use React components and TypeScript utilities.
            </motion.p>
            <motion.div variants={itemVariants} className="mb-12 max-w-xl mx-auto">
              <Card className="bg-[#1E2029] border-[#2E3039] hover:border-[#0090FF] transition-all duration-300 shadow-lg shadow-black/10 overflow-hidden"> {/* Added overflow-hidden */}
                <CardContent className="p-0">
                  <div className="flex border-b border-[#2E3039]">
                    {Object.keys(installCommands).map((cmd, index) => (
                      <button
                        key={cmd}
                        className={`flex-1 p-2 text-sm font-medium flex items-center justify-center transition-colors
                          ${activeTab === cmd 
                            ? 'bg-[#2E3039] text-white' 
                            : 'text-gray-400 hover:text-white'
                          }
                          ${index === 0 ? 'rounded-tl-[calc(0.5rem-1px)]' : ''} 
                          ${index === Object.keys(installCommands).length - 1 ? 'rounded-tr-[calc(0.5rem-1px)]' : ''}
                        `}
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
            <motion.div variants={itemVariants} className="flex justify-center space-x-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-[#0090FF] hover:bg-[#0090FF]/90 text-white font-bold px-8 py-3 rounded-full"
              >
                <Link href="#get-started" onClick={(e) => smoothScroll(e, 'get-started')}>
                  Get Started
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-transparent hover:bg-gray-800 text-white border-gray-600 hover:border-gray-500 px-8 py-3 rounded-full"
              >
                <Link href="https://github.com/FIL-Builders/fil-frame" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        <section id="features" className="py-24 bg-[#0D0E12] pt-32 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <Image 
              src="/Blue Square.png"
              alt=""
              width={80}
              height={80}
              className="absolute top-[5%] left-[5%] transform rotate-[7.07deg] opacity-5"
            />
            <Image 
              src="/Yellow Circle.png"
              alt=""
              width={70}
              height={70}
              className="absolute top-[10%] right-[8%] transform rotate-[10.38deg] opacity-5"
            />
            <Image 
              src="/Red Star.png"
              alt=""
              width={60}
              height={60}
              className="absolute bottom-[8%] left-[10%] transform rotate-[13.6deg] opacity-5"
            />
            <Image 
              src="/Red Arrow.png"
              alt=""
              width={70}
              height={70}
              className="absolute bottom-[10%] right-[5%] transform rotate-[7.07deg] opacity-5"
            />
          </div>

          <div className="container mx-auto px-6 relative">
            {/* Line decoration */}
            <div className="absolute left-0 top-24 w-16 h-0.5 bg-[#0090FF] opacity-20 transform -rotate-[13.6deg]" />
            <div className="absolute right-0 top-24 w-16 h-0.5 bg-[#0090FF] opacity-20 transform rotate-[13.6deg]" />
            
            <div className="relative">
              <div className="absolute -left-8 top-1/2 w-4 h-0.5 bg-[#0090FF] opacity-20 transform -rotate-[13.6deg]" />
              <div className="absolute -right-8 top-1/2 w-4 h-0.5 bg-[#0090FF] opacity-20 transform rotate-[13.6deg]" />
              <h2 className="font-balgin text-4xl mb-16 text-center text-white uppercase tracking-none">
                Ready-to-use Filecoin Components
                {/* Geometric accent */}
                <div className="absolute -right-4 -top-4 w-8 h-8 opacity-10">
                  <Image 
                    src="/Blue Square.png"
                    alt=""
                    width={32}
                    height={32}
                    className="transform rotate-[7.07deg]"
                  />
                </div>
              </h2>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Code className="h-10 w-10 text-[#0090FF]" />}
                title="Storage Deals"
                link="https://docs.filecoin.io/builder-cookbook/data-storage/store-data"
                description="Create storage deals via a storage provider like Lighthouse, or use your own deal client smart contract for custom implementations."
              />
              <FeatureCard
                icon={<Terminal className="h-10 w-10 text-[#0090FF]" />}
                title="Retrieval"
                link="https://docs.filecoin.io/builder-cookbook/data-storage/retrieve-data"
                description="Retrieve data from Filecoin storage deals using a retrieval provider like Lit Protocol, or use your own retrieval client smart contract for custom implementations."
              />
              <FeatureCard
                icon={<Database className="h-10 w-10 text-[#0090FF]" />}
                title="Data DAOs"
                link="https://docs.filecoin.io/builder-cookbook/dapps/decentralized-database"
                description="Build decentralized data applications using Filecoin storage deals and data DAOs like Lit Protocol, or use your own data DAO smart contract for custom implementations."
              />
              <FeatureCard
                icon={<Cloud className="h-10 w-10 text-[#0090FF]" />}
                title="FVM"
                link="https://docs.filecoin.io/smart-contracts/fundamentals/basics/"
                description="Build smart contracts on the Filecoin Virtual Machine (FVM) using TypeScript, or use your own smart contract for custom implementations."
              />
              <FeatureCard
                icon={<RefreshCw className="h-10 w-10 text-[#0090FF]" />}
                title="Proofs"
                link="https://docs.filecoin.io/basics/how-storage-works/filecoin-plus"
                description="Generate proofs of storage using Filecoin Plus, or use your own proof generation smart contract for custom implementations."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-[#0090FF]" />}
                title="Smart Contracts"
                link="https://docs.filecoin.io/smart-contracts/fundamentals/basics/"
                description="Build smart contracts on the Filecoin network using TypeScript, or use your own smart contract for custom implementations."
              />
            </div>
          </div>
        </section>

        <section id="integrations" className="py-24 bg-[#1A1B26] pt-32">
          <div className="container mx-auto px-6">
            {/* Storage Onramps */}
            <div className="mb-24">
              <h2 className="text-4xl font-bold mb-6 text-center text-white">Easy Storage and Retrieval with Storage Onramps</h2>
              <p className="text-gray-300 text-center mb-16 max-w-3xl mx-auto">
                Get started quickly with battle-tested storage providers and onramps for seamless data management on Filecoin.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <IntegrationCard
                  icon={<Image src="/Lighthouse Logo.jpg" alt="Lighthouse" width={64} height={64} className="rounded-full" />}
                  title="Lighthouse"
                  description="Decentralized storage solutions with perpetual file storage and built-in encryption"
                  link="https://www.lighthouse.storage/"
                />
                <IntegrationCard
                  icon={<Image 
                    src="/Storacha.png" 
                    alt="Storacha" 
                    width={64} 
                    height={64} 
                    className="rounded-full"
                  />}
                  title="Storacha"
                  description="Simplified storage management and deal-making for Filecoin network"
                  link="https://github.com/FIL-Builders/fil-frame/tree/storacha-nfts"
                />
                <IntegrationCard
                  icon={<Image 
                    src="/Akave.png" 
                    alt="Akave" 
                    width={64} 
                    height={64}
                    className="rounded-full"
                  />}
                  title="Akave"
                  description="Enterprise-grade storage solutions with advanced data management features"
                  link="https://akave.io/"
                />
              </div>
            </div>

            {/* Tooling */}
            <div>
              <h2 className="text-4xl font-bold mb-6 text-center text-white">Supercharge Your dApp</h2>
              <p className="text-gray-300 text-center mb-16 max-w-3xl mx-auto">
                Enhance your decentralized applications with powerful cross-chain and access control capabilities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
            </div>
          </div>
        </section>

        <section id="get-started" className="py-24 bg-[#0D0E12] pt-32 relative overflow-hidden">
          {/* Geometric shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <Image 
              src="/Blue Square.png"
              alt=""
              width={80}
              height={80}
              className="absolute top-[8%] right-[5%] transform rotate-[7.07deg] opacity-5"
            />
            <Image 
              src="/Red Arrow.png"
              alt=""
              width={70}
              height={70}
              className="absolute top-[15%] left-[8%] transform rotate-[13.6deg] opacity-5"
            />
            <Image 
              src="/Yellow Circle.png"
              alt=""
              width={60}
              height={60}
              className="absolute bottom-[10%] right-[12%] transform rotate-[10.38deg] opacity-5"
            />
          </div>

          <div className="container mx-auto px-6 relative">
            {/* Line decoration */}
            <div className="absolute left-0 top-24 w-16 h-0.5 bg-[#0090FF] opacity-20 transform -rotate-[13.6deg]" />
            <div className="absolute right-0 top-24 w-16 h-0.5 bg-[#0090FF] opacity-20 transform rotate-[13.6deg]" />
            
            <h2 className="text-4xl font-bold mb-16 text-center text-white relative">
              Builders Ship Faster With FIL-Frame
              <div className="absolute -right-4 -top-4 w-8 h-8 opacity-10">
                <Image 
                  src="/Red Star.png"
                  alt=""
                  width={32}
                  height={32}
                  className="transform rotate-[7.07deg]"
                />
              </div>
            </h2>

            <div className="max-w-3xl mx-auto">
              <Card className="bg-[#1E2029] border-[#2E3039]">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    {[
                      { number: 1, title: "Create a new FIL-Frame project", command: "npx create-fil-frame my-fil-app" },
                      { number: 2, title: "Navigate to your project directory", command: "cd my-fil-app" },
                      { number: 3, title: "Install dependencies", command: "npm install" },
                      { number: 4, title: "Start the development server", command: "npm run dev" },
                    ].map((step, index) => (
                      <Step key={index} {...step} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1E2029] py-8 border-t border-[#2E3039]">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between items-start">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <Link href="/" className="flex items-center space-x-2 mb-2">
                <div className="relative w-6 h-6">
                  <Image 
                    src="/fil B icon.png"
                    alt="Fil B Logo" 
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-lg text-[#0090FF]">FIL-Frame</span>
              </Link>
              <p className="text-sm text-gray-400 mb-2">
                Your quickstart for building decentralized apps on Filecoin with ready-to-use React components and TypeScript utilities.
              </p>
              <p className="text-xs text-gray-500">
                Built with <Heart size={12} className="inline-block mx-1 text-red-500" /> by FIL-B
              </p>
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3 flex flex-wrap justify-end">
              <div className="w-1/2 sm:w-1/3 mb-4 sm:mb-0">
                <h3 className="text-white font-semibold text-sm mb-2">Resources</h3>
                <ul className="space-y-1">
                  <li><Link href="https://github.com/FIL-Builders/fil-frame" className="text-xs text-gray-400 hover:text-white">GitHub Repository</Link></li>
                  <li><Link href="https://github.com/FIL-Builders/fil-frame/issues" className="text-xs text-gray-400 hover:text-white">Report an Issue</Link></li>
                </ul>
              </div>
              <div className="w-1/2 sm:w-1/3">
                <h3 className="text-white font-semibold text-sm mb-2">Community</h3>
                <ul className="space-y-1">
                  <li><Link href="https://discord.gg/filecoin" className="text-xs text-gray-400 hover:text-white">Discord</Link></li>
                  <li><Link href="https://x.com/FILBuilders" className="text-xs text-gray-400 hover:text-white">Twitter</Link></li>
                  <li><Link href="https://filecoin.io/slack" className="text-xs text-gray-400 hover:text-white">Slack</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-gray-500 mb-2 sm:mb-0">© 2024 FIL-Frame. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="https://github.com/FIL-Builders/fil-frame" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link href="https://discord.gg/filecoin" target="_blank" rel="noopener noreferrer">
                <Image src="/Discord Icon.png" alt="Discord" width={20} height={20} className="text-gray-400 hover:text-white" />
              </Link>
              <Link href="https://x.com/FILBuilders" target="_blank" rel="noopener noreferrer">
                <Image src="/Twitter icon.png" alt="Twitter" width={20} height={20} className="text-gray-400 hover:text-white" />
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {showSurvey && (
        <DevSurvey onClose={() => setShowSurvey(false)} />
      )}
    </div>
  );
}

function FeatureCard({ icon, title, link, description }: { icon: React.ReactNode; title: string; link: string; description: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card 
      className="bg-[#1E2029] border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <CardHeader>
        <CardTitle className="flex flex-col items-center text-center">
          {icon}
          <span className="mt-4 text-lg text-gray-200">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                opacity: { duration: 0.2 }
              }}
              className="mt-4 text-sm text-gray-300 text-center"
            >
              <p>{description}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <Button 
          asChild 
          variant="ghost" 
          size="sm" 
          className="mt-4 text-gray-400 hover:text-blue-300"
          onClick={(e) => e.stopPropagation()}
        >
          <Link href={link} target="_blank" rel="noopener noreferrer">
            Learn More →
          </Link>
        </Button>
      </CardContent>
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
          <p className="text-gray-200 mb-4">We&apos;d love to hear your feedback on FIL-Frame!</p>
          <div className="space-y-4">
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-200 mb-1">How was your experience with FIL-Frame?</label>
              <select id="experience" className="w-full bg-[#2E3039] text-gray-200 border border-gray-600 rounded-md p-2">
                <option>Excellent</option>
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>
            </div>
            <div>
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-200 mb-1">Any additional feedback?</label>
              <textarea id="feedback" rows={3} className="w-full bg-[#2E3039] text-gray-200 border border-gray-600 rounded-md p-2"></textarea>
            </div>
          </div>
        </CardContent>
        <div className="flex justify-end space-x-4 p-6 bg-[#2E3348]">
          <Button onClick={onClose} className="bg-black text-white hover:bg-gray-800">
            Close
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Submit
          </Button>
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
        <h3 className="title text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="paragraph text-gray-300 mb-6">{description}</p>
        <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-blue-300">
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

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, targetId: string) {
  e.preventDefault();
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
