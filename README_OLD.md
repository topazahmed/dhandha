# Dhandha - Task Marketplace App

A React Native mobile application for a task marketplace where users can post tasks and others can accept them to earn money.

## 🚀 Features

### User Roles
- **Super Admin**: Full system management and oversight
- **Job Poster**: Can create and manage tasks
- **Job Accepter**: Can browse and accept available tasks

### Core Features
- **Multi-Authentication**: Email/password, Google OAuth, Facebook OAuth
- **Task Management**: Create, browse, accept, and complete tasks
- **Real-time Chat**: In-app messaging between task posters and accepters
- **Location-based Discovery**: Find tasks near your location
- **Payment Integration**: Stripe integration for secure payments
- **Push Notifications**: Real-time updates and notifications
- **Rating System**: User ratings and reviews
- **Task Categories**: Delivery, cleaning, tutoring, handyman, photography, writing, design, and more

## 📱 Tech Stack

### Frontend (React Native)
- **React Native 0.82+** with TypeScript
- **React Navigation** for navigation
- **Redux Toolkit** for state management
- **React Native Paper** for UI components
- **Socket.IO Client** for real-time communication
- **React Native Maps** for location features
- **Stripe React Native** for payments
- **React Hook Form + Yup** for form validation

### Backend (Node.js)
- **Express.js** with TypeScript
- **MongoDB** with Mongoose ODM
- **Socket.IO** for real-time features
- **JWT** for authentication
- **Stripe** for payment processing
- **Passport.js** for OAuth integration
- **Multer** for file uploads
- **Rate limiting** and security middleware

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- React Native development environment
- MongoDB instance
- Android Studio / Xcode for mobile development

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   - MongoDB connection string
   - JWT secret
   - OAuth credentials (Google, Facebook)
   - Stripe keys
   - Email configuration

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Install dependencies (from root directory):
   ```bash
   npm install
   ```

2. Install iOS dependencies (macOS only):
   ```bash
   bundle install
   bundle exec pod install
   ```

3. Start Metro bundler:
   ```bash
   npm start
   ```

4. Run on Android:
   ```bash
      npm run android
   ```

5. Run on iOS (macOS only):
   ```bash
   npm run ios
   ```

## 📱 Configuration

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your bundle ID (Android/iOS)
6. Update configuration in both frontend and backend

### Facebook OAuth Setup
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure bundle IDs and domains
5. Update configuration in both frontend and backend

### Stripe Payment Setup
1. Create a [Stripe](https://stripe.com/) account
2. Get your publishable and secret keys
3. Set up webhooks for payment events
4. Update configuration in both frontend and backend

### Maps Integration
1. Get Google Maps API key
2. Enable required APIs (Maps, Places, Geocoding)
3. Add API key to your app configuration
4. Set up billing for Google Cloud Platform

## 🏗️ Project Structure

```
dhandha/
├── src/                    # React Native source code
│   ├── components/         # Reusable UI components
│   ├── screens/           # Screen components
│   │   ├── auth/          # Authentication screens
│   │   ├── tasks/         # Task-related screens
│   │   ├── chat/          # Chat screens
│   │   ├── profile/       # Profile screens
│   │   └── admin/         # Admin screens
│   ├── navigation/        # Navigation configuration
│   ├── store/             # Redux store and slices
│   ├── services/          # API services
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── backend/               # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   ├── socket/        # Socket.IO handlers
│   │   └── utils/         # Backend utilities
│   └── uploads/           # File upload directory
├── android/               # Android native code
├── ios/                   # iOS native code
├── App.tsx               # Main app component
├── package.json          # Frontend dependencies
└── README.md
```

## 🔒 Security Features

- JWT-based authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- File upload restrictions
- CORS configuration
- Helmet.js for security headers
- Password hashing with bcrypt
- OAuth integration for secure login

## 🚀 Deployment

### Backend Deployment Options

#### **Railway (Recommended - Free Tier)**
1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login and deploy:
   ```bash
   railway login
   railway init
   railway up
   ```

3. Set environment variables in Railway dashboard:
   - `NODE_ENV=production`
   - `MONGODB_URI=your-mongodb-atlas-url`
   - `JWT_SECRET=your-production-secret`
   - Add all OAuth and Stripe keys

#### **Render (Alternative Free Option)**
1. Connect your GitHub repository
2. Choose "Web Service"
3. Set build command: `npm install && npm run build`
4. Set start command: `npm start`
5. Add environment variables

#### **MongoDB Atlas Setup**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster (free tier: 512MB)
3. Get connection string
4. Update `MONGODB_URI` in your environment variables

### Frontend Deployment

#### **Mobile App Distribution**
- **Android**: Build APK and distribute via Google Play Store
- **iOS**: Build IPA and distribute via Apple App Store

#### **Build Commands**
```bash
# Android Release Build
cd android
./gradlew assembleRelease

# iOS Release Build (macOS only)
cd ios
xcodebuild -workspace DhandhaApp.xcworkspace -scheme DhandhaApp -configuration Release
```

### **Environment Variables Required**
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dhandha
JWT_SECRET=your-super-secret-jwt-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: your-email@example.com

---

**Note**: This is a demonstration project. Make sure to properly configure all services and security settings before deploying to production.
   ```

5. Run on iOS (macOS only):
   ```bash
   npm run ios
   ```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
