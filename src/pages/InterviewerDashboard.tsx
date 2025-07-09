
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  Clock,
  Play,
  BookOpen,
  TrendingUp,
  Award,
  Target,
  Bell,
  AlertTriangle,
  CheckCircle,
  Star
} from "lucide-react";
import { Link } from "react-router-dom";
import { interviewerStats, interviewRecentFeedback, interviewTodaySchedule, interviewTrainingModules, resumes } from "@/dummyData";

const InterviewerDashboard = () => {

  // Calculate combined readiness score
  const readinessScore = Math.round((interviewerStats.biasScore + interviewerStats.trainingScore) / 2);

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 theme-transition">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Interviewer Dashboard</h1>
          <p className="text-muted-foreground">Your interviews and performance insights</p>
        </div>
        <div className="flex space-x-2">
          <Link to="/training">
            <Button variant="outline" className="theme-button">
              <BookOpen className="h-4 w-4 mr-2" />
              Training
            </Button>
          </Link>
          <Link to="/interview">
            <Button className="theme-button">
              <Play className="h-4 w-4 mr-2" />
              Start Interview
            </Button>
          </Link>
        </div>
      </div>

      {/* Enhanced Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Interviews</p>
                <p className="text-2xl font-bold text-foreground">{interviewerStats.todayInterviews}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold text-foreground">{interviewerStats.weeklyInterviews}</p>
              </div>
              <Clock className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bias Score</p>
                <p className="text-2xl font-bold text-accent">{interviewerStats.biasScore}/100</p>
              </div>
              <Target className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Training Score</p>
                <p className="text-2xl font-bold text-purple-500 dark:text-purple-400">{interviewerStats.trainingScore}/100</p>
              </div>
              <Award className="h-8 w-8 text-purple-500 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Readiness Score</p>
                <p className="text-2xl font-bold text-primary">{readinessScore}/100</p>
              </div>
              <Star className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-1 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-foreground">Today's Schedule</CardTitle>
                <CardDescription className="text-muted-foreground">Your assigned interviews for today</CardDescription>
              </div>
              <Link to="/interview" className="block mt-4">
                <Button className="w-full theme-button">
                  <Play className="h-4 w-4 mr-2" />
                  Start Next Interview
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {interviewTodaySchedule.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 dark:bg-muted/20 theme-transition">
                  <div>
                    <p className="font-medium text-foreground">{interview.candidate}</p>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-foreground">{interview.time}</p>
                    <Badge
                      variant={interview.status === "in-progress" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {interview.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Training Dashboard */}
      <Card className="theme-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-foreground">Training Dashboard</CardTitle>
              <CardDescription className="text-muted-foreground">Your assigned training modules and progress</CardDescription>
            </div>
            <Link to="/training" className="block mt-4">
              <Button variant="outline" className="w-full theme-button">
                <Play className="h-4 w-4 mr-2" />
                Continue Training
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {interviewTrainingModules.map((module) => (
              <div key={module.id} className="space-y-2 p-4 border border-border rounded-lg bg-card theme-transition">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{module.title}</span>
                      {module.status === "completed" && <Award className="h-4 w-4 text-accent" />}
                      {module.deadline && (
                        <Badge variant="destructive" className="text-xs">
                          Due: {module.deadline}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Progress: {module.progress}%</span>
                      {module.score && <span>Score: {module.score}/100</span>}
                      {module.completedDate && <span>Completed: {module.completedDate}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        module.status === "completed" ? "default" :
                          module.status === "in-progress" ? "secondary" : "outline"
                      }
                      className="text-xs"
                    >
                      {module.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Feedback & Tips</CardTitle>
          <CardDescription className="text-muted-foreground">Personalized coaching to improve your interview skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {interviewRecentFeedback.map((feedback, index) => (
            <Alert key={index} className={
              feedback.type === "positive"
                ? "border-accent/30 bg-accent/5 dark:bg-accent/10 theme-transition" :
                feedback.type === "improvement"
                  ? "border-warning/30 bg-warning/5 dark:bg-warning/10 theme-transition" :
                  "border-primary/30 bg-primary/5 dark:bg-primary/10 theme-transition"
            }>
              <div className="flex items-start space-x-2">
                {feedback.type === "positive" && <Award className="h-4 w-4 text-accent mt-0.5" />}
                {feedback.type === "improvement" && <Target className="h-4 w-4 text-warning mt-0.5" />}
                {feedback.type === "tip" && <BookOpen className="h-4 w-4 text-primary mt-0.5" />}
                <AlertDescription className="text-sm text-foreground">
                  {feedback.message}
                </AlertDescription>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/interview">
              <Button className="w-full h-auto p-4 flex flex-col items-center theme-button hover-lift">
                <Play className="h-6 w-6 mb-2" />
                <span className="font-medium">Start Interview</span>
                <span className="text-xs opacity-75">Begin new session</span>
              </Button>
            </Link>
            <Link to="/training">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center theme-button hover-lift">
                <BookOpen className="h-6 w-6 mb-2 text-primary" />
                <span className="font-medium text-foreground">Training Hub</span>
                <span className="text-xs text-muted-foreground">Improve your skills</span>
              </Button>
            </Link>
            <Link to="/schedule">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center theme-button hover-lift">
                <Calendar className="h-6 w-6 mb-2 text-purple-500 dark:text-purple-400" />
                <span className="font-medium text-foreground">View Schedule</span>
                <span className="text-xs text-muted-foreground">Check appointments</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewerDashboard;
