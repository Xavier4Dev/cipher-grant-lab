import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, Lock, Users } from 'lucide-react';

interface ResearchProposalProps {
  id: string;
  title: string;
  researcher: string;
  description: string;
  encryptedBudget: string;
  actualBudget: string;
  status: 'pending' | 'funded' | 'rejected';
  votes: number;
  category: string;
}

const ResearchProposal: React.FC<ResearchProposalProps> = ({
  title,
  researcher,
  description,
  encryptedBudget,
  actualBudget,
  status,
  votes,
  category,
}) => {
  const [showBudget, setShowBudget] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'funded': return 'bg-primary text-primary-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="glass-morphism hover:shadow-microscope transition-all duration-500 group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Principal Investigator: {researcher}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            <Badge className={getStatusColor(status)}>
              {status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4 text-accent animate-encrypted-pulse" />
            <span className="text-sm font-medium">Budget:</span>
            <code className={`text-sm font-mono transition-all duration-300 ${
              showBudget ? 'text-primary' : 'text-muted-foreground animate-encrypted-pulse'
            }`}>
              {showBudget ? actualBudget : encryptedBudget}
            </code>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowBudget(!showBudget)}
            className="h-6 w-6 p-0"
          >
            {showBudget ? (
              <EyeOff className="w-3 h-3" />
            ) : (
              <Eye className="w-3 h-3" />
            )}
          </Button>
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{votes} DAO votes</span>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              Review
            </Button>
            <Button size="sm" className="bg-gradient-dna hover:opacity-90">
              Vote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResearchProposal;