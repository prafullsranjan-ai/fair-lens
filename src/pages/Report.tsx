import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Download, 
  ArrowLeft, 
  View, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { sessionData, timelineEvents } from "@/dummyData";

const Report = () => {
  const navigate = useNavigate();

  const coachingTips = [
    {
      category: "Speaking Time Balance",
      severity: "moderate",
      tip: "Allow 5-10 more seconds before jumping in with follow-up questions. This gives candidates time to fully express their thoughts.",
      impact: "High"
    },
    {
      category: "Question Neutrality",
      severity: "low",
      tip: "Replace 'Don't you think...' with 'What's your perspective on...' to avoid leading the candidate toward specific answers.",
      impact: "Medium"
    },
    {
      category: "Non-verbal Encouragement",
      severity: "positive",
      tip: "Great job maintaining eye contact and nodding during candidate responses. This created a supportive atmosphere.",
      impact: "High"
    }
  ];

  const handleScheduleFollowup = () => {
    toast({
      title: "Follow-up Scheduled",
      description: "A calendar invite has been sent to discuss the findings with your team.",
    });
  };

  const handleStartTraining = () => {
    toast({
      title: "Training Module Started",
      description: "Redirecting to the bias awareness training course...",
    });
    // Simulate navigation to training module
    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  const handlePracticeSession = () => {
    toast({
      title: "Practice Session Ready",
      description: "Starting a mock interview to practice the coaching tips.",
    });
    // Navigate to interview page for practice
    setTimeout(() => {
      navigate("/interview");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <View className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Interview Analysis Report</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Session Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Session Overview</CardTitle>
            <CardDescription>
              Interview analysis for {sessionData.candidate} on {sessionData.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600">Duration</h3>
                <p className="text-2xl font-bold">{sessionData.duration}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600">Interviewer</h3>
                <p className="text-lg font-semibold">{sessionData.interviewer}</p>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600">Bias Risk Score</h3>
                <p className="text-3xl font-bold text-green-600">{sessionData.biasScore}/100</p>
                <Badge variant="secondary" className="mt-1">Low Risk</Badge>
              </div>
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-600">Candidate Comfort</h3>
                <p className="text-3xl font-bold text-blue-600">{sessionData.comfortIndex}/100</p>
                <Badge variant="outline" className="mt-1">Good</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Detailed Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Speaking Time Balance</span>
                  <span className="text-sm text-gray-600">65% / 35%</span>
                </div>
                <div className="space-y-1">
                  <div className="flex">
                    <div className="bg-blue-500 h-3 rounded-l" style={{width: '65%'}}></div>
                    <div className="bg-green-500 h-3 rounded-r" style={{width: '35%'}}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Interviewer</span>
                    <span>Candidate</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Question Quality Score</span>
                  <span className="text-sm text-green-600">82/100</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Tone Consistency</span>
                  <span className="text-sm text-blue-600">89/100</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Interruption Frequency</span>
                  <span className="text-sm text-orange-600">3 incidents</span>
                </div>
                <p className="text-xs text-gray-600">Below average - good improvement</p>
              </div>
            </CardContent>
          </Card>

          {/* Bias Indicators */}
          <Card>
            <CardHeader>
              <CardTitle>Bias Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Inclusive Language</span>
                </div>
                <Badge variant="secondary">Excellent</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Speaking Time Imbalance</span>
                </div>
                <Badge variant="outline">Moderate</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Question Neutrality</span>
                </div>
                <Badge variant="secondary">Good</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Cultural Sensitivity</span>
                </div>
                <Badge variant="secondary">Excellent</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Session Timeline</CardTitle>
            <CardDescription>Key moments and coaching opportunities throughout the interview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timelineEvents.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex items-center justify-center w-16 h-8 bg-gray-100 rounded text-xs font-mono">
                    {event.time}
                  </div>
                  <div className="flex-1">
                    <Alert className={
                      event.type === "warning" ? "border-orange-200 bg-orange-50" :
                      event.type === "success" ? "border-green-200 bg-green-50" :
                      "border-blue-200 bg-blue-50"
                    }>
                      <div className="flex items-start space-x-2">
                        {event.type === "warning" && <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />}
                        {event.type === "success" && <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />}
                        {event.type === "info" && <BarChart3 className="h-4 w-4 text-blue-600 mt-0.5" />}
                        <AlertDescription className="text-sm">
                          {event.message}
                        </AlertDescription>
                      </div>
                    </Alert>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coaching Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Personalized Coaching Tips</CardTitle>
            <CardDescription>Actionable recommendations for improving future interviews</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {coachingTips.map((tip, index) => (
              <div key={index} className={`p-4 rounded-lg border-l-4 ${
                tip.severity === "positive" ? "border-green-500 bg-green-50" :
                tip.severity === "moderate" ? "border-orange-500 bg-orange-50" :
                "border-blue-500 bg-blue-50"
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{tip.category}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs">
                      {tip.impact} Impact
                    </Badge>
                    {tip.severity === "positive" ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{tip.tip}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Items */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-start"
                onClick={handleScheduleFollowup}
              >
                <View className="h-6 w-6 mb-2 text-blue-600" />
                <span className="font-medium">Schedule Follow-up</span>
                <span className="text-sm text-gray-600">Discuss findings with team</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-start"
                onClick={handleStartTraining}
              >
                <BarChart3 className="h-6 w-6 mb-2 text-green-600" />
                <span className="font-medium">Training Module</span>
                <span className="text-sm text-gray-600">Complete bias awareness course</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-start"
                onClick={handlePracticeSession}
              >
                <Clock className="h-6 w-6 mb-2 text-purple-600" />
                <span className="font-medium">Practice Session</span>
                <span className="text-sm text-gray-600">Apply coaching tips in mock interview</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Report;
