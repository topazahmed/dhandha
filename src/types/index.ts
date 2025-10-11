export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  JOB_POSTER = 'job_poster',
  JOB_ACCEPTER = 'job_accepter'
}

export enum TaskStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum TaskCategory {
  DELIVERY = 'delivery',
  CLEANING = 'cleaning',
  TUTORING = 'tutoring',
  HANDYMAN = 'handyman',
  PHOTOGRAPHY = 'photography',
  WRITING = 'writing',
  DESIGN = 'design',
  OTHER = 'other'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  profileImage?: string;
  phoneNumber?: string;
  address?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  rating?: number;
  totalTasks?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  budget: number;
  currency: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  deadline?: string;
  images?: string[];
  status: TaskStatus;
  posterId: string;
  poster: User;
  accepterId?: string;
  accepter?: User;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  taskId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Deal {
  id: string;
  taskId: string;
  posterId: string;
  accepterId: string;
  agreedBudget: number;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  loading: boolean;
  error: string | null;
  filters: {
    category?: TaskCategory;
    maxBudget?: number;
    radius?: number;
  };
}

export interface ChatState {
  conversations: { [taskId: string]: Message[] };
  activeChat: string | null;
  unreadCount: number;
}