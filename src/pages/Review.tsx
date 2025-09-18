import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ResearchProposal from '@/components/ResearchProposal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, SortAsc } from 'lucide-react';

const Review = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

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
    },
    {
      id: '4',
      title: 'AI-Powered Protein Folding Prediction',
      researcher: 'Dr. James Liu',
      description: 'Developing advanced machine learning models to predict protein structures for drug development.',
      encryptedBudget: '0x9E2A...4B7C',
      actualBudget: '$2.1M ETH',
      status: 'rejected' as const,
      votes: 15,
      category: 'AI & Machine Learning'
    }
  ];

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         proposal.researcher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || proposal.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getProposalsByStatus = (status: string) => {
    if (status === 'all') return filteredProposals;
    return filteredProposals.filter(proposal => proposal.status === status);
  };

  return (
    <div className="min-h-screen bg-gradient-lab">
      <Header />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Review Research Proposals</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Review and evaluate research proposals submitted to the DAO. 
              Use your expertise to guide funding decisions for groundbreaking research.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <Card className="glass-morphism mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search proposals by title or researcher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="funded">Funded</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Biotechnology">Biotechnology</SelectItem>
                      <SelectItem value="Quantum Research">Quantum Research</SelectItem>
                      <SelectItem value="Environmental Science">Environmental Science</SelectItem>
                      <SelectItem value="AI & Machine Learning">AI & Machine Learning</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon">
                    <SortAsc className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proposals Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
              <TabsTrigger value="all">
                All ({filteredProposals.length})
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending ({getProposalsByStatus('pending').length})
              </TabsTrigger>
              <TabsTrigger value="funded">
                Funded ({getProposalsByStatus('funded').length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({getProposalsByStatus('rejected').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProposals.map((proposal) => (
                  <ResearchProposal key={proposal.id} {...proposal} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {getProposalsByStatus('pending').map((proposal) => (
                  <ResearchProposal key={proposal.id} {...proposal} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="funded" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {getProposalsByStatus('funded').map((proposal) => (
                  <ResearchProposal key={proposal.id} {...proposal} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rejected" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {getProposalsByStatus('rejected').map((proposal) => (
                  <ResearchProposal key={proposal.id} {...proposal} />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {filteredProposals.length === 0 && (
            <Card className="glass-morphism">
              <CardContent className="p-12 text-center">
                <Filter className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No proposals found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or filters to find more proposals.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Review;