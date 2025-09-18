import React from 'react';
import { Button } from '@/components/ui/button';
import DNALogo from './DNALogo';
import { Wallet } from 'lucide-react';

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
        
        <Button 
          variant="outline" 
          onClick={handleWalletConnect}
          className="glass-morphism hover:bg-primary hover:text-primary-foreground transition-all duration-300"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};

export default Header;