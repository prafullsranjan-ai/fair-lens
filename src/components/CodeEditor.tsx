
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Code, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Copy, 
  Eye, 
  EyeOff,
  Zap,
  Shield,
  Brain
} from "lucide-react";

interface CodeEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [aiAnalysis, setAiAnalysis] = useState({
    biasScore: 95,
    plagiarismScore: 8,
    aiGeneratedScore: 12,
    issues: [] as string[],
    suggestions: [] as string[]
  });
  const [showAnalysis, setShowAnalysis] = useState(true);
  const [collaborators, setCollaborators] = useState([
    { name: 'Interviewer', color: 'bg-blue-500', active: true },
    { name: 'Candidate', color: 'bg-green-500', active: true }
  ]);

  // Simulate real-time AI analysis
  useEffect(() => {
    if (code.length > 0) {
      const timer = setTimeout(() => {
        // Simulate AI analysis based on code content
        const issues = [];
        const suggestions = [];
        
        if (code.toLowerCase().includes('guys') || code.toLowerCase().includes('blacklist')) {
          issues.push('Potentially biased language detected');
        }
        
        if (code.includes('// TODO') || code.includes('function example')) {
          suggestions.push('Consider using more descriptive variable names');
        }
        
        const biasScore = issues.length > 0 ? Math.max(60, 95 - issues.length * 15) : 95;
        const plagiarismScore = code.length > 100 ? Math.random() * 15 : Math.random() * 5;
        const aiGeneratedScore = code.includes('function') && code.includes('return') ? Math.random() * 20 : Math.random() * 10;
        
        setAiAnalysis({
          biasScore: Math.round(biasScore),
          plagiarismScore: Math.round(plagiarismScore),
          aiGeneratedScore: Math.round(aiGeneratedScore),
          issues,
          suggestions
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [code]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col theme-card">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <Code className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-bold text-foreground">Live Code Editor</h2>
            <div className="flex items-center space-x-2">
              {collaborators.map((collab, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <div className={`w-3 h-3 rounded-full ${collab.color} ${collab.active ? 'animate-pulse' : ''}`} />
                  <span className="text-sm text-muted-foreground">{collab.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="theme-button"
            >
              {showAnalysis ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showAnalysis ? 'Hide' : 'Show'} Analysis
            </Button>
            <Button variant="outline" onClick={onClose} className="theme-button">
              Close
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-3 border-b bg-muted/30 dark:bg-muted/20">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="theme-button">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <Users className="h-3 w-3 mr-1" />
                  Live Collaboration
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`Write your ${language} code here...\n\n// This editor supports real-time collaboration\n// AI analysis will provide feedback on bias, plagiarism, and code quality`}
                className="h-full font-mono text-sm resize-none focus:ring-2 focus:ring-primary theme-transition"
                style={{ minHeight: '400px' }}
              />
            </div>
          </div>

          {/* AI Analysis Panel */}
          {showAnalysis && (
            <>
              <Separator orientation="vertical" />
              <div className="w-80 flex flex-col bg-muted/10 dark:bg-muted/5">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-foreground mb-2">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">Real-time code analysis</p>
                </div>
                
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {/* Bias Detection */}
                  <Card className="theme-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-blue-500" />
                        Bias Detection
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Score</span>
                        <span className={`font-bold ${aiAnalysis.biasScore > 80 ? 'text-green-600' : aiAnalysis.biasScore > 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {aiAnalysis.biasScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${aiAnalysis.biasScore > 80 ? 'bg-green-500' : aiAnalysis.biasScore > 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${aiAnalysis.biasScore}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Plagiarism Detection */}
                  <Card className="theme-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center">
                        <Eye className="h-4 w-4 mr-2 text-purple-500" />
                        Plagiarism Check
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Similarity</span>
                        <span className={`font-bold ${aiAnalysis.plagiarismScore < 10 ? 'text-green-600' : aiAnalysis.plagiarismScore < 30 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {aiAnalysis.plagiarismScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${aiAnalysis.plagiarismScore < 10 ? 'bg-green-500' : aiAnalysis.plagiarismScore < 30 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(aiAnalysis.plagiarismScore, 100)}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* AI-Generated Code Detection */}
                  <Card className="theme-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center">
                        <Brain className="h-4 w-4 mr-2 text-orange-500" />
                        AI-Generated Detection
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Probability</span>
                        <span className={`font-bold ${aiAnalysis.aiGeneratedScore < 15 ? 'text-green-600' : aiAnalysis.aiGeneratedScore < 40 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {aiAnalysis.aiGeneratedScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${aiAnalysis.aiGeneratedScore < 15 ? 'bg-green-500' : aiAnalysis.aiGeneratedScore < 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(aiAnalysis.aiGeneratedScore, 100)}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Issues */}
                  {aiAnalysis.issues.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                        Issues Found
                      </h4>
                      {aiAnalysis.issues.map((issue, index) => (
                        <Alert key={index} className="mb-2 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30">
                          <AlertDescription className="text-sm text-red-800 dark:text-red-200">
                            {issue}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  )}

                  {/* Suggestions */}
                  {aiAnalysis.suggestions.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-blue-500" />
                        Suggestions
                      </h4>
                      {aiAnalysis.suggestions.map((suggestion, index) => (
                        <Alert key={index} className="mb-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30">
                          <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                            {suggestion}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  )}

                  {aiAnalysis.issues.length === 0 && aiAnalysis.suggestions.length === 0 && code.length > 0 && (
                    <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/30">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-sm text-green-800 dark:text-green-200">
                        Code looks good! No issues detected.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
