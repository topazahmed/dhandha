import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, Message } from '../../types';
import chatService from '../../services/chatService';

const initialState: ChatState = {
  conversations: {},
  activeChat: null,
  unreadCount: 0,
};

// Async thunks
export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async (taskId: string) => {
    const response = await chatService.getMessages(taskId);
    return { taskId, messages: response };
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({
    taskId,
    receiverId,
    content,
  }: {
    taskId: string;
    receiverId: string;
    content: string;
  }) => {
    const response = await chatService.sendMessage(taskId, receiverId, content);
    return response;
  }
);

export const markMessagesAsRead = createAsyncThunk(
  'chat/markAsRead',
  async (taskId: string) => {
    await chatService.markMessagesAsRead(taskId);
    return taskId;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string | null>) => {
      state.activeChat = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      const taskId = message.taskId;
      
      if (!state.conversations[taskId]) {
        state.conversations[taskId] = [];
      }
      
      state.conversations[taskId].push(message);
      
      // Increment unread count if not in active chat
      if (state.activeChat !== taskId && !message.read) {
        state.unreadCount += 1;
      }
    },
    updateMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      const taskId = message.taskId;
      
      if (state.conversations[taskId]) {
        const index = state.conversations[taskId].findIndex(m => m.id === message.id);
        if (index !== -1) {
          state.conversations[taskId][index] = message;
        }
      }
    },
    clearChat: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;
      delete state.conversations[taskId];
    },
    clearAllChats: (state) => {
      state.conversations = {};
      state.activeChat = null;
      state.unreadCount = 0;
    },
    decrementUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = Math.max(0, state.unreadCount - action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch messages
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { taskId, messages } = action.payload;
        state.conversations[taskId] = messages;
        
        // Count unread messages if not in active chat
        if (state.activeChat !== taskId) {
          const unreadMessages = messages.filter((m: Message) => !m.read);
          state.unreadCount += unreadMessages.length;
        }
      })
      // Send message
      .addCase(sendMessage.fulfilled, (state, action) => {
        const message = action.payload;
        const taskId = message.taskId;
        
        if (!state.conversations[taskId]) {
          state.conversations[taskId] = [];
        }
        
        state.conversations[taskId].push(message);
      })
      // Mark messages as read
      .addCase(markMessagesAsRead.fulfilled, (state, action) => {
        const taskId = action.payload;
        
        if (state.conversations[taskId]) {
          let unreadCount = 0;
          state.conversations[taskId] = state.conversations[taskId].map(message => {
            if (!message.read) {
              unreadCount += 1;
              return { ...message, read: true };
            }
            return message;
          });
          
          // Decrease unread count
          state.unreadCount = Math.max(0, state.unreadCount - unreadCount);
        }
      });
  },
});

export const {
  setActiveChat,
  addMessage,
  updateMessage,
  clearChat,
  clearAllChats,
  decrementUnreadCount,
} = chatSlice.actions;

export default chatSlice.reducer;