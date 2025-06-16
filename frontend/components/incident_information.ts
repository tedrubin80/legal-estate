import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface IncidentDetails {
  basicInfo: {
    dateOfLoss: string;
    timeOfIncident: string;
    location: {
      address: string;
      city: string;
      state: string;
      zipCode: string;
      coordinates?: string;
    };
    weather: string;
    lightingConditions: string;
    roadConditions: string;
  };
  incidentType: {
    primaryType: string;
    subType: string;
    severity: 'Minor' | 'Moderate' | 'Severe' | 'Fatal';
    description: string;
    causeOfAccident: string[];
  };
  vehicles: {
    id: string;
    year: string;
    make: string;
    model: string;
    color: string;
    licensePlate: string;
    vin: string;
    owner: string;
    driver: string;
    passengers: string[];
    insuranceCompany: string;
    policyNumber: string;
    damages: string;
    towedTo: string;
  }[];
  policeReport: {
    reportFiled: boolean;
    reportNumber?: string;
    respondingOfficer?: string;
    policeStation?: string;
    reportDate?: string;
    citationsIssued?: {
      driver: string;
      citation: string;
      amount: number;
    }[];
  };
  witnesses: {
    id: string;
    name: string;
    phone: string;
    email?: string;
    address: string;
    relationship: string;
    statement: string;
  }[];
  evidence: {
    id: string;
    type: 'Photo' | 'Video' | 'Document' | 'Physical Evidence';
    description: string;
    location: string;
    collectedBy: string;
    dateCollected: string;
    status: 'Collected' | 'Pending' | 'Not Available';
  }[];
}

