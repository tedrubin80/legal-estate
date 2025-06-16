import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface CaseTask {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'overdue';
}

interface Worker {
  role: string;
  name: string;
  email?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  category: string;
  size?: string;
}

const ClientCaseView: React.FC = () => {
  const { clientId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Mock data - in real app, this would come from API
  const caseData = {
    id: clientId,
    name: 'Thowerd, Patty',
    caseType: 'Personal Injury',
    dateOfLoss: '09/20/2015',
    caseAge: 1877,
    status: 'Active',
    attorney: 'John Smith',
    photo: '/api/placeholder/200/200',
    clientContact: {
      phone: '(714) 721-6882',
      email: 'social@casepeer.com',
      address: '3821 Campus Drive, B-1, Newport Beach, CA 92660'
    },
    caseDetails: {
      pendingStatute: 'PROTECTED',
      incidentReport: 'Requested',
      clientsProperty: 'Major',
      damages: '$84,012.00',
      healthProviders: 18,
      healthBills: '$84,012.00',
      healthInsurance: 'Unknown',
      recovery: '$400.00',
      lostWages: 'Unknown',
      advancedLoans: '$1,455.55'
    }
  };

  const workers: Worker[] = [
    { role: 'Primary contact', name: 'S. Dove' },
    { role: 'Case assistant', name: 'A. Camacho' },
    { role: 'Intake', name: 'D. Hore' },
    { role: 'Litigation firm', name: 'Smith & Associates' },
    { role: 'Case manager', name: 'S. Dove' },
    { role: 'Lien negotiator', name: 'D. Fancher' },
    { role: 'Investigator', name: 'D. Hensley' },
    { role: 'Litigation attorney', name: 'D. Ly' },
    { role: 'Lead attorney', name: 'J. Fancher' },
    { role: 'Supervising attorney', name: 'J. Fancher' },
    { role: 'Referred to', name: 'CasePeer Law Firm' },
    { role: 'Litigation assistant', name: 'S. Dove' }
  ];

  const caseTasks: CaseTask[] = [
    {
      id: '1',
      title: 'Assigned Simone Dove',
      assignee: 'Simone Dove',
      dueDate: '06/22/2019 10:05 a.m.',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Due 06/22/2019 Call client to let them know we send them notification of demand letter.',
      assignee: 'Simone Dove',
      dueDate: '06/22/2019',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Order remaining medical records',
      assignee: 'Alexis Camacho',
      dueDate: '06/14/2019 1:54 p.m.',
      status: 'pending'
    },
    {
      id: '4',
      title: 'Check status on remaining records / bills',
      assignee: 'Alexis Camacho',
      dueDate: '06/14/2019',
      status: 'overdue'
    }
  ];

  const documents: Document[] = [
    { id: '1', name: 'Party dot role and staff template-da2fs', type: 'Investigation', date: '12/03/2019', category: 'Templates' },
    { id: '2', name: 'Comparison.docx', type: 'Expenses', date: '11/26/2019', category: 'Documents' },
    { id: '3', name: 'Party dot role and stuff template 19f5cd', type: 'Correspondence', date: '11/26/2019', category: 'Templates' },
    { id: '4', name: 'Letter to Client f4f36f3-3b8f-4480-b', type: 'Correspondence', date: '11/25/2019', category: 'Letters' },
    { id: '5', name: 'xraysample.pdf', type: 'Med Records', date: '07/27/2019', category: 'Medical' },
    { id: '6', name: 'CT of Brain.jpg S2.pdf', type: 'Med Records', date: '07/26/2019', category: 'Medical' },
    { id: '7', name: 'Accident Report.pdf', type: 'Investigation', date: '07/26/2019', category: 'Reports' }
  ];

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'overdue': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'Investigation': return 'bg-yellow-100 text-yellow-800';
      case 'Expenses': return 'bg-green-100 text-green-800';
      case 'Correspondence': return 'bg-blue-100 text-blue-800';
      case 'Med Records': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Home', icon: '🏠' },
    { id: 'client', label: 'Client', icon: '👤', path: `/clients/${clientId}/personal` },
    { id: 'defendants', label: 'Defendants', icon: '⚖️' },
    { id: 'incident', label: 'Incident', icon: '📋', path: `/clients/${clientId}/incident` },
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
                <span className="font-medium">{caseData.name} - {caseData.caseType} {caseData.dateOfLoss}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">F | Age 44 | 03/05/74 | show sex | (714) 721-6882 | social@casepeer.com | Referral | Auto Accident | S. Dove | 6433-OHF-8733</span>
              <button className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-sm font-medium">
                Demand
              </button>
              <button className="text-white hover:text-gray-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
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
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                    activeTab === item.id ? 'bg-green-50 text-green-600 border-r-2 border-green-600' : 'text-gray-700'
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
          {activeTab === 'overview' && (
            <div className="grid grid-cols-3 gap-6">
              {/* Client Info Card */}
              <div className="col-span-2">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                  <div className="flex items-start space-x-6">
                    <img 
                      src="/api/placeholder/200/200" 
                      alt={caseData.name}
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">{caseData.name}</h2>
                      
                      {/* Workers Section */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 bg-gray-100 px-3 py-1">WORKERS</h3>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          {workers.map((worker, index) => (
                            <div key={index} className="flex justify-between">
                              <span className="text-gray-600">{worker.role}:</span>
                              <span className="font-medium">{worker.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Case Details Grid */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-green-600 text-white p-3 rounded">
                          <div className="font-bold">CASE AGE</div>
                          <div className="text-xl">{caseData.caseAge} days</div>
                        </div>
                        <div className="bg-green-600 text-white p-3 rounded">
                          <div className="font-bold">PENDING STATUTE</div>
                          <div className="text-xl">{caseData.caseDetails.pendingStatute}</div>
                        </div>
                        <div className="bg-orange-500 text-white p-3 rounded">
                          <div className="font-bold">INCIDENT REPORT</div>
                          <div className="text-xl">{caseData.caseDetails.incidentReport}</div>
                        </div>
                        <div className="bg-red-600 text-white p-3 rounded">
                          <div className="font-bold">CLIENT'S PROPERTY DAMAGES</div>
                          <div className="text-xl">{caseData.caseDetails.clientsProperty}</div>
                        </div>
                        <div className="bg-gray-600 text-white p-3 rounded">
                          <div className="font-bold">HEALTH PROVIDERS</div>
                          <div className="text-xl">{caseData.caseDetails.healthProviders}</div>
                        </div>
                        <div className="bg-gray-600 text-white p-3 rounded">
                          <div className="font-bold">HEALTH BILLS</div>
                          <div className="text-xl">{caseData.caseDetails.healthBills}</div>
                        </div>
                        <div className="bg-gray-600 text-white p-3 rounded">
                          <div className="font-bold">HEALTH INSURANCE</div>
                          <div className="text-xl">{caseData.caseDetails.healthInsurance}</div>
                        </div>
                        <div className="bg-green-600 text-white p-3 rounded">
                          <div className="font-bold">RECOVERY / PIP</div>
                          <div className="text-xl">{caseData.caseDetails.recovery}</div>
                        </div>
                        <div className="bg-gray-600 text-white p-3 rounded">
                          <div className="font-bold">LOST WAGES</div>
                          <div className="text-xl">{caseData.caseDetails.lostWages}</div>
                        </div>
                        <div className="bg-blue-600 text-white p-3 rounded">
                          <div className="font-bold">ADVANCED LOANS</div>
                          <div className="text-xl">{caseData.caseDetails.advancedLoans}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Client Contact Info */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-semibold mb-4 bg-gray-100 px-3 py-1">CLIENT CONTACT</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">📞</span>
                      <span>{caseData.clientContact.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">✉️</span>
                      <span>{caseData.clientContact.email}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-gray-600">🏠</span>
                      <span>{caseData.clientContact.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Tasks Sidebar */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">CASE TASKS</h3>
                  <button className="text-green-600 hover:text-green-700">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  {caseTasks.map((task) => (
                    <div key={task.id} className="border-l-4 border-gray-200 pl-4 py-2">
                      <div className={`text-sm font-medium ${getTaskStatusColor(task.status)}`}>
                        Assigned {task.assignee}
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        {task.dueDate}
                      </div>
                      <div className="text-sm text-gray-800">
                        Due {task.dueDate.split(' ')[0]}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {task.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'photos' && (
            <div className="bg-white rounded-lg shadow">
              <div className="flex">
                {/* Documents List */}
                <div className="w-2/3 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Documents</h2>
                    <div className="flex space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800">All Files</button>
                      <button className="text-sm text-gray-600 hover:text-gray-800">Correspondence</button>
                      <button className="text-sm text-gray-600 hover:text-gray-800">Damages</button>
                      <button className="text-sm text-gray-600 hover:text-gray-800">Deposition</button>
                      <button className="text-sm text-gray-600 hover:text-gray-800">Expenses</button>
                      <button className="text-sm text-gray-600 hover:text-gray-800">Investigation</button>
                    </div>
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <select className="text-sm border border-gray-300 rounded px-3 py-1">
                        <option>Views</option>
                        <option>List View</option>
                        <option>Grid View</option>
                      </select>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="text-sm border border-gray-300 rounded px-3 py-1 pl-8"
                        />
                        <svg className="w-4 h-4 text-gray-400 absolute left-2 top-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-sm text-blue-600 hover:text-blue-800">More</button>
                      <button className="text-sm text-blue-600 hover:text-blue-800">Clear filters</button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <input type="checkbox" className="rounded border-gray-300" />
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Related</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Date</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {documents.map((doc) => (
                          <tr 
                            key={doc.id} 
                            className="hover:bg-gray-50 cursor-pointer"
                            onClick={() => setSelectedDocument(doc)}
                          >
                            <td className="px-4 py-2">
                              <input type="checkbox" className="rounded border-gray-300" />
                            </td>
                            <td className="px-4 py-2">
                              <div className="flex items-center">
                                <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                                </svg>
                                <span className="text-sm text-blue-600 hover:text-blue-800">{doc.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-2">
                              <button className="text-blue-500 hover:text-blue-700">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                              </button>
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-900">{doc.date}</td>
                            <td className="px-4 py-2">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDocumentTypeColor(doc.type)}`}>
                                {doc.type}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Document Preview */}
                <div className="w-1/3 border-l border-gray-200 p-6">
                  {selectedDocument ? (
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Accident Report</h3>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                            </svg>
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                            </svg>
                          </button>
                          <button className="text-blue-600 hover:text-blue-800">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4 text-sm">
                        <div>
                          <span className="font-medium">Name:</span>
                          <div className="text-gray-600">{selectedDocument.name}</div>
                        </div>
                        <div>
                          <span className="font-medium">Author:</span>
                          <div className="text-gray-600">Bryan Billig</div>
                        </div>
                        <div>
                          <span className="font-medium">Sent Date:</span>
                          <div className="text-gray-600">{selectedDocument.date}</div>
                        </div>
                        <div>
                          <span className="font-medium">Received:</span>
                          <div className="text-gray-600">{selectedDocument.date}</div>
                        </div>
                        <div>
                          <span className="font-medium">Due Date:</span>
                          <div className="text-gray-600">MM/DD/YYYY</div>
                        </div>
                        <div>
                          <span className="font-medium">Type:</span>
                          <div className="text-gray-600">{selectedDocument.type}</div>
                        </div>
                        <div>
                          <span className="font-medium">Category:</span>
                          <div className="text-gray-600">{selectedDocument.category}</div>
                        </div>
                      </div>

                      {/* Document Preview */}
                      <div className="mt-6 border border-gray-200 rounded">
                        <div className="bg-gray-100 p-2 text-center text-sm font-medium">
                          Document Preview
                        </div>
                        <div className="h-96 bg-white flex items-center justify-center">
                          <div className="text-gray-400">
                            <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/>
                            </svg>
                            <p>PDF Preview</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 mt-20">
                      <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p>Select a document to preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientCaseView;