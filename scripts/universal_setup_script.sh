#!/bin/bash

# 🚀 Legal Estate Management Software - Universal Setup Script
# This script clones the repository and sets up the complete development environment on any Unix-like system
# Repository: https://github.com/tedrubin80/legal-estate
# Supports: macOS, Ubuntu/Debian, CentOS/RHEL/Fedora, WSL2

set -e  # Exit on any error

# Colors and formatting
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Icons
SUCCESS="✅"
ERROR="❌"
WARNING="⚠️"
INFO="ℹ️"
ARROW="➜"
GEAR="⚙️"
ROCKET="🚀"
PACKAGE="📦"
DATABASE="🗄️"
DOCKER="🐳"
NODE="🟢"

# Global variables
OS_TYPE=""
PACKAGE_MANAGER=""
PROJECT_DIR="$(pwd)"
LOGFILE="$PROJECT_DIR/setup.log"
BACKUP_DIR="$PROJECT_DIR/backups/setup_$(date +%Y%m%d_%H%M%S)"

# Functions for output
print_header() {
    echo -e "\n${CYAN}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║${WHITE}  $1${CYAN}${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════╝${NC}\n"
}

print_step() {
    echo -e "${BLUE}${ARROW} $1${NC}"
}

print_success() {
    echo -e "${GREEN}${SUCCESS} $1${NC}"
}

print_error() {
    echo -e "${RED}${ERROR} $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}${WARNING} $1${NC}"
}

print_info() {
    echo -e "${CYAN}${INFO} $1${NC}"
}

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOGFILE"
}

# Error handling
handle_error() {
    print_error "Setup failed on line $1"
    print_info "Check the log file: $LOGFILE"
    print_info "You can re-run this script to continue from where it left off"
    exit 1
}

trap 'handle_error $LINENO' ERR

# Detect operating system
detect_os() {
    print_step "Detecting operating system..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        OS_TYPE="macos"
        PACKAGE_MANAGER="brew"
        print_success "Detected: macOS"
    elif [[ -f /etc/os-release ]]; then
        . /etc/os-release
        case $ID in
            ubuntu|debian)
                OS_TYPE="debian"
                PACKAGE_MANAGER="apt"
                print_success "Detected: $PRETTY_NAME"
                ;;
            centos|rhel|fedora)
                OS_TYPE="redhat"
                PACKAGE_MANAGER="yum"
                command -v dnf >/dev/null 2>&1 && PACKAGE_MANAGER="dnf"
                print_success "Detected: $PRETTY_NAME"
                ;;
            *)
                print_warning "Unsupported Linux distribution: $ID"
                print_info "Attempting to use generic Linux setup..."
                OS_TYPE="linux"
                PACKAGE_MANAGER="apt"
                ;;
        esac
    else
        print_error "Unsupported operating system"
        exit 1
    fi
    
    log "Detected OS: $OS_TYPE with package manager: $PACKAGE_MANAGER"
}

# Check if running as root (not recommended)
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_warning "Running as root is not recommended"
        read -p "Continue anyway? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_info "Setup cancelled"
            exit 0
        fi
    fi
}

# Create backup of existing configuration
create_backup() {
    print_step "Creating backup of existing configuration..."
    
    mkdir -p "$BACKUP_DIR"
    
    # Backup important files if they exist
    for file in ".env" "docker-compose.yml" "package.json"; do
        if [[ -f "$file" ]]; then
            cp "$file" "$BACKUP_DIR/"
        fi
    done
    
    # Backup directories
    for dir in "backend" "frontend" "scripts"; do
        if [[ -d "$dir" ]]; then
            cp -r "$dir" "$BACKUP_DIR/"
        fi
    done
    
    print_success "Backup created at: $BACKUP_DIR"
    log "Backup created at: $BACKUP_DIR"
}

