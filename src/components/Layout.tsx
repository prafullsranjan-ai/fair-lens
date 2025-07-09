import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  View,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Users,
  FileText,
  Calendar,
  Upload,
  BookOpen,
  Play,
  User,
  ClipboardList,
  LayoutDashboard,
  Eye
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      case 'hr': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'interviewer': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  // Role-based background utility
  const getRoleBg = (role: string) => {
    switch (role) {
      case 'admin': return 'role-bg-admin';
      case 'hr': return 'role-bg-hr';
      case 'interviewer': return 'role-bg-interviewer';
      default: return '';
    }
  };

  const getNavLinks = () => {
    if (!user) return [];

    const commonTransparencyLink = { path: '/transparency', label: 'Transparency', icon: Eye, roles: ['admin', 'hr', 'interviewer'] };

    const roleSpecificLinks = {
      admin: [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin'] },
        { path: '/users', label: 'User Management', icon: Users, roles: ['admin'] },
        { path: '/reports', label: 'Reports', icon: FileText, roles: ['admin'] },
        commonTransparencyLink,
        { path: '/settings', label: 'Settings', icon: Settings, roles: ['admin'] }
      ],
      hr: [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['hr'] },
        { path: '/interviewers', label: 'Interviewers', icon: Users, roles: ['hr'] },
        { path: '/resumes', label: 'Resumes', icon: Upload, roles: ['hr'] },
        { path: '/schedule', label: 'Schedule', icon: Calendar, roles: ['hr'] },
        { path: '/candidate-review', label: 'Candidate Review', icon: ClipboardList, roles: ['hr'] },
        { path: '/reports', label: 'Reports', icon: FileText, roles: ['hr'] },
        commonTransparencyLink
      ],
      interviewer: [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['interviewer'] },
        { path: '/training', label: 'Training', icon: BookOpen, roles: ['interviewer'] },
        { path: '/interview', label: 'Interview', icon: Play, roles: ['interviewer'] },
        commonTransparencyLink
      ]
    };

    return roleSpecificLinks[user.role] || [];
  };

  const navLinks = getNavLinks();

  return (
    <div className={`min-h-screen bg-background theme-transition ${user ? getRoleBg(user.role) : ''}`}>
      {/* Enhanced Header with Responsive Design */}
      <header className="bg-card/80 border-b border-border sticky top-0 z-50 backdrop-blur-xl theme-transition">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <View className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Fair Lens
                </span>
              </div>

              {/* Enhanced Desktop Navigation - Responsive */}
              <nav className="hidden md:flex space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover-lift ${
                      location.pathname === link.path 
                        ? 'bg-primary/10 text-primary shadow-md border border-primary/20 dark:bg-primary/20 dark:border-primary/30' 
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="hidden lg:block">{link.label}</span>
                    <span className="lg:hidden">{link.label.split(' ')[0]}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
              <ThemeToggle />
              
              <Button variant="ghost" size="sm" asChild className="relative hover-lift">
                <Link to="/notifications">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </Link>
              </Button>

              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                  <Badge className={`text-xs font-medium ${getRoleColor(user?.role || '')}`}>
                    {user?.role?.toUpperCase()}
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" onClick={logout} className="hover-lift text-muted-foreground hover:text-foreground">
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden hover-lift"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden mt-6 pb-4 border-t border-border pt-4 animate-fade-in">
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 theme-transition ${
                      location.pathname === link.path
                        ? 'bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20 dark:border-primary/30'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-fade-in theme-transition">{children}</main>
    </div>
  );
};

export default Layout;
