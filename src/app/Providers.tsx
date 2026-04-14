
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" attribute="class">
      <div className="text-dark-300 dark:text-dark-200 bg-dark-50 dark:bg-dark-900 select-none min-h-screen transition-colors duration-300">
      {children}
      </div>
    </ThemeProvider>
  );
}
