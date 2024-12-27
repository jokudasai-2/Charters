# Charters - Project Documentation

A modern web application for managing project charters, stakeholder feedback, and team collaboration.

## 🚀 Features

- **Charter Management**
  - Create and manage project charters
  - Save drafts and track status changes
  - Rich text editing for charter content
  - Document versioning and history

- **Stakeholder Collaboration**
  - Multi-department stakeholder management
  - Role-based access control
  - Real-time stakeholder updates
  - Department-specific views

- **Feedback System**
  - Structured feedback collection
  - Status tracking (Pending, Heard, Actioned)
  - Conviction level indicators
  - Real-time feedback notifications

- **User Experience**
  - Intuitive sign-up flow with success feedback
  - Toast notifications for important actions
  - Responsive design
  - Real-time updates

## 🛠 Tech Stack

- **Frontend**
  - React 18 with TypeScript
  - Vite for build tooling
  - TailwindCSS for styling
  - React Router for navigation
  - Lucide React for icons

- **Backend**
  - Supabase for database and authentication
  - PostgreSQL with Row Level Security
  - Real-time subscriptions
  - Secure email handling

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
├── features/           # Feature-specific components and logic
│   ├── auth/          # Authentication related features
│   ├── charters/      # Charter management features
│   ├── feedback/      # Feedback system features
│   ├── layout/        # Layout components
│   └── stakeholders/  # Stakeholder management features
├── lib/               # Utility functions and shared logic
├── pages/            # Route components
└── types/            # TypeScript type definitions
```

## 🔧 Setup & Development

1. **Prerequisites**
   - Node.js 18+
   - npm 9+
   - Supabase account

2. **Environment Variables**
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

3. **Installation**
   ```bash
   npm install
   ```

4. **Development**
   ```bash
   npm run dev
   ```

5. **Build**
   ```bash
   npm run build
   ```

## 🔐 Security

- Row Level Security (RLS) policies for all tables
- Secure authentication flow
- Protected routes and API endpoints
- Role-based access control
- Email validation

## 📊 Database Schema

### Documents
- Primary charter information
- Status tracking
- User associations
- Version control

### Stakeholders
- Multi-department support
- Role assignments
- Document associations
- Email notifications

### Feedback
- Structured feedback data
- Status tracking
- Conviction levels
- Resolution tracking

## 🔄 State Management

- React Context for authentication
- Custom hooks for data fetching
- Real-time subscriptions
- Optimistic updates

## 🎨 UI/UX Features

- Responsive design
- Toast notifications
- Loading states
- Error handling
- Form validation
- Interactive tooltips

## 📱 Responsive Design

- Mobile-first approach
- Adaptive layouts
- Touch-friendly interfaces
- Responsive navigation

## 🚦 Error Handling

- Comprehensive error boundaries
- Form validation feedback
- API error handling
- Offline state management
- User-friendly error messages

## 🔍 Future Improvements

- [ ] Enhanced search functionality
- [ ] Document templates
- [ ] Bulk operations
- [ ] Advanced reporting
- [ ] Integration with external tools
- [ ] Enhanced offline support
- [ ] Document export options
- [ ] Advanced analytics

## 📄 License

MIT License - see LICENSE for details