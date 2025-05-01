import React from "react";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

interface ThemeToggleProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <Toggle 
      pressed={theme === "dark"} 
      onPressedChange={toggleTheme}
      className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-all"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon className="h-5 w-5 text-primary" />
      ) : (
        <Sun className="h-5 w-5 text-primary" />
      )}
    </Toggle>
  );
};

export default ThemeToggle;
