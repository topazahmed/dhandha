import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TaskState, Task, TaskCategory } from '../../types';
import taskService from '../../services/taskService';

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  loading: false,
  error: null,
  filters: {},
};

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (params?: {
    category?: TaskCategory;
    latitude?: number;
    longitude?: number;
    radius?: number;
    maxBudget?: number;
  }) => {
    const response = await taskService.getTasks(params);
    return response;
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: Omit<Task, 'id' | 'posterId' | 'poster' | 'createdAt' | 'updatedAt'>) => {
    const response = await taskService.createTask(taskData);
    return response;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }) => {
    const response = await taskService.updateTask(id, updates);
    return response;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId: string) => {
    await taskService.deleteTask(taskId);
    return taskId;
  }
);

export const acceptTask = createAsyncThunk(
  'tasks/acceptTask',
  async (taskId: string) => {
    const response = await taskService.acceptTask(taskId);
    return response;
  }
);

export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (taskId: string) => {
    const response = await taskService.completeTask(taskId);
    return response;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    setFilters: (state, action: PayloadAction<TaskState['filters']>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearError: (state) => {
      state.error = null;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
    },
    updateTaskInList: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    removeTaskFromList: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      // Create task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.unshift(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create task';
      })
      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      })
      // Delete task
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
        if (state.selectedTask?.id === action.payload) {
          state.selectedTask = null;
        }
      })
      // Accept task
      .addCase(acceptTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      })
      // Complete task
      .addCase(completeTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.selectedTask?.id === action.payload.id) {
          state.selectedTask = action.payload;
        }
      });
  },
});

export const {
  setSelectedTask,
  setFilters,
  clearFilters,
  clearError,
  addTask,
  updateTaskInList,
  removeTaskFromList,
} = taskSlice.actions;

export default taskSlice.reducer;