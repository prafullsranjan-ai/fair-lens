
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const { theme, setTheme, actualTheme } = useTheme();

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggle}
      className={`
        relative w-11 h-11 rounded-full hover-lift
        hover:bg-slate-100 dark:hover:bg-slate-800
        focus:ring-2 focus:ring-primary focus:ring-offset-2
        theme-transition
      `}
      aria-label={`Switch to ${actualTheme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`
            absolute inset-0 h-5 w-5 text-amber-500
            transition-all duration-500 ease-in-out
            ${actualTheme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
          `}
        />
        <Moon
          className={`
            absolute inset-0 h-5 w-5 text-blue-500
            transition-all duration-500 ease-in-out
            ${actualTheme === 'light' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}
          `}
        />
      </div>
    </Button>
  );
};

export default ThemeToggle;
