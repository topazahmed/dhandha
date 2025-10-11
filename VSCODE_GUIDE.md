# VS Code Development Guide

This guide will help you set up and develop the Dhandha app efficiently within VS Code.

## 🔧 Required VS Code Extensions

### Essential Extensions
- **React Native Tools** - Microsoft
- **ES7+ React/Redux/React-Native snippets** - dsznajder
- **TypeScript Importer** - pmneo
- **Auto Rename Tag** - Jun Han
- **Bracket Pair Colorizer 2** - CoenraadS
- **GitLens** - GitKraken

### Optional but Helpful
- **Thunder Client** - Thunder Client (for API testing)
- **MongoDB for VS Code** - MongoDB
- **Docker** - Microsoft (if using Docker)
- **Simple Browser** - Microsoft (for web testing)

## 🚀 Quick Development Workflow

### 1. Start Backend Server
```bash
# Terminal 1
npm run backend
```
Backend runs at: http://localhost:3000

### 2. Start React Native Metro
```bash
# Terminal 2  
npm start
```
Metro bundler runs at: http://localhost:8081

### 3. Web Development Testing
```bash
# Terminal 3 (optional for web testing)
npm run web
```
Web version runs at: http://localhost:3001

## 🌐 Web Testing in VS Code

The app includes React Native Web support for quick testing without mobile emulators:

1. Run `npm run web`
2. Open VS Code Command Palette (`Ctrl+Shift+P`)
3. Type "Simple Browser: Show"
4. Enter URL: `http://localhost:3001`
5. Test React Native components in browser

### Web Testing Benefits
- ✅ Fast iteration without emulator startup
- ✅ Test UI components and basic functionality
- ✅ Debug with browser dev tools
- ✅ No need for Android Studio/Xcode setup

### Web Testing Limitations
- ❌ No native device features (camera, GPS, etc.)
- ❌ Some React Native libraries don't work on web
- ❌ Different touch/interaction behavior

## 📱 Mobile Development

### Android Development
1. Install Android Studio
2. Set up Android SDK
3. Create AVD (Android Virtual Device)
4. Run: `npm run android`

### iOS Development (macOS only)
1. Install Xcode
2. Install iOS Simulator
3. Run: `npm run ios`

## 🔍 Debugging Tips

### VS Code Debugging
1. Install React Native Tools extension
2. Use Debug panel (`Ctrl+Shift+D`)
3. Select "Debug Android" or "Debug iOS" configuration
4. Set breakpoints in TypeScript files

### Console Debugging
- Use `console.log()` for quick debugging
- Check Metro bundler terminal for logs
- Use React Native Debugger for advanced debugging

### Network Debugging
- Use Thunder Client extension for API testing
- Test backend endpoints directly from VS Code
- Monitor network requests in React Native Debugger

## 🏗️ Project Navigation

### Key Directories to Know
```
src/
├── screens/          # All app screens
│   ├── auth/         # Login, Register, ForgotPassword
│   ├── tasks/        # Task management screens
│   ├── chat/         # Chat functionality
│   └── profile/      # User profiles
├── navigation/       # Navigation setup
├── store/           # Redux state management
├── services/        # API calls and services
└── types/           # TypeScript definitions
```

### Quick File Navigation
- Use `Ctrl+P` to quickly open files
- Search for files by name
- Use `Ctrl+Shift+F` for project-wide search

## 🔧 Development Tasks

### Common Commands
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Install new package
npm install package-name

# Clean Android build
cd android && ./gradlew clean && cd ..

# Reset React Native
npx react-native run-android --reset-cache
```

### Code Formatting
- Enable "Format on Save" in VS Code settings
- Install Prettier extension for consistent formatting
- Configure ESLint for code quality

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
# Clear Metro cache
npx react-native start --reset-cache

# Clean npm cache
npm start -- --reset-cache
```

### Android Build Issues
```bash
# Clean Android project
cd android
./gradlew clean
cd ..

# Rebuild
npm run android
```

### VS Code Performance
- Close unnecessary tabs
- Disable unused extensions
- Restart VS Code if sluggish
- Use TypeScript project references for large projects

## 📋 Development Checklist

### Before Starting Development
- [ ] Backend server running (port 3000)
- [ ] Metro bundler running (port 8081)
- [ ] Environment variables configured
- [ ] VS Code extensions installed
- [ ] Git repository initialized

### Before Committing Code
- [ ] Code properly formatted
- [ ] No TypeScript errors
- [ ] No console errors in Metro
- [ ] Basic functionality tested
- [ ] Meaningful commit message

### Before Deployment
- [ ] All features tested on device
- [ ] Backend API endpoints working
- [ ] Database connections stable
- [ ] Environment variables for production set
- [ ] App icons and splash screens configured

## 🚀 Productivity Tips

### VS Code Shortcuts
- `Ctrl+` - Open terminal
- `Ctrl+Shift+` - Open new terminal
- `Ctrl+P` - Quick open file
- `Ctrl+Shift+P` - Command palette
- `F12` - Go to definition
- `Shift+F12` - Find references

### React Native Snippets
- `rnfc` - React Native functional component
- `rncs` - React Native class component with styles
- `imp` - Import statement
- `exp` - Export statement

### Git Integration
- Use Source Control panel in VS Code
- Stage and commit changes directly
- View file differences
- Create branches from VS Code

## 🔄 Development Workflow

### Daily Development Routine
1. Pull latest changes from repository
2. Start backend server
3. Start Metro bundler
4. Open relevant screen file
5. Make changes and save
6. Test on web version for quick feedback
7. Test on mobile device for final verification
8. Commit changes with meaningful messages

### Feature Development Process
1. Create new branch for feature
2. Implement UI components first
3. Add Redux state management
4. Integrate with backend API
5. Test thoroughly on both platforms
6. Submit pull request for review

This guide should help you develop efficiently within VS Code. Happy coding! 🚀