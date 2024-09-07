import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {routes} from './routes'
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import FooterComponent from "./components/FooterComponent/FooterComponent";

function App() {
  return (
    <div>
      <Router>
        <Routes>
        {routes.map(route =>{
          const Page = route.page
          const Header = route.isShowHeader ? HeaderComponent : Fragment
          const Footer = route.isShowFooter ? FooterComponent : Fragment
          return (
            <Route key={route.path} path={route.path} element={
              <>
                <Header />
                <Page />
                <Footer />
              </>
            } />
          )
        })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