# Update system packages
update_system() {
    print_step "Updating system packages..."
    
    case $PACKAGE_MANAGER in
        brew)
            brew update || true
            ;;
        apt)
            sudo apt update -y
            sudo apt upgrade -y
            ;;
        yum)
            sudo yum update -y
            ;;
        dnf)
            sudo dnf update -y
            ;;
    esac
    
    print_success "System packages updated"
    log "System packages updated"
}

# Install system dependencies
install_system_deps() {
    print_step "Installing system dependencies..."
    
    case $PACKAGE_MANAGER in
        brew)
            # Install Homebrew if not present
            if ! command -v brew >/dev/null 2>&1; then
                print_step "Installing Homebrew..."
                /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
            fi
            
            # Install basic tools
            brew install curl wget git unzip tree jq
            ;;
        apt)
            sudo apt install -y curl wget git unzip tree jq build-essential
            ;;
        yum)
            sudo yum install -y curl wget git unzip tree jq gcc gcc-c++ make
            ;;
        dnf)
            sudo dnf install -y curl wget git unzip tree jq gcc gcc-c++ make
            ;;
    esac
    
    print_success "System dependencies installed"
    log "System dependencies installed"
}

# Clone project repository
clone_repository() {
    print_step "📥 Cloning Legal Estate repository..."
    
    local repo_url="https://github.com/tedrubin80/legal-estate.git"
    local target_dir="legal-estate"
    
    # Check if git is installed
    if ! command -v git >/dev/null 2>&1; then
        print_error "Git not found. Installing git first..."
        install_system_deps
    fi
    
    # Check if we're already in the cloned directory
    if [[ "$(basename "$PWD")" == "legal-estate" ]] && [[ -d ".git" ]]; then
        print_step "Already in legal-estate repository, pulling latest changes..."
        git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || print_warning "Git pull failed"
        print_success "Repository updated"
        log "Repository updated from existing clone"
        return
    fi
    
    # Check if target directory exists
    if [[ -d "$target_dir" ]]; then
        print_warning "Directory $target_dir already exists"
        read -p "Do you want to update it? (Y/n): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Nn]$ ]]; then
            print_info "Skipping repository clone"
            return
        else
            print_step "Updating existing repository..."
            cd "$target_dir"
            git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || print_warning "Git pull failed"
            cd ..
            print_success "Repository updated"
            return
        fi
    fi
    
    # Clone the repository
    print_step "Cloning from $repo_url..."
    if git clone "$repo_url" "$target_dir"; then
        print_success "Repository cloned successfully"
        
        # Change to the cloned directory
        cd "$target_dir"
        PROJECT_DIR="$(pwd)"
        
        # Show repository info
        print_info "Repository: $(git remote get-url origin)"
        print_info "Branch: $(git branch --show-current)"
        print_info "Last commit: $(git log -1 --format='%h %s' 2>/dev/null)"
        
        log "Repository cloned to $PROJECT_DIR"
    else
        print_error "Failed to clone repository"
        print_info "Please check your internet connection and try again"
        print_info "Or manually clone: git clone $repo_url"
        exit 1
    fi
}

# Install Node.js and npm
install_nodejs() {
    print_step "${NODE} Installing Node.js and npm..."
    
    # Check if Node.js is already installed with correct version
    if command -v node >/dev/null 2>&1; then
        NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [[ $NODE_VERSION -ge 18 ]]; then
            print_success "Node.js $(node --version) is already installed"
            log "Node.js $(node --version) already installed"
            return
        fi
    fi
    
    case $OS_TYPE in
        macos)
            brew install node@18
            brew link node@18 --force
            ;;
        debian)
            # Install Node.js 18 from NodeSource
            curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
            sudo apt-get install -y nodejs
            ;;
        redhat)
            # Install Node.js 18 from NodeSource
            curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
            sudo $PACKAGE_MANAGER install -y nodejs
            ;;
        *)
            print_error "Unsupported OS for Node.js installation"
            print_info "Please install Node.js 18+ manually from https://nodejs.org/"
            exit 1
            ;;
    esac
    
    # Verify installation
    if command -v node >/dev/null 2>&1 && command -v npm >/dev/null 2>&1; then
        print_success "Node.js $(node --version) and npm $(npm --version) installed"
        log "Node.js $(node --version) and npm $(npm --version) installed"
    else
        print_error "Node.js installation failed"
        exit 1
    fi
    
    # Install global packages
    print_step "Installing global npm packages..."
    npm install -g npm@latest
    npm install -g @prisma/cli typescript ts-node nodemon
    print_success "Global npm packages installed"
}

