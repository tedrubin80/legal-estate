#!/bin/bash

# Legal Estate - Quick File Migration Script
# Run this after the main setup script to copy your existing content

echo "🔄 Legal Estate - Quick File Migration"
echo "======================================"

# Check if setup was run first
if [ ! -d "legal-estate" ]; then
    echo "❌ Please run the main setup script first!"
    echo "Run: chmod +x setup.sh && ./setup.sh"
    exit 1
fi

echo "📁 Migrating existing files to proper structure..."

# =============================================================================
# FRONTEND COMPONENT MIGRATION
# =============================================================================

echo "📦 Migrating frontend components..."

# Copy and rename frontend components (.ts → .tsx)
if [ -f "frontend/components/homepage_component.ts" ]; then
    cp frontend/components/homepage_component.ts legal-estate/frontend/src/components/Homepage.tsx
    echo "✅ Homepage.tsx"
fi

if [ -f "frontend/components/login_component.ts" ]; then
    cp frontend/components/login_component.ts legal-estate/frontend/src/components/Login.tsx
    echo "✅ Login.tsx"
fi

if [ -f "frontend/components/client_dashboard.ts" ]; then
    cp frontend/components/client_dashboard.ts legal-estate/frontend/src/components/ClientDashboard.tsx
    echo "✅ ClientDashboard.tsx"
fi

if [ -f "frontend/components/client_case_view.ts" ]; then
    cp frontend/components/client_case_view.ts legal-estate/frontend/src/components/ClientCaseView.tsx
    echo "✅ ClientCaseView.tsx"
fi

if [ -f "frontend/components/client_intake_form.ts" ]; then
    cp frontend/components/client_intake_form.ts legal-estate/frontend/src/components/ClientIntakeForm.tsx
    echo "✅ ClientIntakeForm.tsx"
fi

if [ -f "frontend/components/medical_information.ts" ]; then
    cp frontend/components/medical_information.ts legal-estate/frontend/src/components/MedicalInformation.tsx
    echo "✅ MedicalInformation.tsx"
fi

if [ -f "frontend/components/personal_information.ts" ]; then
    cp frontend/components/personal_information.ts legal-estate/frontend/src/components/PersonalInformation.tsx
    echo "✅ PersonalInformation.tsx"
fi

if [ -f "frontend/components/incident_information.ts" ]; then
    cp frontend/components/incident_information.ts legal-estate/frontend/src/components/IncidentInformation.tsx
    echo "✅ IncidentInformation.tsx"
fi

if [ -f "frontend/components/insurance_information.ts" ]; then
    cp frontend/components/insurance_information.ts legal-estate/frontend/src/components/InsuranceInformation.tsx
    echo "✅ InsuranceInformation.tsx"
fi

# Copy frontend configuration files
if [ -f "frontend/app_css.css" ]; then
    cp frontend/app_css.css legal-estate/frontend/src/App.css
    echo "✅ App.css"
fi

if [ -f "frontend/main_tsx.ts" ]; then
    cp frontend/main_tsx.ts legal-estate/frontend/src/main.tsx
    echo "✅ main.tsx"
fi

if [ -f "frontend/updated_app.ts" ]; then
    cp frontend/updated_app.ts legal-estate/frontend/src/App.tsx
    echo "✅ App.tsx"
fi

# =============================================================================
# BACKEND FILE MIGRATION
# =============================================================================

echo "📦 Migrating backend files..."

# Copy main application files
if [ -f "backend/backend_main.ts" ]; then
    cp backend/backend_main.ts legal-estate/backend/src/main.ts
    echo "✅ main.ts"
fi

if [ -f "backend/backend_app_module.ts" ]; then
    cp backend/backend_app_module.ts legal-estate/backend/src/app.module.ts
    echo "✅ app.module.ts"
fi

if [ -f "backend/backend_configuration.ts" ]; then
    cp backend/backend_configuration.ts legal-estate/backend/src/config/configuration.ts
    echo "✅ configuration.ts"
fi

# Copy database files
if [ -f "backend/prisma_schema.txt" ]; then
    cp backend/prisma_schema.txt legal-estate/backend/prisma/schema.prisma
    echo "✅ schema.prisma"
fi

if [ -f "backend/database_seed.ts" ]; then
    cp backend/database_seed.ts legal-estate/backend/prisma/seed.ts
    echo "✅ seed.ts"
fi

# Copy module files (these need manual splitting)
echo "📦 Copying module files (require manual splitting)..."

if [ -f "backend/modules/auth_module.ts" ]; then
    cp backend/modules/auth_module.ts legal-estate/backend/src/modules/auth/
    echo "⚠️  auth_module.ts → Split into auth.module.ts, auth.controller.ts, auth.service.ts"
fi

if [ -f "backend/modules/users_module.ts" ]; then
    cp backend/modules/users_module.ts legal-estate/backend/src/modules/users/
    echo "⚠️  users_module.ts → Split into users.module.ts, users.controller.ts, users.service.ts"
fi

if [ -f "backend/modules/clients_module.ts" ]; then
    cp backend/modules/clients_module.ts legal-estate/backend/src/modules/clients/
    echo "⚠️  clients_module.ts → Split into clients.module.ts, clients.controller.ts, clients.service.ts"
fi

if [ -f "backend/modules/cases_module.ts" ]; then
    cp backend/modules/cases_module.ts legal-estate/backend/src/modules/cases/
    echo "⚠️  cases_module.ts → Split into cases.module.ts, cases.controller.ts, cases.service.ts"
fi

