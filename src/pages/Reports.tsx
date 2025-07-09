
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Download,
  TrendingUp,
  AlertTriangle,
  Users,
  BarChart3,
  Star,
  ArrowUp,
  ArrowDown,
  Activity,
  Target,
  CheckCircle,
  Brain
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { interviewerReports } from '@/dummyData';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [fullReportDialogOpen, setFullReportDialogOpen] = useState(false);
  const [selectedReportData, setSelectedReportData] = useState(null);


  const biasCategories = [
    { name: 'Gender Bias', incidents: 4, trend: 'down', color: 'bg-emerald-500' },
    { name: 'Age Bias', incidents: 3, trend: 'up', color: 'bg-red-500' },
    { name: 'Cultural Bias', incidents: 2, trend: 'down', color: 'bg-emerald-500' },
    { name: 'Experience Bias', incidents: 3, trend: 'stable', color: 'bg-gray-500' }
  ];

  const performanceData = [
    {
      name: 'John Smith',
      interviews: 24,
      score: 92,
      trend: '+2%',
      avatar: 'JS',
      progress: 92
    },
    {
      name: 'Sarah Davis',
      interviews: 18,
      score: 88,
      trend: '-2%',
      avatar: 'SD',
      progress: 88
    },
    {
      name: 'Mike Johnson',
      interviews: 10,
      score: 85,
      trend: '+4%',
      avatar: 'MJ',
      progress: 85
    }
  ];

  const showFullReport = (interviewer) => {
    const fullReportData = {
      interviewer: interviewer.name,
      department: interviewer.department,
      totalInterviews: interviewer.interviewsCount,
      biasScore: interviewer.biasScore,
      incidents: interviewer.incidents,
      improvement: interviewer.improvement,
      detailedAnalysis: {
        questionQuality: Math.floor(Math.random() * 20) + 80,
        candidateExperience: Math.floor(Math.random() * 20) + 75,
        consistencyScore: Math.floor(Math.random() * 15) + 85,
        improvementAreas: interviewer.improvements,
        strengths: interviewer.strengths
      },
      monthlyTrend: [
        { month: "Jan", score: interviewer.biasScore - 5 },
        { month: "Feb", score: interviewer.biasScore - 2 },
        { month: "Mar", score: interviewer.biasScore }
      ],
      trainingRecommendations: interviewer.needsTraining ? [
        "Unconscious Bias Training Module",
        "Active Listening Techniques",
        "Inclusive Interview Practices"
      ] : [
        "Advanced Interview Techniques",
        "Mentoring Junior Interviewers"
      ]
    };
    setSelectedReportData(fullReportData);
    setFullReportDialogOpen(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-orange-600";
    return "text-red-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-100 text-green-600";
      case "good": return "bg-blue-100 text-blue-600";
      case "needs-improvement": return "bg-orange-100 text-orange-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };


  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-red-500" />;
      case "down": return <TrendingUp className="h-3 w-3 text-green-500 transform rotate-180" />;
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  const getStatusIcon = (status: string) => {
      switch (status) {
        case "excellent": return <CheckCircle className="h-4 w-4 text-green-600" />;
        case "good": return <TrendingUp className="h-4 w-4 text-blue-600" />;
        case "needs-improvement": return <AlertTriangle className="h-4 w-4 text-orange-600" />;
        default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      }
    };


  return (
    <div className="min-h-screen bg-background p-6 theme-transition">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">AI Bias Reports</h1>
            <p className="text-muted-foreground">Detailed analysis of interview bias and performance</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40 bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border theme-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Interviews</p>
                  <p className="text-3xl font-bold text-foreground">156</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border theme-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Bias Incidents</p>
                  <p className="text-3xl font-bold text-foreground">12</p>
                </div>
                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border theme-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Average Bias Score</p>
                  <p className="text-3xl font-bold text-emerald-500">87/100</p>
                </div>
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border theme-transition">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Improvement Rate</p>
                  <p className="text-3xl font-bold text-blue-500">+15%</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bias Categories */}
          <Card className="bg-card border-border theme-transition">
            <CardHeader>
              <CardTitle className="text-foreground">Bias Categories</CardTitle>
              <CardDescription className="text-muted-foreground">
                Breakdown of bias incidents by type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {biasCategories.map((category, index) => (
                <div key={index} className="bg-muted/50 rounded-xl p-4 theme-transition">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{category.incidents} incidents</span>
                      {category.trend === 'down' && (
                        <ArrowDown className="w-4 h-4 text-emerald-500" />
                      )}
                      {category.trend === 'up' && (
                        <ArrowUp className="w-4 h-4 text-red-500" />
                      )}
                      {category.trend === 'stable' && (
                        <Activity className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${(category.incidents / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <Card className="lg:col-span-2 bg-card border-border theme-transition">
            <CardHeader>
              <CardTitle className="text-foreground">Performance Overview</CardTitle>
              <CardDescription className="text-muted-foreground">
                Interviewer performance summary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {performanceData.map((interviewer, index) => (
                <div key={index} className="bg-muted/50 rounded-xl p-4 theme-transition">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{interviewer.avatar}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{interviewer.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {interviewer.trend.startsWith('+') ? (
                            <span className="text-emerald-500">{interviewer.trend}</span>
                          ) : (
                            <span className="text-red-500">{interviewer.trend}</span>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {interviewer.interviews} interviews • Score: {interviewer.score}/100
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${interviewer.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        {/* Detailed Interviewer Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Individual Interviewer Reports</CardTitle>
            <CardDescription>Detailed analysis and training recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {interviewerReports.map((interviewer) => (
                <div key={interviewer.id} className="p-6 border rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{interviewer.name}</h3>
                        <Badge variant="outline">{interviewer.department}</Badge>
                        {interviewer.needsTraining ? (
                          <Badge variant="destructive">Training Required</Badge>
                        ) : (
                          <Badge variant="default">Good Standing</Badge>
                        )}
                      <Badge className={getStatusColor(interviewer.status)}>
                        {interviewer.status.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                      </Badge>
                        {getStatusIcon(interviewer.status)}
                      </div>
                      <div className="grid md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Interviews:</span>
                          <span className="font-medium ml-2">{interviewer.interviewsCount}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Bias Score:</span>
                          <span className={`font-medium ml-2 ${getScoreColor(interviewer.biasScore)}`}>
                            {interviewer.biasScore}/100
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600">Incidents:</span>
                          <span className="font-medium ml-2">{interviewer.incidents}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Improvement:</span>
                          <span className={`font-medium ml-2 ${interviewer.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {interviewer.improvement}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => showFullReport(interviewer)}>
                        <FileText className="h-4 w-4 mr-2" />
                        Full Report
                      </Button>
                      {interviewer.needsTraining && (
                        <Button variant="outline" size="sm">
                          <Target className="h-4 w-4 mr-2" />
                          Assign Training
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-green-700">Strengths</h4>
                      <ul className="space-y-1">
                        {interviewer.strengths.map((strength, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2 text-orange-700">Areas for Improvement</h4>
                      <ul className="space-y-1">
                        {interviewer.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <AlertTriangle className="h-3 w-3 text-orange-600" />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="theme-card bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/30 theme-transition mt-4 p-3 rounded-lg">
                    <p className="text-sm text-foreground flex">
                      <span><Brain className="h-4 w-4 mr-2 text-primary" /></span>
                      <span><strong>AI Recommendation:</strong> {interviewer.needsTraining
                        ? `This interviewer should complete bias training modules focusing on ${interviewer.improvements.slice(0, 2).join(' and ')}.`
                        : `This interviewer is performing well. Continue current practices and consider mentoring newer team members.`
                      }</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Full Report Dialog */}
        <Dialog open={fullReportDialogOpen} onOpenChange={setFullReportDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Comprehensive AI Report - {selectedReportData?.interviewer}</DialogTitle>
              <DialogDescription>
                Detailed analysis and performance metrics
              </DialogDescription>
            </DialogHeader>
            {selectedReportData && (
              <div className="space-y-6">
                {/* Overview Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{selectedReportData.totalInterviews}</div>
                    <div className="text-sm text-gray-600">Total Interviews</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className={`text-2xl font-bold ${getScoreColor(selectedReportData.biasScore)}`}>
                      {selectedReportData.biasScore}/100
                    </div>
                    <div className="text-sm text-gray-600">Bias Score</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{selectedReportData.incidents}</div>
                    <div className="text-sm text-gray-600">Incidents</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className={`text-2xl font-bold ${selectedReportData.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedReportData.improvement}
                    </div>
                    <div className="text-sm text-gray-600">Improvement</div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Question Quality</span>
                        <span className="font-medium">{selectedReportData.detailedAnalysis.questionQuality}/100</span>
                      </div>
                      <Progress value={selectedReportData.detailedAnalysis.questionQuality} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span>Candidate Experience</span>
                        <span className="font-medium">{selectedReportData.detailedAnalysis.candidateExperience}/100</span>
                      </div>
                      <Progress value={selectedReportData.detailedAnalysis.candidateExperience} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span>Consistency Score</span>
                        <span className="font-medium">{selectedReportData.detailedAnalysis.consistencyScore}/100</span>
                      </div>
                      <Progress value={selectedReportData.detailedAnalysis.consistencyScore} className="h-2" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Training Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedReportData.trainingRecommendations.map((rec, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Target className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setFullReportDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => console.log("Downloading detailed report...")}>
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Reports;
