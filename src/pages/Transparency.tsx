import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from '@/contexts/AuthContext';
import { 
  Eye, 
  TrendingUp, 
  Users, 
  FileText, 
  Award, 
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Filter,
  Search
} from "lucide-react";
import { BiasScoreWidget, ConfidenceIndicator, EvidenceCard, TrainingRecommendation } from '@/components/BiasTransparencyWidget';
import BiasAnalysisDashboard from '@/components/BiasAnalysisDashboard';

const Transparency = () => {
  const { user } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [interviewerDetailOpen, setInterviewerDetailOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [interviewDetailOpen, setInterviewDetailOpen] = useState(false);

  // Enhanced dummy data for interviewers with proper scoring
  const interviewersData = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      department: 'Engineering',
      avatar: 'SM',
      biasScore: 92,
      trend: 'up',
      interviews: 18,
      lastInterview: '2024-01-15',
      status: 'excellent',
      trainingProgress: 95,
      certifications: ['Fair Interview Practices', 'Bias Awareness Level 3', 'Cultural Competency', 'Advanced Techniques'],
      recentEvents: [
        {
          timestamp: '10:30 AM',
          category: 'Visual Analysis',
          description: 'Excellent professional interaction maintained',
          suggestion: 'Continue current best practices',
          severity: 'low',
          confidence: 96
        }
      ],
      categoryBreakdown: {
        language: 94,
        questions: 91,
        response: 95,
        visual: 89,
        contextual: 93
      },
      monthlyTrend: [
        { month: "Nov", score: 89 },
        { month: "Dec", score: 91 },
        { month: "Jan", score: 92 }
      ],
      trainingModules: [
        {
          title: "Mentoring Excellence",
          description: "Advanced leadership training",
          priority: "low",
          duration: "2 hours",
          progress: 0
        }
      ]
    },
    {
      id: 2,
      name: 'John Smith',
      department: 'Engineering',
      avatar: 'JS',
      biasScore: 85,
      trend: 'stable',
      interviews: 14,
      lastInterview: '2024-01-14',
      status: 'excellent',
      trainingProgress: 88,
      certifications: ['Fair Interview Practices', 'Bias Awareness Level 2', 'Inclusive Language Expert'],
      recentEvents: [
        {
          timestamp: 'Yesterday 2:15 PM',
          category: 'Question Equity',
          description: 'Consistent question difficulty maintained',
          suggestion: 'Great structured approach',
          severity: 'low',
          confidence: 89
        }
      ],
      categoryBreakdown: {
        language: 87,
        questions: 84,
        response: 88,
        visual: 83,
        contextual: 86
      },
      monthlyTrend: [
        { month: "Nov", score: 84 },
        { month: "Dec", score: 85 },
        { month: "Jan", score: 85 }
      ],
      trainingModules: [
        {
          title: "Advanced Visual Cues",
          description: "Enhance visual analysis skills",
          priority: "low",
          duration: "1.5 hours",
          progress: 60
        }
      ]
    },
    {
      id: 3,
      name: 'Emily Chen',
      department: 'Marketing',
      avatar: 'EC',
      biasScore: 72,
      trend: 'up',
      interviews: 12,
      lastInterview: '2024-01-13',
      status: 'good',
      trainingProgress: 75,
      certifications: ['Fair Interview Practices', 'Bias Awareness Level 1'],
      recentEvents: [
        {
          timestamp: 'Today 11:45 AM',
          category: 'Language Bias',
          description: 'Minor improvement opportunity in language choices',
          suggestion: 'Consider more inclusive terminology',
          severity: 'low',
          confidence: 78
        },
        {
          timestamp: 'Yesterday 3:20 PM',
          category: 'Response Evaluation',
          description: 'Good progress in consistent evaluation',
          suggestion: 'Continue current improvement trajectory',
          severity: 'low',
          confidence: 82
        }
      ],
      categoryBreakdown: {
        language: 68,
        questions: 75,
        response: 76,
        visual: 72,
        contextual: 74
      },
      monthlyTrend: [
        { month: "Nov", score: 68 },
        { month: "Dec", score: 70 },
        { month: "Jan", score: 72 }
      ],
      trainingModules: [
        {
          title: "Inclusive Language Mastery",
          description: "Enhance language bias awareness",
          priority: "medium",
          duration: "2 hours",
          progress: 40
        },
        {
          title: "Structured Interviewing",
          description: "Improve question consistency",
          priority: "medium",
          duration: "1.5 hours",
          progress: 0
        }
      ]
    },
    {
      id: 4,
      name: 'Michael Johnson',
      department: 'Marketing',
      avatar: 'MJ',
      biasScore: 67,
      trend: 'down',
      interviews: 10,
      lastInterview: '2024-01-12',
      status: 'good',
      trainingProgress: 60,
      certifications: ['Fair Interview Practices'],
      recentEvents: [
        {
          timestamp: 'Today 9:15 AM',
          category: 'Question Equity',
          description: 'Inconsistent question difficulty detected',
          suggestion: 'Use structured interview templates',
          severity: 'medium',
          confidence: 85
        },
        {
          timestamp: 'Yesterday 4:30 PM',
          category: 'Visual Analysis',
          description: 'Engagement level variation noted',
          suggestion: 'Maintain consistent professional demeanor',
          severity: 'medium',
          confidence: 79
        }
      ],
      categoryBreakdown: {
        language: 71,
        questions: 62,
        response: 69,
        visual: 65,
        contextual: 68
      },
      monthlyTrend: [
        { month: "Nov", score: 70 },
        { month: "Dec", score: 69 },
        { month: "Jan", score: 67 }
      ],
      trainingModules: [
        {
          title: "Question Design Excellence",
          description: "Master equitable question formulation",
          priority: "high",
          duration: "3 hours",
          progress: 20
        },
        {
          title: "Professional Engagement",
          description: "Consistent interviewer presence",
          priority: "medium",
          duration: "2 hours",
          progress: 0
        }
      ]
    },
    {
      id: 5,
      name: 'Alex Rodriguez',
      department: 'Sales',
      avatar: 'AR',
      biasScore: 54,
      trend: 'down',
      interviews: 8,
      lastInterview: '2024-01-11',
      status: 'needs-improvement',
      trainingProgress: 30,
      certifications: [],
      recentEvents: [
        {
          timestamp: 'Today 10:00 AM',
          category: 'Language Bias',
          description: 'Multiple gendered language instances detected',
          suggestion: 'Complete inclusive language training immediately',
          severity: 'high',
          confidence: 92
        },
        {
          timestamp: 'Today 10:15 AM',
          category: 'Response Evaluation',
          description: 'Inconsistent encouragement patterns',
          suggestion: 'Practice neutral evaluation techniques',
          severity: 'high',
          confidence: 88
        },
        {
          timestamp: 'Yesterday 1:45 PM',
          category: 'Question Equity',
          description: 'Irrelevant personal questions asked',
          suggestion: 'Review legal compliance guidelines',
          severity: 'high',
          confidence: 94
        }
      ],
      categoryBreakdown: {
        language: 45,
        questions: 52,
        response: 48,
        visual: 61,
        contextual: 59
      },
      monthlyTrend: [
        { month: "Nov", score: 58 },
        { month: "Dec", score: 56 },
        { month: "Jan", score: 54 }
      ],
      trainingModules: [
        {
          title: "Unconscious Bias Fundamentals",
          description: "Critical foundation training",
          priority: "high",
          duration: "4 hours",
          progress: 0
        },
        {
          title: "Legal Compliance in Interviews",
          description: "Essential legal requirements",
          priority: "high",
          duration: "3 hours",
          progress: 0
        },
        {
          title: "Inclusive Language Basics",
          description: "Eliminate biased language patterns",
          priority: "high",
          duration: "2.5 hours",
          progress: 10
        }
      ]
    },
    {
      id: 6,
      name: 'Lisa Wang',
      department: 'Engineering',
      avatar: 'LW',
      biasScore: 89,
      trend: 'up',
      interviews: 16,
      lastInterview: '2024-01-16',
      status: 'excellent',
      trainingProgress: 92,
      certifications: ['Fair Interview Practices', 'Bias Awareness Level 2', 'Cultural Competency'],
      recentEvents: [
        {
          timestamp: 'Today 2:30 PM',
          category: 'Response Evaluation',
          description: 'Excellent consistent evaluation approach',
          suggestion: 'Mentor other interviewers in evaluation techniques',
          severity: 'low',
          confidence: 91
        }
      ],
      categoryBreakdown: {
        language: 91,
        questions: 88,
        response: 92,
        visual: 87,
        contextual: 89
      },
      monthlyTrend: [
        { month: "Nov", score: 86 },
        { month: "Dec", score: 88 },
        { month: "Jan", score: 89 }
      ],
      trainingModules: [
        {
          title: "Leadership in Fair Interviewing",
          description: "Advanced mentoring skills",
          priority: "low",
          duration: "2 hours",
          progress: 70
        }
      ]
    },
    {
      id: 7,
      name: 'Robert Chen',
      department: 'HR',
      avatar: 'RC',
      biasScore: 88,
      trend: 'stable',
      interviews: 22,
      lastInterview: '2024-01-16',
      status: 'excellent',
      trainingProgress: 90,
      certifications: ['Fair Interview Practices', 'Bias Awareness Level 3', 'HR Excellence'],
      recentEvents: [
        {
          timestamp: 'Today 1:15 PM',
          category: 'Question Equity',
          description: 'Excellent structured interview approach',
          suggestion: 'Share techniques with team members',
          severity: 'low',
          confidence: 93
        }
      ],
      categoryBreakdown: {
        language: 90,
        questions: 89,
        response: 87,
        visual: 86,
        contextual: 88
      },
      monthlyTrend: [
        { month: "Nov", score: 87 },
        { month: "Dec", score: 88 },
        { month: "Jan", score: 88 }
      ],
      trainingModules: [
        {
          title: "Team Leadership Excellence",
          description: "Advanced team mentoring",
          priority: "low",
          duration: "2 hours",
          progress: 85
        }
      ]
    },
    {
      id: 8,
      name: 'Amanda Foster',
      department: 'Finance',
      avatar: 'AF',
      biasScore: 63,
      trend: 'up',
      interviews: 9,
      lastInterview: '2024-01-15',
      status: 'good',
      trainingProgress: 65,
      certifications: ['Fair Interview Practices'],
      recentEvents: [
        {
          timestamp: 'Today 10:45 AM',
          category: 'Language Bias',
          description: 'Good improvement in inclusive language',
          suggestion: 'Continue practicing neutral terminology',
          severity: 'low',
          confidence: 79
        },
        {
          timestamp: 'Yesterday 2:30 PM',
          category: 'Question Equity',
          description: 'Some inconsistency in question complexity',
          suggestion: 'Use standardized question templates',
          severity: 'medium',
          confidence: 81
        }
      ],
      categoryBreakdown: {
        language: 67,
        questions: 59,
        response: 65,
        visual: 63,
        contextual: 61
      },
      monthlyTrend: [
        { month: "Nov", score: 58 },
        { month: "Dec", score: 61 },
        { month: "Jan", score: 63 }
      ],
      trainingModules: [
        {
          title: "Question Standardization",
          description: "Master consistent questioning techniques",
          priority: "medium",
          duration: "2.5 hours",
          progress: 35
        },
        {
          title: "Bias Recognition Techniques",
          description: "Improve bias detection skills",
          priority: "medium",
          duration: "2 hours",
          progress: 15
        }
      ]
    }
  ];

  // Interview history data for current user (interviewer role)
  const interviewHistory = [
    {
      id: 'INT-2024-001',
      date: '2024-01-15',
      candidate: 'Sarah Johnson',
      role: 'Senior Developer',
      overallScore: 88,
      duration: '45 min',
      status: 'completed'
    },
    {
      id: 'INT-2024-002',
      date: '2024-01-14',
      candidate: 'Mike Chen',
      role: 'Product Manager',
      overallScore: 85,
      duration: '50 min',
      status: 'completed'
    },
    {
      id: 'INT-2024-003',
      date: '2024-01-12',
      candidate: 'Alex Rodriguez',
      role: 'UX Designer',
      overallScore: 92,
      duration: '40 min',
      status: 'completed'
    },
    {
      id: 'INT-2024-004',
      date: '2024-01-10',
      candidate: 'Emma Wilson',
      role: 'Data Analyst',
      overallScore: 78,
      duration: '35 min',
      status: 'completed'
    },
    {
      id: 'INT-2024-005',
      date: '2024-01-08',
      candidate: 'David Kim',
      role: 'DevOps Engineer',
      overallScore: 83,
      duration: '42 min',
      status: 'completed'
    }
  ];

  // Mock data based on role
  const getContentByRole = () => {
    switch (user?.role) {
      case 'interviewer':
        return {
          title: 'Bias Transparency Dashboard',
          subtitle: 'Track your interview bias patterns and improvement',
          tabs: ['overview', 'history', 'training', 'feedback']
        };
      case 'hr':
        return {
          title: 'HR Bias Analytics',
          subtitle: 'Department-wide bias monitoring and interviewer management',
          tabs: ['department', 'interviewers', 'compliance', 'training']
        };
      case 'admin':
        return {
          title: 'System Bias Monitoring',
          subtitle: 'Algorithm performance and system-wide bias metrics',
          tabs: ['system', 'algorithms', 'audit', 'configuration']
        };
      default:
        return {
          title: 'Bias Transparency',
          subtitle: 'AI bias detection and transparency',
          tabs: ['overview']
        };
    }
  };

  const content = getContentByRole();

  const getBiasColor = (score: number) => {
    if (score > 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getBiasLevel = (score: number) => {
    if (score > 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const getBiasColorClass = (score: number) => {
    if (score > 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-100 text-green-600";
      case "good": return "bg-yellow-100 text-yellow-600";
      case "needs-improvement": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <div className="h-4 w-4" />;
    }
  };

  const showInterviewerDetail = (interviewer) => {
    setSelectedInterviewer(interviewer);
    setInterviewerDetailOpen(true);
  };

  const showInterviewDetail = (interview) => {
    setSelectedInterview(interview);
    setInterviewDetailOpen(true);
  };

  const renderInterviewerDetailContent = () => {
    if (!selectedInterviewer) return null;

    return (
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Current Bias Score</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className={`text-3xl font-bold ${getBiasColor(selectedInterviewer.biasScore)}`}>
                  {selectedInterviewer.biasScore}
                </div>
                <Badge variant="outline" className={getBiasColor(selectedInterviewer.biasScore)}>
                  {getBiasLevel(selectedInterviewer.biasScore)}
                </Badge>
                <div className="flex items-center justify-center space-x-2">
                  {getTrendIcon(selectedInterviewer.trend)}
                  <span className="text-sm text-muted-foreground">
                    {selectedInterviewer.trend === 'up' ? 'Improving' : selectedInterviewer.trend === 'down' ? 'Declining' : 'Stable'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>This Month</span>
                  <span className="font-medium">{selectedInterviewer.interviews} interviews</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Interview</span>
                  <span className="text-muted-foreground">{selectedInterviewer.lastInterview}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Department</span>
                  <span className="font-medium">{selectedInterviewer.department}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Training Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span className="font-medium">{selectedInterviewer.trainingProgress}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Certifications</span>
                  <span className="text-blue-500">{selectedInterviewer.certifications.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Status</span>
                  <Badge className={getStatusColor(selectedInterviewer.status)}>
                    {selectedInterviewer.status.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="breakdown">Category Breakdown</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bias Events</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedInterviewer.recentEvents.length === 0 ? (
                    <div className="text-sm text-muted-foreground text-center py-4">
                      🎉 Excellent performance! No significant bias events detected
                    </div>
                  ) : (
                    selectedInterviewer.recentEvents.map((event, index) => (
                      <EvidenceCard
                        key={index}
                        timestamp={event.timestamp}
                        category={event.category}
                        description={event.description}
                        suggestion={event.suggestion}
                        severity={event.severity}
                      />
                    ))
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <TrainingRecommendation
                    modules={selectedInterviewer.trainingModules}
                    onStartTraining={(title) => console.log(`Assigning training: ${title} to ${selectedInterviewer.name}`)}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="breakdown" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bias Category Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Language Bias (20%)</span>
                        <span className={`font-medium ${getBiasColor(selectedInterviewer.categoryBreakdown.language)}`}>
                          {selectedInterviewer.categoryBreakdown.language}/100
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getBiasColorClass(selectedInterviewer.categoryBreakdown.language)}`}
                          style={{ width: `${selectedInterviewer.categoryBreakdown.language}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Question Equity (25%)</span>
                        <span className={`font-medium ${getBiasColor(selectedInterviewer.categoryBreakdown.questions)}`}>
                          {selectedInterviewer.categoryBreakdown.questions}/100
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getBiasColorClass(selectedInterviewer.categoryBreakdown.questions)}`}
                          style={{ width: `${selectedInterviewer.categoryBreakdown.questions}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Response Evaluation (15%)</span>
                        <span className={`font-medium ${getBiasColor(selectedInterviewer.categoryBreakdown.response)}`}>
                          {selectedInterviewer.categoryBreakdown.response}/100
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getBiasColorClass(selectedInterviewer.categoryBreakdown.response)}`}
                          style={{ width: `${selectedInterviewer.categoryBreakdown.response}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Visual Analysis (30%)</span>
                        <span className={`font-medium ${getBiasColor(selectedInterviewer.categoryBreakdown.visual)}`}>
                          {selectedInterviewer.categoryBreakdown.visual}/100
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getBiasColorClass(selectedInterviewer.categoryBreakdown.visual)}`}
                          style={{ width: `${selectedInterviewer.categoryBreakdown.visual}%` }}
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm">Contextual Factors (10%)</span>
                        <span className={`font-medium ${getBiasColor(selectedInterviewer.categoryBreakdown.contextual)}`}>
                          {selectedInterviewer.categoryBreakdown.contextual}/100
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getBiasColorClass(selectedInterviewer.categoryBreakdown.contextual)}`}
                          style={{ width: `${selectedInterviewer.categoryBreakdown.contextual}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Certifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedInterviewer.certifications.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No certifications yet</div>
                    ) : (
                      selectedInterviewer.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-blue-500" />
                          <span className="text-sm">{cert}</span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Overall Progress</span>
                      <span className="font-medium">{selectedInterviewer.trainingProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${selectedInterviewer.trainingProgress}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedInterviewer.monthlyTrend.map((month, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <div className="font-medium">{month.month} 2024</div>
                        <div className="text-sm text-muted-foreground">Monthly Average</div>
                      </div>
                      <div className={`text-lg font-bold ${getBiasColor(month.score)}`}>
                        {month.score}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const renderInterviewerContent = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <BiasScoreWidget score={85} trend="down" showDetails />
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Recent Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>This Week</span>
                <span className="font-medium">8 interviews</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Avg. Bias Score</span>
                <span className="text-green-500">82</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Improvement</span>
                <span className="text-green-500">+8 points</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Training Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <span className="font-medium">10/12 modules</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Certifications</span>
                <span className="text-blue-500">4</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Next Due</span>
                <span className="text-green-500">Completed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className='grid w-full grid-cols-4'>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bias Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <EvidenceCard
                  timestamp="10:30 AM"
                  category="Language Bias"
                  description="Potential gendered language detected"
                  suggestion="Consider using gender-neutral terms"
                  severity="low"
                  transcript="What are your career goals?"
                />
                <EvidenceCard
                  timestamp="Yesterday 2:15 PM"
                  category="Visual Analysis"
                  description="Consistent eye contact maintained"
                  suggestion="Great professional interaction"
                  severity="low"
                />
              </CardContent>
            </Card>

            <TrainingRecommendation
              modules={[
                {
                  title: "Advanced Inclusive Language",
                  description: "Enhance your already strong language skills",
                  priority: "low",
                  duration: "1 hour",
                  progress: 90
                },
                {
                  title: "Cultural Awareness Module",
                  description: "Optional enhancement training",
                  priority: "low",
                  duration: "45 minutes"
                }
              ]}
              onStartTraining={(title) => console.log(`Starting training: ${title}`)}
            />
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interview History (Last 30 Days)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {interviewHistory.map((interview) => (
                  <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{interview.candidate}</div>
                          <div className="text-sm text-muted-foreground">
                            {interview.role} - {interview.date}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Duration: {interview.duration} | ID: {interview.id}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className={`text-lg font-bold ${getBiasColor(interview.overallScore)}`}>
                              {interview.overallScore}
                            </div>
                            <div className="text-xs text-muted-foreground">Bias Score</div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => showInterviewDetail(interview)}
                          >
                            Full Report
                          </Button>
                        </div>
                      </div>
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
                <CardTitle>Training Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Overall Progress</span>
                    <span className="font-medium">83%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Unconscious Bias Awareness</span>
                      <span className="text-green-500">Completed</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Inclusive Interviewing</span>
                      <span className="text-green-500">Completed</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Legal Compliance</span>
                      <span className="text-green-500">Completed</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Advanced Techniques</span>
                      <span className="text-blue-500">In Progress</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Fair Interview Practices</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Bias Awareness Level 2</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Inclusive Language Expert</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-gold-500" />
                    <span className="text-sm">Cultural Competency</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feedback & Recognition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-green-600">
                  🎉 Excellent performance! Your bias scores have consistently improved over the past 3 months.
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Top 10% performer this quarter</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Zero disputed bias detections</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Mentor program eligibility achieved</span>
                  </div>
                </div>
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Request Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderHRContent = () => (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Interviewers</p>
                <p className="text-2xl font-bold text-foreground">{interviewersData.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Bias Score</p>
                <p className="text-2xl font-bold text-green-500">
                  {Math.round(interviewersData.reduce((sum, i) => sum + i.biasScore, 0) / interviewersData.length)}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Need Training</p>
                <p className="text-2xl font-bold text-red-500">
                  {interviewersData.filter(i => i.biasScore < 60).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">High Performers</p>
                <p className="text-2xl font-bold text-green-500">
                  {interviewersData.filter(i => i.biasScore > 80).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interviewers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Interviewer Transparency Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Interviewer</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Bias Score</TableHead>
                <TableHead>Interviews</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviewersData.map((interviewer) => (
                <TableRow key={interviewer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold">{interviewer.avatar}</span>
                      </div>
                      <div>
                        <div className="font-medium">{interviewer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Last: {interviewer.lastInterview}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{interviewer.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg font-bold ${getBiasColor(interviewer.biasScore)}`}>
                        {interviewer.biasScore}
                      </span>
                      <Badge variant="outline" className={getBiasColor(interviewer.biasScore)}>
                        {getBiasLevel(interviewer.biasScore)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{interviewer.interviews}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(interviewer.status)}>
                      {interviewer.status.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(interviewer.trend)}
                      <span className="text-sm capitalize">{interviewer.trend}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => showInterviewerDetail(interviewer)}
                    >
                      Full Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderAdminContent = () => (
    <div className="space-y-6">
      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Health</p>
                <p className="text-2xl font-bold text-green-500">98.5%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Accuracy</p>
                <p className="text-2xl font-bold text-green-500">94.2%</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Alert Threshold</p>
                <p className="text-2xl font-bold text-yellow-500">
                  {interviewersData.filter(i => i.biasScore < 70).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Interviews</p>
                <p className="text-2xl font-bold text-blue-500">
                  {interviewersData.reduce((sum, i) => sum + i.interviews, 0)}
                </p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Interviewers Table */}
      <Card>
        <CardHeader>
          <CardTitle>System-wide Interviewer Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Interviewer</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Bias Score</TableHead>
                <TableHead>AI Confidence</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Training Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviewersData.map((interviewer) => (
                <TableRow key={interviewer.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xs font-semibold">{interviewer.avatar}</span>
                      </div>
                      <div>
                        <div className="font-medium">{interviewer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {interviewer.interviews} interviews
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{interviewer.department}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg font-bold ${getBiasColor(interviewer.biasScore)}`}>
                        {interviewer.biasScore}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">
                        {interviewer.recentEvents.length > 0 
                          ? `${interviewer.recentEvents[0].confidence}%` 
                          : '95%'
                        }
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={
                      interviewer.biasScore > 80 ? 'bg-green-100 text-green-600' :
                      interviewer.biasScore >= 60 ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }>
                      {interviewer.biasScore > 80 ? 'Low' :
                       interviewer.biasScore >= 60 ? 'Medium' : 'High'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${interviewer.trainingProgress}%` }}
                        />
                      </div>
                      <span className="text-sm">{interviewer.trainingProgress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => showInterviewerDetail(interviewer)}
                    >
                      Full Report
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{content.title}</h1>
          <p className="text-muted-foreground">{content.subtitle}</p>
        </div>
        <Badge variant="outline" className="text-blue-500">
          {user?.role?.toUpperCase()} VIEW
        </Badge>
      </div>

      {user?.role === 'interviewer' && renderInterviewerContent()}
      {user?.role === 'hr' && renderHRContent()}
      {user?.role === 'admin' && renderAdminContent()}

      {/* Interviewer Detail Dialog */}
      <Dialog open={interviewerDetailOpen} onOpenChange={setInterviewerDetailOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Comprehensive Transparency Report - {selectedInterviewer?.name}
            </DialogTitle>
            <DialogDescription>
              Detailed bias analysis and performance metrics
            </DialogDescription>
          </DialogHeader>
          {renderInterviewerDetailContent()}
        </DialogContent>
      </Dialog>

      {/* Interview Detail Dialog */}
      <Dialog open={interviewDetailOpen} onOpenChange={setInterviewDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Interview Analysis Report - {selectedInterview?.candidate}
            </DialogTitle>
            <DialogDescription>
              Detailed bias analysis for interview {selectedInterview?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedInterview && (
            <BiasAnalysisDashboard 
              candidateName={selectedInterview.candidate}
              interviewId={selectedInterview.id}
              overallScore={selectedInterview.overallScore}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transparency;
