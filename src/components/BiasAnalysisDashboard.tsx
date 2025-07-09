
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Eye,
  MessageCircle,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  FileText,
  Award,
  Target
} from "lucide-react";

interface BiasAnalysisDashboardProps {
  candidateName: string;
  interviewId: string;
  overallScore: number;
}

const BiasAnalysisDashboard: React.FC<BiasAnalysisDashboardProps> = ({ 
  candidateName, 
  interviewId, 
  overallScore 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const biasCategories = [
    {
      name: 'Language Bias',
      weight: 20,
      score: 12,
      details: {
        detected: 3,
        examples: [
          { text: "Are you planning to have children?", timestamp: "15:30", type: "Gender-based assumption" },
          { text: "You seem very articulate", timestamp: "22:45", type: "Cultural bias marker" }
        ]
      }
    },
    {
      name: 'Question Equity',
      weight: 25,
      score: 18,
      details: {
        detected: 2,
        examples: [
          { text: "Personal question about family", timestamp: "08:15", type: "Irrelevant personal question" },
          { text: "Easier technical question compared to previous candidate", timestamp: "35:20", type: "Difficulty inconsistency" }
        ]
      }
    },
    {
      name: 'Response Evaluation',
      weight: 15,
      score: 8,
      details: {
        detected: 1,
        examples: [
          { text: "Interrupted candidate 3 times", timestamp: "12:30", type: "Response interruption" }
        ]
      }
    },
    {
      name: 'Visual Analysis',
      weight: 30,
      score: 22,
      details: {
        detected: 4,
        examples: [
          { text: "Maintained less eye contact", timestamp: "Throughout", type: "Eye contact disparity" },
          { text: "Noted appearance-related comments", timestamp: "02:15", type: "Appearance bias" }
        ]
      }
    },
    {
      name: 'Contextual Factors',
      weight: 10,
      score: 5,
      details: {
        detected: 1,
        examples: [
          { text: "Interview ran 10 minutes shorter", timestamp: "End", type: "Duration variance" }
        ]
      }
    }
  ];

  const timelineEvents = [
    { time: "02:15", type: "Visual Analysis", severity: "medium", description: "Appearance-related comment detected" },
    { time: "08:15", type: "Question Equity", severity: "high", description: "Irrelevant personal question" },
    { time: "12:30", type: "Response Evaluation", severity: "medium", description: "Candidate interruption" },
    { time: "15:30", type: "Language Bias", severity: "high", description: "Gender-based assumption" },
    { time: "22:45", type: "Language Bias", severity: "low", description: "Cultural bias marker" },
    { time: "35:20", type: "Question Equity", severity: "medium", description: "Question difficulty inconsistency" }
  ];

  const getBiasLevel = (score: number) => {
    if (score <= 25) return { level: 'Minimal', color: 'text-green-500' };
    if (score <= 50) return { level: 'Low', color: 'text-yellow-500' };
    if (score <= 75) return { level: 'Moderate', color: 'text-orange-500' };
    return { level: 'High', color: 'text-red-500' };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'high': return 'border-orange-500 bg-orange-50 dark:bg-orange-900/20';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const biasLevelData = getBiasLevel(overallScore);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Bias Analysis Dashboard</h1>
          <p className="text-muted-foreground">Interview with {candidateName}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Interview ID: {interviewId}</Badge>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Executive Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <div className={`text-4xl font-bold ${biasLevelData.color}`}>
                  {overallScore}
                </div>
                <div className="text-sm text-muted-foreground">Overall Bias Score</div>
                <Badge variant="outline" className={biasLevelData.color}>
                  {biasLevelData.level} Bias
                </Badge>
              </div>
              <Progress value={overallScore} className="h-3" />
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-500 font-medium">Personal Baseline</div>
                  <div>22</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-500 font-medium">Department Avg</div>
                  <div>28</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-500 font-medium">Trend</div>
                  <div className="flex items-center justify-center">
                    <TrendingDown className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Bias Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">6</div>
              <div className="text-sm text-muted-foreground">Total Detected</div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>High</span>
                  <span className="text-red-500">2</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Medium</span>
                  <span className="text-yellow-500">3</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Low</span>
                  <span className="text-green-500">1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Confidence Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">87%</div>
              <div className="text-sm text-muted-foreground">Algorithm Confidence</div>
              <div className="mt-2">
                <Badge variant="outline" className="text-blue-500">
                  High Confidence
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="categories">Category Breakdown</TabsTrigger>
          <TabsTrigger value="timeline">Evidence Timeline</TabsTrigger>
          <TabsTrigger value="training">Training Recommendations</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bias Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {biasCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{category.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">Weight: {category.weight}%</span>
                        <span className={`text-sm font-medium ${
                          category.score <= 15 ? 'text-green-500' : 
                          category.score <= 25 ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {category.score}
                        </span>
                      </div>
                    </div>
                    <Progress value={category.score} className="h-2" />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                    >
                      {selectedCategory === category.name ? 'Hide Details' : 'Show Details'}
                    </Button>
                    {selectedCategory === category.name && (
                      <div className="mt-2 space-y-2 text-xs">
                        <div className="font-medium">Detected {category.details.detected} instances:</div>
                        {category.details.examples.map((example, idx) => (
                          <Alert key={idx} className="p-2">
                            <AlertTriangle className="h-3 w-3" />
                            <AlertDescription>
                              <div className="flex justify-between">
                                <span>"{example.text}"</span>
                                <span className="text-muted-foreground">{example.timestamp}</span>
                              </div>
                              <div className="text-blue-600 mt-1">{example.type}</div>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Impact Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-medium">Primary Concerns</div>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• Question equity issues may impact candidate experience</li>
                        <li>• Visual analysis patterns suggest unconscious bias</li>
                        <li>• Language bias detected in multiple instances</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                  
                  <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-medium">Positive Aspects</div>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• Low response evaluation bias</li>
                        <li>• Minimal contextual factor issues</li>
                        <li>• Improvement from previous interviews</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Evidence Timeline</CardTitle>
              <p className="text-sm text-muted-foreground">Chronological view of all bias events during the interview</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={index} className={`border-l-4 pl-4 pb-4 ${getSeverityColor(event.severity)} border-l-current`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{event.time}</span>
                          <Badge variant="outline" className="text-xs">{event.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Recommended Training</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Unconscious Bias in Interviewing</div>
                        <div className="text-sm text-muted-foreground">Focus on visual analysis and question equity</div>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge variant="outline">Priority: High</Badge>
                          <Badge variant="outline">Duration: 2 hours</Badge>
                        </div>
                      </div>
                      <Button size="sm">Start</Button>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">Inclusive Language Training</div>
                        <div className="text-sm text-muted-foreground">Address language bias patterns</div>
                        <div className="flex items-center mt-2 space-x-2">
                          <Badge variant="outline">Priority: Medium</Badge>
                          <Badge variant="outline">Duration: 1 hour</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Schedule</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Training Progress</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Completed Modules</span>
                      <span>8/12</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Certifications</span>
                      <span>3</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Bias Score Improvement</span>
                      <span className="text-green-500">-12 points</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    View Full Training Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Historical Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Previous Interview (2 weeks ago)</span>
                    <span className="text-muted-foreground">Score: 34</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Interview</span>
                    <span className="font-medium">Score: {overallScore}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">Improvement: -19 points</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peer Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Department Average</span>
                    <span className="text-muted-foreground">28</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Your Score</span>
                    <span className="font-medium">{overallScore}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-500">Below average by 13 points</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BiasAnalysisDashboard;
