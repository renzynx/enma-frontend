import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState<string>("dracula");

  useEffect(() => {
    setTheme(localStorage.getItem("theme") ?? "dracula");
  }, []);
  useEffect(() => {
    localStorage.setItem("theme", theme);
    window.document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
