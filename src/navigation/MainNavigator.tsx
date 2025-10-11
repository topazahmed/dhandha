import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { RootState } from '../store';
import { UserRole } from '../types';

// Import screens (we'll create these)
import TaskListScreen from '../screens/tasks/TaskListScreen';
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen';
import CreateTaskScreen from '../screens/tasks/CreateTaskScreen';
import MyTasksScreen from '../screens/tasks/MyTasksScreen';
import ChatListScreen from '../screens/chat/ChatListScreen';
import ChatScreen from '../screens/chat/ChatScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';

export type MainTabParamList = {
  TaskStack: undefined;
  MyTasks: undefined;
  Chat: undefined;
  Profile: undefined;
  Admin?: undefined;
};

export type TaskStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  CreateTask: undefined;
};

export type ChatStackParamList = {
  ChatList: undefined;
  Chat: { taskId: string; receiverId: string; receiverName: string };
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const TaskStack = createNativeStackNavigator<TaskStackParamList>();
const ChatStack = createNativeStackNavigator<ChatStackParamList>();

const TaskStackNavigator: React.FC = () => {
  return (
    <TaskStack.Navigator>
      <TaskStack.Screen 
        name="TaskList" 
        component={TaskListScreen}
        options={{ title: 'Available Tasks' }}
      />
      <TaskStack.Screen 
        name="TaskDetail" 
        component={TaskDetailScreen}
        options={{ title: 'Task Details' }}
      />
      <TaskStack.Screen 
        name="CreateTask" 
        component={CreateTaskScreen}
        options={{ title: 'Create New Task' }}
      />
    </TaskStack.Navigator>
  );
};

const ChatStackNavigator: React.FC = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen 
        name="ChatList" 
        component={ChatListScreen}
        options={{ title: 'Messages' }}
      />
      <ChatStack.Screen 
        name="Chat" 
        component={ChatScreen}
        options={({ route }) => ({ title: route.params.receiverName })}
      />
    </ChatStack.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { unreadCount } = useSelector((state: RootState) => state.chat);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === 'TaskStack') {
            iconName = 'work';
          } else if (route.name === 'MyTasks') {
            iconName = 'assignment';
          } else if (route.name === 'Chat') {
            iconName = 'chat';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          } else if (route.name === 'Admin') {
            iconName = 'admin-panel-settings';
          } else {
            iconName = 'help';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="TaskStack" 
        component={TaskStackNavigator}
        options={{ title: 'Tasks' }}
      />
      <Tab.Screen 
        name="MyTasks" 
        component={MyTasksScreen}
        options={{ title: 'My Tasks' }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatStackNavigator}
        options={{ 
          title: 'Chat',
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
      {user?.role === UserRole.SUPER_ADMIN && (
        <Tab.Screen 
          name="Admin" 
          component={AdminDashboardScreen}
          options={{ title: 'Admin' }}
        />
      )}
    </Tab.Navigator>
  );
};

export default MainNavigator;