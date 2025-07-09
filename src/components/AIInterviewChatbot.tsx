
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageCircle, 
  Minimize2, 
  Maximize2, 
  Send, 
  Bot,
  X,
  Lightbulb,
  Users,
  Brain,
  Sparkles
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: 'suggestion' | 'question' | 'bias-check';
}

interface AIInterviewChatbotProps {
  candidateName: string;
  candidateSkills: string[];
  interviewStatus: string;
}

const AIInterviewChatbot: React.FC<AIInterviewChatbotProps> = ({
  candidateName,
  candidateSkills,
  interviewStatus
}) => {
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message and suggestions
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      type: 'ai',
      content: `Hello! I'm your AI interview assistant. I'm here to help you conduct a bias-free interview with ${candidateName}. I can provide unbiased questions, detect potential bias in your questions, and offer suggestions based on their skills: ${candidateSkills.join(', ')}.`,
      timestamp: new Date(),
      category: 'suggestion'
    };

    const initialSuggestions: Message[] = [
      {
        id: '2',
        type: 'ai',
        content: "💡 **Suggestion**: Start with open-ended questions about their experience to create a comfortable environment.",
        timestamp: new Date(),
        category: 'suggestion'
      },
      {
        id: '3',
        type: 'ai',
        content: `🎯 **Bias-free question**: "Can you walk me through a challenging project you worked on using ${candidateSkills[0]}?"`,
        timestamp: new Date(),
        category: 'question'
      }
    ];

    setMessages([welcomeMessage, ...initialSuggestions]);
  }, [candidateName, candidateSkills]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate AI responses based on interview context
  const generateAIResponse = (userMessage: string): Message => {
    const responses = {
      bias: [
        "✅ **Bias Check**: That question looks good! It focuses on skills rather than personal characteristics.",
        "⚠️ **Bias Alert**: Consider rephrasing to focus on professional experience rather than personal background.",
        "💡 **Improvement**: Try asking about specific technical challenges instead of general personality traits."
      ],
      questions: [
        `🎯 **Technical Question**: "How would you approach optimizing ${candidateSkills[0]} performance in a large-scale application?"`,
        `🎯 **Behavioral Question**: "Describe a time when you had to learn a new technology quickly. How did you approach it?"`,
        `🎯 **Problem-solving**: "Walk me through your thought process when debugging a complex issue."`
      ],
      suggestions: [
        "💡 **Tip**: Remember to give the candidate time to think before answering complex questions.",
        "💡 **Suggestion**: Ask follow-up questions to understand their decision-making process.",
        "💡 **Best Practice**: Focus on what they did rather than what the team did."
      ]
    };

    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('bias') || lowerMessage.includes('check')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: responses.bias[Math.floor(Math.random() * responses.bias.length)],
        timestamp: new Date(),
        category: 'bias-check'
      };
    } else if (lowerMessage.includes('question')) {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: responses.questions[Math.floor(Math.random() * responses.questions.length)],
        timestamp: new Date(),
        category: 'question'
      };
    } else {
      return {
        id: Date.now().toString(),
        type: 'ai',
        content: responses.suggestions[Math.floor(Math.random() * responses.suggestions.length)],
        timestamp: new Date(),
        category: 'suggestion'
      };
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'suggestion': return <Lightbulb className="h-3 w-3" />;
      case 'question': return <Users className="h-3 w-3" />;
      case 'bias-check': return <Brain className="h-3 w-3" />;
      default: return <Bot className="h-3 w-3" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'suggestion': return 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800/30';
      case 'question': return 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800/30';
      case 'bias-check': return 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800/30';
      default: return 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-800/30';
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-[9999]">
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-2xl border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
          size="lg"
        >
          <div className="relative">
            <Bot className="h-7 w-7 text-white transition-transform group-hover:scale-110" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
          </div>
        </Button>
        {interviewStatus === "in-progress" && (
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-ping" />
        )}
        {interviewStatus === "in-progress" && (
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full" />
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9999] w-96 max-h-[32rem]">
      <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-2 border-white/20 dark:border-gray-700/30 rounded-2xl overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  AI Assistant
                </CardTitle>
                <p className="text-xs text-muted-foreground">Bias-free Interview Support</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="h-8 w-8 p-0 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-full transition-all duration-200"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {interviewStatus === "in-progress" && (
            <Badge variant="secondary" className="w-fit text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800">
              🔴 Live Interview Support
            </Badge>
          )}
        </CardHeader>
        
        <CardContent className="p-0">
          <ScrollArea className="h-72 px-4 py-2">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm transition-all duration-200 hover:shadow-md ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-lg'
                        : `${getCategoryColor(message.category)} shadow-sm border backdrop-blur-sm`
                    }`}
                  >
                    {message.type === 'ai' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex items-center space-x-1">
                          {getCategoryIcon(message.category)}
                          <span className="font-semibold text-xs">AI Assistant</span>
                        </div>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-3 text-sm shadow-sm border backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 animate-pulse" />
                      <span className="text-muted-foreground">AI is thinking</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                        <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-900/50 dark:to-gray-800/50 backdrop-blur-sm">
            <div className="flex space-x-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask for bias-free questions or suggestions..."
                className="flex-1 text-sm bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-xl px-4 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIInterviewChatbot;
