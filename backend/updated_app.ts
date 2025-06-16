import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Login from './components/Login';
import ClientDashboard from './components/ClientDashboard';
import ClientCaseView from './components/ClientCaseView';
import ClientIntakeForm from './components/ClientIntakeForm';
import MedicalInformation from './components/MedicalInformation';
import PersonalInformation from './components/PersonalInformation';
import IncidentInformation from './components/IncidentInformation';
import InsuranceInformation from './components/InsuranceInformation';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clients" element={<ClientDashboard />} />
          <Route path="/clients/:clientId" element={<ClientCaseView />} />
          <Route path="/clients/:clientId/medical" element={<MedicalInformation />} />
          <Route path="/clients/:clientId/personal" element={<PersonalInformation />} />
          <Route path="/clients/:clientId/incident" element={<IncidentInformation />} />
          <Route path="/clients/:clientId/insurance" element={<InsuranceInformation />} />
          <Route path="/clients/intake" element={<ClientIntakeForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;