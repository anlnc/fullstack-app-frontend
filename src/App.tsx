import { ThemeProvider } from "@emotion/react";
import "./App.css";
import AppRouter from "./components/common/AppRouter";
import { Box, createTheme } from "@mui/material";

const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <AppRouter />
      </Box>
    </ThemeProvider>
  );
}

export default App;
