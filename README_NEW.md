# Dhandha - Task Marketplace App

A React Native task marketplace application connecting job posters with job accepters, featuring real-time chat, location-based discovery, and payment integration.

## 🚀 Features

- **Multi-Role Authentication**: Super Admin, Job Poster, Job Accepter
- **Social Login**: Google, Facebook, and Email/Password authentication
- **Task Management**: Create, browse, accept, and manage tasks
- **Real-time Chat**: Communication between job posters and accepters
- **Location-based Discovery**: Find tasks near your location
- **Payment Integration**: Secure payments via Stripe
- **Push Notifications**: Stay updated on task status changes

## 🏗️ Architecture

### Frontend (React Native)
- **Framework**: React Native 0.82+ with TypeScript
- **Navigation**: React Navigation 6
- **State Management**: Redux Toolkit
- **UI Library**: React Native Paper (Material Design)
- **Real-time**: Socket.IO client
- **Authentication**: JWT with AsyncStorage

### Backend (Node.js)
- **Framework**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Passport.js (Google/Facebook OAuth)
- **Real-time**: Socket.IO
- **Payment**: Stripe integration
- **Security**: Helmet, rate limiting, CORS

## 📦 Project Structure

```
dhandha/
├── src/                          # React Native source code
│   ├── screens/                  # App screens
│   │   ├── auth/                # Authentication screens
│   │   ├── tasks/               # Task management screens
│   │   ├── chat/                # Chat screens
│   │   ├── profile/             # User profile screens
│   │   └── admin/               # Admin dashboard screens
│   ├── navigation/              # Navigation configuration
│   ├── store/                   # Redux store and slices
│   ├── services/                # API services
│   ├── types/                   # TypeScript type definitions
│   └── mocks/                   # Mock implementations for web
├── backend/                     # Node.js backend
│   ├── src/
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Express middleware
│   │   ├── models/              # MongoDB models
│   │   ├── socket/              # Socket.IO handlers
│   │   └── utils/               # Utility functions
├── public/                      # Web assets
└── dist/                        # Web build output
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and npm
- React Native development environment
- MongoDB (for backend)
- Android Studio or Xcode (for mobile testing)

### Installation

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd dhandha
   npm install
   ```

2. **Environment Variables**
   Create `.env` files:
   ```bash
   # Root .env
   BACKEND_URL=http://localhost:3000
   
   # backend/.env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/dhandha
   JWT_SECRET=your_jwt_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   FACEBOOK_APP_ID=your_facebook_app_id
   FACEBOOK_APP_SECRET=your_facebook_app_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

### 🚀 Running the Application

#### Backend Server
```bash
npm run backend
# Server starts at http://localhost:3000
```

#### Mobile Development
```bash
# Start Metro bundler
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

#### Web Development (VS Code Testing)
```bash
# Start web version in browser
npm run web
# Opens at http://localhost:3001
```

## 🧪 Testing & Development

### Web Testing in VS Code
The app includes React Native Web support for testing in VS Code's Simple Browser:

1. Start the web development server: `npm run web`
2. Open VS Code's Simple Browser to `http://localhost:3001`
3. Test React Native components directly in the browser

### Mobile Testing
- **Android**: Requires Android Studio and AVD setup
- **iOS**: Requires Xcode (macOS only)
- **Physical Device**: Enable developer mode and USB debugging

### API Testing
The backend provides a health check endpoint:
```bash
curl http://localhost:3000/health
```

## 🔧 Available Scripts

```bash
# Development
npm start                 # Start React Native Metro bundler
npm run backend          # Start Node.js backend server
npm run web             # Start web development server

# Mobile platforms
npm run android         # Run on Android device/emulator
npm run ios            # Run on iOS device/simulator

# Backend utilities
npm run backend:dev     # Backend with auto-reload
npm run backend:build   # Build backend TypeScript

# Web utilities
npm run web:build       # Build web version for production
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/facebook` - Facebook OAuth
- `POST /api/auth/forgot-password` - Password reset

### Tasks
- `GET /api/tasks` - Get available tasks
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `POST /api/tasks/:id/accept` - Accept task

### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/tasks` - Get user's tasks

### Chat
- `GET /api/chat/conversations` - Get conversations
- `POST /api/chat/send` - Send message
- `GET /api/chat/:conversationId` - Get conversation messages

## 🔌 Real-time Features

Socket.IO events:
- `message` - New chat message
- `task_update` - Task status changes
- `notification` - Push notifications
- `user_online` - User presence

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting on API endpoints
- CORS configuration
- Helmet security headers
- Input validation and sanitization

## 🚀 Deployment

### Backend Deployment
The backend is configured for deployment on platforms like Railway, Heroku, or Vercel.

### Mobile App Deployment
- **Android**: Build APK/AAB for Google Play Store
- **iOS**: Build IPA for Apple App Store

### Web Deployment
The web version can be deployed to any static hosting service.

## 📱 User Roles

### Super Admin
- Manage all users and tasks
- View analytics and reports
- System configuration

### Job Poster
- Create and manage task listings
- Review and select job accepters
- Process payments

### Job Accepter
- Browse and search available tasks
- Apply for tasks
- Complete work and receive payments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Metro bundler not starting**: Clear cache with `npx react-native start --reset-cache`
2. **Android build issues**: Clean project with `cd android && ./gradlew clean`
3. **iOS build issues**: Clean Xcode build folder
4. **Web version not loading**: Check if port 3001 is available
5. **Backend connection issues**: Verify MongoDB is running and environment variables are set

### Development Tips

- Use React Native Flipper for debugging
- Enable remote debugging for better error tracking
- Use VS Code React Native Tools extension
- Test on multiple device sizes and orientations

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the API documentation