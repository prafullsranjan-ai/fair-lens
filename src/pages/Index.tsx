import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { View, Eye, MessageSquare, BarChart3, Users, ArrowRight, Shield, Zap, Target, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const Index = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: Eye,
      title: "Visual Analysis",
      description: "AI-powered facial expression analysis to detect unconscious bias and candidate comfort levels",
      color: "text-blue-600"
    },
    {
      icon: MessageSquare,
      title: "Language Processing",
      description: "NLP analysis of question phrasing, tone, and communication patterns for bias detection",
      color: "text-emerald-600"
    },
    {
      icon: BarChart3,
      title: "Interaction Metrics",
      description: "Track speaking time, interruptions, and engagement balance throughout the interview",
      color: "text-purple-600"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Consent-based monitoring with full transparency and compliance with privacy regulations",
      color: "text-amber-600"
    },
    {
      icon: Zap,
      title: "Real-time Coaching",
      description: "Gentle, non-disruptive nudges to help interviewers maintain fair and inclusive practices",
      color: "text-red-600"
    },
    {
      icon: Target,
      title: "Analytics Dashboard",
      description: "Comprehensive reporting and trend analysis for continuous improvement in hiring practices",
      color: "text-teal-600"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of People, TechCorp",
      content: "Fair Lens helped us reduce hiring bias by 85% while improving candidate experience significantly.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Chief HR Officer, InnovateCo",
      content: "The real-time coaching feature transformed how our interviewers conduct sessions. Game-changing tool.",
      rating: 5
    },
    {
      name: "Emily Thompson",
      role: "Talent Director, StartupXYZ",
      content: "Implementation was seamless, and the bias detection accuracy exceeded our expectations.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 dark:from-background dark:via-background/90 dark:to-primary/10 theme-transition">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-xl theme-transition">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <View className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Fair Lens
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Features
            </Link>
            <Link to="/interview" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Demo
            </Link>
            <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              Pricing
            </a>
            <ThemeToggle />
            <Link to="/login">
              <Button variant="outline" className="mr-2">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button className="btn-primary">Try Free</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/10 px-4 py-2 text-sm font-medium border border-primary/20">
              🚀 AI-Powered Bias Detection Platform
            </Badge>
            
            <h1 className="mb-6 leading-tight text-foreground">
              Eliminate Hiring Bias with
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AI-Powered Detection
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your hiring process with real-time bias detection, intelligent coaching, and comprehensive analytics. 
              Build more equitable teams with cutting-edge AI technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/interview">
                <Button size="lg" className="btn-primary group">
                  Try Fair Lens Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 hover:bg-slate-50 text-blue-600 hover:bg-blue-50 hover:text-blue-700">
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Demo Preview */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-emerald-500 p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-8 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-700 dark:to-slate-600">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-2xl font-semibold mb-2 text-slate-800 dark:text-white">
                      Live Bias Detection
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Real-time analysis of interview interactions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card theme-transition">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-slide-up">
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/10 border border-accent/20">
              Comprehensive Detection
            </Badge>
            <h2 className="mb-4 text-foreground">
              Advanced AI Analysis
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI analyzes multiple dimensions of interview interactions to ensure fair and unbiased hiring decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-interactive border-0 bg-white dark:bg-slate-700" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 ${feature.color} bg-opacity-10 rounded-xl flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 bg-muted/30 theme-transition">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-slate-900 dark:text-white">
              Trusted by Leading Companies
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Join hundreds of organizations building fairer hiring practices
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="card-interactive bg-white dark:bg-slate-800 border-0">
                <CardHeader>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {testimonial.role}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-white mb-6">
            Ready to Transform Your Hiring?
          </h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join forward-thinking companies using AI to build more equitable and inclusive hiring practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/interview">
              <Button size="lg" variant="secondary" className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-blue-50">
                Start Your First Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700">
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 px-4 theme-transition">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <View className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">Fair Lens</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Building bias-free hiring, one interview at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link to="/interview" className="hover:text-white transition-colors">Demo</Link></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#support" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Fair Lens. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
