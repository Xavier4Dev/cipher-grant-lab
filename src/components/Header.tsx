import React from 'react';
import { Button } from '@/components/ui/button';
import DNALogo from './DNALogo';
import { Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const handleWalletConnect = () => {
    // Wallet connect functionality will be implemented here
    console.log('Connecting wallet...');
  };

  return (
    <header className="w-full border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <DNALogo className="animate-float" />
          <div>
            <h1 className="text-2xl font-bold bg-gradient-dna bg-clip-text text-transparent">
              Research Grants Secured by FHE
            </h1>
            <p className="text-sm text-muted-foreground">
              Confidential DAO Research Funding Platform
            </p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/submit-proposal" className="text-foreground hover:text-primary transition-colors">
            Submit Proposal
          </Link>
          <Link to="/review" className="text-foreground hover:text-primary transition-colors">
            Review
          </Link>
          <Link to="/vote" className="text-foreground hover:text-primary transition-colors">
            Vote
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" className="glass-morphism">
            <Link to="/join-dao">Join DAO</Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={handleWalletConnect}
            className="glass-morphism hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            <Wallet className="w-4 h-4 mr-2" />
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;