if [ -f "backend/modules/medical_module.ts" ]; then
    cp backend/modules/medical_module.ts legal-estate/backend/src/modules/medical/
    echo "⚠️  medical_module.ts → Split into medical.module.ts, medical.controller.ts, medical.service.ts"
fi

if [ -f "backend/prisma_module.ts" ]; then
    cp backend/prisma_module.ts legal-estate/backend/src/modules/prisma/
    echo "⚠️  prisma_module.ts → Split into prisma.module.ts, prisma.service.ts"
fi

# =============================================================================
# CREATE SPLIT MODULE SCRIPT
# =============================================================================

cat > legal-estate/split_modules.sh << 'EOF'
#!/bin/bash

# Module splitting helper script
# This script helps split the combined module files into proper NestJS structure

echo "🔧 Splitting backend modules into proper NestJS structure..."

# Function to create auth module files
split_auth_module() {
    echo "Splitting auth module..."
    # You'll need to manually extract the different classes from auth_module.ts
    # into separate files: auth.module.ts, auth.controller.ts, auth.service.ts, etc.
    echo "⚠️  Please manually split auth_module.ts into:"
    echo "   • auth.module.ts (the @Module() class)"
    echo "   • auth.controller.ts (the @Controller() class)"
    echo "   • auth.service.ts (the @Injectable() service class)"
    echo "   • dto/ folder (all the DTO classes)"
    echo "   • guards/ folder (guard classes)"
    echo "   • strategies/ folder (passport strategies)"
}

# Function to create users module files
split_users_module() {
    echo "Splitting users module..."
    echo "⚠️  Please manually split users_module.ts into:"
    echo "   • users.module.ts"
    echo "   • users.controller.ts"
    echo "   • users.service.ts"
    echo "   • dto/ folder"
}

# Function to create clients module files
split_clients_module() {
    echo "Splitting clients module..."
    echo "⚠️  Please manually split clients_module.ts into:"
    echo "   • clients.module.ts"
    echo "   • clients.controller.ts"
    echo "   • clients.service.ts"
    echo "   • dto/ folder"
}

# Function to create cases module files
split_cases_module() {
    echo "Splitting cases module..."
    echo "⚠️  Please manually split cases_module.ts into:"
    echo "   • cases.module.ts"
    echo "   • cases.controller.ts"
    echo "   • cases.service.ts"
    echo "   • dto/ folder"
}

# Function to create medical module files
split_medical_module() {
    echo "Splitting medical module..."
    echo "⚠️  Please manually split medical_module.ts into:"
    echo "   • medical.module.ts"
    echo "   • medical.controller.ts"
    echo "   • medical.service.ts"
    echo "   • dto/ folder"
}

# Function to create prisma module files
split_prisma_module() {
    echo "Splitting prisma module..."
    echo "⚠️  Please manually split prisma_module.ts into:"
    echo "   • prisma.module.ts"
    echo "   • prisma.service.ts"
}

# Run all splitting functions
split_auth_module
split_users_module
split_clients_module
split_cases_module
split_medical_module
split_prisma_module

echo ""
echo "🎯 Module Splitting Guide:"
echo "========================="
echo ""
echo "Each module file contains multiple classes that need to be split:"
echo ""
echo "1. **@Module() class** → module.ts file"
echo "2. **@Controller() class** → controller.ts file"
echo "3. **@Injectable() service class** → service.ts file"
echo "4. **DTO classes** → dto/ folder"
echo "5. **Guard classes** → guards/ folder"
echo "6. **Strategy classes** → strategies/ folder"
echo ""
echo "Example for auth module:"
echo "• Find the line: export class AuthModule {}"
echo "• Copy that class and imports to auth.module.ts"
echo "• Find the line: export class AuthController {}"
echo "• Copy that class and imports to auth.controller.ts"
echo "• And so on..."
echo ""
echo "💡 Pro tip: Use your IDE's 'Move Class' refactoring feature if available!"

EOF

chmod +x legal-estate/split_modules.sh

# =============================================================================
# FINAL SETUP INSTRUCTIONS
# =============================================================================

echo ""
echo "✅ FILE MIGRATION COMPLETED!"
echo "============================"
echo ""
echo "📁 Files successfully copied to legal-estate/ directory"
echo ""
echo "🔧 NEXT STEPS:"
echo "1. Split the backend module files:"
echo "   cd legal-estate && ./split_modules.sh"
echo ""
echo "2. Setup your database:"
echo "   cd legal-estate/backend"
echo "   cp .env.example .env"
echo "   # Edit .env with your PostgreSQL credentials"
echo "   npx prisma generate"
echo "   npx prisma migrate dev --name init"
echo "   npm run db:seed"
echo ""
echo "3. Start the applications:"
echo "   # Terminal 1 - Backend"
echo "   cd legal-estate/backend && npm run start:dev"
echo ""
echo "   # Terminal 2 - Frontend"
echo "   cd legal-estate/frontend && npm run dev"
echo ""
echo "⚠️  IMPORTANT: The backend module files need to be manually split"
echo "   Each module file contains multiple classes that should be in separate files"
echo "   Run ./split_modules.sh in the legal-estate directory for detailed instructions"
echo ""
echo "🎯 After splitting modules, your Legal Estate project will be ready!"
echo ""
echo "📚 Access your applications at:"
echo "   • Frontend: http://localhost:3001"
echo "   • Backend API: http://localhost:3000"
echo "   • API Docs: http://localhost:3000/api/docs"
echo "   • Database GUI: npx prisma studio (in backend directory)"