# Install Docker and Docker Compose
install_docker() {
    print_step "${DOCKER} Installing Docker and Docker Compose..."
    
    # Check if Docker is already installed
    if command -v docker >/dev/null 2>&1 && docker --version >/dev/null 2>&1; then
        print_success "Docker $(docker --version) is already installed"
        log "Docker already installed"
        
        # Check Docker Compose
        if command -v docker-compose >/dev/null 2>&1 || docker compose version >/dev/null 2>&1; then
            print_success "Docker Compose is already installed"
            log "Docker Compose already installed"
            return
        fi
    fi
    
    case $OS_TYPE in
        macos)
            print_step "Installing Docker Desktop for macOS..."
            brew install --cask docker
            print_info "Please start Docker Desktop manually from Applications"
            ;;
        debian)
            print_step "Installing Docker for Ubuntu/Debian..."
            # Remove old versions
            sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true
            
            # Install dependencies
            sudo apt-get update
            sudo apt-get install -y ca-certificates curl gnupg lsb-release
            
            # Add Docker's official GPG key
            sudo mkdir -p /etc/apt/keyrings
            curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
            
            # Set up repository
            echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
            
            # Install Docker
            sudo apt-get update
            sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
            
            # Add user to docker group
            sudo usermod -aG docker $USER
            
            # Start Docker
            sudo systemctl start docker
            sudo systemctl enable docker
            ;;
        redhat)
            print_step "Installing Docker for CentOS/RHEL/Fedora..."
            # Install Docker
            sudo $PACKAGE_MANAGER install -y docker
            
            # Start Docker
            sudo systemctl start docker
            sudo systemctl enable docker
            
            # Add user to docker group
            sudo usermod -aG docker $USER
            
            # Install Docker Compose
            sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
            ;;
    esac
    
    print_success "Docker installation completed"
    print_warning "You may need to log out and back in for Docker group permissions to take effect"
    log "Docker installed"
}

# Install PostgreSQL client tools
install_postgresql() {
    print_step "${DATABASE} Installing PostgreSQL client tools..."
    
    if command -v psql >/dev/null 2>&1; then
        print_success "PostgreSQL client tools already installed"
        log "PostgreSQL client tools already installed"
        return
    fi
    
    case $PACKAGE_MANAGER in
        brew)
            brew install postgresql
            ;;
        apt)
            sudo apt install -y postgresql-client
            ;;
        yum)
            sudo yum install -y postgresql
            ;;
        dnf)
            sudo dnf install -y postgresql
            ;;
    esac
    
    print_success "PostgreSQL client tools installed"
    log "PostgreSQL client tools installed"
}

# Setup project directory structure
setup_project_structure() {
    print_step "Setting up project directory structure..."
    
    # Create necessary directories
    directories=(
        "backend/src/controllers"
        "backend/src/middleware" 
        "backend/src/routes"
        "backend/src/utils"
        "backend/src/types"
        "backend/prisma"
        "backend/tests"
        "frontend/src/components"
        "frontend/src/services"
        "frontend/src/types"
        "frontend/src/utils"
        "frontend/public"
        "scripts/deployment"
        "scripts/database"
        "scripts/development"
        "scripts/maintenance"
        "docs/api"
        "docs/user-guide"
        "docs/development"
        "docs/deployment"
        "tests/integration"
        "tests/e2e"
        "backups"
        "logs"
    )
    
    for dir in "${directories[@]}"; do
        mkdir -p "$dir"
    done
    
    print_success "Project directory structure created"
    log "Project directory structure created"
}

