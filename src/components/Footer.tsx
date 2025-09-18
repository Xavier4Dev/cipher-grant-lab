import React from 'react';
import { Github, Twitter, BookOpen, Microscope } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-gradient-lab py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Research Platform</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advancing scientific research through decentralized funding and fully homomorphic encryption.
            </p>
            <div className="flex space-x-4">
              <Github className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <BookOpen className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Whitepaper
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Grant Guidelines
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Scientific Excellence</h3>
            <div className="flex items-center space-x-4">
              <Microscope className="w-8 h-8 text-primary animate-microscope-focus" />
              <Microscope className="w-6 h-6 text-accent animate-microscope-focus" style={{ animationDelay: '1s' }} />
              <Microscope className="w-10 h-10 text-primary-glow animate-microscope-focus" style={{ animationDelay: '2s' }} />
            </div>
            <p className="text-xs text-muted-foreground">
              Powered by blockchain transparency and cryptographic privacy
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 Confidential DAO Research Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;