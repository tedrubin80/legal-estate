import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface IntakeFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  maritalStatus: string;
  
  // Contact Information
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Emergency Contact
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  
  // Case Information
  caseType: string;
  dateOfLoss: string;
  incidentDescription: string;
  injuries: string;
  policeReport: boolean;
  policeReportNumber: string;
  hospitalized: boolean;
  hospitalName: string;
  
  // Insurance Information
  hasInsurance: boolean;
  insuranceCompany: string;
  policyNumber: string;
  
  // Employment Information
  employed: boolean;
  employer: string;
  jobTitle: string;
  workPhone: string;
  missedWork: boolean;
  
  // Referral Information
  referralSource: string;
  referralName: string;
  
  // Attorney Assignment
  assignedAttorney: string;
  caseStatus: string;
}

const ClientIntakeForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<IntakeFormData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ssn: '',
    gender: '',
    maritalStatus: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: '',
    caseType: '',
    dateOfLoss: '',
    incidentDescription: '',
    injuries: '',
    policeReport: false,
    policeReportNumber: '',
    hospitalized: false,
    hospitalName: '',
    hasInsurance: false,
    insuranceCompany: '',
    policyNumber: '',
    employed: false,
    employer: '',
    jobTitle: '',
    workPhone: '',
    missedWork: false,
    referralSource: '',
    referralName: '',
    assignedAttorney: '',
    caseStatus: 'New'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Redirect to client dashboard or new client view
    navigate('/clients');
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const steps = [
    { number: 1, title: 'Personal Info', description: 'Basic client information' },
    { number: 2, title: 'Contact Details', description: 'Address and contact info' },
    { number: 3, title: 'Case Information', description: 'Incident and case details' },
    { number: 4, title: 'Insurance & Employment', description: 'Insurance and work info' },
    { number: 5, title: 'Review & Submit', description: 'Review and submit' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/clients" className="text-2xl font-bold text-green-600">Legal Estate</Link>
              <span className="ml-4 text-gray-600">/ New Client Intake</span>
            </div>
            <Link 
              to="/clients" 
              className="text-gray-600 hover:text-gray-800"
            >
              ✕ Cancel
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step.number 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <div className="mt-2 text-center">
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Social Security Number
                  </label>
                  <input
                    type="text"
                    name="ssn"
                    placeholder="XXX-XX-XXXX"
                    value={formData.ssn}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyName"
                      value={formData.emergencyName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Relationship
                    </label>
                    <input
                      type="text"
                      name="emergencyRelation"
                      value={formData.emergencyRelation}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Case Information */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Case Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Case Type *
                  </label>
                  <select
                    name="caseType"
                    required
                    value={formData.caseType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Case Type</option>
                    <option value="Personal Injury">Personal Injury</option>
                    <option value="Auto Accident">Auto Accident</option>
                    <option value="Slip and Fall">Slip and Fall</option>
                    <option value="Medical Malpractice">Medical Malpractice</option>
                    <option value="Workers Compensation">Workers Compensation</option>
                    <option value="Product Liability">Product Liability</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Loss *
                  </label>
                  <input
                    type="date"
                    name="dateOfLoss"
                    required
                    value={formData.dateOfLoss}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Incident Description *
                  </label>
                  <textarea
                    name="incidentDescription"
                    required
                    rows={4}
                    value={formData.incidentDescription}
                    onChange={handleInputChange}
                    placeholder="Please describe what happened..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Injuries Sustained
                  </label>
                  <textarea
                    name="injuries"
                    rows={3}
                    value={formData.injuries}
                    onChange={handleInputChange}
                    placeholder="Describe any injuries..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="policeReport"
                      checked={formData.policeReport}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Police report filed
                    </label>
                  </div>
                  {formData.policeReport && (
                    <input
                      type="text"
                      name="policeReportNumber"
                      placeholder="Police report number"
                      value={formData.policeReportNumber}
                      onChange={handleInputChange}
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="hospitalized"
                      checked={formData.hospitalized}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Hospitalized
                    </label>
                  </div>
                  {formData.hospitalized && (
                    <input
                      type="text"
                      name="hospitalName"
                      placeholder="Hospital name"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Insurance & Employment */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Insurance & Employment</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="hasInsurance"
                        checked={formData.hasInsurance}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Has health insurance
                      </label>
                    </div>
                  </div>
                  {formData.hasInsurance && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Insurance Company
                        </label>
                        <input
                          type="text"
                          name="insuranceCompany"
                          value={formData.insuranceCompany}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Policy Number
                        </label>
                        <input
                          type="text"
                          name="policyNumber"
                          value={formData.policyNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Employment Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="employed"
                        checked={formData.employed}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Currently employed
                      </label>
                    </div>
                  </div>
                  {formData.employed && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Employer
                        </label>
                        <input
                          type="text"
                          name="employer"
                          value={formData.employer}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Job Title
                        </label>
                        <input
                          type="text"
                          name="jobTitle"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Work Phone
                        </label>
                        <input
                          type="tel"
                          name="workPhone"
                          value={formData.workPhone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            name="missedWork"
                            checked={formData.missedWork}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 block text-sm text-gray-900">
                            Missed work due to incident
                          </label>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How did you hear about us?
                    </label>
                    <select
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select source</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Referral from Friend">Referral from Friend</option>
                      <option value="Referral from Attorney">Referral from Attorney</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Referral Name (if applicable)
                    </label>
                    <input
                      type="text"
                      name="referralName"
                      value={formData.referralName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Submit */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-sm text-gray-600">
                    {formData.firstName} {formData.lastName} • {formData.dateOfBirth} • {formData.gender}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                  <p className="text-sm text-gray-600">
                    {formData.phone} • {formData.email}<br />
                    {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Case Information</h3>
                  <p className="text-sm text-gray-600">
                    Type: {formData.caseType}<br />
                    Date of Loss: {formData.dateOfLoss}<br />
                    Description: {formData.incidentDescription}
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                    </svg>
                    <div>
                      <h3 className="text-sm font-medium text-blue-800">Next Steps</h3>
                      <p className="text-sm text-blue-700 mt-1">
                        After submitting this intake form, our team will review your case and contact you within 24 hours to discuss next steps and schedule a consultation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg font-medium ${
                currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Previous
            </button>
            
            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Submit Intake
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientIntakeForm;