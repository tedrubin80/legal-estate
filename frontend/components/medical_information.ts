import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface MedicalProvider {
  id: string;
  name: string;
  type: string;
  phone: string;
  address: string;
  dateFirstSeen: string;
  dateLastSeen: string;
  totalBills: number;
  status: 'active' | 'completed' | 'pending';
}

interface MedicalRecord {
  id: string;
  provider: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  billReceived: boolean;
  recordsReceived: boolean;
}

interface Injury {
  id: string;
  bodyPart: string;
  description: string;
  severity: 'Minor' | 'Moderate' | 'Severe' | 'Critical';
  dateReported: string;
  currentStatus: string;
}

const MedicalInformation: React.FC = () => {
  const { clientId } = useParams();
  const [activeTab, setActiveTab] = useState('providers');
  const [selectedProvider, setSelectedProvider] = useState<MedicalProvider | null>(null);

  const navigationItems = [
    { id: 'overview', label: 'Home', icon: '🏠', path: `/clients/${clientId}` },
    { id: 'client', label: 'Client', icon: '👤' },
    { id: 'defendants', label: 'Defendants', icon: '⚖️' },
    { id: 'incident', label: 'Incident', icon: '📋' },
    { id: 'parties', label: 'Other Parties', icon: '👥' },
    { id: 'photos', label: 'Photos', icon: '📸' },
    { id: 'recordings', label: 'Recordings', icon: '🎵' },
    { id: 'injuries', label: 'Injuries', icon: '🏥' },
    { id: 'medical', label: 'Medical Treatment', icon: '💊', active: true },
    { id: 'insurance', label: 'Health Insurance', icon: '🛡️' },
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

  const medicalProviders: MedicalProvider[] = [
    {
      id: '1',
      name: 'Newport Beach Medical Center',
      type: 'Emergency Room',
      phone: '(714) 760-5555',
      address: '1100 Newport Center Dr, Newport Beach, CA 92660',
      dateFirstSeen: '09/20/2015',
      dateLastSeen: '09/20/2015',
      totalBills: 15420.00,
      status: 'completed'
    },
    {
      id: '2',
      name: 'Dr. Sarah Chen - Orthopedic Surgery',
      type: 'Orthopedic Surgeon',
      phone: '(714) 555-0123',
      address: '3800 Chapman Ave, Orange, CA 92868',
      dateFirstSeen: '09/25/2015',
      dateLastSeen: '03/15/2016',
      totalBills: 28750.00,
      status: 'completed'
    },
    {
      id: '3',
      name: 'Pacific Physical Therapy',
      type: 'Physical Therapy',
      phone: '(714) 555-0456',
      address: '1250 Corona Pointe Ct, Corona, CA 92879',
      dateFirstSeen: '10/15/2015',
      dateLastSeen: '05/20/2016',
      totalBills: 12350.00,
      status: 'completed'
    },
    {
      id: '4',
      name: 'Advanced Pain Management',
      type: 'Pain Management',
      phone: '(714) 555-0789',
      address: '2200 Lynn Rd, Thousand Oaks, CA 91360',
      dateFirstSeen: '01/10/2016',
      dateLastSeen: '08/15/2016',
      totalBills: 9825.00,
      status: 'active'
    }
  ];

  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      provider: 'Newport Beach Medical Center',
      date: '09/20/2015',
      type: 'Emergency Visit',
      description: 'Initial trauma assessment and X-rays',
      cost: 3420.00,
      billReceived: true,
      recordsReceived: true
    },
    {
      id: '2',
      provider: 'Dr. Sarah Chen',
      date: '09/25/2015',
      type: 'Consultation',
      description: 'Orthopedic evaluation and MRI review',
      cost: 850.00,
      billReceived: true,
      recordsReceived: true
    },
    {
      id: '3',
      provider: 'Dr. Sarah Chen',
      date: '10/05/2015',
      type: 'Surgery',
      description: 'Arthroscopic knee surgery',
      cost: 18500.00,
      billReceived: true,
      recordsReceived: false
    },
    {
      id: '4',
      provider: 'Pacific Physical Therapy',
      date: '10/15/2015',
      type: 'Physical Therapy',
      description: 'Initial PT evaluation',
      cost: 275.00,
      billReceived: true,
      recordsReceived: true
    }
  ];

  const injuries: Injury[] = [
    {
      id: '1',
      bodyPart: 'Right Knee',
      description: 'Torn ACL and meniscus damage',
      severity: 'Severe',
      dateReported: '09/20/2015',
      currentStatus: 'Surgically repaired, ongoing PT'
    },
    {
      id: '2',
      bodyPart: 'Lower Back',
      description: 'Lumbar strain and muscle spasms',
      severity: 'Moderate',
      dateReported: '09/21/2015',
      currentStatus: 'Improved with physical therapy'
    },
    {
      id: '3',
      bodyPart: 'Neck',
      description: 'Cervical strain (whiplash)',
      severity: 'Moderate',
      dateReported: '09/22/2015',
      currentStatus: 'Resolved with treatment'
    },
    {
      id: '4',
      bodyPart: 'Right Shoulder',
      description: 'Rotator cuff strain',
      severity: 'Minor',
      dateReported: '09/25/2015',
      currentStatus: 'Resolved'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Severe': return 'bg-orange-100 text-orange-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Minor': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
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
                <span className="mr-2">🏥</span>
                <span className="font-medium">Medical Information - Thowerd, Patty</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">DOL: 09/20/2015 | Auto Accident | Active Case</span>
              <button className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-sm font-medium">
                Print Summary
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
                  { id: 'providers', label: 'Medical Providers', count: medicalProviders.length },
                  { id: 'records', label: 'Medical Records', count: medicalRecords.length },
                  { id: 'injuries', label: 'Injuries', count: injuries.length },
                  { id: 'insurance', label: 'Health Insurance', count: 2 },
                  { id: 'summary', label: 'Treatment Summary', count: null }
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
                    {tab.count !== null && (
                      <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Medical Providers Tab */}
          {activeTab === 'providers' && (
            <div className="grid grid-cols-3 gap-6">
              {/* Providers List */}
              <div className="col-span-2 bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Medical Providers</h2>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      + Add Provider
                    </button>
                  </div>

                  <div className="space-y-4">
                    {medicalProviders.map((provider) => (
                      <div
                        key={provider.id}
                        onClick={() => setSelectedProvider(provider)}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedProvider?.id === provider.id 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                            <p className="text-sm text-gray-600">{provider.type}</p>
                            <p className="text-sm text-gray-500 mt-1">{provider.phone}</p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(provider.status)}`}>
                              {provider.status}
                            </span>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              ${provider.totalBills.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-4 text-xs text-gray-500">
                          <div>
                            <span className="font-medium">First Seen:</span> {provider.dateFirstSeen}
                          </div>
                          <div>
                            <span className="font-medium">Last Seen:</span> {provider.dateLastSeen}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Summary Statistics */}
                  <div className="mt-8 grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Total Providers</h4>
                      <p className="text-2xl font-bold text-blue-600">{medicalProviders.length}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900">Total Medical Bills</h4>
                      <p className="text-2xl font-bold text-green-600">
                        ${medicalProviders.reduce((sum, p) => sum + p.totalBills, 0).toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-yellow-900">Active Treatments</h4>
                      <p className="text-2xl font-bold text-yellow-600">
                        {medicalProviders.filter(p => p.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Provider Details */}
              <div className="bg-white rounded-lg shadow p-6">
                {selectedProvider ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Provider Details</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{selectedProvider.name}</h4>
                        <p className="text-sm text-gray-600">{selectedProvider.type}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700">Contact Information</h5>
                        <p className="text-sm text-gray-600">{selectedProvider.phone}</p>
                        <p className="text-sm text-gray-600">{selectedProvider.address}</p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700">Treatment Period</h5>
                        <p className="text-sm text-gray-600">
                          {selectedProvider.dateFirstSeen} - {selectedProvider.dateLastSeen}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700">Financial Summary</h5>
                        <p className="text-lg font-semibold text-gray-900">
                          ${selectedProvider.totalBills.toLocaleString()}
                        </p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedProvider.status)}`}>
                          {selectedProvider.status}
                        </span>
                      </div>

                      <div className="pt-4 border-t">
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                          Request Records
                        </button>
                        <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                          View Bills
                        </button>
                        <button className="w-full mt-2 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                          Edit Provider
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p>Select a provider to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Medical Records Tab */}
          {activeTab === 'records' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Medical Records</h2>
                  <div className="flex space-x-2">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      + Add Record
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium">
                      Export All
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {medicalRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">{record.date}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{record.provider}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{record.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{record.description}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">${record.cost.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex space-x-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                record.billReceived ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {record.billReceived ? 'Bill ✓' : 'Bill ✗'}
                              </span>
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                record.recordsReceived ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {record.recordsReceived ? 'Records ✓' : 'Records ✗'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-800">View</button>
                              <button className="text-green-600 hover:text-green-800">Edit</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Injuries Tab */}
          {activeTab === 'injuries' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Injuries</h2>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    + Add Injury
                  </button>
                </div>

                <div className="grid gap-4">
                  {injuries.map((injury) => (
                    <div key={injury.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{injury.bodyPart}</h3>
                          <p className="text-sm text-gray-600 mt-1">{injury.description}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            <span className="font-medium">Reported:</span> {injury.dateReported}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            <span className="font-medium">Current Status:</span> {injury.currentStatus}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getSeverityColor(injury.severity)}`}>
                            {injury.severity}
                          </span>
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                            <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Injury Summary */}
                <div className="mt-8 grid grid-cols-4 gap-4">
                  {['Critical', 'Severe', 'Moderate', 'Minor'].map((severity) => (
                    <div key={severity} className="text-center p-4 border rounded-lg">
                      <h4 className="font-medium text-gray-900">{severity}</h4>
                      <p className="text-2xl font-bold text-gray-600 mt-1">
                        {injuries.filter(i => i.severity === severity).length}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Treatment Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Treatment Summary</h2>
                
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline Overview</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Date of Incident</p>
                          <p className="text-sm text-gray-600">September 20, 2015</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">First Medical Treatment</p>
                          <p className="text-sm text-gray-600">September 20, 2015 - Emergency Room</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Surgery Date</p>
                          <p className="text-sm text-gray-600">October 5, 2015 - ACL Reconstruction</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Last Treatment</p>
                          <p className="text-sm text-gray-600">August 15, 2016 - Pain Management</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Emergency Room:</span>
                        <span className="font-medium">$15,420.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Orthopedic Surgery:</span>
                        <span className="font-medium">$28,750.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Physical Therapy:</span>
                        <span className="font-medium">$12,350.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pain Management:</span>
                        <span className="font-medium">$9,825.00</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total Medical Bills:</span>
                        <span>$66,345.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalInformation;