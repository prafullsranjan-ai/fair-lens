import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bell, 
  Send, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Plus,
  User,
  Users,
  Calendar
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { notifications } from "@/dummyData";

const Notifications = () => {
  const { user } = useAuth();
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info",
    recipient: "all"
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "warning": return <AlertTriangle className="h-5 w-5 text-orange-500 dark:text-orange-400" />;
      case "success": return <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />;
      default: return <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "warning": return "destructive";
      case "success": return "default";
      default: return "secondary";
    }
  };

  const handleSendNotification = () => {
    console.log("Sending notification:", newNotification);
    setNewNotification({ title: "", message: "", type: "info", recipient: "all" });
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 theme-transition">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-muted-foreground">Manage and view all notifications</p>
        </div>
        {user?.role === 'admin' && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="theme-button w-full md:w-auto">
                <Send className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
            </DialogTrigger>
            <DialogContent className="theme-card">
              <DialogHeader>
                <DialogTitle className="text-foreground">Send New Notification</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Send a notification to users in the system.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-foreground">Title</Label>
                  <Input
                    id="title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({...newNotification, title: e.target.value})}
                    placeholder="Notification title"
                    className="theme-input"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-foreground">Message</Label>
                  <Textarea
                    id="message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({...newNotification, message: e.target.value})}
                    placeholder="Notification message"
                    className="theme-input"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="text-foreground">Type</Label>
                  <Select value={newNotification.type} onValueChange={(value) => setNewNotification({...newNotification, type: value})}>
                    <SelectTrigger className="theme-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="theme-card">
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="recipient" className="text-foreground">Send To</Label>
                  <Select value={newNotification.recipient} onValueChange={(value) => setNewNotification({...newNotification, recipient: value})}>
                    <SelectTrigger className="theme-input">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="theme-card">
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="hr">HR Team</SelectItem>
                      <SelectItem value="interviewer">Interviewers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSendNotification} className="w-full theme-button">
                  Send Notification
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Notifications</p>
                <p className="text-2xl font-bold text-foreground">{notifications.length}</p>
              </div>
              <Bell className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold text-orange-500 dark:text-orange-400">
                  {notifications.filter(n => !n.read).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500 dark:text-orange-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="theme-card card-interactive">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-2xl font-bold text-destructive">
                  {notifications.filter(n => n.type === 'warning').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Notifications List */}
      <Card className="theme-card">
        <CardHeader>
          <CardTitle className="text-foreground">All Notifications</CardTitle>
          <CardDescription className="text-muted-foreground">Recent notifications and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg border theme-transition ${
                  !notification.read 
                    ? 'bg-primary/5 border-primary/20 dark:bg-primary/10 dark:border-primary/30' 
                    : 'bg-muted/30 border-border dark:bg-muted/20'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm md:text-base font-medium text-foreground">{notification.title}</h3>
                        <Badge variant={getBadgeVariant(notification.type)} className="text-xs">
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <Badge variant="outline" className="text-xs border-primary text-primary">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>From: {notification.sender}</span>
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="theme-button text-muted-foreground hover:text-foreground">
                    Mark as Read
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
