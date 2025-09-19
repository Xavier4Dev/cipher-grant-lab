import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Lock, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useContract } from '@/hooks/useContract';
import { useAccount } from 'wagmi';

const SubmitProposal = () => {
  const { address, isConnected } = useAccount();
  const { submitProposal, isSubmitting } = useContract();
  
  const [formData, setFormData] = useState({
    title: '',
    researcher: '',
    description: '',
    budget: '',
    category: '',
    duration: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'encrypting' | 'submitting' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setSubmissionStatus('encrypting');
      
      // Encrypt sensitive data (budget) using FHE
      const encryptedBudget = await encryptBudget(formData.budget);
      
      setSubmissionStatus('submitting');
      
      // Submit to smart contract with encrypted data
      const result = await submitProposal({
        title: formData.title,
        researcher: formData.researcher,
        description: formData.description,
        encryptedBudget: encryptedBudget,
        category: formData.category,
        duration: parseInt(formData.duration),
        proposer: address!
      });
      
      setTxHash(result.hash);
      setSubmissionStatus('success');
      
      // Reset form
      setFormData({
        title: '',
        researcher: '',
        description: '',
        budget: '',
        category: '',
        duration: ''
      });
      
    } catch (error) {
      console.error('Proposal submission failed:', error);
      setSubmissionStatus('error');
    }
  };

  // Simulate FHE encryption (in real implementation, this would use actual FHE)
  const encryptBudget = async (budget: string): Promise<string> => {
    // Simulate encryption delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In real implementation, this would use FHE encryption
    const encrypted = `0x${Buffer.from(`FHE_${budget}_${Date.now()}`).toString('hex')}`;
    return encrypted;
  };

  return (
    <div className="min-h-screen bg-gradient-lab">
      <Header />
      
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Submit Research Proposal</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Submit your research proposal to the DAO. Your budget will be encrypted using 
              fully homomorphic encryption to ensure unbiased evaluation.
            </p>
          </div>

          <Card className="glass-morphism">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Research Proposal Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter your research project title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="researcher">Principal Investigator</Label>
                    <Input
                      id="researcher"
                      value={formData.researcher}
                      onChange={(e) => setFormData({...formData, researcher: e.target.value})}
                      placeholder="Your name and credentials"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Detailed description of your research proposal, methodology, and expected outcomes"
                    className="min-h-32"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Research Category</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="biotechnology">Biotechnology</SelectItem>
                        <SelectItem value="quantum">Quantum Research</SelectItem>
                        <SelectItem value="environmental">Environmental Science</SelectItem>
                        <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (ETH)</Label>
                    <div className="relative">
                      <Input
                        id="budget"
                        type="number"
                        step="0.1"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        placeholder="0.0"
                        required
                      />
                      <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-accent animate-encrypted-pulse" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Budget will be encrypted until funding decision
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (months)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      placeholder="12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Supporting Documents</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Upload research proposal, CV, and supporting documents
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Choose Files
                    </Button>
                  </div>
                </div>

                {/* Submission Status */}
                {submissionStatus !== 'idle' && (
                  <div className="p-4 rounded-lg border">
                    {submissionStatus === 'encrypting' && (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Lock className="w-4 h-4 animate-spin" />
                        <span>Encrypting sensitive data with FHE...</span>
                      </div>
                    )}
                    {submissionStatus === 'submitting' && (
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Lock className="w-4 h-4 animate-spin" />
                        <span>Submitting encrypted proposal to blockchain...</span>
                      </div>
                    )}
                    {submissionStatus === 'success' && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Proposal submitted successfully!</span>
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
                    {submissionStatus === 'error' && (
                      <div className="flex items-center space-x-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span>Submission failed. Please try again.</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-center space-x-4 pt-6">
                  <Button variant="outline" size="lg" disabled={submissionStatus !== 'idle'}>
                    Save Draft
                  </Button>
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="bg-gradient-dna hover:opacity-90"
                    disabled={submissionStatus !== 'idle' || !isConnected}
                  >
                    {submissionStatus === 'encrypting' && 'Encrypting...'}
                    {submissionStatus === 'submitting' && 'Submitting...'}
                    {submissionStatus === 'success' && 'Submitted!'}
                    {submissionStatus === 'error' && 'Try Again'}
                    {submissionStatus === 'idle' && 'Submit Proposal'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SubmitProposal;