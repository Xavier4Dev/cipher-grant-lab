import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ThumbsUp, ThumbsDown, Clock, Users, Lock, MessageSquare } from 'lucide-react';

const Vote = () => {
  const [selectedVote, setSelectedVote] = useState<'approve' | 'reject' | null>(null);
  const [comment, setComment] = useState('');

  const activeProposal = {
    id: '1',
    title: 'CRISPR Gene Therapy for Rare Diseases',
    researcher: 'Dr. Sarah Chen',
    description: 'Investigating novel CRISPR-Cas9 applications for treating genetic disorders affecting fewer than 200,000 individuals worldwide. This research aims to develop targeted gene editing techniques that can address the root causes of rare genetic conditions, potentially transforming treatment options for millions of patients globally.',
    encryptedBudget: '0x4A7B...9F3E',
    actualBudget: '$2.4M ETH',
    status: 'pending' as const,
    votes: 47,
    category: 'Biotechnology',
    votingEnds: '2024-01-15T23:59:59Z',
    approveVotes: 32,
    rejectVotes: 15,
    totalVotingPower: 150,
    usedVotingPower: 47
  };

  const votingHistory = [
    {
      id: '2',
      title: 'Quantum Computing for Drug Discovery',
      result: 'Funded',
      myVote: 'Approve',
      finalVotes: '89 Approve, 23 Reject'
    },
    {
      id: '3',
      title: 'AI-Powered Climate Modeling',
      result: 'Rejected',
      myVote: 'Reject',
      finalVotes: '34 Approve, 78 Reject'
    }
  ];

  const handleVote = () => {
    if (!selectedVote) return;
    
    console.log('Voting:', selectedVote, 'Comment:', comment);
    // Handle voting logic
  };

  const progressPercentage = (activeProposal.usedVotingPower / activeProposal.totalVotingPower) * 100;
  const approvePercentage = (activeProposal.approveVotes / activeProposal.usedVotingPower) * 100;

  return (
    <div className="min-h-screen bg-gradient-lab">
      <Header />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">DAO Voting</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Exercise your voting power to shape the future of scientific research funding.
              Your votes remain confidential while ensuring transparent outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Proposal Voting */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-morphism">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{activeProposal.title}</CardTitle>
                      <p className="text-muted-foreground">
                        Principal Investigator: {activeProposal.researcher}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{activeProposal.category}</Badge>
                      <Badge className="bg-primary">Active Voting</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-foreground leading-relaxed">
                    {activeProposal.description}
                  </p>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-accent animate-encrypted-pulse" />
                      <span className="text-sm font-medium">Encrypted Budget:</span>
                      <code className="text-sm font-mono text-muted-foreground animate-encrypted-pulse">
                        {activeProposal.encryptedBudget}
                      </code>
                    </div>
                  </div>

                  {/* Voting Options */}
                  <div className="space-y-4">
                    <Label className="text-base font-semibold">Cast Your Vote</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        variant={selectedVote === 'approve' ? 'default' : 'outline'}
                        onClick={() => setSelectedVote('approve')}
                        className={`h-16 ${selectedVote === 'approve' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                      >
                        <ThumbsUp className="w-5 h-5 mr-2" />
                        Approve Funding
                      </Button>
                      <Button
                        variant={selectedVote === 'reject' ? 'default' : 'outline'}
                        onClick={() => setSelectedVote('reject')}
                        className={`h-16 ${selectedVote === 'reject' ? 'bg-red-600 hover:bg-red-700' : ''}`}
                      >
                        <ThumbsDown className="w-5 h-5 mr-2" />
                        Reject Proposal
                      </Button>
                    </div>
                  </div>

                  {/* Comment Section */}
                  <div className="space-y-2">
                    <Label htmlFor="comment">Voting Comment (Optional)</Label>
                    <Textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your reasoning for this vote..."
                      className="min-h-24"
                    />
                  </div>

                  <Button 
                    onClick={handleVote}
                    disabled={!selectedVote}
                    size="lg"
                    className="w-full bg-gradient-dna hover:opacity-90"
                  >
                    Submit Vote
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Voting Stats and History */}
            <div className="space-y-6">
              {/* Current Voting Stats */}
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Voting Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Participation</span>
                      <span>{activeProposal.usedVotingPower}/{activeProposal.totalVotingPower}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm">Approve</span>
                      </div>
                      <span className="font-semibold">{activeProposal.approveVotes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <ThumbsDown className="w-4 h-4 text-red-600" />
                        <span className="text-sm">Reject</span>
                      </div>
                      <span className="font-semibold">{activeProposal.rejectVotes}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-muted">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Voting ends in 2 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Voting History */}
              <Card className="glass-morphism">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Voting History</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {votingHistory.map((vote) => (
                    <div key={vote.id} className="p-3 rounded-lg bg-muted/30 space-y-2">
                      <div className="font-medium text-sm">{vote.title}</div>
                      <div className="flex justify-between items-center text-xs">
                        <Badge variant={vote.result === 'Funded' ? 'default' : 'secondary'}>
                          {vote.result}
                        </Badge>
                        <span className="text-muted-foreground">
                          My vote: {vote.myVote}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {vote.finalVotes}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vote;