# Install project dependencies
install_project_deps() {
    print_step "${PACKAGE} Installing project dependencies..."
    
    # Backend dependencies
    if [[ -f "backend/package.json" ]]; then
        print_step "Installing backend dependencies..."
        cd backend
        npm install
        cd ..
        print_success "Backend dependencies installed"
    else
        print_warning "backend/package.json not found, skipping backend dependencies"
    fi
    
    # Frontend dependencies
    if [[ -f "frontend/package.json" ]]; then
        print_step "Installing frontend dependencies..."
        cd frontend
        npm install
        cd ..
        print_success "Frontend dependencies installed"
    else
        print_warning "frontend/package.json not found, skipping frontend dependencies"
    fi
    
    log "Project dependencies installed"
}

# Setup environment files
setup_environment() {
    print_step "${GEAR} Setting up environment configuration..."
    
    # Backend environment
    if [[ ! -f "backend/.env" ]]; then
        if [[ -f "backend/.env.example" ]]; then
            cp backend/.env.example backend/.env
            print_success "Created backend/.env from example"
        else
            print_step "Creating backend/.env file..."
            cat > backend/.env << 'EOF'
# Database Configuration
DATABASE_URL="postgresql://neondb_owner:npg_VWySqE6HnUm9@ep-fancy-tooth-a5z610oe-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# JWT Configuration
JWT_SECRET="legal-software-jwt-secret-change-in-production"
JWT_EXPIRES_IN="24h"

# Server Configuration
PORT=3000
NODE_ENV="development"

# Frontend URL (for CORS)
FRONTEND_URL="http://localhost:3000"

# Email Configuration (optional)
SMTP_HOST=""
SMTP_PORT=""
SMTP_USER=""
SMTP_PASS=""
EOF
            print_success "Created backend/.env file"
        fi
    else
        print_info "backend/.env already exists"
    fi
    
    # Frontend environment
    if [[ ! -f "frontend/.env" ]]; then
        if [[ -f "frontend/.env.example" ]]; then
            cp frontend/.env.example frontend/.env
            print_success "Created frontend/.env from example"
        else
            print_step "Creating frontend/.env file..."
            cat > frontend/.env << 'EOF'
# API Configuration
REACT_APP_API_URL="http://localhost:3001"

# App Configuration
REACT_APP_NAME="Legal Practice Management"
REACT_APP_VERSION="1.0.0"
EOF
            print_success "Created frontend/.env file"
        fi
    else
        print_info "frontend/.env already exists"
    fi
    
    log "Environment configuration setup"
}

# Setup database
setup_database() {
    print_step "${DATABASE} Setting up database..."
    
    if [[ -f "backend/prisma/schema.prisma" ]]; then
        cd backend
        
        print_step "Generating Prisma client..."
        npx prisma generate
        
        print_step "Pushing database schema..."
        if npx prisma db push; then
            print_success "Database schema deployed"
        else
            print_warning "Database schema deployment failed - you may need to configure DATABASE_URL"
            print_info "Edit backend/.env with your database connection string"
        fi
        
        cd ..
    else
        print_warning "Prisma schema not found, skipping database setup"
    fi
    
    log "Database setup completed"
}

# Setup scripts permissions
setup_scripts() {
    print_step "Setting up script permissions..."
    
    # Make all shell scripts executable
    find . -name "*.sh" -exec chmod +x {} \;
    
    print_success "Script permissions set"
    log "Script permissions set"
}

