import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "./store";
import { theme } from "./theme";
import AppRoutes from "./routes/AppRoutes";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import VisitorTracker from "./components/VisitorTracker/VisitorTracker";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <div className="app">
            <Header />
            <main className="main-content">
              <AppRoutes />
            </main>
            <Footer />
            <VisitorTracker />
          </div>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
