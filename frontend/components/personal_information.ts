import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface PersonalData {
  basicInfo: {
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: string;
    age: number;
    ssn: string;
    gender: string;
    maritalStatus: string;
    citizenship: string;
    languages: string[];
  };
  contactInfo: {
    primaryPhone: string;
    mobilePhone: string;
    workPhone: string;
    email: string;
    alternateEmail: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    mailingAddress?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  emergencyContacts: {
    id: string;
    name: string;
    relationship: string;
    phone: string;
    email?: string;
    address?: string;
    isPrimary: boolean;
  }[];
  employment: {
    currentlyEmployed: boolean;
    employer?: string;
    jobTitle?: string;
    workAddress?: string;
    supervisor?: string;
    startDate?: string;
    salary?: number;
    hoursPerWeek?: number;
    benefits?: string[];
  };
  family: {
    spouse?: {
      name: string;
      dateOfBirth: string;
      occupation: string;
      employer: string;
    };
    children: {
      id: string;
      name: string;
      dateOfBirth: string;
      relationship: string;
      livesWithClient: boolean;
    }[];
    dependents: number;
  };
  preferences: {
    preferredContactMethod: 'phone' | 'email' | 'text' | 'mail';
    bestTimeToContact: string;
    communicationNotes: string;
    accessibilityNeeds: string;
    interpreterNeeded: boolean;
    language: string;
  };
}

const PersonalInformation: React.FC = () => {
  const { clientId } = useParams();
  const [activeTab, setActiveTab] = useState('basic');
  const [isEditing, setIsEditing] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Home', icon: '🏠', path: `/clients/${clientId}` },
    { id: 'client', label: 'Client', icon: '👤', active: true },
    { id: 'defendants', label: 'Defendants', icon: '⚖️' },
    { id: 'incident', label: 'Incident', icon: '📋' },
    { id: 'parties', label: 'Other Parties', icon: '👥' },
    { id: 'photos', label: 'Photos', icon: '📸' },
    { id: 'recordings', label: 'Recordings', icon: '🎵' },
    { id: 'injuries', label: 'Injuries', icon: '🏥' },
    { id: 'medical', label: 'Medical Treatment', icon: '💊', path: `/clients/${clientId}/medical` },
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

  const personalData: PersonalData = {
    basicInfo: {
      firstName: 'Patricia',
      lastName: 'Thowerd',
      middleName: 'Anne',
      dateOfBirth: '03/05/1974',
      age: 49,
      ssn: '***-**-8723',
      gender: 'Female',
      maritalStatus: 'Married',
      citizenship: 'US Citizen',
      languages: ['English', 'Spanish (Conversational)']
    },
    contactInfo: {
      primaryPhone: '(714) 721-6882',
      mobilePhone: '(714) 555-0123',
      workPhone: '(714) 555-0456',
      email: 'patricia.thowerd@email.com',
      alternateEmail: 'pthowerd@work.com',
      address: {
        street: '3821 Campus Drive, B-1',
        city: 'Newport Beach',
        state: 'CA',
        zipCode: '92660',
        country: 'United States'
      }
    },
    emergencyContacts: [
      {
        id: '1',
        name: 'Michael Thowerd',
        relationship: 'Spouse',
        phone: '(714) 555-0789',
        email: 'michael.thowerd@email.com',
        address: '3821 Campus Drive, B-1, Newport Beach, CA 92660',
        isPrimary: true
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        relationship: 'Sister',
        phone: '(949) 555-0123',
        email: 'sarah.johnson@email.com',
        isPrimary: false
      },
      {
        id: '3',
        name: 'Dr. Robert Chen',
        relationship: 'Family Physician',
        phone: '(714) 555-0456',
        isPrimary: false
      }
    ],
    employment: {
      currentlyEmployed: true,
      employer: 'Newport Financial Group',
      jobTitle: 'Senior Financial Analyst',
      workAddress: '1200 Newport Center Dr, Newport Beach, CA 92660',
      supervisor: 'Janet Martinez',
      startDate: '01/15/2018',
      salary: 85000,
      hoursPerWeek: 40,
      benefits: ['Health Insurance', '401k Matching', 'Paid Time Off', 'Dental Coverage']
    },
    family: {
      spouse: {
        name: 'Michael James Thowerd',
        dateOfBirth: '08/12/1972',
        occupation: 'Software Engineer',
        employer: 'Tech Solutions Inc.'
      },
      children: [
        {
          id: '1',
          name: 'Emma Thowerd',
          dateOfBirth: '06/18/2005',
          relationship: 'Daughter',
          livesWithClient: true
        },
        {
          id: '2',
          name: 'Jacob Thowerd',
          dateOfBirth: '11/22/2008',
          relationship: 'Son',
          livesWithClient: true
        }
      ],
      dependents: 2
    },
    preferences: {
      preferredContactMethod: 'email',
      bestTimeToContact: 'Weekdays 9 AM - 5 PM',
      communicationNotes: 'Please avoid calling after 7 PM. Email is preferred for non-urgent matters.',
      accessibilityNeeds: 'None',
      interpreterNeeded: false,
      language: 'English'
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
                <span className="mr-2">👤</span>
                <span className="font-medium">Personal Information - {personalData.basicInfo.firstName} {personalData.basicInfo.lastName}</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">DOL: 09/20/2015 | Auto Accident | Active Case</span>
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
                  { id: 'basic', label: 'Basic Information' },
                  { id: 'contact', label: 'Contact Details' },
                  { id: 'emergency', label: 'Emergency Contacts' },
                  { id: 'employment', label: 'Employment' },
                  { id: 'family', label: 'Family Information' },
                  { id: 'preferences', label: 'Communication Preferences' }
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
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Basic Information Tab */}
          {activeTab === 'basic' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={personalData.basicInfo.firstName}
                        disabled={!isEditing}
                        className={`px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        placeholder="First Name"
                      />
                      <input
                        type="text"
                        value={personalData.basicInfo.middleName}
                        disabled={!isEditing}
                        className={`px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        placeholder="Middle Name"
                      />
                      <input
                        type="text"
                        value={personalData.basicInfo.lastName}
                        disabled={!isEditing}
                        className={`px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        placeholder="Last Name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="text"
                        value={personalData.basicInfo.dateOfBirth}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input
                        type="text"
                        value={personalData.basicInfo.age}
                        disabled={true}
                        className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Social Security Number</label>
                    <input
                      type="text"
                      value={personalData.basicInfo.ssn}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        value={personalData.basicInfo.gender}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
                      <select
                        value={personalData.basicInfo.maritalStatus}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      >
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Citizenship</label>
                    <input
                      type="text"
                      value={personalData.basicInfo.citizenship}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Languages Spoken</label>
                    <div className="flex flex-wrap gap-2">
                      {personalData.basicInfo.languages.map((language, index) => (
                        <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                          {language}
                          {isEditing && (
                            <button className="ml-2 text-green-600 hover:text-green-800">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </span>
                      ))}
                      {isEditing && (
                        <button className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-dashed border-gray-300 text-gray-600 hover:border-gray-400">
                          + Add Language
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Contact Details Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Phone Numbers</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone</label>
                      <input
                        type="tel"
                        value={personalData.contactInfo.primaryPhone}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Phone</label>
                      <input
                        type="tel"
                        value={personalData.contactInfo.mobilePhone}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Work Phone</label>
                      <input
                        type="tel"
                        value={personalData.contactInfo.workPhone}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Email Addresses</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Primary Email</label>
                      <input
                        type="email"
                        value={personalData.contactInfo.email}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Alternate Email</label>
                      <input
                        type="email"
                        value={personalData.contactInfo.alternateEmail}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={personalData.contactInfo.address.street}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        value={personalData.contactInfo.address.city}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        value={personalData.contactInfo.address.state}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        value={personalData.contactInfo.address.zipCode}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        type="text"
                        value={personalData.contactInfo.address.country}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Emergency Contacts Tab */}
          {activeTab === 'emergency' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Emergency Contacts</h2>
                {isEditing && (
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    + Add Contact
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {personalData.emergencyContacts.map((contact) => (
                  <div key={contact.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center">
                            {contact.name}
                            {contact.isPrimary && (
                              <span className="ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                Primary
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">{contact.relationship}</p>
                          <p className="text-sm text-gray-600">{contact.phone}</p>
                          {contact.email && <p className="text-sm text-gray-600">{contact.email}</p>}
                        </div>
                        {contact.address && (
                          <div>
                            <p className="text-sm text-gray-600">{contact.address}</p>
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                          <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Employment Tab */}
          {activeTab === 'employment' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Employment Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={personalData.employment.currentlyEmployed}
                    disabled={!isEditing}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Currently Employed</label>
                </div>

                {personalData.employment.currentlyEmployed && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Employer</label>
                        <input
                          type="text"
                          value={personalData.employment.employer}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                        <input
                          type="text"
                          value={personalData.employment.jobTitle}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Supervisor</label>
                        <input
                          type="text"
                          value={personalData.employment.supervisor}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input
                          type="text"
                          value={personalData.employment.startDate}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Annual Salary</label>
                          <input
                            type="text"
                            value={personalData.employment.salary ? `$${personalData.employment.salary.toLocaleString()}` : ''}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Hours/Week</label>
                          <input
                            type="text"
                            value={personalData.employment.hoursPerWeek}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Work Address</label>
                      <input
                        type="text"
                        value={personalData.employment.workAddress}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                      <div className="flex flex-wrap gap-2">
                        {personalData.employment.benefits?.map((benefit, index) => (
                          <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                            {benefit}
                            {isEditing && (
                              <button className="ml-2 text-blue-600 hover:text-blue-800">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            )}
                          </span>
                        ))}
                        {isEditing && (
                          <button className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-dashed border-gray-300 text-gray-600 hover:border-gray-400">
                            + Add Benefit
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Family Information Tab */}
          {activeTab === 'family' && (
            <div className="space-y-6">
              {/* Spouse Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Spouse Information</h2>
                {personalData.family.spouse ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={personalData.family.spouse.name}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="text"
                        value={personalData.family.spouse.dateOfBirth}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                      <input
                        type="text"
                        value={personalData.family.spouse.occupation}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employer</label>
                      <input
                        type="text"
                        value={personalData.family.spouse.employer}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600">No spouse information available</p>
                )}
              </div>

              {/* Children Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Children</h2>
                  {isEditing && (
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      + Add Child
                    </button>
                  )}
                </div>
                
                <div className="space-y-4">
                  {personalData.family.children.map((child) => (
                    <div key={child.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            value={child.name}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                          <input
                            type="text"
                            value={child.dateOfBirth}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                          <input
                            type="text"
                            value={child.relationship}
                            disabled={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={child.livesWithClient}
                            disabled={!isEditing}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">Lives with client</label>
                        </div>
                      </div>
                      {isEditing && (
                        <div className="mt-3 flex justify-end">
                          <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Total Dependents:</span> {personalData.family.dependents}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Communication Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Communication Preferences</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
                    <select
                      value={personalData.preferences.preferredContactMethod}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                    >
                      <option value="phone">Phone</option>
                      <option value="email">Email</option>
                      <option value="text">Text Message</option>
                      <option value="mail">Mail</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Contact</label>
                    <input
                      type="text"
                      value={personalData.preferences.bestTimeToContact}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Communication Notes</label>
                  <textarea
                    rows={3}
                    value={personalData.preferences.communicationNotes}
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Accessibility Needs</label>
                    <input
                      type="text"
                      value={personalData.preferences.accessibilityNeeds}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Language</label>
                    <input
                      type="text"
                      value={personalData.preferences.language}
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 border rounded-lg text-sm ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-green-500' : 'border-gray-200 bg-gray-50'}`}
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={personalData.preferences.interpreterNeeded}
                    disabled={!isEditing}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Interpreter needed for meetings</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;