# Create useful aliases and functions
create_aliases() {
    print_step "Creating useful aliases..."
    
    cat > legal-estate-aliases.sh << 'EOF'
#!/bin/bash
# Legal Estate Software Aliases and Functions

# Project shortcuts
alias estate-start='npm run dev'
alias estate-build='docker-compose up --build'
alias estate-logs='docker-compose logs -f'
alias estate-stop='docker-compose down'
alias estate-restart='docker-compose restart'
alias estate-shell-backend='docker-compose exec backend bash'
alias estate-shell-frontend='docker-compose exec frontend bash'

# Database shortcuts
alias estate-db-studio='cd backend && npx prisma studio'
alias estate-db-migrate='cd backend && npx prisma migrate dev'
alias estate-db-reset='cd backend && npx prisma migrate reset'
alias estate-db-seed='cd backend && npx prisma db seed'

# Development shortcuts
alias estate-test='npm test'
alias estate-lint='npm run lint'
alias estate-format='npm run format'

# Quick functions
estate-help() {
    echo "Legal Estate Software Helper Commands:"
    echo "  estate-start      - Start development servers"
    echo "  estate-build      - Build and start with Docker"
    echo "  estate-logs       - View application logs"
    echo "  estate-stop       - Stop all services"
    echo "  estate-restart    - Restart services"
    echo "  estate-db-studio  - Open Prisma Studio"
    echo "  estate-db-migrate - Run database migrations"
    echo "  estate-test       - Run tests"
    echo "  estate-help       - Show this help"
}

estate-status() {
    echo "Legal Estate Software Status:"
    echo "Node.js: $(node --version 2>/dev/null || echo 'Not installed')"
    echo "npm: $(npm --version 2>/dev/null || echo 'Not installed')"
    echo "Docker: $(docker --version 2>/dev/null || echo 'Not installed')"
    echo "PostgreSQL: $(psql --version 2>/dev/null || echo 'Not installed')"
    
    if command -v docker >/dev/null 2>&1; then
        echo "Running containers:"
        docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" 2>/dev/null || echo "Docker not running"
    fi
}

# Auto-load aliases if added to shell profile
if [[ -f ~/.bashrc ]]; then
    if ! grep -q "legal-estate-aliases.sh" ~/.bashrc; then
        echo "source $(pwd)/legal-estate-aliases.sh" >> ~/.bashrc
    fi
fi

if [[ -f ~/.zshrc ]]; then
    if ! grep -q "legal-estate-aliases.sh" ~/.zshrc; then
        echo "source $(pwd)/legal-estate-aliases.sh" >> ~/.zshrc
    fi
fi
EOF
    
    chmod +x legal-estate-aliases.sh
    print_success "Aliases created in legal-estate-aliases.sh"
    print_info "Run 'source legal-estate-aliases.sh' to load aliases in current session"
    log "Aliases created"
}

# Test installation
test_installation() {
    print_step "Testing installation..."
    
    # Test Node.js
    if command -v node >/dev/null 2>&1; then
        print_success "Node.js: $(node --version)"
    else
        print_error "Node.js not found"
    fi
    
    # Test npm
    if command -v npm >/dev/null 2>&1; then
        print_success "npm: $(npm --version)"
    else
        print_error "npm not found"
    fi
    
    # Test Docker
    if command -v docker >/dev/null 2>&1; then
        print_success "Docker: $(docker --version)"
    else
        print_warning "Docker not found or not running"
    fi
    
    # Test PostgreSQL client
    if command -v psql >/dev/null 2>&1; then
        print_success "PostgreSQL client: $(psql --version)"
    else
        print_warning "PostgreSQL client not found"
    fi
    
    # Test project structure
    if [[ -f "backend/package.json" ]] && [[ -f "frontend/package.json" ]]; then
        print_success "Project structure appears valid"
    else
        print_warning "Project structure may be incomplete"
    fi
    
    log "Installation test completed"
}

