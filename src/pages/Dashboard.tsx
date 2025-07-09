
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  View, 
  Users, 
  Calendar,
  Download,
  ArrowLeft,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const recentSessions = [
    { id: 1, candidate: "Sarah Johnson", date: "2024-01-15", biasScore: 88, comfort: 82, duration: "45 min", status: "completed" },
    { id: 2, candidate: "Michael Chen", date: "2024-01-14", biasScore: 72, comfort: 75, duration: "52 min", status: "flagged" },
    { id: 3, candidate: "Emily Rodriguez", date: "2024-01-14", biasScore: 91, comfort: 89, duration: "38 min", status: "completed" },
    { id: 4, candidate: "David Kim", date: "2024-01-13", biasScore: 85, comfort: 78, duration: "41 min", status: "completed" },
  ];

  const biasIndicators = [
    { type: "Speaking Time Imbalance", count: 3, trend: "down" },
    { type: "Interruption Frequency", count: 1, trend: "down" },
    { type: "Question Bias", count: 2, trend: "stable" },
    { type: "Tone Inconsistency", count: 1, trend: "down" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-4 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <View className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold">Fair Lens Dashboard</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Link to="/interview">
              <Button>New Interview</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Bias Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">84.2</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
                +2.4% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Comfort Index</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">78.9</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1 text-green-600" />
                +1.8% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline h-3 w-3 mr-1 text-red-600" />
                -8% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bias Incidents</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">7</div>
              <p className="text-xs text-muted-foreground">
                <TrendingDown className="inline h-3 w-3 mr-1 text-green-600" />
                -30% from last week
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Recent Sessions</TabsTrigger>
            <TabsTrigger value="trends">Bias Trends</TabsTrigger>
            <TabsTrigger value="coaching">Coaching Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Bias Score Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Bias Score Trend</CardTitle>
                  <CardDescription>Weekly average bias scores over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-40 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-600">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Chart visualization would appear here</p>
                      <p className="text-sm">Showing improvement trend</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bias Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle>Common Bias Indicators</CardTitle>
                  <CardDescription>Most frequent bias types detected</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {biasIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{indicator.type}</p>
                        <p className="text-xs text-gray-600">{indicator.count} incidents this week</p>
                      </div>
                      <Badge variant={
                        indicator.trend === "down" ? "secondary" :
                        indicator.trend === "up" ? "destructive" : "outline"
                      }>
                        {indicator.trend === "down" && <TrendingDown className="h-3 w-3 mr-1" />}
                        {indicator.trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
                        {indicator.trend}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Interview Sessions</CardTitle>
                <CardDescription>Latest interviews with bias analysis results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium">{session.candidate}</h4>
                          <Badge variant={session.status === "flagged" ? "destructive" : "secondary"}>
                            {session.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{session.date} • {session.duration}</p>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-sm font-medium">Bias Score</p>
                          <p className={`text-lg font-bold ${session.biasScore >= 80 ? 'text-green-600' : session.biasScore >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
                            {session.biasScore}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium">Comfort</p>
                          <p className="text-lg font-bold text-blue-600">{session.comfort}</p>
                        </div>
                        <Link to="/report">
                          <Button variant="outline" size="sm">View Report</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interviewer Performance</CardTitle>
                  <CardDescription>Bias reduction progress by interviewer</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Sarah Mitchell</span>
                        <span className="text-sm text-green-600">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">John Davis</span>
                        <span className="text-sm text-blue-600">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Maria Garcia</span>
                        <span className="text-sm text-orange-600">74%</span>
                      </div>
                      <Progress value={74} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Comparison</CardTitle>
                  <CardDescription>Bias scores across different departments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Engineering</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={89} className="w-20 h-2" />
                        <span className="text-sm text-green-600">89%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Product</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm text-blue-600">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Sales</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={78} className="w-20 h-2" />
                        <span className="text-sm text-orange-600">78%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="coaching" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Coaching Recommendations</CardTitle>
                  <CardDescription>Most impactful improvements to focus on</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Reduce Speaking Time Imbalance</h4>
                      <p className="text-xs text-gray-600">Allow candidates more time to elaborate on their answers</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Improve Question Neutrality</h4>
                      <p className="text-xs text-gray-600">Use more inclusive language in technical assessments</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium">Maintain Consistent Tone</h4>
                      <p className="text-xs text-gray-600">Keep energy levels consistent across all candidates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Training Resources</CardTitle>
                  <CardDescription>Recommended learning materials for improvement</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <View className="h-4 w-4 mr-2" />
                    Unconscious Bias Training Module
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Inclusive Interview Techniques
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Fair Assessment Strategies
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
