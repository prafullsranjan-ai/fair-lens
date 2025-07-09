
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
  Eye,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  FileText,
  Award,
  Target,
  Calendar,
  User,
  BarChart3,
  MessageCircle
} from "lucide-react";
import BiasAnalysisDashboard from "./BiasAnalysisDashboard";

interface ComprehensiveTransparencyReportProps {
  interviewerName: string;
  interviewerId: string;
  overallBiasScore: number;
}

const ComprehensiveTransparencyReport: React.FC<ComprehensiveTransparencyReportProps> = ({ 
  interviewerName, 
  interviewerId, 
  overallBiasScore 
}) => {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showInterviewReport, setShowInterviewReport] = useState(false);

  // Mock interview history data for the interviewer
  const interviewHistory = [
    {
      id: 1,
      candidateName: "Sarah Johnson",
      position: "Frontend Developer",
      date: "2024-06-25",
      biasScore: 15,
      status: "completed",
      duration: "45 min",
      feedback: {
        technicalSkills: 4,
        communication: 5,
        problemSolving: 4,
        overallRating: 4
      }
    },
    {
      id: 2,
      candidateName: "Michael Chen",
      position: "Backend Engineer",
      date: "2024-06-23",
      biasScore: 22,
      status: "completed",
      duration: "50 min",
      feedback: {
        technicalSkills: 3,
        communication: 4,
        problemSolving: 3,
        overallRating: 3
      }
    },
    {
      id: 3,
      candidateName: "Emily Davis",
      position: "Full Stack Developer",
      date: "2024-06-20",
      biasScore: 8,
      status: "completed",
      duration: "42 min",
      feedback: {
        technicalSkills: 5,
        communication: 4,
        problemSolving: 5,
        overallRating: 5
      }
    },
    {
      id: 4,
      candidateName: "David Rodriguez",
      position: "DevOps Engineer",
      date: "2024-06-18",
      biasScore: 28,
      status: "completed",
      duration: "38 min",
      feedback: {
        technicalSkills: 3,
        communication: 3,
        problemSolving: 4,
        overallRating: 3
      }
    }
  ];

  const getBiasLevel = (score: number) => {
    if (score <= 15) return { level: 'Excellent', color: 'text-green-500' };
    if (score <= 25) return { level: 'Good', color: 'text-blue-500' };
    if (score <= 35) return { level: 'Needs Improvement', color: 'text-orange-500' };
    return { level: 'Critical', color: 'text-red-500' };
  };

  const showInterviewDetails = (interview) => {
    setSelectedInterview(interview);
    setShowInterviewReport(true);
  };

  const biasLevelData = getBiasLevel(overallBiasScore);

  if (showInterviewReport && selectedInterview) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowInterviewReport(false)}
          >
            ← Back to Transparency Report
          </Button>
          <div className="text-sm text-muted-foreground">
            Interview Report for {selectedInterview.candidateName}
          </div>
        </div>
        <BiasAnalysisDashboard 
          candidateName={selectedInterview.candidateName}
          interviewId={selectedInterview.id.toString()}
          overallScore={selectedInterview.biasScore}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Comprehensive Transparency Report</h1>
          <p className="text-muted-foreground">Detailed performance analysis for {interviewerName}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Interviewer ID: {interviewerId}</Badge>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Performance Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <div className={`text-4xl font-bold ${biasLevelData.color}`}>
                  {overallBiasScore}
                </div>
                <div className="text-sm text-muted-foreground">Overall Bias Score</div>
                <Badge variant="outline" className={biasLevelData.color}>
                  {biasLevelData.level}
                </Badge>
              </div>
              <Progress value={100 - overallBiasScore} className="h-3" />
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-500 font-medium">Personal Best</div>
                  <div>8</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-500 font-medium">Dept Average</div>
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
            <CardTitle className="text-sm">Total Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">{interviewHistory.length}</div>
              <div className="text-sm text-muted-foreground">This Month</div>
              <div className="mt-2">
                <Badge variant="outline" className="text-blue-500">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Training Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">85%</div>
              <div className="text-sm text-muted-foreground">Completed</div>
              <div className="mt-2">
                <Progress value={85} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history">Interview History</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="training">Training & Development</TabsTrigger>
          <TabsTrigger value="feedback">360° Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Interviews</CardTitle>
              <p className="text-sm text-muted-foreground">Complete history of interviews conducted by {interviewerName}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interviewHistory.map((interview) => (
                  <div key={interview.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium">{interview.candidateName}</h4>
                          <Badge variant="outline">{interview.position}</Badge>
                          <Badge className={`${
                            interview.biasScore <= 15 ? 'bg-green-100 text-green-600' :
                            interview.biasScore <= 25 ? 'bg-blue-100 text-blue-600' :
                            'bg-orange-100 text-orange-600'
                          }`}>
                            Bias Score: {interview.biasScore}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{interview.date}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{interview.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="h-3 w-3" />
                            <span>Rating: {interview.feedback.overallRating}/5</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="h-3 w-3" />
                            <span className="capitalize">{interview.status}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => showInterviewDetails(interview)}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Full Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Bias Score Improvement</span>
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-medium">-12 points</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Interview Quality</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-medium">+15%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Candidate Satisfaction</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-green-500 font-medium">4.2/5</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Question Consistency</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Time Management</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Feedback Quality</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed Training</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">Unconscious Bias Training</div>
                      <div className="text-xs text-muted-foreground">Completed: June 15, 2024</div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">Inclusive Interviewing</div>
                      <div className="text-xs text-muted-foreground">Completed: June 10, 2024</div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium text-sm">Behavioral Interview Techniques</div>
                      <div className="text-xs text-muted-foreground">Completed: June 5, 2024</div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Training</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">Advanced Bias Detection</div>
                        <div className="text-xs text-muted-foreground">Recommended based on recent performance</div>
                        <Badge variant="outline" className="text-orange-500 mt-1">Priority: Medium</Badge>
                      </div>
                      <Button size="sm" variant="outline">Schedule</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Candidate Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <User className="h-4 w-4 mt-1" />
                      <div>
                        <div className="text-sm font-medium">Sarah Johnson</div>
                        <div className="text-xs text-muted-foreground mb-2">Frontend Developer Interview</div>
                        <div className="text-sm">"Very professional and fair interview process. Questions were relevant and challenging."</div>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-muted-foreground mr-2">Rating:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <CheckCircle key={star} className="h-3 w-3 text-green-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <User className="h-4 w-4 mt-1" />
                      <div>
                        <div className="text-sm font-medium">Michael Chen</div>
                        <div className="text-xs text-muted-foreground mb-2">Backend Engineer Interview</div>
                        <div className="text-sm">"Good technical discussion, felt comfortable throughout the interview."</div>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-muted-foreground mr-2">Rating:</span>
                          {[1, 2, 3, 4].map((star) => (
                            <CheckCircle key={star} className="h-3 w-3 text-green-500" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-green-500 bg-green-50 dark:bg-green-900/20">
                    <MessageCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-medium">HR Manager Review</div>
                      <div className="text-sm mt-1">"Consistent improvement in bias reduction. Shows dedication to fair interviewing practices."</div>
                    </AlertDescription>
                  </Alert>
                  <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                    <MessageCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="font-medium">Team Lead Feedback</div>
                      <div className="text-sm mt-1">"Technical questions are well-structured and appropriate for the role level."</div>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ComprehensiveTransparencyReport;
