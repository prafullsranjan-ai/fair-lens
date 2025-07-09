import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  AlertTriangle, 
  Minimize2, 
  Maximize2, 
  Volume2, 
  VolumeX,
  Eye,
  Clock,
  MessageCircle,
  TrendingUp,
  Info
} from "lucide-react";

interface BiasEvent {
  id: string;
  timestamp: string;
  category: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggestion: string;
  confidence: number;
}

interface LiveBiasMonitorProps {
  isActive: boolean;
  interviewDuration: number;
}

const LiveBiasMonitor: React.FC<LiveBiasMonitorProps> = ({ isActive, interviewDuration }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentBiasScore, setCurrentBiasScore] = useState(85);
  const [biasEvents, setBiasEvents] = useState<BiasEvent[]>([]);

  // Mock real-time bias detection
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      // Simulate bias score fluctuation (keep it high for demo)
      setCurrentBiasScore(prev => Math.max(75, Math.min(95, prev + (Math.random() - 0.5) * 5)));

      // Occasionally add new bias events
      if (Math.random() < 0.08) {
        const newEvent: BiasEvent = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          category: ['Language Bias', 'Question Equity', 'Response Evaluation', 'Visual Analysis'][Math.floor(Math.random() * 4)],
          severity: ['low', 'medium'][Math.floor(Math.random() * 2)] as 'low' | 'medium',
          description: 'Potential improvement opportunity detected',
          suggestion: 'Continue with professional approach',
          confidence: Math.floor(Math.random() * 20) + 75
        };
        setBiasEvents(prev => [newEvent, ...prev.slice(0, 4)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getBiasColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBiasLevel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'high': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'critical': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  if (!isActive) return null;

  return (
    <div>
      <Card className="theme-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">Bias Monitor</CardTitle>
            <div className="flex items-center space-x-1">
              <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                       <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-ping"/>
                       Live
              </Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMuted(!isMuted)}
                className="h-6 w-6 p-0"
              >
                {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-6 w-6 p-0"
              >
                {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="space-y-3">
            {/* Current Bias Score */}
            <div className="text-center">
              <div className={`text-2xl font-bold ${getBiasColor(currentBiasScore)}`}>
                {currentBiasScore.toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">Bias Score</div>
              <Badge variant="outline" className={getBiasColor(currentBiasScore)}>
                {getBiasLevel(currentBiasScore)}
              </Badge>
              <Progress value={currentBiasScore} className="mt-2 h-2" />
            </div>

            {/* Active Categories */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Active Categories</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                      <Info className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 text-sm">
                    <div className="space-y-2">
                      <h4 className="font-medium">Bias Categories</h4>
                      <div className="space-y-1 text-xs">
                        <div><strong>Language Bias (20%):</strong> Gendered language, cultural bias markers</div>
                        <div><strong>Question Equity (25%):</strong> Relevant questions, difficulty consistency</div>
                        <div><strong>Response Evaluation (15%):</strong> Fair assessment, encouragement balance</div>
                        <div><strong>Visual Analysis (30%):</strong> Professional interaction, eye contact</div>
                        <div><strong>Contextual Factors (10%):</strong> Duration appropriateness, technical handling</div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between">
                  <span>Language</span>
                  <span className="text-green-500">88%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Questions</span>
                  <span className="text-green-500">82%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Response</span>
                  <span className="text-green-500">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Visual</span>
                  <span className="text-yellow-500">78%</span>
                </div>
              </div>
            </div>

            {/* Recent Events */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Recent Alerts</span>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{Math.floor(interviewDuration / 60)}:{(interviewDuration % 60).toString().padStart(2, '0')}</span>
                </div>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {biasEvents.length === 0 ? (
                  <div className="text-xs text-muted-foreground text-center py-2">
                    🎉 Excellent performance! No bias events detected
                  </div>
                ) : (
                  biasEvents.map((event) => (
                    <Alert key={event.id} className={`p-2 ${getSeverityColor(event.severity)}`}>
                      <AlertTriangle className="h-3 w-3" />
                      <AlertDescription className="text-xs">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{event.category}</div>
                            <div className="text-muted-foreground">{event.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs">{event.timestamp}</div>
                            <div className="text-xs">{event.confidence}% confident</div>
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-blue-600 dark:text-blue-400">
                          💡 {event.suggestion}
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))
                )}
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default LiveBiasMonitor;
