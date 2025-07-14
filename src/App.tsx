import { ColorThemeProvider, useColorTheme } from "./theme/ColorThemeProvider";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./theme/GlobalStyles";
import { darkTheme, lightTheme } from "./theme/colorThemes";
import Header from "./components/Header";
import Home from "./views/Home/Home";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import Detail from "./views/Detail/Detail";

const queryClient = new QueryClient();

// --- CONNECT YOUR APP ---
// --- TO USE TANSTACK QUERY DEVTOOLS, ADD THIS CODE TO YOUR APPLICATION WHERE YOU CREATE YOUR QUERY CLIENT ---
// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/query-core").QueryClient;
  }
}
// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ColorThemeProvider>
          <ThemedApp />
        </ColorThemeProvider>
      </QueryClientProvider>
    </>
  );
}

function ThemedApp() {
  const { theme } = useColorTheme();
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Header />
      {/* <Home /> */}
      <Detail />
    </ThemeProvider>
  );
}