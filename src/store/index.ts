import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';

import authSlice from './slices/authSlice';
import taskSlice from './slices/taskSlice';
import chatSlice from './slices/chatSlice';

// Platform-specific storage
let storage;
try {
  // Try to import Platform from react-native
  const { Platform } = require('react-native');
  if (Platform.OS === 'web') {
    // Use localStorage for web
    const webStorage = require('../utils/storage.web.ts').default;
    storage = webStorage;
  } else {
    // Use AsyncStorage for React Native
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    storage = AsyncStorage;
  }
} catch {
  // Fallback to web storage if Platform is not available
  console.log('Using web storage fallback');
  const webStorage = require('../utils/storage.web.ts').default;
  storage = webStorage;
}

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['auth'], // Only persist auth state
};

const rootReducer = combineReducers({
  auth: authSlice,
  tasks: taskSlice,
  chat: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;