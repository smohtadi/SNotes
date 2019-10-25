import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import requireAuth from './components/Route.component';
import Navbar from './components/Navbar.component';
import LandingContainer from './components/Landing/LandingContainer.component';
import RegisterContainer from './components/Register/RegisterContainer.component';
import DashboardContainer from './components/Dashboard/DashboardContainer.component';
import EditTransactionContainer from './components/EditTransaction/EditTransactionContainer.component';
import ReportContainer from './components/Report/ReportContainer.component';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <Route exact path="/" component={LandingContainer} />
          <Route exact path="/register" component={RegisterContainer} />
          <Route exact path="/profile/" component={requireAuth(DashboardContainer)} />
          <Route exact path="/transaction/edit/:id" component={requireAuth(EditTransactionContainer)}/>
          <Route exact path="/report" component={requireAuth(ReportContainer)} />
        </div>
      </Router>
    </div>
  );
}

export default App;
