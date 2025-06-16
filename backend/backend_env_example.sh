# Legal Estate Backend Environment Variables

# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/legal_estate?schema=public"

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3001,http://localhost:5173

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB in bytes
UPLOAD_DIR=./uploads

# Email Configuration (Optional - for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM="Legal Estate <noreply@legal-estate.com>"

# Rate Limiting
THROTTLE_TTL=60000  # 1 minute in milliseconds
THROTTLE_LIMIT=100  # 100 requests per minute

# Security
BCRYPT_ROUNDS=12

# Logging
LOG_LEVEL=info

# API Documentation
SWAGGER_ENABLED=true

# Development Tools
PRISMA_STUDIO_PORT=5555

# Production Settings (uncomment for production)
# NODE_ENV=production
# LOG_LEVEL=warn
# SWAGGER_ENABLED=false
# BCRYPT_ROUNDS=14