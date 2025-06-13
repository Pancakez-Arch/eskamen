

## Overview

A modern fitness website for Treningsglede AS, featuring a hybrid architecture with database-driven user authentication and hardcoded session management. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🏗️ Architecture

This project uses a **hybrid approach**:

- **🔐 Authentication System**: Database-driven user registration, login, and session management
- **📅 Sessions & Bookings**: Hardcoded training sessions for easy content management
- **🎨 UI/UX**: Modern, responsive design with shadcn/ui components

## ✨ Features

### User Authentication
- ✅ User registration with form validation
- ✅ Secure login with JWT tokens
- ✅ Session management with HTTP-only cookies
- ✅ Password hashing with bcrypt
- ✅ Protected routes and user state management

### Training Sessions
- ✅ Hardcoded session data (6 different training types)
- ✅ Indoor and outdoor session categories
- ✅ Instructor profiles and session details
- ✅ Difficulty levels and participant limits
- ✅ Booking system with user authentication

### Website Features
- ✅ Responsive design for all devices
- ✅ Team member profiles
- ✅ Company philosophy and values
- ✅ Contact information and opening hours
- ✅ Modern gradient designs and animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL database
- Environment variables (see below)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd treningsglede-website
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   \`\`\`env
   # Database
   DATABASE_URL="mysql://username:password@localhost:3306/Adiam"
   
   # Authentication
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   
   # Vercel Environment Variables (if using Vercel)
   POSTGRES_URL="your-postgres-url"
   POSTGRES_PRISMA_URL="your-postgres-prisma-url"
   SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_URL="your-public-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
   SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
   \`\`\`

4. **Set up the database**
   
   Run the SQL scripts to create the necessary tables:
   \`\`\`bash
   # Connect to your MySQL database and run:
   mysql -u username -p < scripts/001-create-database.sql
   mysql -u username -p < scripts/002-verify-tables.sql
   \`\`\`

5. **Generate Prisma client**
   \`\`\`bash
   npm run db:generate
   \`\`\`

6. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

7. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

\`\`\`
treningsglede-website/
├── app/                          # Next.js App Router
│   ├── api/auth/                # Authentication API routes
│   ├── login/                   # Login page
│   ├── sessions/                # Training sessions page
│   ├── team/                    # Team members page
│   ├── layout.tsx               # Root layout with AuthProvider
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   ├── ui/                      # shadcn/ui components
│   ├── navigation.tsx           # Main navigation with auth state
│   └── footer.tsx               # Site footer
├── lib/                         # Utility libraries
│   ├── auth.ts                  # Authentication logic
│   ├── prisma.ts                # Database client
│   ├── hooks/useAuth.tsx        # Authentication context
│   └── utils.ts                 # General utilities
├── prisma/                      # Database schema
│   └── schema.prisma            # Prisma schema definition
├── scripts/                     # Database setup scripts
│   ├── 001-create-database.sql  # Initial database setup
│   └── 002-verify-tables.sql    # Database verification
└── public/                      # Static assets
\`\`\`

## 🔧 Configuration

### Database Schema

The application uses two main tables:

- **users**: Stores user accounts with authentication data
- **sessions**: Manages user login sessions with JWT tokens

### Hardcoded Sessions

Training sessions are defined in `app/sessions/page.tsx`:

\`\`\`typescript
const sessions = [
  {
    id: 1,
    title: "Morgen Yoga",
    instructor: "Sofia Johannessen",
    type: "indoor",
    // ... more session data
  },
  // ... more sessions
]
\`\`\`

To add or modify sessions, edit this array directly in the component.

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Components**: shadcn/ui
- **Theme**: Custom purple primary color scheme
- **Responsive**: Mobile-first design approach

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure session management
- **HTTP-Only Cookies**: Prevents XSS attacks
- **Input Validation**: Form validation on client and server
- **CSRF Protection**: Built-in Next.js protection

## 📱 Pages

1. **Homepage** (`/`): Company introduction and call-to-action
2. **Team** (`/team`): Meet the instructors and company values
3. **Sessions** (`/sessions`): Browse and book training sessions
4. **Login** (`/login`): User authentication (login/register)

## Deployment

Your project is live at:

**[https://vercel.com/pancakez-archs-projects/v0-treningsglede-as-website](https://vercel.com/pancakez-archs-projects/v0-treningsglede-as-website)**

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

1. **Build the application**
   \`\`\`bash
   npm run build
   \`\`\`

2. **Start production server**
   \`\`\`bash
   npm start
   \`\`\`

## 🛠️ Development Scripts

\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio
\`\`\`

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/Lt1jkv4ZTk3](https://v0.dev/chat/projects/Lt1jkv4ZTk3)**

## 🔄 How It Works

### Authentication Flow
1. User registers/logs in through `/login`
2. Server validates credentials and creates JWT token
3. Token stored in HTTP-only cookie
4. Protected routes check authentication status
5. User state managed through React Context

### Booking Flow
1. User must be authenticated to book sessions
2. Session data is hardcoded (no database queries)
3. Booking form pre-fills with user information
4. Confirmation shown (no database save)
5. Easy to modify sessions by editing code

### Development Workflow

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions:
- **Email**: hei@treningsglede.no
- **Phone**: +47 123 45 678
- **Address**: Oslo, Norge

## 📄 License

This project is private and proprietary to Treningsglede AS.

---

**Built with ❤️ using [v0.dev](https://v0.dev)**
