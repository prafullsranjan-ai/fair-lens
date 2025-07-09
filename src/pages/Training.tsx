import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Play,
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  CheckCircle,
  Star,
  Target,
  Brain,
  Users,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";
import { trainingModules, userProgress, recommendations, achievements } from "@/dummyData";

const Training = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Low": return <Badge className="bg-green-100 text-green-800">Priority: Low</Badge>;
      case "High": return <Badge className="bg-red-100 text-red-800">Priority: High</Badge>;
      case "Medium": return <Badge className="bg-orange-100 text-orange-800">Priority: Medium</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const trainingStats = {
    totalModules: 12,
    completedModules: 7,
    averageScore: 85,
    timeSpent: 25
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 theme-transition">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Training Center</h1>
          <p className="text-muted-foreground">Improve your interviewing skills and reduce bias</p>
        </div>
        <Button className="theme-button">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Training
        </Button>
      </div>

      {/* Training Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Modules Completed</p>
                <p className="text-2xl font-bold text-foreground">{userProgress.completedModules}/{userProgress.totalModules}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <Progress value={(userProgress.completedModules / userProgress.totalModules) * 100} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Score</p>
                <p className="text-2xl font-bold text-foreground">{userProgress.currentScore}%</p>
              </div>
              <Star className="h-8 w-8 text-warning" />
            </div>
            <Progress value={userProgress.currentScore} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Time Invested</p>
                <p className="text-2xl font-bold text-foreground">{userProgress.timeSpent}h</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Training Modules */}
          <Card className="theme-card">
            <CardHeader>
              <CardTitle className="text-foreground">Training Modules</CardTitle>
              <CardDescription className="text-muted-foreground">Interactive courses to improve your interview skills</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trainingModules.map((module) => (
                  <div key={module.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg bg-muted/30 dark:bg-muted/20 theme-transition border border-transparent hover:border-primary/30 transition-colors duration-100">
                    <div className="flex items-center space-x-4 w-full md:w-auto">
                      <div className={`p-2 rounded-full ${module.status === 'completed' ? 'bg-green-200 text-green-800' : module.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-muted text-muted-foreground'}`}>
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-m font-bold text-foreground flex items-center">
                          {module.title}
                          {module.status === 'completed' && (
                            <Badge className="ml-2 text-xs" variant="secondary">Completed</Badge>
                          )}
                          {module.status === 'in-progress' && (
                            <Badge className="ml-2 text-xs" variant="default">In Progress</Badge>
                          )}
                          {module.status === 'not-started' && (
                            <Badge className="ml-2 text-xs" variant="outline">Not Started</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {module.duration}
                          </span>
                          <Badge variant={module.difficulty === 'beginner' ? 'secondary' : module.difficulty === 'intermediate' ? 'default' : 'destructive'} className="text-xs">
                            {module.difficulty}
                          </Badge>
                          {module.deadline && module.status === 'not-started' && (
                            <Badge className="text-xs bg-red-100 text-red-800 border-red-200" variant="outline">
                              Deadline: {module.deadline}
                            </Badge>
                          )}
                          {module.completedDate && module.status === 'completed' && (
                            <Badge className="text-xs bg-green-100 text-green-800 border-green-200" variant="outline">
                              Completed: {module.completedDate}
                            </Badge>
                          )}
                          {module.score !== null && module.status === 'completed' && (
                            <Badge className="text-xs bg-blue-100 text-blue-800 border-blue-200" variant="outline">
                              Score: {module.score}%
                            </Badge>
                          )}
                        </div>
                        {module.status === 'in-progress' && (
                          <div className="mt-2">
                            <Progress value={module.progress} className="h-2" />
                            <span className="text-xs text-muted-foreground ml-1">{module.progress}% complete</span>
                          </div>
                        )}
                        {module.feedback && (
                          <div className="mt-2 text-xs text-primary flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Feedback: {module.feedback}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      {module.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-accent" />
                      ) : (
                        <Button size="sm" className="theme-button">
                          <Play className="h-4 w-4 mr-1" />
                          {module.status === 'in-progress' ? 'Continue' : 'Start'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Achievements */}
          <Card className="theme-card">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Achievements</CardTitle>
              <CardDescription className="text-muted-foreground">Your training milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30 dark:bg-muted/20 theme-transition">
                    <Award className="h-6 w-6 text-warning" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Enhanced AI-driven Training Recommendations with Dark Mode */}
          <Card className="theme-card">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                AI Recommendations
              </CardTitle>
              <CardDescription className="text-muted-foreground">Personalized training suggestions based on your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <Alert key={rec.id} className="theme-card bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/30 theme-transition">
                    <Target className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-medium text-foreground mb-1">{rec.title}</div>
                      <AlertDescription className="text-muted-foreground text-sm">
                        {rec.description}
                      </AlertDescription>
                      <div className="flex items-center justify-between mt-2">
                        {getStatusBadge(rec.priority)}
                        <Button size="sm" className="theme-button">
                          Start Now
                        </Button>
                      </div>
                    </div>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Training;
