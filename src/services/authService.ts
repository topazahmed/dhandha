import axios from 'axios';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { User, UserRole } from '../types';

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL

// Configure Google Sign-In
GoogleSignin.configure({
  webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID', // Replace with your Google Web Client ID
  iosClientId: 'YOUR_IOS_CLIENT_ID', // Replace with your iOS Client ID
});

class AuthService {
  private apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  // Set auth token for API requests
  setAuthToken(token: string) {
    this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Remove auth token
  removeAuthToken() {
    delete this.apiClient.defaults.headers.common['Authorization'];
  }

  // Email/Password login
  async loginWithEmail(email: string, password: string) {
    try {
      const response = await this.apiClient.post('/auth/login', {
        email,
        password,
      });
      
      const { user, token } = response.data;
      this.setAuthToken(token);
      
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  }

  // User registration
  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: UserRole
  ) {
    try {
      const response = await this.apiClient.post('/auth/register', {
        email,
        password,
        firstName,
        lastName,
        role,
      });
      
      const { user, token } = response.data;
      this.setAuthToken(token);
      
      return { user, token };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  }

  // Google Sign-In
  async loginWithGoogle() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      const response = await this.apiClient.post('/auth/google', {
        idToken: userInfo.idToken,
      });
      
      const { user, token } = response.data;
      this.setAuthToken(token);
      
      return { user, token };
    } catch (error: any) {
      throw new Error(error.message || 'Google login failed');
    }
  }

  // Facebook Sign-In
  async loginWithFacebook() {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
      
      if (result.isCancelled) {
        throw new Error('User cancelled Facebook login');
      }
      
      const data = await AccessToken.getCurrentAccessToken();
      
      if (!data) {
        throw new Error('Failed to get Facebook access token');
      }
      
      const response = await this.apiClient.post('/auth/facebook', {
        accessToken: data.accessToken,
      });
      
      const { user, token } = response.data;
      this.setAuthToken(token);
      
      return { user, token };
    } catch (error: any) {
      throw new Error(error.message || 'Facebook login failed');
    }
  }

  // Update user profile
  async updateProfile(userData: Partial<User>) {
    try {
      const response = await this.apiClient.put('/auth/profile', userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }

  // Logout
  async logout() {
    try {
      await this.apiClient.post('/auth/logout');
      this.removeAuthToken();
      
      // Sign out from Google if signed in
      if (await GoogleSignin.isSignedIn()) {
        await GoogleSignin.signOut();
      }
      
      // Sign out from Facebook
      LoginManager.logOut();
    } catch (error: any) {
      // Even if API call fails, we should clear local auth
      this.removeAuthToken();
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  }

  // Refresh token
  async refreshToken() {
    try {
      const response = await this.apiClient.post('/auth/refresh');
      const { token } = response.data;
      this.setAuthToken(token);
      return token;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  }

  // Forgot password
  async forgotPassword(email: string) {
    try {
      await this.apiClient.post('/auth/forgot-password', { email });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send reset email');
    }
  }

  // Reset password
  async resetPassword(token: string, newPassword: string) {
    try {
      await this.apiClient.post('/auth/reset-password', {
        token,
        password: newPassword,
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  }
}

export default new AuthService();