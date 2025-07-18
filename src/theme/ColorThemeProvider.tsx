// --- EXTERN IMPORTS ---
import { createContext, useContext, useEffect, useState } from "react";

type ColorTheme = "light" | "dark"

type ColorThemeContextType = {
  theme: ColorTheme;
  toggleTheme: () => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined)

export function ColorThemeProvider({ children }: { children: React.ReactNode}) {
  const [theme, setTheme] = useState<ColorTheme>(() => {
    const savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
      return "dark";
    }

    return savedTheme === "dark" ? "dark": "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
  
  return (
    <ColorThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ColorThemeContext.Provider>
  )
}

export function useColorTheme() {
  const colorThemeContext = useContext(ColorThemeContext);
  if (!colorThemeContext) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return colorThemeContext;
}