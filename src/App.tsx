import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";
import "./App.css";
import AppRouter from "./components/common/AppRouter";

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
