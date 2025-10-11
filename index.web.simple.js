import React from 'react';
import { AppRegistry, View, Text, StyleSheet } from 'react-native';
import { Provider as PaperProvider, Button, Card, Title, Paragraph } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './src/store';

// Simple demo app for web testing
const DemoApp = () => {
  const [count, setCount] = React.useState(0);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Dhandha Task Marketplace</Title>
          <Paragraph>React Native Web Demo</Paragraph>
          <Text style={styles.text}>Counter: {count}</Text>
          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              onPress={() => setCount(count + 1)}
              style={styles.button}
            >
              Increment
            </Button>
            <Button 
              mode="outlined" 
              onPress={() => setCount(0)}
              style={styles.button}
            >
              Reset
            </Button>
          </View>
          <Text style={styles.description}>
            This is a simple demo showing React Native components running in the web browser.
            The full app includes authentication, task management, and real-time chat features.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <DemoApp />
      </PaperProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  button: {
    marginHorizontal: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 20,
  },
});

// Register the app
AppRegistry.registerComponent('DhandhaApp', () => App);

// Start the web app
if (typeof window !== 'undefined') {
  AppRegistry.runApplication('DhandhaApp', {
    initialProps: {},
    rootTag: document.getElementById('root'),
  });
}