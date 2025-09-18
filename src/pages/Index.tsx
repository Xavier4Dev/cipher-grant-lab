import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResearchProposal from '@/components/ResearchProposal';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Zap, Users, Database } from 'lucide-react';

const Index = () => {
  const proposals = [
    {
      id: '1',
      title: 'CRISPR Gene Therapy for Rare Diseases',
      researcher: 'Dr. Sarah Chen',
      description: 'Investigating novel CRISPR-Cas9 applications for treating genetic disorders affecting fewer than 200,000 individuals worldwide.',
      encryptedBudget: '0x4A7B...9F3E',
      actualBudget: '$2.4M ETH',
      status: 'pending' as const,
      votes: 47,
      category: 'Biotechnology'
    },
    {
      id: '2',
      title: 'Quantum Computing for Drug Discovery',
      researcher: 'Prof. Marcus Webb',
      description: 'Leveraging quantum algorithms to accelerate molecular simulation and pharmaceutical compound optimization.',
      encryptedBudget: '0x8C9D...2A1B',
      actualBudget: '$3.7M ETH',
      status: 'funded' as const,
      votes: 89,
      category: 'Quantum Research'
    },
    {
      id: '3',
      title: 'Climate Change Impact on Marine Ecosystems',
      researcher: 'Dr. Elena Rodriguez',
      description: 'Comprehensive study of ocean acidification effects on coral reef biodiversity and marine food chains.',
      encryptedBudget: '0x1F5E...7D4C',
      actualBudget: '$1.8M ETH',
      status: 'pending' as const,
      votes: 23,
      category: 'Environmental Science'
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Fully Homomorphic Encryption',
      description: 'Budget proposals remain encrypted until funding decisions, ensuring fair evaluation without bias.'
    },
    {
      icon: Zap,
      title: 'Instant DAO Voting',
      description: 'Decentralized decision-making with transparent blockchain-based voting mechanisms.'
    },
    {
      icon: Users,
      title: 'Global Research Network',
      description: 'Connect researchers worldwide in a trustless, collaborative funding ecosystem.'
    },
    {
      icon: Database,
      title: 'Immutable Research Records',
      description: 'All proposals, votes, and outcomes permanently recorded on-chain for transparency.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-lab">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl font-bold leading-tight">
            Revolutionizing Scientific
            <span className="bg-gradient-dna bg-clip-text text-transparent"> Research Funding</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The first DAO platform where research proposals are evaluated through fully homomorphic encryption,
            ensuring unbiased funding decisions based on scientific merit alone.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" className="bg-gradient-dna hover:opacity-90 transition-opacity">
              <a href="/submit-proposal">Submit Proposal</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass-morphism">
              <a href="/join-dao">Join DAO</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Scientific Innovation Meets Blockchain</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform combines cutting-edge cryptography with decentralized governance
            to create the most fair and transparent research funding system ever built.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-morphism hover:shadow-microscope transition-all duration-300 group">
              <CardContent className="p-6 text-center space-y-4">
                <feature.icon className="w-12 h-12 mx-auto text-primary group-hover:animate-float transition-all" />
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Research Proposals Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Active Research Proposals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse current proposals where budgets remain encrypted until funding decisions.
            Vote as a DAO member to shape the future of scientific research.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {proposals.map((proposal) => (
            <ResearchProposal key={proposal.id} {...proposal} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="glass-morphism">
            <a href="/review">View All Proposals</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;