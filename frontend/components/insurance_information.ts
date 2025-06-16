import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface InsurancePolicy {
  id: string;
  type: 'Auto' | 'Health' | 'Liability' | 'Umbrella' | 'Workers Comp' | 'Property' | 'Other';
  company: string;
  policyNumber: string;
  policyHolder: string;
  effectiveDate: string;
  expirationDate: string;
  premium: number;
  deductible: number;
  coverageLimits: {
    bodilyInjury?: string;
    propertyDamage?: string;
    uninsuredMotorist?: string;
    medicalPayments?: string;
    collision?: string;
    comprehensive?: string;
    personalInjury?: string;
    annualMax?: string;
    lifetime?: string;
  };
  status: 'Active' | 'Expired' | 'Cancelled' | 'Pending';
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  claims: {
    id: string;
    claimNumber: string;
    dateReported: string;
    status: 'Open' | 'Closed' | 'Pending' | 'Denied';
    amount: number;
    description: string;
  }[];
}

interface InsuranceData {
  clientPolicies: InsurancePolicy[];
  defendantPolicies: InsurancePolicy[];
  otherPolicies: InsurancePolicy[];
}

const InsuranceInformation: React.FC = () => {
  const { clientId } = useParams();
  const [activeTab, setActiveTab] = useState('auto');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<InsurancePolicy | null>(null);

  const navigationItems = [
    { id: 'overview', label: 'Home', icon: '🏠', path: `/clients/${clientId}` },
    { id: 'client', label: 'Client', icon: '👤', path: `/clients/${clientId}/personal` },
    { id: 'defendants', label: 'Defendants', icon: '⚖️' },
    { id: 'incident', label: 'Incident', icon: '📋', path: `/clients/${clientId}/incident` },
    { id: 'parties', label: 'Other Parties', icon: '👥' },
    { id: 'photos', label: 'Photos', icon: '📸' },
    { id: 'recordings', label: 'Recordings', icon: '🎵' },
    { id: 'injuries', label: 'Injuries', icon: '🏥' },
    { id: 'medical', label: 'Medical Treatment', icon: '💊', path: `/clients/${clientId}/medical` },
    { id: 'insurance', label: 'Health Insurance', icon: '🛡️', active: true },
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

  const insuranceData: InsuranceData = {
    clientPolicies: [
      {
        id: '1',
        type: 'Auto',
        company: 'State Farm',
        policyNumber: 'SF-789456123',
        policyHolder: 'Patricia Thowerd',
        effectiveDate: '01/15/2015',
        expirationDate: '01/15/2016',
        premium: 1200,
        deductible: 500,
        coverageLimits: {
          bodilyInjury: '$100,000/$300,000',
          propertyDamage: '$50,000',
          uninsuredMotorist: '$100,000/$300,000',
          medicalPayments: '$5,000',
          collision: '$500 deductible',
          comprehensive: '$250 deductible'
        },
        status: 'Active',
        agent: {
          name: 'Sarah Martinez',
          phone: '(714) 555-0123',
          email: 'smartinez@statefarm.com'
        },
        claims: [
          {
            id: '1',
            claimNumber: 'SF-2015-09-456123',
            dateReported: '09/20/2015',
            status: 'Open',
            amount: 25000,
            description: 'Auto accident claim for vehicle damage and medical expenses'
          }
        ]
      },
      {
        id: '2',
        type: 'Health',
        company: 'Blue Cross Blue Shield',
        policyNumber: 'BCBS-456789012',
        policyHolder: 'Patricia Thowerd',
        effectiveDate: '01/01/2015',
        expirationDate: '12/31/2015',
        premium: 4800,
        deductible: 1500,
        coverageLimits: {
          annualMax: '$1,000,000',
          lifetime: '$5,000,000'
        },
        status: 'Active',
        agent: {
          name: 'Michael Chen',
          phone: '(949) 555-0456',
          email: 'mchen@bcbs.com'
        },
        claims: [
          {
            id: '1',
            claimNumber: 'BCBS-2015-09-789',
            dateReported: '09/22/2015',
            status: 'Open',
            amount: 15420,
            description: 'Emergency room treatment for auto accident injuries'
          },
          {
            id: '2',
            claimNumber: 'BCBS-2015-10-456',
            dateReported: '10/05/2015',
            status: 'Closed',
            amount: 28750,
            description: 'Orthopedic surgery and related treatment'
          }
        ]
      },
      {
        id: '3',
        type: 'Umbrella',
        company: 'Liberty Mutual',
        policyNumber: 'LM-789012345',
        policyHolder: 'Patricia & Michael Thowerd',
        effectiveDate: '06/01/2015',
        expirationDate: '06/01/2016',
        premium: 800,
        deductible: 0,
        coverageLimits: {
          personalInjury: '$2,000,000'
        },
        status: 'Active',
        agent: {
          name: 'Jennifer Adams',
          phone: '(714) 555-0789',
          email: 'jadams@libertymutual.com'
        },
        claims: []
      }
    ],
    defendantPolicies: [
      {
        id: '4',
        type: 'Auto',
        company: 'Geico',
        policyNumber: 'GE-456789012',
        policyHolder: 'Robert Martinez',
        effectiveDate: '03/01/2015',
        expirationDate: '03/01/2016',
        premium: 900,
        deductible: 1000,
        coverageLimits: {
          bodilyInjury: '$25,000/$50,000',
          propertyDamage: '$25,000',
          uninsuredMotorist: '$25,000/$50,000',
          medicalPayments: '$2,500'
        },
        status: 'Active',
        agent: {
          name: 'David Kim',
          phone: '(949) 555-0234',
          email: 'dkim@geico.com'
        },
        claims: [
          {
            id: '1',
            claimNumber: 'GE-2015-09-234567',
            dateReported: '09/20/2015',
            status: 'Open',
            amount: 85000,
            description: 'Liability claim for auto accident - bodily injury and property damage'
          }
        ]
      }
    ],
    otherPolicies: []
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClaimStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'Closed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Denied': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const allPolicies = [...insuranceData.clientPolicies, ...insuranceData.defendantPolicies, ...insuranceData.otherPolicies];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/clients" className="text-2xl font-bold">Legal Estate</Link>
              <div className="text-sm">
                <span className="mr-2">🛡️</span>
                <span className="font-medium">Insurance Information - Thowerd, Patty</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">DOL: 09/20/2015 | Auto Accident | {allPolicies.length} Policies</span>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-green-700 hover:bg-green-800 px-4 py-2 rounded text-sm font-medium"
              >
                {isEditing ? 'Save Changes' : 'Edit Policies'}
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
                  { id: 'auto', label: 'Auto Insurance', count: allPolicies.filter(p => p.type === 'Auto').length },
                  { id: 'health', label: 'Health Insurance', count: allPolicies.filter(p => p.type === 'Health').length },
                  { id: 'liability', label: 'Liability & Umbrella', count: allPolicies.filter(p => p.type === 'Liability' || p.type === 'Umbrella').length },
                  { id: 'all', label: 'All Policies', count: allPolicies.length },
                  { id: 'claims', label: 'Claims', count: allPolicies.reduce((sum, p) => sum + p.claims.length, 0) }
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
                    <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Auto Insurance Tab */}
          {activeTab === 'auto' && (
            <div className="grid grid-cols-3 gap-6">
              {/* Auto Policies List */}
              <div className="col-span-2 space-y-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Auto Insurance Policies</h2>
                    {isEditing && (
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        + Add Policy
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {allPolicies.filter(policy => policy.type === 'Auto').map((policy) => (
                      <div
                        key={policy.id}
                        onClick={() => setSelectedPolicy(policy)}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedPolicy?.id === policy.id 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{policy.company}</h3>
                            <p className="text-sm text-gray-600">Policy: {policy.policyNumber}</p>
                            <p className="text-sm text-gray-600">Holder: {policy.policyHolder}</p>
                            <div className="mt-2 flex space-x-4 text-xs text-gray-500">
                              <span>Effective: {policy.effectiveDate}</span>
                              <span>Expires: {policy.expirationDate}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                              {policy.status}
                            </span>
                            <p className="text-sm font-semibold text-gray-900 mt-1">
                              ${policy.premium.toLocaleString()}/year
                            </p>
                            <p className="text-xs text-gray-500">
                              ${policy.deductible} deductible
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div>BI: {policy.coverageLimits.bodilyInjury}</div>
                          <div>PD: {policy.coverageLimits.propertyDamage}</div>
                          <div>UM: {policy.coverageLimits.uninsuredMotorist}</div>
                          <div>Med: {policy.coverageLimits.medicalPayments}</div>
                        </div>

                        {policy.claims.length > 0 && (
                          <div className="mt-3 text-xs text-blue-600">
                            {policy.claims.length} active claim(s)
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Policy Details */}
              <div className="bg-white rounded-lg shadow p-6">
                {selectedPolicy ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Policy Details</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900">{selectedPolicy.company}</h4>
                        <p className="text-sm text-gray-600">{selectedPolicy.type} Insurance</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700">Policy Information</h5>
                        <p className="text-sm text-gray-600">Number: {selectedPolicy.policyNumber}</p>
                        <p className="text-sm text-gray-600">Holder: {selectedPolicy.policyHolder}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedPolicy.status)}`}>
                          {selectedPolicy.status}
                        </span>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700">Coverage Period</h5>
                        <p className="text-sm text-gray-600">
                          {selectedPolicy.effectiveDate} - {selectedPolicy.expirationDate}
                        </p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700">Premium & Deductible</h5>
                        <p className="text-sm text-gray-600">
                          ${selectedPolicy.premium.toLocaleString()}/year
                        </p>
                        <p className="text-sm text-gray-600">
                          ${selectedPolicy.deductible} deductible
                        </p>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700">Coverage Limits</h5>
                        <div className="text-sm text-gray-600 space-y-1">
                          {Object.entries(selectedPolicy.coverageLimits).map(([key, value]) => (
                            value && (
                              <div key={key} className="flex justify-between">
                                <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                <span>{value}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-gray-700">Agent Contact</h5>
                        <p className="text-sm text-gray-600">{selectedPolicy.agent.name}</p>
                        <p className="text-sm text-gray-600">{selectedPolicy.agent.phone}</p>
                        <p className="text-sm text-gray-600">{selectedPolicy.agent.email}</p>
                      </div>

                      {selectedPolicy.claims.length > 0 && (
                        <div>
                          <h5 className="font-medium text-gray-700">Active Claims</h5>
                          <div className="space-y-2">
                            {selectedPolicy.claims.map((claim) => (
                              <div key={claim.id} className="text-sm">
                                <p className="font-medium">{claim.claimNumber}</p>
                                <p className="text-gray-600">${claim.amount.toLocaleString()}</p>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getClaimStatusColor(claim.status)}`}>
                                  {claim.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t space-y-2">
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                          Contact Agent
                        </button>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
                          View Policy Document
                        </button>
                        {isEditing && (
                          <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                            Edit Policy
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p>Select a policy to view details</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Health Insurance Tab */}
          {activeTab === 'health' && (
            <div className="space-y-6">
              {allPolicies.filter(policy => policy.type === 'Health').map((policy) => (
                <div key={policy.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{policy.company}</h3>
                      <p className="text-sm text-gray-600">Policy: {policy.policyNumber}</p>
                      <p className="text-sm text-gray-600">Holder: {policy.policyHolder}</p>
                    </div>
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                      {policy.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Coverage Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Annual Premium:</span>
                          <span className="font-medium">${policy.premium.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Deductible:</span>
                          <span className="font-medium">${policy.deductible.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Max:</span>
                          <span className="font-medium">{policy.coverageLimits.annualMax}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lifetime Max:</span>
                          <span className="font-medium">{policy.coverageLimits.lifetime}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Policy Period</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Effective Date:</span>
                          <p className="font-medium">{policy.effectiveDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Expiration Date:</span>
                          <p className="font-medium">{policy.expirationDate}</p>
                        </div>
                      </div>

                      <h4 className="font-medium text-gray-900 mb-3 mt-6">Agent Contact</h4>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium">{policy.agent.name}</p>
                        <p className="text-gray-600">{policy.agent.phone}</p>
                        <p className="text-gray-600">{policy.agent.email}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Related Claims</h4>
                      <div className="space-y-3">
                        {policy.claims.map((claim) => (
                          <div key={claim.id} className="border border-gray-200 rounded p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-sm">{claim.claimNumber}</p>
                                <p className="text-xs text-gray-600">{claim.dateReported}</p>
                                <p className="text-xs text-gray-600 mt-1">{claim.description}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-sm">${claim.amount.toLocaleString()}</p>
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getClaimStatusColor(claim.status)}`}>
                                  {claim.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* All Policies Tab */}
          {activeTab === 'all' && (
            <div className="bg-white rounded-lg shadow">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">All Insurance Policies</h2>
                  {isEditing && (
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      + Add Policy
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy Number</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Holder</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Claims</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {allPolicies.map((policy) => (
                        <tr key={policy.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">{policy.type}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{policy.company}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{policy.policyNumber}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{policy.policyHolder}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">${policy.premium.toLocaleString()}</td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(policy.status)}`}>
                              {policy.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {policy.claims.length > 0 ? (
                              <span className="text-blue-600">{policy.claims.length} claim(s)</span>
                            ) : (
                              'None'
                            )}
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
            </div>
          )}

          {/* Claims Tab */}
          {activeTab === 'claims' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Insurance Claims</h2>
                
                <div className="space-y-6">
                  {allPolicies.map((policy) => 
                    policy.claims.length > 0 && (
                      <div key={policy.id}>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          {policy.company} - {policy.type} Insurance
                        </h3>
                        <div className="space-y-3">
                          {policy.claims.map((claim) => (
                            <div key={claim.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900">{claim.claimNumber}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{claim.description}</p>
                                  <p className="text-sm text-gray-500 mt-2">
                                    Reported: {claim.dateReported}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-semibold text-gray-900">
                                    ${claim.amount.toLocaleString()}
                                  </p>
                                  <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getClaimStatusColor(claim.status)}`}>
                                    {claim.status}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4 flex space-x-3">
                                <button className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
                                <button className="text-green-600 hover:text-green-800 text-sm">Contact Adjuster</button>
                                <button className="text-purple-600 hover:text-purple-800 text-sm">View Documents</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>

                {/* Claims Summary */}
                <div className="mt-8 grid grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-blue-900">Total Claims</h4>
                    <p className="text-2xl font-bold text-blue-600">
                      {allPolicies.reduce((sum, p) => sum + p.claims.length, 0)}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-green-900">Total Amount</h4>
                    <p className="text-2xl font-bold text-green-600">
                      ${allPolicies.reduce((sum, p) => sum + p.claims.reduce((claimSum, c) => claimSum + c.amount, 0), 0).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-yellow-900">Open Claims</h4>
                    <p className="text-2xl font-bold text-yellow-600">
                      {allPolicies.reduce((sum, p) => sum + p.claims.filter(c => c.status === 'Open').length, 0)}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <h4 className="font-semibold text-purple-900">Closed Claims</h4>
                    <p className="text-2xl font-bold text-purple-600">
                      {allPolicies.reduce((sum, p) => sum + p.claims.filter(c => c.status === 'Closed').length, 0)}
                    </p>
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

export default InsuranceInformation;