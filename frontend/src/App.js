import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import { routes } from './routes';

function App() {
  return (
    <Router>
      <Routes>
        {routes
          .filter(route => !route.isShowDashboard)
          .map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.page />}
            />
          ))}

        {routes
          .filter(route => route.isShowDashboard)
          .map(route => (
            <Route path="/" element={<DashboardComponent pageIndex={route.pageIndex} />}>
              <Route
                key={route.path}
                path={route.path}
                element={<route.page />}
              />
            </Route>
          ))}
      </Routes>
    </Router>
  );
}

export default App;
