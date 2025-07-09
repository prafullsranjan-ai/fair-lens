import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Eye, 
  Info, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Award,
  Clock
} from "lucide-react";

interface BiasScoreWidgetProps {
  score: number;
  trend?: 'up' | 'down' | 'stable';
  showDetails?: boolean;
  compact?: boolean;
}

export const BiasScoreWidget: React.FC<BiasScoreWidgetProps> = ({ 
  score, 
  trend = 'stable', 
  showDetails = false,
  compact = false 
}) => {
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  if (compact) {
    return (
      <div className="flex items-center space-x-2">
        <div className={`text-lg font-bold ${getBiasColor(score)}`}>{score}</div>
        <Badge variant="outline" className={`text-xs ${getBiasColor(score)}`}>
          {getBiasLevel(score)}
        </Badge>
        {getTrendIcon(trend)}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Info className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium">Bias Score Breakdown</h4>
              <Progress value={score} className="h-2" />
              <div className="text-sm space-y-1">
                <div>Language Bias: {Math.floor(score * 0.2)}/20</div>
                <div>Question Equity: {Math.floor(score * 0.25)}/25</div>
                <div>Response Evaluation: {Math.floor(score * 0.15)}/15</div>
                <div>Visual Analysis: {Math.floor(score * 0.30)}/30</div>
                <div>Contextual Factors: {Math.floor(score * 0.10)}/10</div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center space-x-2">
          <Eye className="h-4 w-4" />
          <span>Bias Score</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-2">
          <div className={`text-3xl font-bold ${getBiasColor(score)}`}>{score}</div>
          <Badge variant="outline" className={getBiasColor(score)}>
            {getBiasLevel(score)}
          </Badge>
          <Progress value={score} className="h-2" />
          <div className="flex items-center justify-center space-x-2">
            {getTrendIcon(trend)}
            <span className="text-sm text-muted-foreground">
              {trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Stable'}
            </span>
          </div>
        </div>
        {showDetails && (
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span>Language Bias</span>
              <span className={getBiasColor(Math.floor(score * 0.2))}>{Math.floor(score * 0.2)}/20</span>
            </div>
            <div className="flex justify-between">
              <span>Question Equity</span>
              <span className={getBiasColor(Math.floor(score * 0.25))}>{Math.floor(score * 0.25)}/25</span>
            </div>
            <div className="flex justify-between">
              <span>Response Evaluation</span>
              <span className={getBiasColor(Math.floor(score * 0.15))}>{Math.floor(score * 0.15)}/15</span>
            </div>
            <div className="flex justify-between">
              <span>Visual Analysis</span>
              <span className={getBiasColor(Math.floor(score * 0.30))}>{Math.floor(score * 0.30)}/30</span>
            </div>
            <div className="flex justify-between">
              <span>Contextual Factors</span>
              <span className={getBiasColor(Math.floor(score * 0.10))}>{Math.floor(score * 0.10)}/10</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ConfidenceIndicatorProps {
  confidence: number;
  factors?: string[];
}

export const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ 
  confidence, 
  factors = [] 
}) => {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 90) return 'text-green-500';
    if (conf >= 70) return 'text-blue-500';
    if (conf >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfidenceLevel = (conf: number) => {
    if (conf >= 90) return 'Very High';
    if (conf >= 70) return 'High';
    if (conf >= 50) return 'Medium';
    return 'Low';
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`text-sm font-medium ${getConfidenceColor(confidence)}`}>
        {confidence}%
      </div>
      <Badge variant="outline" className={`text-xs ${getConfidenceColor(confidence)}`}>
        {getConfidenceLevel(confidence)} Confidence
      </Badge>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Info className="h-3 w-3" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-medium">Confidence Factors</h4>
            <Progress value={confidence} className="h-2" />
            <div className="text-sm">
              <p className="mb-2">Algorithm confidence in bias detection based on:</p>
              <ul className="space-y-1 text-xs">
                {factors.length > 0 ? factors.map((factor, index) => (
                  <li key={index}>• {factor}</li>
                )) : (
                  <>
                    <li>• Audio quality and clarity</li>
                    <li>• Video resolution and visibility</li>
                    <li>• Historical pattern consistency</li>
                    <li>• Multiple detection methods agreement</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface EvidenceCardProps {
  timestamp: string;
  category: string;
  description: string;
  suggestion: string;
  severity: 'low' | 'medium' | 'high';
  transcript?: string;
  onReview?: () => void;
  onDispute?: () => void;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  timestamp,
  category,
  description,
  suggestion,
  severity,
  transcript,
  onReview,
  onDispute
}) => {
  const getSeverityColor = (sev: string) => {
    switch (sev) {
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getSeverityIcon = (sev: string) => {
    switch (sev) {
      case 'low': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card className={`${getSeverityColor(severity)}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center space-x-2">
            {getSeverityIcon(severity)}
            <span>{category}</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm">{description}</div>
        
        {transcript && (
          <div className="p-2 bg-muted/50 rounded text-xs">
            <div className="font-medium mb-1">Transcript:</div>
            <div className="italic">"{transcript}"</div>
          </div>
        )}
        
        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
          <div className="font-medium mb-1 text-blue-600">💡 Suggestion:</div>
          <div>{suggestion}</div>
        </div>
        
        <div className="flex space-x-2">
          {onReview && (
            <Button size="sm" variant="outline" onClick={onReview}>
              Review Evidence
            </Button>
          )}
          {onDispute && (
            <Button size="sm" variant="ghost" onClick={onDispute}>
              Dispute
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface TrainingRecommendationProps {
  modules: Array<{
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    duration: string;
    progress?: number;
  }>;
  onStartTraining?: (moduleTitle: string) => void;
}

export const TrainingRecommendation: React.FC<TrainingRecommendationProps> = ({
  modules,
  onStartTraining
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Award className="h-5 w-5" />
          <span>Recommended Training</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {modules.map((module, index) => (
          <div key={index} className={`p-3 border rounded-lg ${getPriorityColor(module.priority)}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-medium">{module.title}</div>
                <div className="text-sm text-muted-foreground">{module.description}</div>
              </div>
              <Button 
                size="sm" 
                onClick={() => onStartTraining?.(module.title)}
              >
                {module.progress ? 'Continue' : 'Start'}
              </Button>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Badge variant="outline" className="text-xs">
                Priority: {module.priority}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {module.duration}
              </Badge>
              {module.progress && (
                <Badge variant="outline" className="text-xs">
                  {module.progress}% Complete
                </Badge>
              )}
            </div>
            {module.progress && (
              <Progress value={module.progress} className="h-2 mt-2" />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
