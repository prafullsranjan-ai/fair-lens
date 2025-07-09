
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  FileText,
  Calendar,
  Upload,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Eye,
  Trash2,
  ClipboardList
} from "lucide-react";
import { Link } from "react-router-dom";
import { interviewers, resumes, candidates, candidateStatusData, schedule } from "@/dummyData";

const HRDashboard = () => {
  const hrStats = {
    scheduledInterviews: 24,
    pendingReviews: 8,
    activeInterviewers: 15,
    uploadedResumes: 142,
    selectedCandidates: 12,
    rejectedCandidates: 45,
    pendingCandidates: 28
  };

  const upcomingInterviews = [
    {
      id: 1,
      candidate: "Alice Johnson",
      interviewer: "John Smith",
      time: "10:00 AM",
      status: "scheduled",
      canCancel: true
    },
    {
      id: 2,
      candidate: "Bob Wilson",
      interviewer: "Sarah Davis",
      time: "2:00 PM",
      status: "pending-review",
      canCancel: true
    },
    {
      id: 3,
      candidate: "Carol Brown",
      interviewer: "Mike Chen",
      time: "4:00 PM",
      status: "scheduled",
      canCancel: true
    }
  ];

  const biasReports = [
    {
      id: 1,
      interviewer: "Mike Chen",
      candidate: "Carol Brown",
      date: "2024-01-17",
      biasScore: 78,
      issues: ["Leading questions detected", "Interruption pattern"],
      severity: "medium"
    },
    {
      id: 2,
      interviewer: "Lisa Wong",
      candidate: "David Lee",
      date: "2024-01-16",
      biasScore: 65,
      issues: ["Cultural bias indicators", "Unfair questioning"],
      severity: "high"
    }
  ];

  const interviewerPerformance = [
    { name: "John Smith", biasScore: 92, interviews: 15, status: "excellent", readinessScore: 94 },
    { name: "Sarah Davis", biasScore: 88, interviews: 12, status: "good", readinessScore: 89 },
    { name: "Mike Chen", biasScore: 85, interviews: 18, status: "good", readinessScore: 87 },
    { name: "Lisa Wong", biasScore: 78, interviews: 9, status: "needs-improvement", readinessScore: 75 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "selected": return "text-green-600";
      case "rejected": return "text-red-600";
      case "pending-review": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "selected": return <Badge className="bg-green-100 text-green-800">Selected</Badge>;
      case "rejected": return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case "pending-review": return <Badge className="bg-orange-100 text-orange-800">Pending Review</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "border-red-200 bg-red-50";
      case "medium": return "border-orange-200 bg-orange-50";
      default: return "border-yellow-200 bg-yellow-50";
    }
  };

  const cancelInterview = (interviewId: number) => {
    console.log("Cancelling interview:", interviewId);
    // Implementation would go here
  };

  const getCandidateStatusBadge = (status: string) => {
      switch (status) {
        case "scheduled": return <Badge className="bg-green-100 text-green-800">Interview Scheduled</Badge>;
        case "unscheduled": return <Badge className="bg-purple-100 text-purple-800">Interview Unscheduled</Badge>;
        case "rejected": return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
        case "pending-review": return <Badge className="bg-orange-100 text-orange-800">Pending Review</Badge>;
        default: return <Badge variant="secondary">{status}</Badge>;
      }
    };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 theme-transition">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">HR Dashboard</h1>
          <p className="text-muted-foreground">Manage interviews and track performance</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Link to="/schedule">
            <Button variant="outline" className="theme-button w-full sm:w-auto">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          </Link>
          <Link to="/resumes">
            <Button className="theme-button w-full sm:w-auto">
              <Upload className="h-4 w-4 mr-2" />
              Upload Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* Enhanced Bias Alert with Dark Mode */}
      {biasReports.filter(report => report.severity === "high").length > 0 && (
        <Alert className="border-destructive/50 bg-destructive/10 dark:bg-destructive/20 dark:border-destructive/30">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-foreground">
            <strong>High Bias Alert:</strong> {biasReports.filter(report => report.severity === "high").length} high-severity bias incidents require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Enhanced HR Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled Interviews</p>
                <p className="text-2xl font-bold text-foreground">{hrStats.scheduledInterviews}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold text-foreground">{hrStats.pendingReviews}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Interviewers</p>
                <p className="text-2xl font-bold text-foreground">{hrStats.activeInterviewers}</p>
              </div>
              <Users className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Uploaded Resumes</p>
                <p className="text-2xl font-bold text-foreground">{hrStats.uploadedResumes}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enhanced Candidate Status Panel with Dark Mode */}
        <Card className="theme-card">
          <CardHeader>
                <CardTitle className="text-foreground">Candidate Status Panel</CardTitle>
                <CardDescription className="text-muted-foreground">Track candidate progress through hiring pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{hrStats.selectedCandidates}</div>
                <div className="text-sm text-muted-foreground">Selected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">{hrStats.pendingCandidates}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{hrStats.rejectedCandidates}</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
            </div>

            <div className="space-y-3">
              {candidateStatusData.map((candidate) => (
                <div key={candidate.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 dark:bg-muted/20 theme-transition">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-foreground">{candidate.name}</p>
                      {getStatusBadge(candidate.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{candidate.position}</p>
                    <p className="text-xs text-muted-foreground">
                      Interviewed by {candidate.interviewer} on {candidate.interviewDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">Bias Score: {candidate.biasScore}</div>
                    <Button variant="outline" size="sm" className="mt-1 theme-button">
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/candidate-review" className="block mt-4">
              <Button variant="outline" className="w-full theme-button">
                Review All Candidates
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Enhanced Today's Interviews with Dark Mode */}
        <Card className="theme-card">
          <CardHeader>
            <CardTitle className="text-foreground">Today's Interviews</CardTitle>
            <CardDescription className="text-muted-foreground">Scheduled interviews with management options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schedule.filter(i => i.status === "scheduled").sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()).map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 dark:bg-muted/20 theme-transition">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-foreground">{interview.candidateName}</p>
                      {interview.status && getCandidateStatusBadge(interview.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">with {interview.interviewer}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{interview.time}</p>
                    </div>
                    {interview.status && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => cancelInterview(interview.id)}
                        className="theme-button"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              )).splice(0, 4)}
            </div>
            <Link to="/schedule" className="block mt-4">
              <Button variant="outline" className="w-full theme-button">
                View All Interviews
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Bias Reports Panel with Dark Mode */}
      <Card className="theme-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-foreground mb-2">Interview-wise Bias Reports</CardTitle>
              <CardDescription className="text-muted-foreground">Summary of bias indicators for each interviewer</CardDescription>
            </div>
            <Link to="/reports">
              <Button variant="outline" className="theme-button">
                <FileText className="h-4 w-4 mr-2" />
                View Reports
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {biasReports.map((report) => (
              <Alert key={report.id} className={`theme-card ${getSeverityColor(report.severity)} theme-transition`}>
                <AlertTriangle className="h-4 w-4 text-foreground" />
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium text-foreground">{report.interviewer} - {report.candidate}</div>
                      <div className="text-sm text-muted-foreground">{report.date}</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={report.severity === "high" ? "destructive" : "secondary"}>
                        {report.severity} severity
                      </Badge>
                      <div className="text-sm mt-1 text-foreground">Score: {report.biasScore}/100</div>
                    </div>
                  </div>
                  <AlertDescription>
                    <div className="space-y-1">
                      {report.issues.map((issue, index) => (
                        <div key={index} className="text-sm text-muted-foreground">• {issue}</div>
                      ))}
                    </div>
                  </AlertDescription>
                </div>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Interviewer Performance */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="mb-2">Interviewer Performance & Readiness</CardTitle>
              <CardDescription>Combined bias and training scores for scheduling decisions</CardDescription>
            </div>
            <Link to="/interviewers">
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Manage Interviewers
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviewerPerformance.map((interviewer, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{interviewer.name}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{interviewer.interviews} interviews</span>
                    <Badge className="text-xs">
                      Readiness: {interviewer.readinessScore}/100
                    </Badge>
                    {interviewer.status === "excellent" && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {interviewer.status === "good" && <TrendingUp className="h-4 w-4 text-blue-600" />}
                    {interviewer.status === "needs-improvement" && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Progress value={interviewer.biasScore} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Bias Score</span>
                      <span>{interviewer.biasScore}/100</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Progress value={interviewer.readinessScore} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Overall Readiness</span>
                      <span>{interviewer.readinessScore}/100</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/resumes">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center">
                <Upload className="h-6 w-6 mb-2 text-blue-600" />
                <span className="font-medium">Upload Resume</span>
                <span className="text-xs text-gray-600">Add candidate profile</span>
              </Button>
            </Link>
            <Link to="/schedule">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center">
                <Calendar className="h-6 w-6 mb-2 text-green-600" />
                <span className="font-medium">Schedule Interview</span>
                <span className="text-xs text-gray-600">Book new session</span>
              </Button>
            </Link>
            <Link to="/reports">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center">
                <FileText className="h-6 w-6 mb-2 text-purple-600" />
                <span className="font-medium">Generate Report</span>
                <span className="text-xs text-gray-600">Create analysis</span>
              </Button>
            </Link>
            <Link to="/interviewers">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center">
                <Users className="h-6 w-6 mb-2 text-orange-600" />
                <span className="font-medium">Manage Team</span>
                <span className="text-xs text-gray-600">Add/edit interviewers</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HRDashboard;