# Generate setup report
generate_report() {
    print_step "Generating setup report..."
    
    cat > SETUP_REPORT.md << EOF
# Legal Practice Management Software - Setup Report

**Generated:** $(date)
**OS:** $OS_TYPE
**Package Manager:** $PACKAGE_MANAGER

## Installation Summary

### ✅ Installed Components
- Node.js: $(node --version 2>/dev/null || echo 'Not installed')
- npm: $(npm --version 2>/dev/null || echo 'Not installed')
- Docker: $(docker --version 2>/dev/null || echo 'Not installed')
- PostgreSQL Client: $(psql --version 2>/dev/null || echo 'Not installed')

### 📁 Directory Structure
$(tree -L 3 2>/dev/null || find . -type d | head -20)

### 🚀 Next Steps
1. Load aliases: \`source legal-aliases.sh\`
2. Start development: \`legal-start\` or \`npm run dev\`
3. Build with Docker: \`legal-build\` or \`docker-compose up --build\`
4. Access application: http://localhost:3000
5. Login with: admin@example.com / admin123

### 🔧 Available Commands
- \`legal-help\` - Show all available commands
- \`legal-status\` - Check system status
- \`legal-start\` - Start development servers
- \`legal-build\` - Build and deploy with Docker

### 📚 Documentation
- Project structure: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- Scripts documentation: [scripts/README.md](scripts/README.md)
- Setup log: [setup.log](setup.log)

### 🆘 Troubleshooting
If you encounter issues:
1. Check the setup log: \`cat setup.log\`
2. Verify Docker is running: \`docker ps\`
3. Check database connection in backend/.env
4. Re-run this script if needed

---
*Setup completed successfully! 🎉*
EOF
    
    print_success "Setup report generated: SETUP_REPORT.md"
    log "Setup report generated"
}

# Main setup function
main() {
    clear
    print_header "🚀 Legal Estate Management Software - Universal Setup"
    
    print_info "This script will clone the repository and install everything needed to run the Legal Estate Software"
    print_info "Repository: https://github.com/tedrubin80/legal-estate"
    print_info "Estimated time: 10-15 minutes"
    print_info "Log file: $LOGFILE"
    echo
    
    read -p "Continue with setup? (Y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Nn]$ ]]; then
        print_info "Setup cancelled"
        exit 0
    fi
    
    # Initialize log
    echo "Legal Software Setup Log - $(date)" > "$LOGFILE"
    
    # Execute setup steps
    detect_os
    check_root
    create_backup
    update_system
    install_system_deps
    clone_repository
    install_nodejs
    install_docker
    install_postgresql
    setup_project_structure
    install_project_deps
    setup_environment
    setup_database
    setup_scripts
    create_aliases
    test_installation
    generate_report
    
    # Final message
    clear
    print_header "🎉 Setup Complete!"
    
    print_success "Legal Estate Management Software is ready!"
    echo
    print_info "📊 What was installed:"
    print_info "  • Node.js $(node --version 2>/dev/null || echo 'Check manually')"
    print_info "  • Docker $(docker --version 2>/dev/null | cut -d',' -f1 || echo 'Check manually')"
    print_info "  • PostgreSQL client tools"
    print_info "  • Project dependencies"
    print_info "  • Development environment"
    echo
    print_info "🎯 Next steps:"
    print_info "  1. Load aliases: source legal-estate-aliases.sh"
    print_info "  2. Start development: npm run dev (in backend & frontend)"
    print_info "  3. Or use Docker: docker-compose up --build"
    print_info "  4. Access app: http://localhost:3000"
    print_info "  5. Login: admin@example.com / admin123"
    echo
    print_info "📚 Documentation:"
    print_info "  • Setup report: SETUP_REPORT.md"
    print_info "  • Help commands: estate-help"
    print_info "  • Setup log: setup.log"
    echo
    print_info "🆘 Need help? Check SETUP_REPORT.md or run estate-help"
    
    log "Setup completed successfully"
}

# Run main function
main "$@"