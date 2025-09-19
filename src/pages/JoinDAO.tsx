import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Lock, Zap, Database, Check, Wallet, CheckCircle, AlertCircle } from 'lucide-react';
import { useContract } from '@/hooks/useContract';
import { useAccount } from 'wagmi';

const JoinDAO = () => {
  const { address, isConnected } = useAccount();
  const { joinDAO, isJoining } = useContract();
  
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [joinStatus, setJoinStatus] = useState<'idle' | 'joining' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string>('');

  const membershipTiers = [
    {
      name: 'Researcher',
      price: '0.1 ETH',
      features: [
        'Submit research proposals',
        'Basic voting rights',
        'Access to research database',
        'Community forum access'
      ],
      popular: false
    },
    {
      name: 'Scholar',
      price: '0.5 ETH',
      features: [
        'Everything in Researcher',
        'Enhanced voting weight (5x)',
        'Proposal review privileges',
        'Early access to funded research',
        'Direct researcher contact'
      ],
      popular: true
    },
    {
      name: 'Patron',
      price: '2.0 ETH',
      features: [
        'Everything in Scholar',
        'Premium voting weight (10x)',
        'Proposal steering committee',
        'Research outcome NFTs',
        'Annual patron events',
        'Direct project collaboration'
      ],
      popular: false
    }
  ];

  const handleJoinTier = async (tierName: string) => {
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setJoinStatus('joining');
      setSelectedTier(tierName);
      
      // Join DAO with selected tier
      const result = await joinDAO({
        tier: tierName,
        member: address!
      });
      
      setTxHash(result.hash);
      setJoinStatus('success');
      
    } catch (error) {
      console.error('Joining DAO failed:', error);
      setJoinStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-lab">
      <Header />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Join the Research DAO</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Become a member of the world's first confidential research funding DAO.
              Your membership enables democratic funding decisions while protecting proposal confidentiality.
            </p>
          </div>

          {!isConnected ? (
            <Card className="glass-morphism max-w-md mx-auto mb-12">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center space-x-2">
                  <Wallet className="w-5 h-5" />
                  <span>Connect Your Wallet</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Connect your wallet to join the DAO and start participating in research funding decisions.
                </p>
                <Button 
                  onClick={handleConnectWallet}
                  size="lg" 
                  className="bg-gradient-dna hover:opacity-90 w-full"
                >
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {membershipTiers.map((tier, index) => (
                  <Card key={index} className={`glass-morphism relative ${tier.popular ? 'ring-2 ring-primary' : ''}`}>
                    {tier.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-dna">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{tier.name}</CardTitle>
                      <div className="text-3xl font-bold text-primary">{tier.price}</div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {tier.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        onClick={() => handleJoinTier(tier.name)}
                        className={`w-full ${tier.popular ? 'bg-gradient-dna hover:opacity-90' : ''}`}
                        variant={tier.popular ? 'default' : 'outline'}
                        disabled={!isConnected || joinStatus !== 'idle'}
                      >
                        {joinStatus === 'joining' && selectedTier === tier.name && 'Joining...'}
                        {joinStatus === 'success' && selectedTier === tier.name && 'Joined!'}
                        {joinStatus === 'error' && selectedTier === tier.name && 'Try Again'}
                        {joinStatus === 'idle' && `Join as ${tier.name}`}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Join Status */}
              {joinStatus !== 'idle' && (
                <div className="mt-8 p-4 rounded-lg border">
                  {joinStatus === 'joining' && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <Lock className="w-4 h-4 animate-spin" />
                      <span>Joining DAO with encrypted membership data...</span>
                    </div>
                  )}
                  {joinStatus === 'success' && (
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Successfully joined as {selectedTier}!</span>
                      {txHash && (
                        <a 
                          href={`https://sepolia.etherscan.io/tx/${txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Transaction
                        </a>
                      )}
                    </div>
                  )}
                  {joinStatus === 'error' && (
                    <div className="flex items-center space-x-2 text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>Joining failed. Please try again.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass-morphism">
              <CardContent className="p-6 text-center space-y-4">
                <Lock className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-lg font-semibold">Secure Governance</h3>
                <p className="text-sm text-muted-foreground">
                  Your voting power is secured by blockchain technology and cryptographic proofs.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardContent className="p-6 text-center space-y-4">
                <Zap className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-lg font-semibold">Fast Decisions</h3>
                <p className="text-sm text-muted-foreground">
                  Participate in rapid, democratic funding decisions without bureaucratic delays.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardContent className="p-6 text-center space-y-4">
                <Users className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-lg font-semibold">Global Network</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with researchers and funders from around the world in one platform.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-morphism">
              <CardContent className="p-6 text-center space-y-4">
                <Database className="w-12 h-12 mx-auto text-primary" />
                <h3 className="text-lg font-semibold">Research Access</h3>
                <p className="text-sm text-muted-foreground">
                  Get exclusive access to funded research outcomes and scientific breakthroughs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinDAO;