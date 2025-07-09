// Dummy data for all app features
// This file centralizes all mock data for development/demo purposes.

// USERS (Admin, HR, Interviewer, Edge Cases)
export const users = [
    { id: 1, name: "Sarah Admin", email: "admin@fairlens.com", role: "admin", department: "Administration", phone: "+1 (555) 123-4567", joinDate: "2023-01-15", lastLogin: "2025-06-27 09:30 AM", userStatus: "active", biasScore: 95, trainingScore: 90, readinessScore: 92, interviewCount: 0, activities: ["User management", "System configuration", "Report generation"] },
    { id: 2, name: "Michael HR", email: "hr@fairlens.com", role: "hr", department: "Human Resources", phone: "+1 (555) 234-5678", joinDate: "2023-02-20", lastLogin: "2025-06-27 10:15 AM", userStatus: "active", biasScore: 88, trainingScore: 85, readinessScore: 87, interviewCount: 12, activities: ["Interview scheduling", "Resume review", "Training assignment"] },
    { id: 3, name: "John Smith", email: "john.smith@company.com", role: "interviewer", department: "Engineering", phone: "+1 (555) 345-6789", joinDate: "2023-03-10", lastLogin: "2025-06-27 11:00 AM", userStatus: "active", status: "excellent", biasScore: 92, trainingScore: 88, readinessScore: 90, interviewCount: 24, activities: ["Conducted interviews", "Bias training", "High performance rating"] },
    { id: 4, name: "Sarah Davis", email: "sarah.davis@company.com", role: "interviewer", department: "Product", phone: "+1 (555) 456-7890", joinDate: "2023-04-01", lastLogin: "2025-06-26 08:00 AM", userStatus: "active", status: "good", biasScore: 88, trainingScore: 80, readinessScore: 85, interviewCount: 18, activities: ["Product interviews", "UX review"] },
    { id: 5, name: "Alice Johnson", email: "alice.johnson@company.com", role: "interviewer", department: "Engineering", phone: "+1 (555) 567-8901", joinDate: "2023-05-01", lastLogin: "2025-06-25 09:00 AM", userStatus: "active", status: "good", biasScore: 85, trainingScore: 82, readinessScore: 80, interviewCount: 10, activities: ["Java interviews", "Spring bootcamp"] },
    { id: 6, name: "Mike Chen", email: "mike.chen@company.com", role: "interviewer", department: "Engineering", phone: "+1 (555) 678-9012", joinDate: "2023-06-01", lastLogin: "2025-06-24 10:00 AM", userStatus: "active", status: "needs-improvement", biasScore: 70, trainingScore: 60, readinessScore: 65, interviewCount: 0, activities: [] },
    { id: 7, name: "Lisa Wong", email: "lisa.wong@company.com", role: "interviewer", department: "Design", phone: "+1 (555) 789-0123", joinDate: "2023-07-01", lastLogin: "2025-06-23 11:00 AM", userStatus: "active", status: "needs-improvement", biasScore: 78, trainingScore: 75, readinessScore: 77, interviewCount: 9, activities: ["Design interviews"] },
    { id: 8, name: "Priya Patel", email: "priya.patel@company.com", role: "interviewer", department: "QA", phone: "+1 (555) 890-1234", joinDate: "2023-08-01", lastLogin: "2025-06-22 12:00 PM", userStatus: "active", status: "good", biasScore: 80, trainingScore: 78, readinessScore: 79, interviewCount: 10, activities: ["QA interviews"] },
    { id: 9, name: "Carlos Gomez", email: "carlos.gomez@company.com", role: "interviewer", department: "DevOps", phone: "+1 (555) 901-2345", joinDate: "2023-09-01", lastLogin: "2025-06-21 01:00 PM", userStatus: "active", status: "needs-improvement", biasScore: 77, trainingScore: 70, readinessScore: 72, interviewCount: 8, activities: ["DevOps interviews"] },
    { id: 10, name: "Emily Zhang", email: "emily.zhang@company.com", role: "interviewer", department: "Design", phone: "+1 (555) 012-3456", joinDate: "2023-10-01", lastLogin: "2025-06-20 02:00 PM", userStatus: "active", status: "good", biasScore: 85, trainingScore: 90, readinessScore: 88, interviewCount: 12, activities: ["UI interviews"] },
    // Edge cases
    { id: 12, name: "Sofia Rossi", email: "sofia.rossi@company.com", role: "interviewer", department: "Product", phone: "+1 (555) 111-2222", joinDate: "2023-11-01", lastLogin: "2025-06-19 03:00 PM", userStatus: "inactive", status: "excellent", biasScore: 90, trainingScore: 92, readinessScore: 91, interviewCount: 14, activities: ["Product interviews"] },
    { id: 13, name: "Liam O'Brien", email: "liam.obrien@company.com", role: "interviewer", department: "Engineering", phone: "+1 (555) 222-3333", joinDate: "2023-12-01", lastLogin: "2025-06-18 04:00 PM", userStatus: "inactive", status: "good", biasScore: 83, trainingScore: 85, readinessScore: 84, interviewCount: 13, activities: ["Full stack interviews"] },
];

export const interviewerStats = {
    todayInterviews: 3,
    weeklyInterviews: 12,
    biasScore: 88,
    trainingScore: 85,
    improvementTrend: "+5%"
  };

  export const interviewTodaySchedule = [
    { id: 1, candidate: "Alice Johnson", time: "10:00 AM", position: "Frontend Developer", status: "upcoming" },
    { id: 2, candidate: "Bob Wilson", time: "2:00 PM", position: "Backend Engineer", status: "in-progress" },
    { id: 3, candidate: "Carol Brown", time: "4:00 PM", position: "Full Stack Developer", status: "upcoming" }
  ];

  export const interviewTrainingModules = [
    { 
      id: 1, 
      title: "Unconscious Bias Recognition", 
      progress: 100, 
      status: "completed",
      score: 92,
      completedDate: "2024-01-15"
    },
    { 
      id: 2, 
      title: "Inclusive Interview Techniques", 
      progress: 100, 
      status: "completed",
      score: 88,
      completedDate: "2024-01-10"
    },
    { 
      id: 3, 
      title: "Fair Question Formulation", 
      progress: 75, 
      status: "in-progress",
      score: null,
      completedDate: null
    },
    { 
      id: 4, 
      title: "Cultural Sensitivity Training", 
      progress: 0, 
      status: "not-started",
      score: null,
      completedDate: null,
      deadline: "2024-01-25"
    }
  ];

  export const interviewRecentFeedback = [
    { type: "positive", message: "Excellent use of open-ended questions in last interview" },
    { type: "improvement", message: "Consider allowing more response time for technical questions" },
    { type: "tip", message: "Practice active listening techniques to improve candidate comfort" }
  ];

// INTERVIEWERS (all must be users, cross-link with resumes/candidates)
export const interviewers = users.filter(u => u.role === "interviewer").map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    department: u.department,
    biasScore: u.biasScore ?? 0,
    interviewCount: u.interviewCount ?? 0,
    skills: ["Skill A", "Skill B"], // Placeholder, can be improved
    status: u.status,
    trainingsAssigned: Math.floor(Math.random() * 3),
    lastActivity: u.lastLogin || "N/A",
    interviews: [] // Will be filled in next step for cross-linking
}));

// CANDIDATES (all must match resumes, cross-link with interviews)
export const candidates = [
  { id: "CAND-001", name: "Candidate A", position: "Frontend Developer" },
  { id: "CAND-002", name: "Candidate B", position: "Backend Engineer" },
  { id: "CAND-003", name: "Candidate C", position: "Full Stack Developer" },
  { id: "CAND-004", name: "Candidate D", position: "Data Scientist" },
  { id: "CAND-005", name: "Candidate E", position: "UI Designer" },
  { id: "CAND-006", name: "Carlos Gomez", position: "DevOps Engineer" },
  { id: "CAND-007", name: "Emily Zhang", position: "UI Designer" },
  { id: "CAND-008", name: "Ahmed Ali", position: "Backend Developer" },
  { id: "CAND-009", name: "Sofia Rossi", position: "Product Manager" },
  { id: "CAND-010", name: "Liam O'Brien", position: "Full Stack Developer" }
];

// Resumes
export const resumes = candidates.slice(0, 10).map((c, i) => ({
    id: i + 1,
    candidateId: c.id,
    originalName: c.name,
    anonymizedName: `Candidate ${String.fromCharCode(65 + i)}`,
    position: c.position,
    experience: `${3 + (i % 7)} years`,
    skills: ["Skill A", "Skill B", "Skill C"].slice(0, (i % 3) + 1),
    uploadDate: `2025-06-${10 + i}`,
    status: i % 3 === 0 ? "not-anonymized" : i % 3 === 1 ? "processing" : "anonymized",
    anonymizationProgress: i % 3 === 2 ? 100 : (i % 3 === 1 ? 80 : 0),
    fileSize: `${1.5 + 0.2 * i} MB`,
    interviewScheduled: i % 2 === 0,
    candidateStatus: i % 4 === 0 ? "selected" : i % 4 === 1 ? "pending-review" : i % 4 === 2 ? "rejected" : "pending-review",
    anonymizationEnabled: i % 3 === 2,
})).concat([
    // Edge cases
]);

