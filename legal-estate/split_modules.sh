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