const IncidentInformation: React.FC = () => {
  const { clientId } = useParams();
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Home', icon: '🏠', path: `/clients/${clientId}` },
    { id: 'client', label: 'Client', icon: '👤', path: `/clients/${clientId}/personal` },
    { id: 'defendants', label: 'Defendants', icon: '⚖️' },
    { id: 'incident', label: 'Incident', icon: '📋', active: true },
    { id: 'parties', label: 'Other Parties', icon: '👥' },
    { id: 'photos', label: 'Photos', icon: '📸' },
    { id: 'recordings', label: 'Recordings', icon: '🎵' },
    { id: 'injuries', label: 'Injuries', icon: '🏥' },
    { id: 'medical', label: 'Medical Treatment', icon: '💊', path: `/clients/${clientId}/medical` },
    { id: 'insurance', label: 'Health Insurance', icon: '🛡️', path: `/clients/${clientId}/insurance` },
    { id: 'employment', label: 'Employment', icon: '💼' },
    { id: 'settlement', label: 'Settlement Advance', icon: '💰' },
    { id: 'liens', label: 'Attorney Liens', icon: '📄' },
    { id: 'misc', label: 'Miscellaneous Liens', icon: '📎' },
    { id: 'settlement-final', label: 'Settlement', icon: '🤝' },
    { id: 'litigation', label: 'Litigation', icon: '⚖️' },
    { id: 'witnesses', label: 'Expert Witness', icon: '👨‍💼' },
    { id: 'discovery', label: 'Discovery', icon: '🔍' },
    { id: 'costs', label: 'Costs', icon: '💳' },
    { id: 'notes', label: 'Notes', icon: '📝' }
  ];

  const incidentData: IncidentDetails = {
    basicInfo: {
      dateOfLoss: '09/20/2015',
      timeOfIncident: '3:45 PM',
      location: {
        address: '1200 Newport Center Dr',
        city: 'Newport Beach',
        state: 'CA',
        zipCode: '92660',
        coordinates: '33.6189° N, 117.9298° W'
      },
      weather: 'Clear',
      lightingConditions: 'Daylight',
      roadConditions: 'Dry'
    },
    incidentType: {
      primaryType: 'Motor Vehicle Accident',
      subType: 'Intersection Collision',
      severity: 'Severe',
      description: 'T-bone collision at controlled intersection. Client was proceeding through green light when defendant ran red light and struck client\'s vehicle on driver side.',
      causeOfAccident: ['Running Red Light', 'Failure to Yield', 'Speeding']
    },
    vehicles: [
      {
        id: '1',
        year: '2013',
        make: 'Honda',
        model: 'Accord',
        color: 'Silver',
        licensePlate: '7ABC123',
        vin: '1HGCR2F30DA123456',
        owner: 'Patricia Thowerd',
        driver: 'Patricia Thowerd',
        passengers: [],
        insuranceCompany: 'State Farm',
        policyNumber: 'SF-789456123',
        damages: 'Severe damage to driver side, totaled',
        towedTo: 'Newport Auto Towing'
      },
      {
        id: '2',
        year: '2010',
        make: 'Ford',
        model: 'F-150',
        color: 'Blue',
        licensePlate: '8XYZ789',
        vin: '1FTFW1ET0AKC54321',
        owner: 'Robert Martinez',
        driver: 'Robert Martinez',
        passengers: ['Maria Martinez'],
        insuranceCompany: 'Geico',
        policyNumber: 'GE-456789012',
        damages: 'Front end damage, airbag deployment',
        towedTo: 'City Tow'
      }
    ],
    policeReport: {
      reportFiled: true,
      reportNumber: 'NPB-2015-09-4578',
      respondingOfficer: 'Officer James Wilson',
      policeStation: 'Newport Beach Police Department',
      reportDate: '09/20/2015',
      citationsIssued: [
        {
          driver: 'Robert Martinez',
          citation: 'Running Red Light (CVC 21453)',
          amount: 450
        },
        {
          driver: 'Robert Martinez',
          citation: 'Failure to Yield (CVC 21801)',
          amount: 250
        }
      ]
    },
    witnesses: [
      {
        id: '1',
        name: 'Jennifer Adams',
        phone: '(714) 555-0123',
        email: 'jadams@email.com',
        address: '456 Ocean Blvd, Newport Beach, CA 92660',
        relationship: 'Independent Witness',
        statement: 'I was waiting at the crosswalk when I saw the blue truck run the red light and hit the silver car. The light had been red for at least 3-4 seconds.'
      },
      {
        id: '2',
        name: 'Michael Chen',
        phone: '(949) 555-0456',
        address: '789 Coast Hwy, Newport Beach, CA 92660',
        relationship: 'Independent Witness',
        statement: 'I was in the car behind the Honda when the accident happened. The Honda had a green light and was proceeding normally when the truck hit them.'
      },
      {
        id: '3',
        name: 'David Kim',
        phone: '(714) 555-0789',
        email: 'dkim@business.com',
        address: '321 Business Center, Newport Beach, CA 92660',
        relationship: 'Business Owner (nearby)',
        statement: 'I heard the crash from my office and came out immediately. The truck was clearly at fault - our security camera captured the whole thing.'
      }
    ],
    evidence: [
      {
        id: '1',
        type: 'Photo',
        description: 'Scene photos showing vehicle positions and damage',
        location: 'Accident scene',
        collectedBy: 'Newport Beach PD',
        dateCollected: '09/20/2015',
        status: 'Collected'
      },
      {
        id: '2',
        type: 'Video',
        description: 'Security camera footage from nearby business',
        location: '321 Business Center',
        collectedBy: 'Attorney Office',
        dateCollected: '09/22/2015',
        status: 'Collected'
      },
      {
        id: '3',
        type: 'Document',
        description: 'Traffic light timing report',
        location: 'City Traffic Department',
        collectedBy: 'Attorney Office',
        dateCollected: '09/25/2015',
        status: 'Collected'
      },
      {
        id: '4',
        type: 'Physical Evidence',
        description: 'Vehicle debris and skid marks',
        location: 'Accident scene',
        collectedBy: 'Accident Reconstruction Expert',
        dateCollected: '09/21/2015',
        status: 'Collected'
      }
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Fatal': return 'bg-red-100 text-red-800';
      case 'Severe': return 'bg-orange-100 text-orange-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Minor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEvidenceStatusColor = (status: string) => {
    switch (status) {
      case 'Collected': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Not Available': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/clients" className="text-2xl font-bold">Legal Estate</Link>
              <div className="text-sm">
                <span className="mr-2">📋</span>
                <span className="font-medium">Incident Information - Thowerd, Patty</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">DOL: {incidentData.basicInfo.dateOfLoss} | {incidentData.incidentType.primaryType}</span>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-sm font-medium"
              >
                {isEditing ? 'Save Changes' : 'Edit Information'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="py-4">
            {navigationItems.map((item) => (
              item.path ? (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 text-gray-700`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ) : (
                <button
                  key={item.id}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                    item.active ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : 'text-gray-700'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'details', label: 'Incident Details' },
                  { id: 'vehicles', label: 'Vehicles', count: incidentData.vehicles.length },
                  { id: 'police', label: 'Police Report' },
                  { id: 'witnesses', label: 'Witnesses', count: incidentData.witnesses.length },
                  { id: 'evidence', label: 'Evidence', count: incidentData.evidence.length }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                    {tab.count !== undefined && (
                      <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Incident Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Loss</label>
                        <input
                          type="date"
                          value={incidentData.basicInfo.dateOfLoss}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input
                          type="time"
                          value={incidentData.basicInfo.timeOfIncident}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={incidentData.basicInfo.location.address}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          value={incidentData.basicInfo.location.city}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <input
                          type="text"
                          value={incidentData.basicInfo.location.state}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                        <input
                          type="text"
                          value={incidentData.basicInfo.location.zipCode}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Weather</label>
                        <select
                          value={incidentData.basicInfo.weather}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        >
                          <option value="Clear">Clear</option>
                          <option value="Cloudy">Cloudy</option>
                          <option value="Rain">Rain</option>
                          <option value="Snow">Snow</option>
                          <option value="Fog">Fog</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lighting</label>
                        <select
                          value={incidentData.basicInfo.lightingConditions}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        >
                          <option value="Daylight">Daylight</option>
                          <option value="Dusk">Dusk</option>
                          <option value="Dark">Dark</option>
                          <option value="Dawn">Dawn</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Road</label>
                        <select
                          value={incidentData.basicInfo.roadConditions}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        >
                          <option value="Dry">Dry</option>
                          <option value="Wet">Wet</option>
                          <option value="Icy">Icy</option>
                          <option value="Construction">Construction</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
                      <input
                        type="text"
                        value={incidentData.incidentType.primaryType}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                      <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getSeverityColor(incidentData.incidentType.severity)}`}>
                        {incidentData.incidentType.severity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Incident Description</h3>
                <textarea
                  rows={4}
                  value={incidentData.incidentType.description}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                />
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contributing Factors</h3>
                <div className="flex flex-wrap gap-2">
                  {incidentData.incidentType.causeOfAccident.map((cause, index) => (
                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                      {cause}
                      {isEditing && (
                        <button className="ml-2 text-red-600 hover:text-red-800">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-dashed border-gray-300 text-gray-600 hover:border-gray-400">
                      + Add Factor
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Vehicles Tab */}
          {activeTab === 'vehicles' && (
            <div className="space-y-6">
              {incidentData.vehicles.map((vehicle, index) => (
                <div key={vehicle.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Vehicle {index + 1}: {vehicle.year} {vehicle.make} {vehicle.model}
                    </h3>
                    {index === 0 && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Client Vehicle
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Vehicle Information</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Year</label>
                          <input type="text" value={vehicle.year} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Make</label>
                          <input type="text" value={vehicle.make} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Model</label>
                          <input type="text" value={vehicle.model} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
                          <input type="text" value={vehicle.color} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">License Plate</label>
                        <input type="text" value={vehicle.licensePlate} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">VIN</label>
                        <input type="text" value={vehicle.vin} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">People</h4>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Owner</label>
                        <input type="text" value={vehicle.owner} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Driver</label>
                        <input type="text" value={vehicle.driver} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Passengers</label>
                        {vehicle.passengers.length > 0 ? (
                          <div className="space-y-1">
                            {vehicle.passengers.map((passenger, i) => (
                              <div key={i} className="text-sm text-gray-600">{passenger}</div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">None</div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Insurance & Damage</h4>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Insurance Company</label>
                        <input type="text" value={vehicle.insuranceCompany} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Policy Number</label>
                        <input type="text" value={vehicle.policyNumber} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Damages</label>
                        <textarea rows={2} value={vehicle.damages} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Towed To</label>
                        <input type="text" value={vehicle.towedTo} disabled={!isEditing} className="w-full px-2 py-1 border rounded text-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isEditing && (
                <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 hover:text-gray-700">
                  + Add Vehicle
                </button>
              )}
            </div>
          )}

          {/* Police Report Tab */}
          {activeTab === 'police' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Police Report Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={incidentData.policeReport.reportFiled}
                      disabled={!isEditing}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Police Report Filed</label>
                  </div>

                  {incidentData.policeReport.reportFiled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Report Number</label>
                          <input
                            type="text"
                            value={incidentData.policeReport.reportNumber}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Responding Officer</label>
                          <input
                            type="text"
                            value={incidentData.policeReport.respondingOfficer}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Police Station</label>
                          <input
                            type="text"
                            value={incidentData.policeReport.policeStation}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Report Date</label>
                          <input
                            type="date"
                            value={incidentData.policeReport.reportDate}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {incidentData.policeReport.citationsIssued && incidentData.policeReport.citationsIssued.length > 0 && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Citations Issued</h3>
                  <div className="space-y-3">
                    {incidentData.policeReport.citationsIssued.map((citation, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-gray-900">{citation.driver}</h4>
                            <p className="text-sm text-gray-600">{citation.citation}</p>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-gray-900">${citation.amount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Witnesses Tab */}
          {activeTab === 'witnesses' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Witnesses</h2>
                {isEditing && (
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    + Add Witness
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {incidentData.witnesses.map((witness) => (
                  <div key={witness.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{witness.name}</h3>
                        <p className="text-sm text-gray-600">{witness.relationship}</p>
                        <p className="text-sm text-gray-600">{witness.phone}</p>
                        {witness.email && <p className="text-sm text-gray-600">{witness.email}</p>}
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{witness.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">{witness.statement}</p>
                      </div>
                    </div>
                    {isEditing && (
                      <div className="mt-3 flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                        <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Evidence Tab */}
          {activeTab === 'evidence' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Evidence</h2>
                {isEditing && (
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    + Add Evidence
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collected By</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {incidentData.evidence.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.type}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.description}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.location}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.collectedBy}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{item.dateCollected}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEvidenceStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">View</button>
                            {isEditing && <button className="text-green-600 hover:text-green-800">Edit</button>}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentInformation;