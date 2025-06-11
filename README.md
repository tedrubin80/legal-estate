# Legal Estate

Legal Estate is a secure, modern legal case management system designed for law firms and clients. It supports secure logins, role-based dashboards, file uploads, and compliance features (HIPAA/GDPR ready).

## Features

- Role-based login: Client, Staff, Prospective
- Secure user authentication with JWT
- Register and password reset functionality
- Dashboard view of case records
- Ready for S3 file upload integration
- Backend built with NestJS + Prisma + PostgreSQL
- Frontend built with React + TailwindCSS

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker + Docker Compose

### Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/legal-estate.git
cd legal-estate

# Start services
docker-compose up --build
```

Visit the frontend at `http://localhost:3000` and backend at `http://localhost:3000/api`.

## Folder Structure

- `frontend/` - React client
- `backend/` - NestJS server
- `docker-compose.yml` - development orchestrator

## License

This project is licensed under the MIT License.