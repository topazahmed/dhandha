import axios from 'axios';
import { Message } from '../types';

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL

class ChatService {
  private apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  // Set auth token for API requests
  setAuthToken(token: string) {
    this.apiClient.defaults.headers.Authorization = `Bearer ${token}`;
  }

  // Get messages for a task
  async getMessages(taskId: string): Promise<Message[]> {
    try {
      const response = await this.apiClient.get(`/chat/messages/${taskId}`);
      return response.data.messages;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch messages');
    }
  }

  // Send a message
  async sendMessage(taskId: string, receiverId: string, content: string): Promise<Message> {
    try {
      const response = await this.apiClient.post('/chat/messages', {
        taskId,
        receiverId,
        content,
      });
      return response.data.message;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to send message');
    }
  }

  // Mark messages as read
  async markMessagesAsRead(taskId: string): Promise<void> {
    try {
      await this.apiClient.put(`/chat/messages/${taskId}/read`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to mark messages as read');
    }
  }

  // Get all conversations for a user
  async getConversations(): Promise<any[]> {
    try {
      const response = await this.apiClient.get('/chat/conversations');
      return response.data.conversations;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch conversations');
    }
  }

  // Get unread message count
  async getUnreadCount(): Promise<number> {
    try {
      const response = await this.apiClient.get('/chat/unread-count');
      return response.data.count;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch unread count');
    }
  }

  // Delete a message
  async deleteMessage(messageId: string): Promise<void> {
    try {
      await this.apiClient.delete(`/chat/messages/${messageId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete message');
    }
  }
}

export default new ChatService();