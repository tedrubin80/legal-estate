# Legal Estate Backend

A comprehensive NestJS backend API for the Legal Estate case management system, built with Prisma ORM and PostgreSQL.

## 🏗️ **Database Schema Overview**

### **Core Models**
- **Users** - Attorneys, paralegals, staff with role-based access
- **Clients** - Individuals represented by the firm
- **Cases** - Legal cases with full lifecycle management
- **Contacts** - Phone numbers, emails, addresses

### **Personal Information**
- **EmergencyContacts** - Client emergency contact information
- **FamilyMembers** - Spouse, children, dependents
- **Employment** - Job details, salary, benefits
- **CommunicationPreferences** - Contact methods and accessibility

### **Medical Information**
- **MedicalProviders** - Healthcare providers with contact/billing info
- **MedicalRecords** - Treatment records with bills/records status
- **Injuries** - Body parts affected with severity tracking

### **Incident Management**
- **Incidents** - Accident details with location and conditions
- **Vehicles** - All vehicles involved with insurance details
- **PoliceReports** - Official reports with citations
- **Witnesses** - Contact info and statements
- **Evidence** - Photos, videos, documents, physical evidence

### **Insurance Management**
- **InsurancePolicies** - Auto, health, liability, umbrella coverage
- **InsuranceClaims** - Claims tracking with status and amounts
- **Coverage Limits** - Detailed coverage information

### **Case Management**
- **CaseTasks** - Task assignment and tracking
- **CaseNotes** - Case documentation and communication
- **Documents** - File uploads with categorization
- **CaseAssignments** - Team member roles and responsibilities

### **Financial Management**
- **Settlements** - Settlement negotiations and final amounts
- **Liens** - Medical, attorney, and other liens

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

### **Installation**

1. **Clone and setup:**
```bash
cd backend
npm install
```

2. **Environment setup:**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. **Database setup:**
```bash
# Create database
createdb legal_estate

# Generate Prisma client
npx prisma generate

# Run migrations
npm run db:migrate

# Seed with sample data
npm run db:seed
```

4. **Start development server:**
```bash
npm run start:dev
```

### **API Documentation**
- **Swagger UI:** http://localhost:3000/api/docs
- **Prisma Studio:** `npm run db:studio`

## 📊 **Database Structure**

### **Authentication & Users**
```sql
User {
  id, email, password, firstName, lastName, role
  assignedCases[], createdCases[], tasks[]
}

Roles: ADMIN, ATTORNEY, PARALEGAL, ASSISTANT, INVESTIGATOR, CASE_MANAGER
```

### **Client Management**
```sql
Client {
  id, firstName, lastName, dateOfBirth, ssn, gender
  contacts[], cases[], emergencyContacts[], familyMembers[]
  employment, communicationPrefs
}

ContactInfo { type, value, label, primary }
Address { street, city, state, zipCode, type, primary }
```

### **Case Information**
```sql
Case {
  id, caseNumber, title, caseType, dateOfLoss, status
  client, createdBy, assignments[], tasks[], notes[]
  medicalProviders[], incident, vehicles[], witnesses[]
  insurancePolicies[], settlements[], liens[]
}

CaseTypes: PERSONAL_INJURY, AUTO_ACCIDENT, SLIP_AND_FALL, 
          MEDICAL_MALPRACTICE, WORKERS_COMPENSATION, etc.
```

### **Medical Tracking**
```sql
MedicalProvider {
  id, name, type, phone, address, totalBills, status
  dateFirstSeen, dateLastSeen, medicalRecords[]
}

MedicalRecord {
  id, date, type, description, cost
  billReceived, recordsReceived, category
}

Injury {
  id, bodyPart, description, severity
  dateReported, currentStatus, resolved
}
```

### **Incident Documentation**
```sql
Incident {
  id, dateOfLoss, timeOfIncident, location
  weather, lightingConditions, roadConditions
  incidentType, severity, description, causeFactors[]
}

Vehicle {
  id, year, make, model, color, licensePlate, vin
  owner, driver, passengers[], insuranceCompany
  damages, towedTo, isClientVehicle
}

PoliceReport {
  id, reportFiled, reportNumber, respondingOfficer
  policeStation, reportDate, citations[]
}

Witness {
  id, name, phone, email, address
  relationship, statement
}
```

