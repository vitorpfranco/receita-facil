import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./global.scss";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "./theme/themeGenerator";
import { AppProvider } from "./provider/AppProvider";
import PreFetchImages from "./components/PreFetchImages";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={lightTheme}>
      <AppProvider>
        <CssBaseline />
        <RouterProvider router={router} />
        <PreFetchImages />
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
