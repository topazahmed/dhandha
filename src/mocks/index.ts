// Mock implementations for web compatibility

// Mock AsyncStorage
export const AsyncStorage = {
  getItem: async (key: string) => {
    return localStorage.getItem(key);
  },
  setItem: async (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    localStorage.removeItem(key);
  },
  clear: async () => {
    localStorage.clear();
  },
  getAllKeys: async () => {
    return Object.keys(localStorage);
  },
};

// Mock Google Sign In
export const GoogleSignin = {
  configure: () => {},
  hasPlayServices: async () => true,
  signIn: async () => ({
    user: {
      id: 'mock-user-id',
      name: 'Mock User',
      email: 'mock@example.com',
      photo: '',
    },
  }),
  signOut: async () => {},
  isSignedIn: async () => false,
  getCurrentUser: async () => null,
};

// Mock Facebook SDK
export const LoginManager = {
  logInWithPermissions: async () => ({
    isCancelled: false,
    grantedPermissions: ['email', 'public_profile'],
  }),
  logOut: () => {},
};

export const AccessToken = {
  getCurrentAccessToken: async () => null,
};

// Mock other modules as needed
export const mockModules = {
  AsyncStorage,
  GoogleSignin,
  LoginManager,
  AccessToken,
};