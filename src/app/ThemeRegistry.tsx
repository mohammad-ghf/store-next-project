"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import rtlPlugin from "stylis-plugin-rtl";

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#f8fafc",
    },
  },
  typography: {
    fontFamily: "var(--font-vazirmatn), Arial, sans-serif",
  },
});

export default function ThemeRegistry({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider
      options={{
        key: "muirtl",
        stylisPlugins: [rtlPlugin],
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
