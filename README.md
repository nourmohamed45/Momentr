# Momentr - Modern Social Media Platform

![Momentr Logo](public/assets/logo.webp)

## 🌟 Overview

Momentr is a feature-rich social media application built with modern web technologies. It provides users with a seamless experience to share moments, connect with others, and explore content in a beautiful, responsive interface.

## ✨ Features

- **User Authentication**
  - Secure sign-up and sign-in
  - Protected routes and persistent sessions
  - Profile management

- **Content Creation & Sharing**
  - Create posts with images
  - Add captions, locations, and tags
  - Edit and update your content

- **Social Interaction**
  - Like and save posts
  - View user profiles
  - Explore content from other users

- **Responsive Design**
  - Optimized for mobile, tablet, and desktop
  - Intuitive navigation with sidebar and bottombar
  - Dark theme for comfortable viewing

## 🛠️ Tech Stack

### Frontend
- **React 18** - Component-based UI development
- **TypeScript** - Type-safe code
- **Vite** - Next-generation frontend tooling
- **React Router v7** - Navigation and routing
- **React Query** - Data fetching, caching, and state management
- **React Hook Form** - Form validation and handling
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first styling

### Backend
- **Appwrite** - Backend as a Service (BaaS)
  - Authentication
  - Database
  - Storage
  - Avatars

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Shadcn/UI** - UI component patterns

## 🏗️ Architecture

Momentr follows a modern React application architecture:

- **Component-Based Structure** - Reusable UI components
- **Context API** - Global state management for authentication
- **Custom Hooks** - Encapsulated logic for reusability
- **Service Layer** - Abstracted API calls to Appwrite
- **Type Safety** - Comprehensive TypeScript types

## 📂 Project Structure

```
src/
├── _auth/               # Authentication pages and components
├── _root/               # Main application pages
├── components/          # Reusable UI components
│   ├── forms/           # Form components
│   ├── shared/          # Shared components
│   └── ui/              # UI primitives
├── constants/           # Application constants
├── context/             # React Context providers
├── hooks/               # Custom React hooks
├── lib/                 # Utility libraries
│   ├── appwrite/        # Appwrite configuration and API
│   ├── react-query/     # React Query hooks and config
│   └── validation/      # Zod validation schemas
└── types/               # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Appwrite account (for backend services)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/momentr.git
   cd momentr
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your-project-id
   VITE_APPWRITE_DATABASE_ID=your-database-id
   VITE_APPWRITE_STORAGE_ID=your-storage-id
   VITE_APPWRITE_USER_COLLECTION_ID=your-user-collection-id
   VITE_APPWRITE_POST_COLLECTION_ID=your-post-collection-id
   VITE_APPWRITE_SAVES_COLLECTION_ID=your-saves-collection-id
   ```
   
   > **Note:** The application includes default values for development, but for production use, you should set up your own Appwrite project and configure these variables accordingly.

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📦 Building for Production

```bash
npm run build
# or
yarn build
```

## 🔒 Security

- Secure authentication with Appwrite
- Protected routes for authenticated users
- Input validation with Zod

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📬 Contact

For any inquiries, please reach out to [your-email@example.com](mailto:your-email@example.com).

---

Built with ❤️ using React, TypeScript, and Appwrite.
