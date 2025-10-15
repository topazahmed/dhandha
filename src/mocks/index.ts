// Mock implementations for web compatibility

import React from 'react';

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

// Mock Icon Components
const MockIcon = ({ name, size = 24, color = '#000', ...props }: any) => {
  return React.createElement('span', {
    ...props,
    style: {
      display: 'inline-block',
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: '50%',
      ...props.style,
    },
    title: name,
  }, '•');
};

// Export mock icon as default for various icon libraries
export default MockIcon;

// Named exports for different icon types
export const MaterialCommunityIcons = MockIcon;
export const MaterialIcons = MockIcon;
export const Ionicons = MockIcon;
export const FontAwesome = MockIcon;
export const Feather = MockIcon;

// Mock other modules as needed
export const mockModules = {
  AsyncStorage,
  GoogleSignin,
  LoginManager,
  AccessToken,
  MaterialCommunityIcons,
  MaterialIcons,
};