export const suggestedInterviewers = [
    {
        id: 1,
        name: "John Smith",
        biasScore: 92,
        skillMatch: 95,
        availability: "Available",
        department: "Engineering",
        skills: ["React", "JavaScript", "TypeScript"],
        reason: "High skill match for Frontend role, excellent bias score"
    },
    {
        id: 2,
        name: "Sarah Davis",
        biasScore: 88,
        skillMatch: 88,
        availability: "Available",
        department: "Product",
        skills: ["Product Management", "UX", "Analytics"],
        reason: "Strong product background"
    },
    {
        id: 3,
        name: "Alice Johnson",
        biasScore: 85,
        skillMatch: 90,
        availability: "Available",
        department: "Engineering",
        skills: ["Java", "Spring", "Hibernate"],
        reason: "Solid Java development experience, good bias score"
    }
];

// REPORTS (cross-link to interviewers, candidates, edge cases)
export const reportData = {
    totalInterviews: 156,
    biasIncidents: 12,
    averageBiasScore: 87,
    improvementRate: 15,
    biasCategories: [
        { name: "Gender Bias", count: 4, incidents: 4, trend: "down" },
        { name: "Cultural Bias", count: 3, incidents: 3, trend: "up" },
        { name: "Age Bias", count: 2, incidents: 2, trend: "down" },
        { name: "Other", count: 3, incidents: 3, trend: "flat" }
    ]
};

export const interviewerReports = interviewers.map((interviewer, idx) => ({
    id: interviewer.id,
    name: interviewer.name,
    department: interviewer.department,
    interviewsCount: interviewer.interviewCount,
    biasScore: interviewer.biasScore,
    incidents: idx % 4,
    status: interviewer.status,
    improvement: idx % 2 === 0 ? `+${idx + 2}%` : `-${idx + 1}%`,
    needsTraining: interviewer.status === "needs-improvement",
    strengths: ["Technical questioning", "Active listening"].slice(0, (idx % 2) + 1),
    improvements: ["Allow more thinking time for candidates"].slice(0, idx % 2),
    lastInterview: `2025-06-${10 + ((idx + 1) % 20)}`
})).concat([
    // Edge case: missing fields
]);

// NOTIFICATIONS (cross-link to users, interviewers, edge cases)
export const notifications = [
  {
    id: 1,
    title: "System Update",
    message: "The system will undergo maintenance on Jan 25, 2024.",
    type: "info",
    recipient: "all",
    date: "2024-01-20",
    read: false,
    sender: "System",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "Bias Alert",
    message: "Potential bias detected in recent interview.",
    type: "warning",
    recipient: "admin",
    date: "2024-01-19",
    read: true,
    sender: "AI Engine",
    time: "1 day ago"
  },
  {
    id: 3,
    title: "Welcome to Fair Lens!",
    message: "Your account has been created.",
    type: "success",
    recipient: "user",
    date: "2024-01-18",
    read: false,
    sender: "System",
    time: "3 days ago"
  },
  // More diverse and edge-case-rich notifications
  {
    id: 5,
    title: "Interview Scheduled",
    message: "Interview scheduled for Candidate B with John Smith.",
    type: "info",
    recipient: users[3].email,
    date: "2025-06-25",
    read: false,
    sender: "System",
    time: "4 days ago"
  },
  {
    id: 6,
    title: "Training Reminder",
    message: "Bias training assigned to Mike Chen.",
    type: "reminder",
    recipient: users[6].email,
    date: "2025-06-24",
    read: false,
    sender: "HR",
    time: "5 days ago"
  },
  {
    id: 7,
    title: "Resume Uploaded",
    message: "Resume uploaded for Candidate C.",
    type: "success",
    recipient: users[2].email,
    date: "2025-06-23",
    read: true,
    sender: "System",
    time: "6 days ago"
  },
  {
    id: 8,
    title: "Unusual Login Detected",
    message: "Unusual login detected for user admin@fairlens.com from new device.",
    type: "alert",
    recipient: users[0].email,
    date: "2025-06-22",
    read: false,
    sender: "Security",
    time: "7 days ago"
  },
  // Edge case: notification with future date
  {
    id: 11,
    title: "Upcoming Feature Release",
    message: "A new feature will be released on July 10, 2025.",
    type: "info",
    recipient: "all",
    date: "2025-07-10",
    read: false,
    sender: "Product Team",
    time: "in 12 days"
  },
  // Edge case: notification with special characters
  {
    id: 12,
    title: "⚠️ System Alert!",
    message: "Critical system error detected: #ERR-502!",
    type: "error",
    recipient: users[0].email,
    date: "2025-06-28",
    read: false,
    sender: "System",
    time: "just now"
  }
];

// Settings
export const settings = {
    systemName: "Fair Lens",
    timezone: "UTC-8",
    language: "en",
    emailNotifications: true,
    smsNotifications: false,
    biasAlerts: true,
    systemUpdates: true,
    sessionTimeout: "60",
    passwordPolicy: "strong",
    twoFactorAuth: false,
    biasThreshold: "75",
    autoReportGeneration: true,
    suggestedInterviewers: true,
    realTimeCoaching: true,
    dataRetention: "365",
    anonymizationLevel: "high",
    backupFrequency: "daily"
};

