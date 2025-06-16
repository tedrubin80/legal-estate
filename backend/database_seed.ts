// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@legal-estate.com' },
    update: {},
    create: {
      email: 'admin@legal-estate.com',
      password: adminPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
    },
  });

  // Create attorney users
  const attorneyPassword = await bcrypt.hash('attorney123', 12);
  const attorney1 = await prisma.user.upsert({
    where: { email: 'john.smith@legal-estate.com' },
    update: {},
    create: {
      email: 'john.smith@legal-estate.com',
      password: attorneyPassword,
      firstName: 'John',
      lastName: 'Smith',
      role: 'ATTORNEY',
    },
  });

  const attorney2 = await prisma.user.upsert({
    where: { email: 'sarah.johnson@legal-estate.com' },
    update: {},
    create: {
      email: 'sarah.johnson@legal-estate.com',
      password: attorneyPassword,
      firstName: 'Sarah',
      lastName: 'Johnson',
      role: 'ATTORNEY',
    },
  });

  // Create paralegal
  const paralegalPassword = await bcrypt.hash('paralegal123', 12);
  const paralegal = await prisma.user.upsert({
    where: { email: 'alexis.camacho@legal-estate.com' },
    update: {},
    create: {
      email: 'alexis.camacho@legal-estate.com',
      password: paralegalPassword,
      firstName: 'Alexis',
      lastName: 'Camacho',
      role: 'PARALEGAL',
    },
  });

  // Create sample client - Patricia Thowerd
  const client = await prisma.client.create({
    data: {
      firstName: 'Patricia',
      lastName: 'Thowerd',
      middleName: 'Anne',
      dateOfBirth: new Date('1974-03-05'),
      ssn: '123-45-8723',
      gender: 'FEMALE',
      maritalStatus: 'MARRIED',
      citizenship: 'US Citizen',
      languages: ['English', 'Spanish (Conversational)'],
    },
  });

  // Add contact information for client
  await prisma.contactInfo.createMany({
    data: [
      {
        clientId: client.id,
        type: 'PHONE',
        value: '(714) 721-6882',
        label: 'Primary',
        primary: true,
      },
      {
        clientId: client.id,
        type: 'MOBILE',
        value: '(714) 555-0123',
        label: 'Mobile',
        primary: false,
      },
      {
        clientId: client.id,
        type: 'EMAIL',
        value: 'patricia.thowerd@email.com',
        label: 'Personal',
        primary: true,
      },
    ],
  });

  // Add address for client
  await prisma.address.create({
    data: {
      clientId: client.id,
      street: '3821 Campus Drive, B-1',
      city: 'Newport Beach',
      state: 'CA',
      zipCode: '92660',
      country: 'United States',
      type: 'HOME',
      primary: true,
    },
  });

  // Create case for Patricia Thowerd
  const caseRecord = await prisma.case.create({
    data: {
      caseNumber: 'LE-2015-001',
      title: 'Thowerd v. Martinez - Auto Accident',
      caseType: 'AUTO_ACCIDENT',
      dateOfLoss: new Date('2015-09-20'),
      status: 'ACTIVE',
      description: 'T-bone collision at controlled intersection. Client proceeding through green light when defendant ran red light.',
      referralSource: 'Referral from Friend',
      clientId: client.id,
      createdById: attorney1.id,
    },
  });

  // Assign team members to case
  await prisma.caseAssignment.createMany({
    data: [
      {
        caseId: caseRecord.id,
        userId: attorney1.id,
        role: 'Primary Attorney',
      },
      {
        caseId: caseRecord.id,
        userId: paralegal.id,
        role: 'Case Assistant',
      },
    ],
  });

  // Add emergency contacts
  await prisma.emergencyContact.createMany({
    data: [
      {
        clientId: client.id,
        name: 'Michael Thowerd',
        relationship: 'Spouse',
        phone: '(714) 555-0789',
        email: 'michael.thowerd@email.com',
        address: '3821 Campus Drive, B-1, Newport Beach, CA 92660',
        isPrimary: true,
      },
      {
        clientId: client.id,
        name: 'Sarah Johnson',
        relationship: 'Sister',
        phone: '(949) 555-0123',
        email: 'sarah.johnson@email.com',
        isPrimary: false,
      },
    ],
  });

  // Add family members
  await prisma.familyMember.createMany({
    data: [
      {
        clientId: client.id,
        name: 'Michael James Thowerd',
        relationship: 'Spouse',
        dateOfBirth: new Date('1972-08-12'),
        livesWithClient: true,
        occupation: 'Software Engineer',
        employer: 'Tech Solutions Inc.',
      },
      {
        clientId: client.id,
        name: 'Emma Thowerd',
        relationship: 'Daughter',
        dateOfBirth: new Date('2005-06-18'),
        livesWithClient: true,
      },
      {
        clientId: client.id,
        name: 'Jacob Thowerd',
        relationship: 'Son',
        dateOfBirth: new Date('2008-11-22'),
        livesWithClient: true,
      },
    ],
  });

  // Add employment information
  await prisma.employment.create({
    data: {
      clientId: client.id,
      currentlyEmployed: true,
      employer: 'Newport Financial Group',
      jobTitle: 'Senior Financial Analyst',
      workAddress: '1200 Newport Center Dr, Newport Beach, CA 92660',
      supervisor: 'Janet Martinez',
      startDate: new Date('2018-01-15'),
      salary: 85000,
      hoursPerWeek: 40,
      benefits: ['Health Insurance', '401k Matching', 'Paid Time Off', 'Dental Coverage'],
      workPhone: '(714) 555-0456',
      missedWork: true,
    },
  });

  // Add communication preferences
  await prisma.communicationPreferences.create({
    data: {
      clientId: client.id,
      preferredMethod: 'EMAIL',
      bestTimeToContact: 'Weekdays 9 AM - 5 PM',
      communicationNotes: 'Please avoid calling after 7 PM. Email is preferred for non-urgent matters.',
      accessibilityNeeds: 'None',
      interpreterNeeded: false,
      preferredLanguage: 'English',
    },
  });

  // Add incident information
  const incident = await prisma.incident.create({
    data: {
      caseId: caseRecord.id,
      dateOfLoss: new Date('2015-09-20'),
      timeOfIncident: '3:45 PM',
      location: '1200 Newport Center Dr',
      city: 'Newport Beach',
      state: 'CA',
      zipCode: '92660',
      coordinates: '33.6189° N, 117.9298° W',
      weather: 'Clear',
      lightingConditions: 'Daylight',
      roadConditions: 'Dry',
      incidentType: 'Motor Vehicle Accident',
      subType: 'Intersection Collision',
      severity: 'SEVERE',
      description: 'T-bone collision at controlled intersection. Client was proceeding through green light when defendant ran red light and struck client\'s vehicle on driver side.',
      causeFactors: ['Running Red Light', 'Failure to Yield', 'Speeding'],
    },
  });

  // Add police report
  await prisma.policeReport.create({
    data: {
      incidentId: incident.id,
      reportFiled: true,
      reportNumber: 'NPB-2015-09-4578',
      respondingOfficer: 'Officer James Wilson',
      policeStation: 'Newport Beach Police Department',
      reportDate: new Date('2015-09-20'),
    },
  });

  // Add medical providers
  const provider1 = await prisma.medicalProvider.create({
    data: {
      caseId: caseRecord.id,
      name: 'Newport Beach Medical Center',
      type: 'Emergency Room',
      phone: '(714) 760-5555',
      address: '1100 Newport Center Dr, Newport Beach, CA 92660',
      dateFirstSeen: new Date('2015-09-20'),
      dateLastSeen: new Date('2015-09-20'),
      totalBills: 15420.00,
      status: 'COMPLETED',
    },
  });

  const provider2 = await prisma.medicalProvider.create({
    data: {
      caseId: caseRecord.id,
      name: 'Dr. Sarah Chen - Orthopedic Surgery',
      type: 'Orthopedic Surgeon',
      phone: '(714) 555-0123',
      address: '3800 Chapman Ave, Orange, CA 92868',
      dateFirstSeen: new Date('2015-09-25'),
      dateLastSeen: new Date('2016-03-15'),
      totalBills: 28750.00,
      status: 'COMPLETED',
    },
  });

  // Add injuries
  await prisma.injury.createMany({
    data: [
      {
        caseId: caseRecord.id,
        bodyPart: 'Right Knee',
        description: 'Torn ACL and meniscus damage',
        severity: 'SEVERE',
        dateReported: new Date('2015-09-20'),
        currentStatus: 'Surgically repaired, ongoing PT',
      },
      {
        caseId: caseRecord.id,
        bodyPart: 'Lower Back',
        description: 'Lumbar strain and muscle spasms',
        severity: 'MODERATE',
        dateReported: new Date('2015-09-21'),
        currentStatus: 'Improved with physical therapy',
      },
    ],
  });

  // Add insurance policy
  const autoPolicy = await prisma.insurancePolicy.create({
    data: {
      caseId: caseRecord.id,
      type: 'AUTO',
      company: 'State Farm',
      policyNumber: 'SF-789456123',
      policyHolder: 'Patricia Thowerd',
      effectiveDate: new Date('2015-01-15'),
      expirationDate: new Date('2016-01-15'),
      premium: 1200,
      deductible: 500,
      status: 'ACTIVE',
      coverageLimits: {
        bodilyInjury: '$100,000/$300,000',
        propertyDamage: '$50,000',
        uninsuredMotorist: '$100,000/$300,000',
        medicalPayments: '$5,000',
        collision: '$500 deductible',
        comprehensive: '$250 deductible',
      },
      agentName: 'Sarah Martinez',
      agentPhone: '(714) 555-0123',
      agentEmail: 'smartinez@statefarm.com',
    },
  });

  // Add insurance claim
  await prisma.insuranceClaim.create({
    data: {
      policyId: autoPolicy.id,
      claimNumber: 'SF-2015-09-456123',
      dateReported: new Date('2015-09-20'),
      status: 'OPEN',
      amount: 25000,
      description: 'Auto accident claim for vehicle damage and medical expenses',
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log('\n📊 Created:');
  console.log(`👤 Users: ${admin.firstName} ${admin.lastName} (Admin)`);
  console.log(`👤 Users: ${attorney1.firstName} ${attorney1.lastName} (Attorney)`);
  console.log(`👤 Users: ${attorney2.firstName} ${attorney2.lastName} (Attorney)`);
  console.log(`👤 Users: ${paralegal.firstName} ${paralegal.lastName} (Paralegal)`);
  console.log(`🧑‍💼 Client: ${client.firstName} ${client.lastName}`);
  console.log(`📋 Case: ${caseRecord.caseNumber} - ${caseRecord.title}`);
  console.log('\n🔐 Login Credentials:');
  console.log('Admin: admin@legal-estate.com / admin123');
  console.log('Attorney: john.smith@legal-estate.com / attorney123');
  console.log('Paralegal: alexis.camacho@legal-estate.com / paralegal123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });