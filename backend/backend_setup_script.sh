#!/bin/bash

# Legal Estate Backend Setup Script
# This script will set up the complete backend environment

echo "🚀 Legal Estate Backend Setup"
echo "=============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p src/{modules,config,common,guards,decorators,pipes,filters}
mkdir -p src/modules/{auth,users,clients,cases,medical,incident,insurance,documents,tasks,notes,settlements,reports,prisma}
mkdir -p uploads/{documents,photos,videos,audio}
mkdir -p test

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Setup environment variables
if [ ! -f .env ]; then
    echo "⚙️ Creating .env file from example..."
    cp .env.example .env
    echo "📝 Please update .env with your database credentials"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "🎯 Setup Instructions:"
echo "======================"
echo ""
echo "1. Update your .env file with PostgreSQL credentials:"
echo "   DATABASE_URL=\"postgresql://username:password@localhost:5432/legal_estate\""
echo ""
echo "2. Create the database:"
echo "   createdb legal_estate"
echo ""
echo "3. Run database migrations:"
echo "   npm run db:migrate"
echo ""
echo "4. Seed the database with sample data:"
echo "   npm run db:seed"
echo ""
echo "5. Start the development server:"
echo "   npm run start:dev"
echo ""
echo "6. Open API documentation:"
echo "   http://localhost:3000/api/docs"
echo ""
echo "🔐 Default Login Credentials (after seeding):"
echo "Admin: admin@legal-estate.com / admin123"
echo "Attorney: john.smith@legal-estate.com / attorney123"
echo "Paralegal: alexis.camacho@legal-estate.com / paralegal123"
echo ""
echo "📊 Prisma Studio (Database GUI):"
echo "   npm run db:studio"
echo ""
echo "✅ Setup complete! Follow the instructions above to get started."