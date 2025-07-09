import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, User, Star, CheckCircle, AlertCircle, Plus, Eye, Filter, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { candidates, suggestedInterviewers, schedule } from "@/dummyData";

const Schedule = () => {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [biasReportDialogOpen, setBiasReportDialogOpen] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [newInterview, setNewInterview] = useState({
    candidateId: "",
    position: "",
    date: "",
    time: "",
    interviewerId: "",
    duration: "60"
  });

  

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "text-green-600";
      case "unscheduled": return "text-blue-600";
      case "pending": return "text-orange-600";
      case "rejected": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "scheduled": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "unscheduled": return <CheckCircle className="h-4 w-4 text-purple-600" />;
      case "pending": return <Clock className="h-4 w-4 text-orange-600" />;
      case "rejected": return <AlertCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
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

  const getAvailabilityColor = (availability: string) => {
    return availability === "Available" ? "text-green-600" : "text-orange-600";
  };

  const handleScheduleInterview = () => {
    console.log("Scheduling interview:", newInterview);
    setNewInterview({ candidateId: "", position: "", date: "", time: "", interviewerId: "", duration: "60" });
    setScheduleDialogOpen(false);
  };

  const viewBiasReport = (interview: any) => {
    setSelectedInterview(interview);
    setBiasReportDialogOpen(true);
  };

  const cancelInterview = (interviewId: number) => {
    console.log("Cancelling interview:", interviewId);
  };

  // Filter interviews by date
  const filterInterviews = () => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    switch (dateFilter) {
      case "today":
        return schedule.filter(i => i.date === todayStr);
      case "last7days":
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return schedule.filter(i => new Date(i.date) >= weekAgo);
      default:
        return schedule;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Interview Scheduling</h1>
          <p className="text-gray-600">Schedule interviews with AI-suggested unbiased interviewers</p>
        </div>
        <div className="flex space-x-2">
          <Select value={dateFilter} onValueChange={setDateFilter}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last7days">Last 7 Days</SelectItem>
              <SelectItem value="all">All Interviews</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Schedule New Interview</DialogTitle>
                <DialogDescription>
                  AI will suggest the best unbiased interviewers based on skills and bias scores.
                </DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="candidate">Candidate</Label>
                    <Select value={newInterview.candidateId} onValueChange={(value) => setNewInterview({ ...newInterview, candidateId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select candidate" />
                      </SelectTrigger>
                      <SelectContent>
                        {candidates.map((candidate) => (
                          <SelectItem key={candidate.id} value={candidate.id}>
                            {candidate.name} - {candidate.position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newInterview.date}
                      onChange={(e) => setNewInterview({ ...newInterview, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newInterview.time}
                      onChange={(e) => setNewInterview({ ...newInterview, time: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Select value={newInterview.duration} onValueChange={(value) => setNewInterview({ ...newInterview, duration: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="45">45 minutes</SelectItem>
                        <SelectItem value="60">60 minutes</SelectItem>
                        <SelectItem value="90">90 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>AI-Suggested Interviewers</Label>
                  <div className="space-y-3 mt-2 max-h-80 overflow-y-auto">
                    {suggestedInterviewers.map((interviewer) => (
                      <div
                        key={interviewer.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${newInterview.interviewerId === interviewer.id.toString()
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                          }`}
                        onClick={() => setNewInterview({ ...newInterview, interviewerId: interviewer.id.toString() })}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{interviewer.name}</h4>
                            <p className="text-sm text-gray-600">{interviewer.department}</p>
                          </div>
                          <div className="text-right">
                            <Badge
                              variant="outline"
                              className={getAvailabilityColor(interviewer.availability)}
                            >
                              {interviewer.availability}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Bias Score:</span>
                            <span className="font-medium text-green-600">{interviewer.biasScore}/100</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Skill Match:</span>
                            <span className="font-medium text-blue-600">{interviewer.skillMatch}%</span>
                          </div>
                        </div>

                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1 mb-2">
                            {interviewer.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-gray-600">{interviewer.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Button onClick={handleScheduleInterview} className="w-full" disabled={!newInterview.interviewerId}>
                Schedule Interview
              </Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Interviews</p>
                <p className="text-2xl font-bold">{schedule.length}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Scheduled Interviews</p>
                <p className="text-2xl font-bold text-green-600">
                  {schedule.filter(i => i.status === 'scheduled').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unscheduled Interviews</p>
                <p className="text-2xl font-bold text-purple-600">
                  {schedule.filter(i => i.status === 'unscheduled').length}
                </p>
              </div>
              <CalendarIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">
                  {schedule.filter(i => i.status === 'pending-review').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid">
        {/* Schedule Interviews */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule Interviews</CardTitle>
            <CardDescription>Schedule and update interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filterInterviews().map((interview) => (
                <div key={interview.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{interview.candidateName}</h3>
                        {interview.status && getCandidateStatusBadge(interview.status)}
                      </div>
                      <p className="text-sm text-gray-600">{interview.position}</p>
                    </div>
                    <div className="flex space-x-2">
                      {interview.status === 'completed' && interview.biasReport && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewBiasReport(interview)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Bias Report
                        </Button>
                      )}
                      {interview.status === 'unscheduled' && (
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          Schedule Interview
                        </Button>
                      )}
                      {interview.status !== 'pending-review' && interview.status !== 'unscheduled' && (
                        <>
                          <Button variant="outline" size="sm">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Reschedule Interview
                          </Button>
                          <Button variant="outline" size="sm">
                            <User className="h-4 w-4 mr-2" />
                            Change Interviewer
                          </Button>
                        </>
                      )}
                      {interview.status !== 'completed' && interview.status !== 'rejected' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => cancelInterview(interview.id)}
                        >
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Cancel Interview
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Schedule Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <CalendarIcon className="h-3 w-3" />
                          <span>{interview.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-3 w-3" />
                          <span>{interview.time} ({interview.duration})</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Interviewer</h4>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{interview.interviewer}</p>
                        <div className="flex items-center space-x-2">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm text-gray-600">Score: {interview.interviewerScore}/100</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">AI Matching</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex justify-between">
                          <span>Skill Match:</span>
                          <span className="font-medium text-blue-600">95%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bias Score:</span>
                          <span className="font-medium text-green-600">{interview.interviewerScore}/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bias Report Dialog */}
      <Dialog open={biasReportDialogOpen} onOpenChange={setBiasReportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Interview Bias Report</DialogTitle>
            <DialogDescription>
              Detailed bias analysis for {selectedInterview?.candidateName} - {selectedInterview?.interviewer}
            </DialogDescription>
          </DialogHeader>
          {selectedInterview?.biasReport && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{selectedInterview.biasReport.overallBiasScore}/100</div>
                <div className="text-sm text-gray-600">Overall Bias Score</div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Identified Issues:</h4>
                <ul className="space-y-1">
                  {selectedInterview.biasReport.issues.map((issue: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                      <AlertTriangle className="h-3 w-3 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2">Recommendations:</h4>
                <ul className="space-y-1">
                  {selectedInterview.biasReport.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                      <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;
