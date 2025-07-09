
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Download, 
  Eye,
  Check,
  X,
  Calendar,
  User,
  AlertTriangle,
  Star,
  BarChart3
} from "lucide-react";
import { useState } from "react";
import { candidatesReviews } from "@/dummyData";
import BiasAnalysisDashboard from "@/components/BiasAnalysisDashboard";

const CandidateReview = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("last-7-days");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [biasReportDialogOpen, setBiasReportDialogOpen] = useState(false);

  const handleCandidateAction = (candidateId: number, action: string) => {
    console.log(`${action} candidate:`, candidateId);
    // Implementation would update candidate status
  };

  const showBiasReport = (candidate) => {
    setSelectedCandidate(candidate);
    setBiasReportDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "selected": return <Badge className="bg-green-100 text-green-800">Selected</Badge>;
      case "rejected": return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case "pending-review": return <Badge className="bg-orange-100 text-orange-800">Pending Review</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getBiasScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Candidate Review</h1>
          <p className="text-gray-600">Review candidate interviews and make hiring decisions</p>
        </div>
        <div className="flex space-x-2">
          <Select value={selectedDateRange} onValueChange={setSelectedDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last-7-days">Last 7 days</SelectItem>
              <SelectItem value="last-30-days">Last 30 days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-6">
        {candidatesReviews.map((candidate) => (
          <Card key={candidate.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center space-x-3">
                    <span>{candidate.candidateName}</span>
                    {getStatusBadge(candidate.status)}
                  </CardTitle>
                  <CardDescription>
                    {candidate.position} • Interviewed by {candidate.interviewer} on {candidate.interviewDate}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getBiasScoreColor(candidate.biasScore)}`}>
                    Bias Score: {candidate.biasScore}/100
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => showBiasReport(candidate)}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Full Report
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Candidate Resume */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>Resume</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-sm text-gray-600">{candidate.resume.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Education</p>
                      <p className="text-sm text-gray-600">{candidate.resume.education}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Skills</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {candidate.resume.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Interview Feedback */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Star className="h-4 w-4" />
                      <span>Interview Feedback</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Technical Skills: <span className="font-medium">{candidate.interviewFeedback.technicalSkills}/5</span></div>
                      <div>Communication: <span className="font-medium">{candidate.interviewFeedback.communication}/5</span></div>
                      <div>Problem Solving: <span className="font-medium">{candidate.interviewFeedback.problemSolving}/5</span></div>
                      <div>Overall Rating: <span className="font-medium">{candidate.interviewFeedback.overallRating}/5</span></div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Comments</p>
                      <p className="text-sm text-gray-600">{candidate.interviewFeedback.comments}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Bias Report */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Bias Report</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {candidate.biasReport.categories.map((category, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{category.name}</span>
                          <span className={getBiasScoreColor(category.score)}>{category.score}/100</span>
                        </div>
                      ))}
                    </div>
                    {candidate.biasReport.incidents.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-orange-600">Issues Detected</p>
                        <ul className="text-xs text-gray-600">
                          {candidate.biasReport.incidents.map((incident, index) => (
                            <li key={index}>• {incident}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              {candidate.status === "pending-review" && (
                <div className="flex space-x-2 mt-6 pt-4 border-t">
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleCandidateAction(candidate.id, "accept")}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Accept Candidate
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleCandidateAction(candidate.id, "reject")}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Candidate
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bias Analysis Dashboard Dialog */}
      <Dialog open={biasReportDialogOpen} onOpenChange={setBiasReportDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bias Analysis Report - {selectedCandidate?.candidateName}</DialogTitle>
            <DialogDescription>
              Complete bias analysis for the interview conducted by {selectedCandidate?.interviewer}
            </DialogDescription>
          </DialogHeader>
          {selectedCandidate && (
            <BiasAnalysisDashboard 
              candidateName={selectedCandidate.candidateName}
              interviewId={selectedCandidate.id.toString()}
              overallScore={selectedCandidate.biasScore}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CandidateReview;