// Interview session (for Report/Interview pages)
export const sessionData = {
    candidate: "Sarah Johnson",
    date: "January 15, 2024",
    duration: "45 minutes",
    interviewer: "Michael Chen",
    biasScore: 88,
    comfortIndex: 82
};

// TIMELINE EVENTS (cross-link to interviews, edge cases)
export const timelineEvents = [
    { time: "00:00", event: "Interview started", type: "info", message: "Interview started" },
    { time: "05:12", event: "First question asked", type: "info", message: "First question asked" },
    { time: "15:30", event: "Candidate gave strong answer", type: "success", message: "Candidate gave strong answer" },
    { time: "30:00", event: "Potential bias detected", type: "warning", message: "Potential bias detected" },
    { time: "45:00", event: "Interview ended", type: "info", message: "Interview ended" },
    { time: "50:00", event: "Follow-up question on bias", type: "info", message: "Follow-up question on bias" },
    { time: "55:00", event: "Session feedback provided", type: "success", message: "Session feedback provided" },
    { time: "99:99", event: "Impossible time", type: "error", message: "Impossible event time" }, // Edge case
    { time: "12:34", event: "Duplicate event", type: "info", message: "Duplicate event" }
];

// Interview feedback (for Interview page)
export const interviewFeedback = {
    overallScore: 85,
    biasScore: 78,
    questionQuality: 88,
    candidateExperience: 82,
    recommendations: [
        "Consider more open-ended questions about problem-solving",
        "Allow more time for candidate responses",
        "Focus on technical skills rather than personal background"
    ],
    trainingNeeded: ["Active Listening", "Bias Awareness"],
    detailedFeedback: [
        {
            question: "Tell me about yourself",
            score: 4,
            comments: "Good introduction, but could be more concise."
        },
        {
            question: "What is your greatest strength?",
            score: 5,
            comments: "Well-articulated strength, relevant to the job."
        },
        {
            question: "Describe a challenge you faced at work and how you dealt with it.",
            score: 3,
            comments: "Average response, lacked depth in problem-solving approach."
        }
    ]
};

// Meeting platforms (for Interview page)
export const meetingPlatforms = {
    zoom: "https://zoom.us/j/1234567890?pwd=abcd1234",
    googleMeet: "https://meet.google.com/abc-defg-hij",
    teams: "https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123"
};

// Candidate data (for Interview page)
export const candidateData = {
    name: "Alice Johnson",
    position: "Frontend Developer",
    skills: ["React", "JavaScript", "TypeScript", "CSS", "Node.js"],
    experience: "5 years",
    education: "Bachelor's in Computer Science",
    certifications: ["Certified JavaScript Developer", "React Professional Certification"],
    portfolio: "https://alicejohnson.dev",
    availability: "2 weeks notice",
    expectedSalary: "120000",
    location: "San Francisco, CA",
    linkedin: "https://www.linkedin.com/in/alicejohnson",
    github: "https://github.com/alicejohnson"
};

export const suggestedQuestions = {
    React: [
        "Can you explain the concept of Virtual DOM in React?",
        "How do you handle state management in large React applications?",
        "What are React Hooks and how do they differ from class components?"
    ],
    JavaScript: [
        "Explain the difference between let, const, and var in JavaScript.",
        "How does asynchronous programming work in JavaScript?",
        "What are closures and how are they used?"
    ],
    TypeScript: [
        "What are the benefits of using TypeScript over JavaScript?",
        "How do you define and use interfaces in TypeScript?",
        "Explain generic types and their use cases."
    ],
    Java: [
        "What are the main principles of Object-Oriented Programming in Java?",
        "How does Java achieve platform independence?",
        "What is the significance of the main method in Java?"
    ],
    Spring: [
        "Can you explain the Spring Framework's architecture?",
        "What are Spring Beans and how are they managed?",
        "How does Spring handle transaction management?"
    ],
    Hibernate: [
        "What is Hibernate and how does it work?",
        "Can you explain the concept of ORM?",
        "How do you configure Hibernate in a Spring application?"
    ]
};

export const dynamicQuestions = [
  "Tell me about a challenging project you've worked on recently.",
  "How do you approach debugging complex issues?",
  "Describe your experience with team collaboration."
];

export const realTimeMetrics = {
    biasScore: 78,
    speakingBalance: 65,
    questionQuality: 82,
    candidateComfort: 74,
    interruptionCount: 3,
    elapsedTime: "24:35"
};

export const liveCoaching = [
    { type: "warning", message: "Consider allowing the candidate more response time", timestamp: "24:35" },
    { type: "tip", message: "Great use of open-ended questions!", timestamp: "22:10" },
    { type: "alert", message: "Potential bias detected in last question", timestamp: "20:45" }
];