### **Insurance Management**
```sql
InsurancePolicy {
  id, type, company, policyNumber, policyHolder
  effectiveDate, expirationDate, premium, deductible
  coverageLimits (JSON), agentName, agentPhone
  claims[]
}

InsuranceClaim {
  id, claimNumber, dateReported, status
  amount, description, adjusterName
}
```

## 🔐 **Authentication**

### **JWT-based authentication with role-based access:**
- **ADMIN** - Full system access
- **ATTORNEY** - Case management and client access
- **PARALEGAL** - Case assistance and documentation
- **ASSISTANT** - Limited case access
- **INVESTIGATOR** - Incident and evidence management
- **CASE_MANAGER** - Task and workflow management

### **Default Credentials (after seeding):**
```
Admin: admin@legal-estate.com / admin123
Attorney: john.smith@legal-estate.com / attorney123
Paralegal: alexis.camacho@legal-estate.com / paralegal123
```

## 📁 **Project Structure**

```
backend/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts             # Sample data seeding
├── src/
│   ├── modules/
│   │   ├── auth/           # Authentication
│   │   ├── users/          # User management
│   │   ├── clients/        # Client management
│   │   ├── cases/          # Case management
│   │   ├── medical/        # Medical information
│   │   ├── incident/       # Incident management
│   │   ├── insurance/      # Insurance policies
│   │   ├── documents/      # File management
│   │   ├── tasks/          # Task management
│   │   ├── notes/          # Case notes
│   │   ├── settlements/    # Settlement tracking
│   │   └── reports/        # Reporting system
│   ├── config/             # Configuration
│   ├── common/             # Shared utilities
│   ├── guards/             # Auth guards
│   ├── decorators/         # Custom decorators
│   └── pipes/              # Validation pipes
├── uploads/                # File storage
└── test/                   # Test files
```

## 🗄️ **Database Commands**

```bash
# Generate Prisma client
npm run db:generate

# Create and run migration
npm run db:migrate

# Push schema changes (dev only)
npm run db:push

# Open Prisma Studio
npm run db:studio

# Seed database
npm run db:seed

# Reset database
npm run db:reset
```

## 🚀 **Development Commands**

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debugger

# Production
npm run build              # Build for production
npm run start:prod         # Start production server

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run e2e tests
npm run test:cov           # Test coverage

# Code Quality
npm run lint               # Lint code
npm run format             # Format code
```

## 📊 **Sample Data Included**

After seeding, you'll have:
- **Complete Patricia Thowerd case** with all information
- **Medical providers** with $66,345 in total bills
- **Auto accident incident** with vehicle and witness details
- **Insurance policies** with active claims
- **Family and employment** information
- **Tasks and case notes**

## 🔧 **Configuration**

### **Environment Variables:**
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - JWT signing secret
- `PORT` - Server port (default: 3000)
- `CORS_ORIGIN` - Allowed origins for CORS
- `MAX_FILE_SIZE` - Maximum upload file size
- Email configuration for notifications

### **Features:**
- ✅ **Complete Prisma schema** for legal case management
- ✅ **JWT authentication** with role-based access
- ✅ **File upload handling** for documents and evidence
- ✅ **Swagger API documentation**
- ✅ **Database seeding** with realistic sample data
- ✅ **CORS configuration** for frontend integration
- ✅ **Rate limiting** and security middleware
- ✅ **Comprehensive error handling**
- ✅ **Database transaction support**

## 🎯 **Next Steps**

1. **Run the setup script** to configure everything
2. **Start development server** and check API docs
3. **Connect frontend** to backend APIs
4. **Customize business logic** for your specific needs
5. **Add additional features** as required

The backend is now **production-ready** with a comprehensive database schema that supports all the frontend functionality we've built!