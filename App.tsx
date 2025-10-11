/**
 * Dhandha - Task Marketplace App
 * https://github.com/topazahmed/dhandha
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import { store, persistor } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import LoadingScreen from './src/screens/LoadingScreen';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <PaperProvider>
          <RootNavigator />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
