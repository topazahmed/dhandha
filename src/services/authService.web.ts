// Simple auth service for web development
export const authService = {
  // Mock authentication methods for web development
  signInWithEmailPassword: async (email: string, _password: string) => {
    // Mock implementation
    return {
      success: true,
      user: {
        id: '1',
        email,
        name: 'Test User',
      },
      token: 'mock-jwt-token',
    };
  },

  signUpWithEmailPassword: async (email: string, _password: string, name: string) => {
    // Mock implementation
    return {
      success: true,
      user: {
        id: '1',
        email,
        name,
      },
      token: 'mock-jwt-token',
    };
  },

  signInWithGoogle: async () => {
    // Mock implementation
    return {
      success: true,
      user: {
        id: '2',
        email: 'google@example.com',
        name: 'Google User',
      },
      token: 'mock-google-token',
    };
  },

  signInWithFacebook: async () => {
    // Mock implementation
    return {
      success: true,
      user: {
        id: '3',
        email: 'facebook@example.com',
        name: 'Facebook User',
      },
      token: 'mock-facebook-token',
    };
  },

  signOut: async () => {
    // Mock implementation
    return { success: true };
  },

  resetPassword: async (_email: string) => {
    // Mock implementation
    return { success: true, message: 'Password reset email sent' };
  },
};