// ENHANCED TRAINING MODULES (for Training page)
export const trainingModules = [
  {
    id: 1,
    title: 'Unconscious Bias Recognition',
    description: 'Learn to identify and mitigate unconscious bias in interviews.',
    status: 'completed',
    progress: 100,
    score: 95,
    completedDate: '2025-06-10',
    duration: '30 min',
    difficulty: 'beginner',
    feedback: 'Excellent understanding of bias concepts.'
  },
  {
    id: 2,
    title: 'Inclusive Interview Techniques',
    description: 'Master techniques to ensure inclusivity and fairness.',
    status: 'completed',
    progress: 100,
    score: 90,
    completedDate: '2025-06-15',
    duration: '45 min',
    difficulty: 'intermediate',
    feedback: 'Great use of inclusive language in mock interviews.'
  },
  {
    id: 3,
    title: 'Fair Question Formulation',
    description: 'Practice writing unbiased, open-ended questions.',
    status: 'in-progress',
    progress: 60,
    score: null,
    completedDate: null,
    duration: '40 min',
    difficulty: 'intermediate',
    feedback: null
  },
  {
    id: 4,
    title: 'Cultural Sensitivity Training',
    description: 'Understand and respect cultural differences in interviews.',
    status: 'not-started',
    progress: 0,
    score: null,
    completedDate: null,
    duration: '35 min',
    difficulty: 'advanced',
    deadline: '2025-07-10',
    feedback: null
  },
  {
    id: 5,
    title: 'Active Listening Skills',
    description: 'Improve your listening skills to better understand candidates.',
    status: 'not-started',
    progress: 0,
    score: null,
    completedDate: null,
    duration: '25 min',
    difficulty: 'beginner',
    feedback: null
  }
];

// ENHANCED USER PROGRESS (for Training page)
export const userProgress = {
  completedModules: 2,
  totalModules: 5,
  currentScore: 92,
  timeSpent: 12.5, // hours
  streak: 4, // days
  nextModule: 'Fair Question Formulation',
  badges: ['Bias Aware', 'Inclusive Communicator']
};

// ENHANCED RECOMMENDATIONS (for Training page)
export const recommendations = [
  {
    id: 1,
    title: 'Complete Cultural Sensitivity Training',
    description: 'This module will help you avoid cultural pitfalls and improve candidate experience.',
    priority: 'High',
    action: 'Start Now'
  },
  {
    id: 2,
    title: 'Practice Fair Question Formulation',
    description: 'Write 5 unbiased questions and get instant feedback from the AI coach.',
    priority: 'Medium',
    action: 'Practice'
  },
  {
    id: 3,
    title: 'Join Live Group Session',
    description: 'Participate in a live session with peers to discuss best practices.',
    priority: 'Low',
    action: 'Register'
  },
  {
    id: 4,
    title: 'Review Your Past Interview Recordings',
    description: 'Analyze your previous interviews for bias and get personalized tips.',
    priority: 'Medium',
    action: 'Review Now'
  }
];

// ENHANCED ACHIEVEMENTS (for Training page)
export const achievements = [
  { id: 1, title: 'Bias Awareness Champion', date: '2025-06-15', description: 'Completed all bias-related modules with a score above 90%.' },
  { id: 2, title: 'Inclusive Interviewer', date: '2025-06-20', description: 'Received positive feedback for inclusive language in 3 interviews.' },
  { id: 3, title: 'Streak Master', date: '2025-06-25', description: 'Completed training 4 days in a row.' },
  { id: 4, title: 'AI Coach Favorite', date: '2025-06-27', description: 'Received 5 AI recommendations in a week.' }
];

// INTERVIEWER INTERVIEWS (cross-link interviewers, candidates, resumes)
interviewers.forEach((interviewer, idx) => {
    interviewer.interviews = Array.from({ length: 2 }, (_, i) => {
        const candidateIdx = (idx * 2 + i) % candidates.length;
        const candidate = candidates[candidateIdx];
        const resume = resumes.find(r => r.candidateId === candidate.id);
        return {
            id: idx * 10 + i + 1,
            candidateName: candidate.name,
            candidateId: candidate.id,
            date: `2025-06-${10 + ((idx + i) % 20)}`,
            position: candidate.position,
            status: i % 2 === 0 ? "completed" : "pending",
            biasScore: 70 + ((idx + i) % 30),
            resumeId: resume ? resume.id : null,
            biasReport: {
                issues: [
                    i % 2 === 0 ? "Minor interruption pattern" : "Good use of inclusive language",
                    i % 2 === 1 ? "Fair assessment conducted" : "Good candidate experience"
                ],
                recommendations: [
                    i % 2 === 0 ? "Allow more response time" : "Continue current approach"
                ]
            }
        };
    });
});

