import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Users,
  Activity,
  TrendingUp,
  AlertTriangle,
  Settings,
  FileText,
  Calendar,
  Shield,
  BarChart3,
  UserCheck,
  Clock,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { systemMetrics, recentActivity, systemAlerts } from "@/dummyData";

const AdminDashboard = () => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user": return { icon: <Users className="h-4 w-4 text-white" />, color: "bg-blue-500" };
      case "report": return { icon: <FileText className="h-4 w-4 text-white" />, color: "bg-green-500" };
      case "security": return { icon: <Shield className="h-4 w-4 text-white" />, color: "bg-red-500" };
      default: return { icon: <Activity className="h-4 w-4 text-white" />, color: "bg-gray-500" };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-600";
      case "pending": return "text-orange-600";
      case "inactive": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending": return <Badge className="bg-orange-100 text-orange-800">Pending</Badge>;
      case "inactive": return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const userManagementData = [
    {
      id: 1,
      name: "John Smith",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-20",
      securityScore: 95
    },
    {
      id: 2,
      name: "Alice Johnson",
      role: "hr",
      status: "active",
      lastLogin: "2024-01-19",
      securityScore: 88
    },
    {
      id: 3,
      name: "Bob Williams",
      role: "interviewer",
      status: "pending",
      lastLogin: "Never",
      securityScore: 62
    }
  ];

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 theme-transition">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Link to="/users">
            <Button variant="outline" className="theme-button w-full sm:w-auto">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
          </Link>
          <Link to="/settings">
            <Button className="theme-button w-full sm:w-auto">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* System Alerts */}
      <div className="space-y-4">
        {systemAlerts.filter(alert => alert.type === 'critical').map((alert) => (
          <Alert key={alert.id} className="border-destructive/50 bg-destructive/10 dark:bg-destructive/20 dark:border-destructive/30">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-foreground">
              <strong>{alert.title}:</strong> {alert.message}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">{systemMetrics.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold text-foreground">{systemMetrics.activeSessions}</p>
              </div>
              <Activity className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold text-foreground">{systemMetrics.uptime}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Interviews</p>
                <p className="text-2xl font-bold text-foreground">{systemMetrics.totalInterviews}</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enhanced Recent Activity with Dark Mode */}
        <Card className="theme-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-foreground mb-2">Recent Activity</CardTitle>
                <CardDescription className="text-muted-foreground">Latest system events and user actions</CardDescription>
              </div>
              <Link to="/notifications">
                <Button variant="outline" className="theme-button">
                  <Users className="h-4 w-4 mr-2" />
                  View All Activity
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg bg-muted/30 dark:bg-muted/20 theme-transition">
                  <div className={`p-2 rounded-full ${getActivityIcon(activity.type).color}`}>
                    {getActivityIcon(activity.type).icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Management Overview */}
        <Card className="theme-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-foreground mb-2">User Management Overview</CardTitle>
                <CardDescription className="text-muted-foreground">Quick stats and actions for user accounts</CardDescription>
              </div>
              <Link to="/users">
                <Button variant="outline" className="theme-button">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Users
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{userManagementData.filter(user => user.status === "active").length}</div>
                <div className="text-sm text-muted-foreground">Active</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{userManagementData.filter(user => user.status === "pending").length}</div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{userManagementData.filter(user => user.status === "inactive").length}</div>
                <div className="text-sm text-muted-foreground">Inactive</div>
              </div>
            </div>

            <div className="space-y-3">
              {userManagementData.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 dark:bg-muted/20 theme-transition">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-foreground">{user.name}</p>
                      {getStatusBadge(user.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                    <p className="text-xs text-muted-foreground">Last Login: {user.lastLogin}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">Security: {user.securityScore}/100</div>
                    <Button variant="outline" size="sm" className="mt-1 theme-button">
                      <UserCheck className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Performance Analytics */}
        <Card className="theme-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-foreground mb-2">Performance Analytics</CardTitle>
                <CardDescription className="text-muted-foreground">System performance and usage statistics</CardDescription>
              </div>
              <Link to="/reports">
                <Button variant="outline" className="theme-button">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Reports
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
              <div className="mb-4">
                <p className="text-sm font-medium text-foreground">Interview Completion Rate</p>
                <Progress value={75} className="h-2 mt-1 mb-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current</span>
                  <span>75%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">User Engagement</p>
                <Progress value={60} className="h-2 mt-1 mb-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>This Month</span>
                  <span>60%</span>
                </div>
              </div>
          </CardContent>
        </Card>

        {/* System Health Monitor */}
        <Card className="theme-card">
          <CardHeader>
            <CardTitle className="text-foreground">System Health Monitor</CardTitle>
            <CardDescription className="text-muted-foreground">Real-time system status and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-sm font-medium text-foreground">CPU Usage</span>
                <div className="text-right" style={{ width: '80%' }}>
                  <span className="text-sm text-muted-foreground">45%</span>
                  <Progress value={45} className="h-2" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Memory Usage</span>
                <div className="text-right" style={{ width: '80%' }}>
                  <span className="text-sm text-muted-foreground">60%</span>
                  <Progress value={60} className="h-2" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Disk Space</span>
                <div className="text-right" style={{ width: '80%' }}>
                  <span className="text-sm text-muted-foreground">80%</span>
                  <Progress value={80} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Quick Actions */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/users">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center theme-button">
                <Users className="h-6 w-6 mb-2 text-blue-600" />
                <span className="font-medium">Manage Users</span>
                <span className="text-xs text-muted-foreground">Add/edit user accounts</span>
              </Button>
            </Link>
            <Link to="/reports">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center theme-button">
                <FileText className="h-6 w-6 mb-2 text-green-600" />
                <span className="font-medium">Generate Report</span>
                <span className="text-xs text-muted-foreground">Create system analysis</span>
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center theme-button">
                <Settings className="h-6 w-6 mb-2 text-purple-600" />
                <span className="font-medium">System Settings</span>
                <span className="text-xs text-muted-foreground">Configure system options</span>
              </Button>
            </Link>
            <Button variant="outline" className="w-full h-auto p-4 flex flex-col items-center theme-button">
              <Calendar className="h-6 w-6 mb-2 text-orange-600" />
              <span className="font-medium">View Schedule</span>
              <span className="text-xs text-muted-foreground">Upcoming maintenance</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
