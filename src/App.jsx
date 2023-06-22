import ReactGA from "react-ga";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";

// import PrivateRoute from "./routes/PrivateRoute";

import "./App.css";
import config from "./config";
// import { MyThemeContextProvider } from "./contexts/ThemeContext";
import {
  //privateRoutes,
  publicRoutes
} from "./routes";
import "./styles/GlobalStyles/GlobalStyles.scss";

ReactGA.initialize(config.TRACKING_ID);

const App = () => {
  const queryClient = new QueryClient();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Helmet>
            <meta charSet="utf-8" />
            <title>NFT BOOKSTORE - Dashboard</title>
            {/* <link rel="canonical" href="http://mysite.com/example" /> */}
          </Helmet>
          <CssBaseline />
          <Router>
            <Routes>
              {publicRoutes.map((route) => {
                const Page = route.component;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<Page />}
                  />
                );
              })}
              {/* {privateRoutes.map((route) => {
                  const Page = route.component;
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <PrivateRoute>
                          <Page />
                        </PrivateRoute>
                      }
                    />
                  );
                })} */}
            </Routes>
          </Router>
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
