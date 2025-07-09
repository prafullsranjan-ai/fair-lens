import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Plus, 
  Edit, 
  Mail,
  Phone,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  FileText,
  Calendar,
  Target,
  BarChart3
} from "lucide-react";
import { useState } from "react";
import { interviewers } from "@/dummyData";
import ComprehensiveTransparencyReport from "@/components/ComprehensiveTransparencyReport";

const Interviewers = () => {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [transparencyDialogOpen, setTransparencyDialogOpen] = useState(false);
  const [selectedInterviewer, setSelectedInterviewer] = useState(null);
  const [newInterviewer, setNewInterviewer] = useState({
    name: "",
    email: "",
    department: "",
    skills: ""
  });

  // Calculate overall bias score for the metric
  const overallBiasScore = Math.round(
    interviewers.reduce((sum, interviewer) => sum + interviewer.biasScore, 0) / interviewers.length
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-100 text-green-600";
      case "good": return "bg-blue-100 text-blue-600";
      case "needs-improvement": return "bg-orange-100 text-orange-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getBiasStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "needs-improvement": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "good": return <TrendingUp className="h-4 w-4 text-blue-600" />;
      case "needs-improvement": return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleAddInterviewer = () => {
    console.log("Adding new interviewer:", newInterviewer);
    setNewInterviewer({ name: "", email: "", department: "", skills: "" });
    setAddDialogOpen(false);
  };

  const handleEditInterviewer = (interviewer) => {
    setSelectedInterviewer(interviewer);
    setEditDialogOpen(true);
  };

  const handleContactInterviewer = (interviewer) => {
    setSelectedInterviewer(interviewer);
    setContactDialogOpen(true);
  };

  const showTransparencyReport = (interviewer) => {
    setSelectedInterviewer(interviewer);
    setTransparencyDialogOpen(true);
  };

  const saveInterviewerChanges = () => {
    console.log("Saving changes for:", selectedInterviewer);
    setEditDialogOpen(false);
    setSelectedInterviewer(null);
  };

  const sendMessage = (type) => {
    console.log(`Sending ${type} to:`, selectedInterviewer.name);
    alert(`${type} sent successfully to ${selectedInterviewer.name}!`);
    setContactDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Interviewer Management</h1>
          <p className="text-gray-600">Manage your interviewing team and track performance</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Interviewer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Interviewer</DialogTitle>
              <DialogDescription>Add a new team member to the interviewing panel</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newInterviewer.name}
                  onChange={(e) => setNewInterviewer({...newInterviewer, name: e.target.value})}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newInterviewer.email}
                  onChange={(e) => setNewInterviewer({...newInterviewer, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={newInterviewer.department} onValueChange={(value) => setNewInterviewer({...newInterviewer, department: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="QA">QA</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Textarea
                  id="skills"
                  value={newInterviewer.skills}
                  onChange={(e) => setNewInterviewer({...newInterviewer, skills: e.target.value})}
                  placeholder="React, JavaScript, Node.js, etc."
                />
              </div>
              <Button onClick={handleAddInterviewer} className="w-full">
                Add Interviewer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Interviewers</p>
                <p className="text-2xl font-bold">{interviewers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overall Bias Score</p>
                <p className={`text-2xl font-bold ${getBiasStatusColor(overallBiasScore >= 90 ? 'excellent' : overallBiasScore >= 80 ? 'good' : 'needs-improvement')}`}>
                  {overallBiasScore}/100
                </p>
              </div>
              <Award className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Need Training</p>
                <p className="text-2xl font-bold text-orange-600">
                  {interviewers.filter(i => i.status === 'needs-improvement').length}
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Top Performers</p>
                <p className="text-2xl font-bold text-green-600">
                  {interviewers.filter(i => i.status === 'excellent').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interviewers List */}
      <Card>
        <CardHeader>
          <CardTitle>Interviewer Performance</CardTitle>
          <CardDescription>Track individual interviewer metrics and interview history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {interviewers.map((interviewer) => (
              <div key={interviewer.id} className="p-6 border rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{interviewer.name}</h3>
                      <Badge variant="outline">{interviewer.department}</Badge>
                      {getStatusIcon(interviewer.status)}
                      <Badge className={getStatusColor(interviewer.status)}>
                        {interviewer.status.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{interviewer.email}</p>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Interviews:</span>
                        <span className="font-medium ml-2">{interviewer.interviewCount}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Bias Score:</span>
                        <span className={`font-medium ml-2 ${getBiasStatusColor(interviewer.status)}`}>
                          {interviewer.biasScore}/100
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Trainings:</span>
                        <span className="font-medium ml-2">{interviewer.trainingsAssigned}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Active:</span>
                        <span className="font-medium ml-2">{interviewer.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditInterviewer(interviewer)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleContactInterviewer(interviewer)}>
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => showTransparencyReport(interviewer)}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Full Report
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <Progress value={interviewer.biasScore} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>Bias Score</span>
                    <span>{interviewer.biasScore}/100</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {interviewer.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Recent Interviews</h4>
                    <div className="space-y-1">
                      {interviewer.interviews?.slice(0, 2).map((interview, index) => (
                        <div key={index} className="text-xs text-gray-600 flex justify-between">
                          <span>{interview.candidateName} - {interview.position}</span>
                          <span>Score: {interview.biasScore}/100</span>
                        </div>
                      )) || <span className="text-xs text-gray-500">No recent interviews</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Interviewer Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Interviewer</DialogTitle>
            <DialogDescription>Update interviewer information</DialogDescription>
          </DialogHeader>
          {selectedInterviewer && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editName">Full Name</Label>
                <Input
                  id="editName"
                  value={selectedInterviewer.name}
                  onChange={(e) => setSelectedInterviewer({...selectedInterviewer, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  type="email"
                  value={selectedInterviewer.email}
                  onChange={(e) => setSelectedInterviewer({...selectedInterviewer, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editDepartment">Department</Label>
                <Select value={selectedInterviewer.department} onValueChange={(value) => setSelectedInterviewer({...selectedInterviewer, department: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="QA">QA</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="editSkills">Skills</Label>
                <Textarea
                  id="editSkills"
                  value={selectedInterviewer.skills.join(', ')}
                  onChange={(e) => setSelectedInterviewer({...selectedInterviewer, skills: e.target.value.split(', ')})}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={saveInterviewerChanges} className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Interviewer Dialog */}
      <Dialog open={contactDialogOpen} onOpenChange={setContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact {selectedInterviewer?.name}</DialogTitle>
            <DialogDescription>Send a message or notification</DialogDescription>
          </DialogHeader>
          {selectedInterviewer && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm"><strong>Email:</strong> {selectedInterviewer.email}</p>
                <p className="text-sm"><strong>Department:</strong> {selectedInterviewer.department}</p>
                <p className="text-sm"><strong>Bias Score:</strong> {selectedInterviewer.biasScore}/100</p>
              </div>
              
              <div className="space-y-2">
                <Button className="w-full" onClick={() => sendMessage('Email')}>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="outline" className="w-full" onClick={() => sendMessage('Training Reminder')}>
                  <Target className="h-4 w-4 mr-2" />
                  Send Training Reminder
                </Button>
                <Button variant="outline" className="w-full" onClick={() => sendMessage('Schedule Notification')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Send Schedule Notification
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Comprehensive Transparency Report Dialog */}
      <Dialog open={transparencyDialogOpen} onOpenChange={setTransparencyDialogOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Comprehensive Transparency Report - {selectedInterviewer?.name}</DialogTitle>
            <DialogDescription>
              Complete transparency and performance analysis for {selectedInterviewer?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedInterviewer && (
            <ComprehensiveTransparencyReport 
              interviewerName={selectedInterviewer.name}
              interviewerId={selectedInterviewer.id.toString()}
              overallBiasScore={selectedInterviewer.biasScore}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Interviewers;
