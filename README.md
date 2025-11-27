# KITO - Healthcare Job Portal

A modern, full-featured job portal connecting doctors with healthcare facilities, built with Next.js 14, TypeScript, and shadcn/ui.

![KITO Logo](https://img.shields.io/badge/KITO-Job%20Portal-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## 🌟 Features

- **Role-Based Access Control**: Separate experiences for doctors and hospitals
- **Authentication System**: Secure login/signup with role selection
- **Job Management**: Browse, search, and apply to healthcare positions
- **Job Posting**: Hospitals can create and manage job listings
- **Profile Management**: Comprehensive profiles for both doctors and hospitals
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **Modern UI**: Beautiful interface using shadcn/ui components

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/KITOJOBS.git

# Navigate to project directory
cd KITOJOBS

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Demo Accounts

**Doctor Account:**
- Email: `dr.smith@example.com`
- Password: any text (e.g., "password")

**Hospital Account:**
- Email: `hospital@citymed.com`
- Password: any text (e.g., "password")

## 📁 Project Structure

```
KITO/
├── app/                    # Next.js app directory
│   ├── jobs/              # Job-related pages
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── profile/           # Profile page
│   ├── my-jobs/           # Hospital job management
│   ├── my-applications/   # Doctor applications
│   └── settings/          # Settings page
├── components/            # React components
│   ├── layout/           # Layout components (Header, Sidebar)
│   └── ui/               # shadcn/ui components
├── contexts/             # React contexts
│   └── AuthContext.tsx   # Authentication context
├── lib/                  # Utility functions
│   ├── utils.ts         # Helper functions
│   └── mockData.ts      # Mock data and localStorage helpers
└── types/               # TypeScript type definitions
    └── index.ts         # Type definitions
```

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React Context API
- **Data Persistence**: localStorage (easily replaceable with API)

## 📱 Pages

### For Doctors
- **Dashboard**: Overview with stats and quick actions
- **Browse Jobs**: Search and filter job listings
- **Job Details**: View full job information and apply
- **My Applications**: Track application status
- **Profile**: Manage professional information

### For Hospitals
- **Dashboard**: Recruitment overview and metrics
- **My Job Posts**: Manage posted positions
- **Post a Job**: Create new job listings
- **Profile**: Manage facility information

### Common
- **Login/Signup**: Authentication with role selection
- **Settings**: Account preferences
- **Dark Mode**: Theme toggle

## 🎨 Key Features

### Authentication
- Mock authentication system using React Context
- Role-based access (Doctor/Hospital)
- Session persistence with localStorage
- Protected routes with automatic redirects

### Job Management
- Comprehensive job listings with search
- Detailed job descriptions
- Requirements and benefits display
- Application submission for doctors
- Job posting form for hospitals

### User Interface
- Clean, modern design
- Responsive layout for all devices
- Dark mode support
- Smooth animations and transitions
- Accessible components

## 🔄 Future Enhancements

- Backend API integration
- Real-time notifications
- Messaging system
- Resume upload and parsing
- Advanced search filters
- Email notifications
- Application tracking
- Analytics dashboard

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ for connecting healthcare professionals with opportunities.

---

**Note**: This application uses mock authentication and localStorage for data persistence. For production use, integrate with a real backend API and database.
