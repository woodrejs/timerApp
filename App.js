import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {store} from './app/src/store/index';
import {Provider} from 'react-redux';
import TimerScreen from './app/src/modules/timer/TimerScreen';
import * as SQLiteActions from './app/src/services/sqlite';
import {BottomModalProvider} from './app/src/modules/modals/hooks/useBottomModal';

const App = () => {
  React.useEffect(() => {
    SQLiteActions.createTable();
  }, []);

  return (
    <Provider store={store}>
      <BottomModalProvider>
        <SafeAreaView>
          <TimerScreen />
        </SafeAreaView>
      </BottomModalProvider>
    </Provider>
  );
};

export default App;
