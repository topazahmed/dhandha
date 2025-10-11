import axios from 'axios';
import { Task, TaskCategory, TaskStatus } from '../types';

const API_BASE_URL = 'http://localhost:3000/api'; // Update with your backend URL

class TaskService {
  private apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  // Set auth token for API requests
  setAuthToken(token: string) {
    this.apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Get tasks with optional filters
  async getTasks(params?: {
    category?: TaskCategory;
    latitude?: number;
    longitude?: number;
    radius?: number;
    maxBudget?: number;
    status?: TaskStatus;
    page?: number;
    limit?: number;
  }) {
    try {
      const response = await this.apiClient.get('/tasks', { params });
      return response.data.tasks;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  }

  // Get task by ID
  async getTaskById(id: string) {
    try {
      const response = await this.apiClient.get(`/tasks/${id}`);
      return response.data.task;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch task');
    }
  }

  // Create new task
  async createTask(taskData: Omit<Task, 'id' | 'posterId' | 'poster' | 'createdAt' | 'updatedAt'>) {
    try {
      const response = await this.apiClient.post('/tasks', taskData);
      return response.data.task;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  }

  // Update task
  async updateTask(id: string, updates: Partial<Task>) {
    try {
      const response = await this.apiClient.put(`/tasks/${id}`, updates);
      return response.data.task;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  }

  // Delete task
  async deleteTask(id: string) {
    try {
      await this.apiClient.delete(`/tasks/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  }

  // Accept task
  async acceptTask(id: string) {
    try {
      const response = await this.apiClient.post(`/tasks/${id}/accept`);
      return response.data.task;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to accept task');
    }
  }

  // Complete task
  async completeTask(id: string) {
    try {
      const response = await this.apiClient.post(`/tasks/${id}/complete`);
      return response.data.task;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to complete task');
    }
  }

  // Cancel task
  async cancelTask(id: string) {
    try {
      const response = await this.apiClient.post(`/tasks/${id}/cancel`);
      return response.data.task;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to cancel task');
    }
  }

  // Get tasks by user (posted tasks)
  async getUserTasks(userId: string) {
    try {
      const response = await this.apiClient.get(`/tasks/user/${userId}`);
      return response.data.tasks;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user tasks');
    }
  }

  // Get accepted tasks by user
  async getAcceptedTasks(userId: string) {
    try {
      const response = await this.apiClient.get(`/tasks/accepted/${userId}`);
      return response.data.tasks;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch accepted tasks');
    }
  }

  // Search tasks
  async searchTasks(query: string, filters?: {
    category?: TaskCategory;
    latitude?: number;
    longitude?: number;
    radius?: number;
    maxBudget?: number;
  }) {
    try {
      const response = await this.apiClient.get('/tasks/search', {
        params: { q: query, ...filters },
      });
      return response.data.tasks;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to search tasks');
    }
  }

  // Upload task images
  async uploadTaskImages(taskId: string, images: FormData) {
    try {
      const response = await this.apiClient.post(
        `/tasks/${taskId}/images`,
        images,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.images;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to upload images');
    }
  }

  // Get task statistics for admin
  async getTaskStats() {
    try {
      const response = await this.apiClient.get('/tasks/stats');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch task statistics');
    }
  }
}

export default new TaskService();