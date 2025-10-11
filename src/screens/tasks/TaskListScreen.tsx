import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Chip,
  FAB,
  Searchbar,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { AppDispatch, RootState } from '../../store';
import { fetchTasks, setFilters } from '../../store/slices/taskSlice';
import { Task, TaskCategory, UserRole } from '../../types';

const TaskListScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, filters } = useSelector((state: RootState) => state.tasks);
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTasks());
    setRefreshing(false);
  };

  const handleTaskPress = (task: Task) => {
    navigation.navigate('TaskDetail', { taskId: task.id });
  };

  const handleCreateTask = () => {
    if (user?.role === UserRole.JOB_POSTER || user?.role === UserRole.SUPER_ADMIN) {
      navigation.navigate('CreateTask');
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTask = ({ item }: { item: Task }) => (
    <Card style={styles.taskCard} onPress={() => handleTaskPress(item)}>
      <Card.Content>
        <View style={styles.taskHeader}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Chip mode="outlined" style={styles.categoryChip}>
            {item.category}
          </Chip>
        </View>
        
        <Text style={styles.taskDescription} numberOfLines={2}>
          {item.description}
        </Text>
        
        <View style={styles.taskFooter}>
          <Text style={styles.budget}>
            ${item.budget} {item.currency}
          </Text>
          <Text style={styles.location}>
            {item.location.address}
          </Text>
        </View>
        
        <View style={styles.posterInfo}>
          <Text style={styles.posterName}>
            Posted by: {item.poster.firstName} {item.poster.lastName}
          </Text>
          <Text style={styles.postDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  const canCreateTask = user?.role === UserRole.JOB_POSTER || user?.role === UserRole.SUPER_ADMIN;

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search tasks..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      
      <FlatList
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks available</Text>
            {canCreateTask && (
              <Button
                mode="contained"
                onPress={handleCreateTask}
                style={styles.createButton}
              >
                Create Your First Task
              </Button>
            )}
          </View>
        }
      />
      
      {canCreateTask && (
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={handleCreateTask}
          label="Create Task"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchbar: {
    margin: 16,
    elevation: 2,
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  taskCard: {
    marginBottom: 16,
    elevation: 2,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  categoryChip: {
    marginLeft: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  budget: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  location: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
    textAlign: 'right',
  },
  posterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  posterName: {
    fontSize: 12,
    color: '#666666',
  },
  postDate: {
    fontSize: 12,
    color: '#666666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 20,
  },
  createButton: {
    marginTop: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TaskListScreen;