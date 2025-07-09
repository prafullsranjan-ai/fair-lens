
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Eye, 
  Download, 
  View, 
  Check, 
  Clock,
  Edit,
  Trash2,
  Users,
  X
} from "lucide-react";
import { useState } from "react";
import { resumes } from "@/dummyData";

const Resumes = () => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResumes, setSelectedResumes] = useState<number[]>([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [newResume, setNewResume] = useState({
    candidateName: "",
    position: "",
    experience: "",
    skills: "",
    file: null as File | null
  });
  const [resumeList, setResumeList] = useState(resumes);

  // Filter resumes by status - Replace Anonymized/Processing with Pending Review
  const pendingReviewResumes = resumeList.filter(r => r.candidateStatus === 'pending-review');
  const selectedResumesData = resumeList.filter(r => r.candidateStatus === 'selected');
  const rejectedResumesData = resumeList.filter(r => r.candidateStatus === 'rejected');

  const getStatusColor = (status: string) => {
    switch (status) {
      case "anonymized": return "text-green-600";
      case "processing": return "text-blue-600";
      case "not-anonymized": return "text-gray-600";
      default: return "text-orange-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "anonymized": return <Check className="h-4 w-4 text-green-600" />;
      case "processing": return <Clock className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getCandidateStatusBadge = (status: string) => {
    switch (status) {
      case "selected": return <Badge className="bg-green-100 text-green-800">Selected Resume</Badge>;
      case "rejected": return <Badge className="bg-red-100 text-red-800">Rejected Resume</Badge>;
      case "pending-review": return <Badge className="bg-orange-100 text-orange-800">Pending Review</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewResume({...newResume, file});
    }
  };

  const handleUploadResume = () => {
    console.log("Uploading resume:", newResume);
    setNewResume({ candidateName: "", position: "", experience: "", skills: "", file: null });
    setUploadDialogOpen(false);
    alert("Resume uploaded successfully!");
  };

  const toggleAnonymization = (resumeId: number) => {
    setResumeList(prevList =>
      prevList.map(resume => {
        if (resume.id !== resumeId) return resume;
        if (resume.anonymizationEnabled) {
          return {
            ...resume,
            anonymizationEnabled: false,
            anonymizationProgress: 0,
            status: "not-anonymized"
          };
        } else {
          const progress = Math.floor(Math.random() * 101);
          return {
            ...resume,
            anonymizationEnabled: true,
            anonymizationProgress: progress,
            status: progress === 100 ? "anonymized" : "processing"
          };
        }
      })
    );
  };

  const batchAnonymize = () => {
    console.log("Batch anonymizing resumes:", selectedResumes);
    alert(`Batch anonymizing ${selectedResumes.length} resumes...`);
  };

  const handleSelectResume = (resumeId: number) => {
    setSelectedResumes(prev => 
      prev.includes(resumeId) 
        ? prev.filter(id => id !== resumeId)
        : [...prev, resumeId]
    );
  };

  const previewResume = (resume) => {
    setSelectedResume(resume);
    setPreviewDialogOpen(true);
  };

  const downloadResume = (resume) => {
    console.log("Downloading resume:", resume.originalName);
    alert(`Downloading ${resume.originalName}'s resume...`);
  };

  const editResume = (resume) => {
    setSelectedResume({...resume});
    setEditDialogOpen(true);
  };

  const saveResumeChanges = () => {
    setResumeList(prevList =>
      prevList.map(resume => 
        resume.id === selectedResume.id ? selectedResume : resume
      )
    );
    setEditDialogOpen(false);
    alert("Resume updated successfully!");
  };

  const deleteResume = (resume) => {
    setSelectedResume(resume);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setResumeList(prevList => prevList.filter(resume => resume.id !== selectedResume.id));
    setDeleteDialogOpen(false);
    alert("Resume deleted successfully!");
  };

  const handleCandidateAction = (resumeId: number, action: string) => {
    setResumeList(prevList =>
      prevList.map(resume => 
        resume.id === resumeId 
          ? {...resume, candidateStatus: action === 'accept' ? 'selected' : 'rejected'}
          : resume
      )
    );
    alert(`Candidate ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`);
  };

  const renderResumeCard = (resume: any) => (
    <div key={resume.id} className="p-4 border rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={selectedResumes.includes(resume.id)}
            onChange={() => handleSelectResume(resume.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold">
                {resume.anonymizationEnabled ? resume.anonymizedName : resume.originalName}
              </h3>
              {getStatusIcon(resume.status)}
              <Badge variant="outline" className={getStatusColor(resume.status)}>
                {resume.status.replace('-', ' ').replace(/\b\w/g, char => char.toUpperCase())}
              </Badge>
              {getCandidateStatusBadge(resume.candidateStatus)}
              {resume.interviewScheduled && (
                <Badge variant="default">Interview Scheduled</Badge>
              )}
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
              <span>ID: {resume.candidateId}</span>
              <span>Position: {resume.position}</span>
              <span>Experience: {resume.experience}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Uploaded: {resume.uploadDate} • Size: {resume.fileSize}
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-6 border rounded-md p-2 justify-center">
            <span className="text-sm">Original</span>
            <Switch
              checked={resume.anonymizationEnabled}
              onCheckedChange={() => toggleAnonymization(resume.id)}
            />
            <span className="text-sm">Anonymize</span>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => previewResume(resume)}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" size="sm" onClick={() => downloadResume(resume)}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={() => editResume(resume)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => deleteResume(resume)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button 
              className="bg-green-500 text-white hover:bg-green-600 w-full"
              variant="outline"
              disabled={resume.candidateStatus === 'selected'}
              size="sm"
              onClick={() => handleCandidateAction(resume.id, 'accept')}
            >
              <Check className="h-4 w-4 mr-2" />
              Accept Resume
            </Button>
            <Button 
              className="bg-red-500 text-white hover:bg-red-600 w-full"
              variant="outline" 
              disabled={resume.candidateStatus === 'rejected'}
              size="sm"
              onClick={() => handleCandidateAction(resume.id, 'reject')}
            >
              <X className="h-4 w-4 mr-2" />
              Reject Resume
            </Button>
          </div>
        </div>
      </div>

      {resume.anonymizationEnabled && resume.anonymizationProgress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Anonymization Progress</span>
            <span className="text-sm text-gray-600">{resume.anonymizationProgress}%</span>
          </div>
          <Progress value={resume.anonymizationProgress} className="h-2" />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium mb-2">Key Skills</h4>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-2">Status Information</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="h-3 w-3 text-green-600" />
              <span>Resume uploaded successfully</span>
            </div>
            {resume.anonymizationEnabled && (
              <>
                <div className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Personal information {resume.status === 'anonymized' ? 'removed' : 'being processed'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Contact details {resume.status === 'anonymized' ? 'hidden' : 'processing'}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Resume Management</h1>
          <p className="text-gray-600">Upload, anonymize, and manage candidate resumes</p>
        </div>
        <div className="flex space-x-2">
          {selectedResumes.length > 0 && (
            <Button onClick={batchAnonymize} variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Batch Anonymize ({selectedResumes.length})
            </Button>
          )}
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Resume
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Resume</DialogTitle>
                <DialogDescription>
                  Upload a candidate resume. You can choose to anonymize it automatically.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="candidateName">Candidate Name</Label>
                  <Input
                    id="candidateName"
                    value={newResume.candidateName}
                    onChange={(e) => setNewResume({...newResume, candidateName: e.target.value})}
                    placeholder="Enter candidate's full name"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Select value={newResume.position} onValueChange={(value) => setNewResume({...newResume, position: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                      <SelectItem value="Backend Engineer">Backend Engineer</SelectItem>
                      <SelectItem value="Full Stack Developer">Full Stack Developer</SelectItem>
                      <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                      <SelectItem value="Product Manager">Product Manager</SelectItem>
                      <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    value={newResume.experience}
                    onChange={(e) => setNewResume({...newResume, experience: e.target.value})}
                    placeholder="e.g., 5 years"
                  />
                </div>
                <div>
                  <Label htmlFor="skills">Key Skills (comma-separated)</Label>
                  <Textarea
                    id="skills"
                    value={newResume.skills}
                    onChange={(e) => setNewResume({...newResume, skills: e.target.value})}
                    placeholder="React, JavaScript, Node.js, etc."
                  />
                </div>
                <div>
                  <Label htmlFor="file">Resume File</Label>
                  <Input
                    id="file"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                  />
                  <p className="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
                </div>
                <Button onClick={handleUploadResume} className="w-full">
                  Upload Resume
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Enhanced Stats - Replace with Pending Review focus */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{pendingReviewResumes.length}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Resumes</p>
                <p className="text-2xl font-bold">{resumeList.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selected</p>
                <p className="text-2xl font-bold text-green-600">
                  {selectedResumesData.length}
                </p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {rejectedResumesData.length}
                </p>
              </div>
              <Trash2 className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Updated Tabbed Resume Management */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Resumes ({resumeList.length})</TabsTrigger>
          <TabsTrigger value="pending-review">Pending Review ({pendingReviewResumes.length})</TabsTrigger>
          <TabsTrigger value="selected">Selected ({selectedResumesData.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedResumesData.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending-review">
          <Card>
            <CardHeader>
              <CardTitle>Pending Review</CardTitle>
              <CardDescription>Resumes awaiting HR review and decision</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingReviewResumes.map(renderResumeCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Resumes</CardTitle>
              <CardDescription>Complete list of candidate resumes with status tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resumeList.map(renderResumeCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="selected">
          <Card>
            <CardHeader>
              <CardTitle>Selected Candidates</CardTitle>
              <CardDescription>Candidates selected for the position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedResumesData.map(renderResumeCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="rejected">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Candidates</CardTitle>
              <CardDescription>Candidates not selected for the position</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {rejectedResumesData.map(renderResumeCard)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Resume Preview - {selectedResume?.originalName}</DialogTitle>
            <DialogDescription>Preview candidate resume details</DialogDescription>
          </DialogHeader>
          {selectedResume && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Position</p>
                  <p className="text-sm text-gray-600">{selectedResume.position}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Experience</p>
                  <p className="text-sm text-gray-600">{selectedResume.experience}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Skills</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedResume.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  This is a preview of the resume. In a real application, this would show the actual resume content or PDF viewer.
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Resume - {selectedResume?.originalName}</DialogTitle>
            <DialogDescription>Update candidate information</DialogDescription>
          </DialogHeader>
          {selectedResume && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editName">Candidate Name</Label>
                <Input
                  id="editName"
                  value={selectedResume.originalName}
                  onChange={(e) => setSelectedResume({...selectedResume, originalName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editPosition">Position</Label>
                <Input
                  id="editPosition"
                  value={selectedResume.position}
                  onChange={(e) => setSelectedResume({...selectedResume, position: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editExperience">Experience</Label>
                <Input
                  id="editExperience"
                  value={selectedResume.experience}
                  onChange={(e) => setSelectedResume({...selectedResume, experience: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editSkills">Skills</Label>
                <Textarea
                  id="editSkills"
                  value={selectedResume.skills.join(', ')}
                  onChange={(e) => setSelectedResume({...selectedResume, skills: e.target.value.split(', ')})}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={saveResumeChanges} className="flex-1">
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Resume</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedResume?.originalName}'s resume? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex space-x-2">
            <Button variant="destructive" onClick={confirmDelete} className="flex-1">
              Delete Resume
            </Button>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resumes;