// SCHEDULE (cross-link resumes, candidates, interviewers, edge cases)
export const schedule = [
    {
        id: 1,
        candidateId: "CAND-001",
        candidateName: "Candidate A",
        position: "Frontend Developer",
        interviewer: "John Smith",
        date: "2024-01-20",
        time: "10:00 AM",
        duration: "60 min",
        status: "scheduled",
        interviewerScore: 92,
        candidateStatus: "scheduled",
        biasReport: {
            overallBiasScore: 88,
            issues: ["Minor interruption pattern", "Good use of inclusive language"],
            recommendations: ["Allow more response time", "Continue current approach"]
        }
    },
    {
        id: 2,
        candidateId: "CAND-002",
        candidateName: "Candidate B",
        position: "Backend Engineer",
        date: "2024-01-20",
        time: "2:00 PM",
        duration: "60 min",
        status: "pending-review",
        interviewer: "Mike Chen",
        interviewerScore: 85,
        candidateStatus: "pending-review",
        biasReport: {
            overallBiasScore: 78,
            issues: ["Leading questions detected", "Cultural bias indicators"],
            recommendations: ["Focus on technical skills", "Complete cultural sensitivity training"]
        }
    },
    {
        id: 3,
        candidateId: "CAND-003",
        candidateName: "Candidate C",
        position: "Full Stack Developer",
        date: "2024-01-21",
        time: "11:00 AM",
        duration: "90 min",
        status: "unscheduled",
        interviewer: "Sarah Davis",
        interviewerScore: 88,
        candidateStatus: "unscheduled",
    },
    {
        id: 4,
        candidateId: "CAND-004",
        candidateName: "Candidate D",
        position: "Data Scientist",
        date: "2024-01-18",
        time: "3:00 PM",
        duration: "60 min",
        status: "rejected",
        interviewer: "John Smith",
        interviewerScore: 92,
        candidateStatus: "rejected",
        biasReport: {
            overallBiasScore: 85,
            issues: ["Fair assessment conducted", "Good candidate experience"],
            recommendations: ["Maintain current interview approach"]
        }
    },
    // Additional diverse and edge-case-rich entries
    {
        id: 5,
        candidateId: "CAND-005",
        candidateName: "Priya Patel",
        position: "QA Engineer",
        date: "2025-07-01",
        time: "9:00 AM",
        duration: "45 min",
        status: "scheduled",
        interviewer: "Priya Patel",
        interviewerScore: 90,
        candidateStatus: "pending-review",
        biasReport: {
            overallBiasScore: 90,
            issues: ["Excellent communication", "No bias detected"],
            recommendations: ["Maintain current approach"]
        }
    },
    {
        id: 6,
        candidateId: "CAND-006",
        candidateName: "Carlos Gomez",
        position: "DevOps Engineer",
        date: "2025-07-02",
        time: "1:30 PM",
        duration: "60 min",
        status: "rejected",
        interviewer: "Carlos Gomez",
        interviewerScore: 77,
        candidateStatus: "rejected",
        biasReport: {
            overallBiasScore: 77,
            issues: ["Interview cancelled by candidate"],
            recommendations: ["Reschedule if possible"]
        }
    },
    {
        id: 7,
        candidateId: "CAND-007",
        candidateName: "Emily Zhang",
        position: "UI Designer",
        date: "2025-07-03",
        time: "3:00 PM",
        duration: "30 min",
        status: "pending-review",
        interviewer: "Lisa Wong",
        interviewerScore: 85,
        candidateStatus: "pending-review",
        biasReport: {
            overallBiasScore: 80,
            issues: ["Minor cultural bias detected"],
            recommendations: ["Bias awareness training recommended"]
        }
    },
    {
        id: 8,
        candidateId: "CAND-008",
        candidateName: "Ahmed Ali",
        position: "Backend Developer",
        date: "2025-07-04",
        time: "11:00 AM",
        duration: "60 min",
        status: "scheduled",
        interviewer: "Sofia Rossi",
        interviewerScore: null,
        candidateStatus: "scheduled",
        biasReport: {
            overallBiasScore: null,
            issues: [],
            recommendations: []
        }
    },
    {
        id: 9,
        candidateId: "CAND-009",
        candidateName: "Sofia Rossi",
        position: "Product Manager",
        date: "2025-07-05",
        time: "2:00 PM",
        duration: "90 min",
        status: "scheduled",
        interviewer: "Sofia Rossi",
        interviewerScore: 90,
        candidateStatus: "scheduled",
        biasReport: {
            overallBiasScore: 90,
            issues: ["Excellent candidate experience"],
            recommendations: ["Share best practices"]
        }
    },
    // Edge case: duplicate candidate/interviewer names
    {
        id: 10,
        candidateId: "CAND-010",
        candidateName: "Liam O'Brien",
        position: "Full Stack Developer",
        date: "2025-07-06",
        time: "4:00 PM",
        duration: "60 min",
        status: "pending-review",
        interviewer: "Liam O'Brien",
        interviewerScore: 83,
        candidateStatus: "pending-review",
        biasReport: {
            overallBiasScore: 83,
            issues: ["Potential name confusion"],
            recommendations: ["Verify candidate/interviewer identity"]
        }
    },
    // Edge case: interview in the past
    {
        id: 12,
        candidateId: "CAND-012",
        candidateName: "Prafull Ranjan",
        position: "Full Stack Developer",
        date: "2023-12-15",
        time: "9:00 AM",
        duration: "45 min",
        status: "scheduled",
        interviewer: "John Smith",
        interviewerScore: 95,
        candidateStatus: "selected",
        biasReport: {
            overallBiasScore: 95,
            issues: ["Excellent technical round"],
            recommendations: ["Proceed to next stage"]
        }
    }
];

