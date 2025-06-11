#!/bin/bash

# Treningsglede AS - Ubuntu Server Deployment Script with Clerk
# This script sets up the application on Ubuntu Server

set -e

echo "🚀 Starting Treningsglede AS deployment with Clerk..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker and Docker Compose
echo "🐳 Installing Docker..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add current user to docker group
sudo usermod -aG docker $USER

# Install Node.js (for local development)
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Create application directory
echo "📁 Setting up application directory..."
sudo mkdir -p /opt/treningsglede
sudo chown $USER:$USER /opt/treningsglede
cd /opt/treningsglede

# Create environment file
echo "⚙️ Creating environment configuration..."
cat > .env << EOF
NODE_ENV=production
DB_HOST=mysql
DB_PORT=3306
DB_USER=treningsglede
DB_PASSWORD=$(openssl rand -base64 32)
DB_NAME=treningsglede

# Clerk Configuration - ADD YOUR KEYS HERE
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/sessions
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/sessions
EOF

echo "🔑 IMPORTANT: Update the .env file with your Clerk keys!"
echo "   - Get your keys from https://dashboard.clerk.com/"
echo "   - Update NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
echo "   - Update CLERK_SECRET_KEY"

# Create SSL directory (you'll need to add your certificates)
echo "🔒 Setting up SSL directory..."
mkdir -p ssl
echo "⚠️  Please add your SSL certificates to the ssl/ directory:"
echo "   - ssl/cert.pem (certificate file)"
echo "   - ssl/key.pem (private key file)"

# Create systemd service for auto-start
echo "🔧 Creating systemd service..."
sudo tee /etc/systemd/system/treningsglede.service > /dev/null << EOF
[Unit]
Description=Treningsglede AS Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/opt/treningsglede
ExecStart=/usr/bin/docker compose up -d
ExecStop=/usr/bin/docker compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
sudo systemctl daemon-reload
sudo systemctl enable treningsglede.service

# Setup firewall
echo "🔥 Configuring firewall..."
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# Create backup script
echo "💾 Creating backup script..."
cat > backup.sh << 'EOF'
#!/bin/bash
# Backup script for Treningsglede AS

BACKUP_DIR="/opt/backups/treningsglede"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Load environment variables
source .env

# Backup database
docker compose exec -T mysql mysqldump -u treningsglede -p$DB_PASSWORD treningsglede > $BACKUP_DIR/db_backup_$DATE.sql

# Backup application files
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz /opt/treningsglede --exclude=/opt/treningsglede/mysql_data

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x backup.sh

# Setup cron job for daily backups
echo "⏰ Setting up daily backups..."
(crontab -l 2>/dev/null; echo "0 2 * * * /opt/treningsglede/backup.sh") | crontab -

# Create monitoring script
cat > monitor.sh << 'EOF'
#!/bin/bash
# Simple monitoring script

echo "=== Treningsglede AS System Status ==="
echo "Date: $(date)"
echo ""

echo "🐳 Docker Status:"
docker compose ps

echo ""
echo "💾 Disk Usage:"
df -h /

echo ""
echo "🔧 Memory Usage:"
free -h

echo ""
echo "📊 Database Status:"
docker compose exec mysql mysqladmin -u treningsglede -p$DB_PASSWORD status 2>/dev/null || echo "Database not accessible"

echo ""
echo "🌐 Application Health:"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "Application not responding"
EOF

chmod +x monitor.sh

# Create Clerk setup instructions
cat > CLERK_SETUP.md << 'EOF'
# Clerk Setup Instructions

## 1. Create Clerk Account
1. Go to https://clerk.com/
2. Sign up for a free account
3. Create a new application

## 2. Get Your Keys
1. In your Clerk dashboard, go to "API Keys"
2. Copy the "Publishable key" and "Secret key"

## 3. Update Environment Variables
Edit the `.env` file and replace:
- `your_clerk_publishable_key_here` with your actual publishable key
- `your_clerk_secret_key_here` with your actual secret key

## 4. Configure Clerk Settings
In your Clerk dashboard:
1. Go to "User & Authentication" > "Email, Phone, Username"
2. Enable email authentication
3. Configure sign-in/sign-up options as needed

## 5. Set Redirect URLs
In Clerk dashboard, set these URLs:
- Sign-in URL: `/sign-in`
- Sign-up URL: `/sign-up`
- After sign-in URL: `/sessions`
- After sign-up URL: `/sessions`

## 6. Test Authentication
After updating the environment variables, restart the application:
\`\`\`bash
docker compose down
docker compose up -d
\`\`\`
EOF

echo ""
echo "✅ Deployment setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Read CLERK_SETUP.md for Clerk configuration"
echo "2. Update the .env file with your Clerk keys"
echo "3. Add your SSL certificates to the ssl/ directory"
echo "4. Run 'docker compose up -d' to start the application"
echo "5. Visit https://your-domain.com to access the website"
echo ""
echo "🔧 Useful commands:"
echo "- Start: sudo systemctl start treningsglede"
echo "- Stop: sudo systemctl stop treningsglede"
echo "- Status: sudo systemctl status treningsglede"
echo "- Logs: docker compose logs -f"
echo "- Monitor: ./monitor.sh"
echo "- Backup: ./backup.sh"
echo ""
echo "📁 Application directory: /opt/treningsglede"
echo "💾 Backups directory: /opt/backups/treningsglede"
echo "📖 Clerk setup guide: /opt/treningsglede/CLERK_SETUP.md"
