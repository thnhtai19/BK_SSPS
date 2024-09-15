import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardComponent from './components/DashboardComponent/DashboardComponent';
import { routes } from './routes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardComponent />}>
          {routes.map(route => {
            if (route.isShowDashboard) {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<route.page />}
                />
              );
            }
            return null;
          })}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
