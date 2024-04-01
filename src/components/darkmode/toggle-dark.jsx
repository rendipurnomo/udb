import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "./theme-provider";

export const ToggleDark = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button
      variant="outline"
      className="w-9 h-9 p-0 rounded-full"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </Button>
  );
}