// Candidate Status Panel Data
export const candidateStatusData = [
    {
      id: 1,
      name: "Alice Johnson",
      position: "Frontend Developer",
      status: "pending-review",
      interviewDate: "2024-01-18",
      interviewer: "John Smith",
      biasScore: 92
    },
    {
      id: 2,
      name: "Bob Wilson",
      position: "Backend Engineer",
      status: "selected",
      interviewDate: "2024-01-19",
      interviewer: "Sarah Davis",
      biasScore: 85
    },
    {
      id: 3,
      name: "Carol Brown",
      position: "Full Stack Developer",
      status: "rejected",
      interviewDate: "2024-01-17",
      interviewer: "Mike Chen",
      biasScore: 78
    }
  ];

export const candidatesReviews = [
    {
        id: 1,
        candidateName: "Alice Johnson",
        candidateId: "CAND-001",
        position: "Frontend Developer",
        interviewDate: "2024-01-18",
        interviewer: "John Smith",
        status: "pending-review",
        biasScore: 92,
        resume: {
            experience: "5 years",
            skills: ["React", "JavaScript", "TypeScript", "CSS"],
            education: "Bachelor's in Computer Science"
        },
        interviewFeedback: {
            technicalSkills: 4.5,
            communication: 4.0,
            problemSolving: 4.2,
            overallRating: 4.2,
            comments: "Strong technical skills, good problem-solving approach. Shows enthusiasm for the role."
        },
        biasReport: {
            overallScore: 92,
            categories: [
                { name: "Gender Bias", score: 95, status: "excellent" },
                { name: "Cultural Bias", score: 90, status: "good" },
                { name: "Age Bias", score: 88, status: "good" }
            ],
            incidents: [],
            recommendations: ["Continue current interview approach", "Maintain inclusive language"]
        }
    },
    {
        id: 2,
        candidateName: "Bob Wilson",
        candidateId: "CAND-002",
        position: "Backend Engineer",
        interviewDate: "2024-01-19",
        interviewer: "Sarah Davis",
        status: "selected",
        biasScore: 85,
        resume: {
            experience: "4 years",
            skills: ["Node.js", "Express", "MongoDB", "Python"],
            education: "Master's in Software Engineering"
        },
        interviewFeedback: {
            technicalSkills: 4.8,
            communication: 4.3,
            problemSolving: 4.6,
            overallRating: 4.6,
            comments: "Excellent backend knowledge, strong system design skills. Great cultural fit."
        },
        biasReport: {
            overallScore: 85,
            categories: [
                { name: "Gender Bias", score: 88, status: "good" },
                { name: "Cultural Bias", score: 82, status: "good" },
                { name: "Age Bias", score: 85, status: "good" }
            ],
            incidents: ["Minor interruption pattern detected"],
            recommendations: ["Allow more response time", "Continue structured approach"]
        }
    },
    {
        id: 3,
        candidateName: "Carol Brown",
        candidateId: "CAND-003",
        position: "Full Stack Developer",
        interviewDate: "2024-01-17",
        interviewer: "Mike Chen",
        status: "rejected",
        biasScore: 78,
        resume: {
            experience: "3 years",
            skills: ["React", "Node.js", "MongoDB", "AWS"],
            education: "Bachelor's in Information Technology"
        },
        interviewFeedback: {
            technicalSkills: 3.2,
            communication: 3.8,
            problemSolving: 3.0,
            overallRating: 3.3,
            comments: "Basic technical knowledge, needs improvement in system design and advanced concepts."
        },
        biasReport: {
            overallScore: 78,
            categories: [
                { name: "Gender Bias", score: 75, status: "needs-improvement" },
                { name: "Cultural Bias", score: 80, status: "good" },
                { name: "Age Bias", score: 79, status: "good" }
            ],
            incidents: ["Leading questions detected", "Potential cultural bias"],
            recommendations: ["Complete bias training", "Focus on skill-based questions"]
        }
    },
    // More relevant and cross-linked reviews
    {
        id: 4,
        candidateName: "Priya Patel",
        candidateId: "CAND-005",
        position: "QA Engineer",
        interviewDate: "2025-06-29",
        interviewer: "Priya Patel",
        status: "selected",
        biasScore: 88,
        resume: {
            experience: "4 years",
            skills: ["Selenium", "Cypress", "Jest"],
            education: "Bachelor's in Computer Science"
        },
        interviewFeedback: {
            technicalSkills: 4.7,
            communication: 4.2,
            problemSolving: 4.5,
            overallRating: 4.5,
            comments: "Excellent QA skills, very detail-oriented. Strong communication."
        },
        biasReport: {
            overallScore: 88,
            categories: [
                { name: "Gender Bias", score: 90, status: "good" },
                { name: "Cultural Bias", score: 87, status: "good" },
                { name: "Age Bias", score: 85, status: "good" }
            ],
            incidents: [],
            recommendations: ["Maintain current approach", "Encourage more scenario-based questions"]
        }
    },
    {
        id: 5,
        candidateName: "Emily Zhang",
        candidateId: "CAND-007",
        position: "UI Designer",
        interviewDate: "2025-06-30",
        interviewer: "Lisa Wong",
        status: "pending-review",
        biasScore: 80,
        resume: {
            experience: "3 years",
            skills: ["Figma", "Sketch", "Adobe XD"],
            education: "Bachelor's in Design"
        },
        interviewFeedback: {
            technicalSkills: 4.0,
            communication: 4.5,
            problemSolving: 4.1,
            overallRating: 4.2,
            comments: "Strong design portfolio, creative thinker. Good communicator."
        },
        biasReport: {
            overallScore: 80,
            categories: [
                { name: "Gender Bias", score: 82, status: "good" },
                { name: "Cultural Bias", score: 80, status: "good" },
                { name: "Age Bias", score: 78, status: "good" }
            ],
            incidents: ["Minor cultural bias detected"],
            recommendations: ["Bias awareness training recommended"]
        }
    },
    {
        id: 6,
        candidateName: "Carlos Gomez",
        candidateId: "CAND-006",
        position: "DevOps Engineer",
        interviewDate: "2025-06-30",
        interviewer: "Carlos Gomez",
        status: "pending-review",
        biasScore: 75,
        resume: {
            experience: "6 years",
            skills: ["AWS", "Docker", "Kubernetes"],
            education: "Master's in Information Systems"
        },
        interviewFeedback: {
            technicalSkills: 4.3,
            communication: 3.9,
            problemSolving: 4.2,
            overallRating: 4.1,
            comments: "Strong DevOps background, needs to improve communication."
        },
        biasReport: {
            overallScore: 75,
            categories: [
                { name: "Gender Bias", score: 78, status: "good" },
                { name: "Cultural Bias", score: 70, status: "needs-improvement" },
                { name: "Age Bias", score: 75, status: "good" }
            ],
            incidents: ["Technical bias detected"],
            recommendations: ["Balance technical and soft skills"]
        }
    },
    // Edge case: missing interviewer, null biasScore
    {
        id: 7,
        candidateName: "Ahmed Ali",
        candidateId: "CAND-008",
        position: "Backend Developer",
        interviewDate: "2025-06-30",
        interviewer: "",
        status: "pending-review",
        biasScore: null,
        resume: {
            experience: "5 years",
            skills: ["Node.js", "Express", "PostgreSQL"],
            education: "Bachelor's in Computer Science"
        },
        interviewFeedback: {
            technicalSkills: 4.1,
            communication: 3.8,
            problemSolving: 4.0,
            overallRating: 4.0,
            comments: "Solid backend skills, needs to improve communication."
        },
        biasReport: {
            overallScore: null,
            categories: [],
            incidents: [],
            recommendations: []
        }
    }
];

