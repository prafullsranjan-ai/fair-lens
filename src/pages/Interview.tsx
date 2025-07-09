import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  Square,
  Clock,
  AlertTriangle,
  CheckCircle,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Users,
  FileText,
  Star,
  Send,
  Code,
  Info
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { candidateData, suggestedQuestions, dynamicQuestions, realTimeMetrics, liveCoaching, meetingPlatforms } from "@/dummyData";
import CodeEditor from "@/components/CodeEditor";
import VideoCallInterface from "@/components/VideoCallInterface";
import AIInterviewChatbot from "@/components/AIInterviewChatbot";
import LiveBiasMonitor from "@/components/LiveBiasMonitor";

const Interview = () => {
  const [interviewStatus, setInterviewStatus] = useState("not-started");
  const [timer, setTimer] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [candidateInfoDialogOpen, setCandidateInfoDialogOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("zoom");
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showCandidateInfo, setShowCandidateInfo] = useState(true);
  const timerRef = useRef(null);

  // Feedback form state
  const [feedback, setFeedback] = useState({
    technicalSkills: [4],
    communication: [4],
    problemSolving: [4],
    overallRating: [4],
    comments: "",
    strengths: "",
    improvements: "",
    recommendation: "consider"
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startInterview = () => {
    setInterviewStatus("in-progress");
    setShowVideoCall(true);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const pauseInterview = () => {
    setInterviewStatus("paused");
    clearInterval(timerRef.current);
  };

  const resumeInterview = () => {
    setInterviewStatus("in-progress");
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  const stopInterview = () => {
    setInterviewStatus("completed");
    setShowVideoCall(false);
    clearInterval(timerRef.current);
    setShowFeedback(true);
  };

  const endVideoCall = () => {
    stopInterview();
  };

  const submitFeedback = () => {
    const feedbackData = {
      candidateName: candidateData.name,
      interviewDate: new Date().toISOString().split('T')[0],
      duration: formatTime(timer),
      technicalSkills: feedback.technicalSkills[0],
      communication: feedback.communication[0],
      problemSolving: feedback.problemSolving[0],
      overallRating: feedback.overallRating[0],
      comments: feedback.comments,
      strengths: feedback.strengths,
      improvements: feedback.improvements,
      recommendation: feedback.recommendation,
      biasScore: realTimeMetrics.biasScore
    };

    console.log("Submitting interview feedback:", feedbackData);
    alert("Feedback submitted successfully! HR will review the candidate assessment.");
    setFeedbackDialogOpen(false);

    // Reset for next interview
    setInterviewStatus("not-started");
    setTimer(0);
    setShowFeedback(false);
    setFeedback({
      technicalSkills: [4],
      communication: [4],
      problemSolving: [4],
      overallRating: [4],
      comments: "",
      strengths: "",
      improvements: "",
      recommendation: "consider"
    });
  };

  const joinMeeting = (platform) => {
    const url = meetingPlatforms[platform];
    console.log(`Joining ${platform} meeting:`, url);
    window.open(url, '_blank');
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* AI Interview Chatbot - Only show for interviewer role */}
      <AIInterviewChatbot
        candidateName={candidateData.name}
        candidateSkills={candidateData.skills}
        interviewStatus={interviewStatus}
      />

      <div className="container mx-auto px-4 py-6 space-y-6 theme-transition">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Live Interview</h1>
            <p className="text-muted-foreground">Conduct interviews with AI-powered bias detection</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-2xl font-bold text-foreground">{formatTime(timer)}</p>
            </div>
            <Badge variant={interviewStatus === "in-progress" ? "default" : "secondary"}>
              {interviewStatus.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}
            </Badge>
          </div>
        </div>

        {/* Main content row: Interview Controls + Candidate Info toggle */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Interview Controls */}
          <Card className="lg:col-span-2 theme-card">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="text-foreground">Interview Controls</CardTitle>
                <CardDescription className="text-muted-foreground">Manage your interview session</CardDescription>
              </div>
              <div>
                {/* Online Code Editor Button - Only show when interview is in progress */}
                {interviewStatus === "in-progress" && (
                  <Button
                    onClick={() => setShowCodeEditor(true)}
                    variant="outline"
                    size="sm"
                    className="ml-4"
                  >
                    <Code className="h-4 w-4" />
                    Open Code Editor
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-4"
                  onClick={() => setCandidateInfoDialogOpen(true)}
                >
                  <Info className="h-4 w-4" />
                  Candidate Info
                </Button>
              </div>

              {/* Code Editor */}
              <CodeEditor
                isOpen={showCodeEditor}
                onClose={() => setShowCodeEditor(false)}
              />
              <Dialog open={candidateInfoDialogOpen} onOpenChange={setCandidateInfoDialogOpen}>
                <DialogTrigger asChild>
                </DialogTrigger>
                <DialogContent className="max-w-md theme-card">
                  <DialogHeader>
                    <DialogTitle>Candidate Information</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Name</p>
                      <p className="text-sm text-muted-foreground">{candidateData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Position</p>
                      <p className="text-sm text-muted-foreground">{candidateData.position}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Experience</p>
                      <p className="text-sm text-muted-foreground">{candidateData.experience}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Skills</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {candidateData.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Video Call Interface - Embedded */}
              {showVideoCall && (
                <Card className="mb-2 theme-card">
                  <CardContent>
                    <div className="p-4 bg-muted/10 dark:bg-muted/5 rounded-lg">
                      <VideoCallInterface
                        isActive={showVideoCall}
                        onEndCall={endVideoCall}
                        isEmbedded={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Video Meeting Integration */}
              {interviewStatus === "not-started" && (
                <div className="p-4 bg-muted/30 dark:bg-muted/20 rounded-lg theme-transition">
                  <h4 className="font-medium mb-3 text-foreground">Join Video Meeting</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="flex flex-col items-center p-4 h-auto theme-button"
                      onClick={() => joinMeeting('zoom')}
                    >
                      <Video className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-sm">Zoom</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col items-center p-4 h-auto theme-button"
                      onClick={() => joinMeeting('googleMeet')}
                    >
                      <Video className="h-6 w-6 mb-2 text-accent" />
                      <span className="text-sm">Google Meet</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex flex-col items-center p-4 h-auto theme-button"
                      onClick={() => joinMeeting('teams')}
                    >
                      <Video className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-sm">Teams</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Interview Control Buttons */}
              <div className="flex justify-center">
                {interviewStatus === "not-started" && (
                  <>
                    <Button onClick={stopInterview} variant="destructive" size="lg">
                      <Square className="h-5 w-5 mr-2" />
                      Cancel Interview
                    </Button>
                    <Button onClick={startInterview} size="lg" className="bg-accent hover:bg-accent/90 ml-4">
                      <Play className="h-5 w-5 mr-2" />
                      Start Interview
                    </Button>
                  </>
                )}
              </div>

              {/* Real-time Metrics (only show during interview) */}
              {interviewStatus === "in-progress" && (
                <div className="grid md:grid-cols-2 gap-6 space-y-6 md:space-y-0 mt-6">
                  <Card className="theme-card">
                    <CardHeader>
                      <CardTitle className="text-foreground">Real-time Metrics</CardTitle>
                      <CardDescription className="text-muted-foreground">Live interview performance indicators</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(realTimeMetrics).filter(([key]) => key !== 'elapsedTime').map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="capitalize text-foreground">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span className="font-medium text-foreground">{typeof value === 'number' ? `${value}${key.includes('Score') || key.includes('Balance') ? '/100' : ''}` : value}</span>
                          </div>
                          {typeof value === 'number' && <Progress value={value} className="h-2" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-foreground">
                        Live Coaching
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">AI-powered real-time guidance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {liveCoaching.map((coaching, index) => (
                          <Alert key={index} className={`${coaching.type === 'warning' ? 'border-warning/50 bg-warning/10 dark:bg-warning/20' :
                            coaching.type === 'alert' ? 'border-destructive/50 bg-destructive/10 dark:bg-destructive/20' :
                              'border-primary/50 bg-primary/10 dark:bg-primary/20'
                            } theme-transition`}>
                            <AlertTriangle className="h-4 w-4 text-foreground" />
                            <AlertDescription>
                              <div className="flex justify-between items-start">
                                <span className="text-sm text-foreground">{coaching.message}</span>
                                <span className="text-xs text-muted-foreground">{coaching.timestamp}</span>
                              </div>
                            </AlertDescription>
                          </Alert>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Post-Interview Feedback */}
              {showFeedback && (
                <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg text-center theme-transition">
                  <h4 className="font-medium mb-2 text-foreground">Interview Completed!</h4>
                  <p className="text-sm text-muted-foreground mb-3">Please submit your feedback about the candidate</p>
                  <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="theme-button">
                        <FileText className="h-4 w-4 mr-2" />
                        Submit Feedback
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl theme-card">
                      <DialogHeader>
                        <DialogTitle>Interview Feedback - {candidateData.name}</DialogTitle>
                        <DialogDescription>Provide detailed feedback about the candidate's performance</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6 max-h-[60vh] overflow-y-auto">
                        {/* Rating Sliders */}
                        <div className="space-y-4">
                          <div>
                            <Label>Technical Skills: {feedback.technicalSkills[0]}/5</Label>
                            <Slider
                              value={feedback.technicalSkills}
                              onValueChange={(value) => setFeedback({ ...feedback, technicalSkills: value })}
                              max={5}
                              min={1}
                              step={0.5}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Communication: {feedback.communication[0]}/5</Label>
                            <Slider
                              value={feedback.communication}
                              onValueChange={(value) => setFeedback({ ...feedback, communication: value })}
                              max={5}
                              min={1}
                              step={0.5}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Problem Solving: {feedback.problemSolving[0]}/5</Label>
                            <Slider
                              value={feedback.problemSolving}
                              onValueChange={(value) => setFeedback({ ...feedback, problemSolving: value })}
                              max={5}
                              min={1}
                              step={0.5}
                              className="mt-2"
                            />
                          </div>
                          <div>
                            <Label>Overall Rating: {feedback.overallRating[0]}/5</Label>
                            <Slider
                              value={feedback.overallRating}
                              onValueChange={(value) => setFeedback({ ...feedback, overallRating: value })}
                              max={5}
                              min={1}
                              step={0.5}
                              className="mt-2"
                            />
                          </div>
                        </div>

                        {/* Text Feedback */}
                        <div>
                          <Label htmlFor="comments">Overall Comments</Label>
                          <Textarea
                            id="comments"
                            value={feedback.comments}
                            onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                            placeholder="Provide overall assessment of the candidate..."
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="strengths">Key Strengths</Label>
                          <Textarea
                            id="strengths"
                            value={feedback.strengths}
                            onChange={(e) => setFeedback({ ...feedback, strengths: e.target.value })}
                            placeholder="What are the candidate's main strengths?"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="improvements">Areas for Improvement</Label>
                          <Textarea
                            id="improvements"
                            value={feedback.improvements}
                            onChange={(e) => setFeedback({ ...feedback, improvements: e.target.value })}
                            placeholder="What areas need improvement?"
                            className="mt-2"
                          />
                        </div>

                        {/* Recommendation */}
                        <div>
                          <Label htmlFor="recommendation">Recommendation</Label>
                          <Select value={feedback.recommendation} onValueChange={(value) => setFeedback({ ...feedback, recommendation: value })}>
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="strongly-recommend">Strongly Recommend</SelectItem>
                              <SelectItem value="recommend">Recommend</SelectItem>
                              <SelectItem value="consider">Consider</SelectItem>
                              <SelectItem value="not-recommend">Do Not Recommend</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-6">
                        <Button onClick={submitFeedback} className="flex-1">
                          <Send className="h-4 w-4 mr-2" />
                          Submit Feedback
                        </Button>
                        <Button variant="outline" onClick={() => setFeedbackDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Candidate Info & Suggested Questions with Dark Mode */}
          <div className="space-y-6">
            {/* Live Bias Monitor - Only show for interviewer role */}
            <LiveBiasMonitor
              isActive={interviewStatus === "in-progress"}
              interviewDuration={timer}
            />

            {/* Enhanced Suggested Questions with Dark Mode */}
            <Card className="theme-card">
              <CardHeader>
                <CardTitle className="text-foreground">Suggested Questions</CardTitle>
                <CardDescription className="text-muted-foreground">AI-generated questions based on candidate skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidateData.skills.slice(0, 2).map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <h4 className="text-sm font-medium text-primary mb-2">{skill}</h4>
                      <div className="space-y-1">
                        {suggestedQuestions[skill]?.slice(0, 2).map((question, qIndex) => (
                          <p key={qIndex} className="text-xs text-muted-foreground p-2 bg-muted/30 dark:bg-muted/20 rounded theme-transition">
                            {question}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div>
                    <h4 className="text-sm font-medium text-accent mb-2">General</h4>
                    <div className="space-y-1">
                      {dynamicQuestions.slice(0, 2).map((question, index) => (
                        <p key={index} className="text-xs text-muted-foreground p-2 bg-muted/30 dark:bg-muted/20 rounded theme-transition">
                          {question}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


      </div>
    </>
  );
};

export default Interview;