// SYSTEM METRICS (for AdminDashboard)
export const systemMetrics = {
  totalUsers: 128,
  activeSessions: 17,
  uptime: '99.98%',
  totalInterviews: 156
};

// RECENT ACTIVITY (for AdminDashboard)
export const recentActivity = [
  {
    id: 1,
    type: 'user',
    description: 'New user registered: Alice Johnson',
    user: 'System',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    type: 'report',
    description: 'Bias report generated for Candidate B',
    user: 'HR Team',
    timestamp: '3 hours ago'
  },
  {
    id: 3,
    type: 'security',
    description: 'Password changed for user admin@fairlens.com',
    user: 'Admin',
    timestamp: '5 hours ago'
  },
  {
    id: 4,
    type: 'report',
    description: 'Bias report generated for Candidate C',
    user: 'Admin',
    timestamp: '8 hours ago'
  }
];

// SYSTEM ALERTS (for AdminDashboard)
export const systemAlerts = [
  {
    id: 1,
    type: 'critical',
    title: 'Database Connection Lost',
    message: 'The system lost connection to the database at 2:15 AM. Immediate action required.'
  },
  {
    id: 2,
    type: 'critical',
    title: 'High CPU Usage',
    message: 'CPU usage exceeded 95% for over 10 minutes.'
  },
  {
    id: 3,
    type: 'info',
    title: 'Scheduled Maintenance',
    message: 'System maintenance is scheduled for July 1, 2025.'
  }
];