import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {store} from './app/src/store/index';
import {Provider} from 'react-redux';
import TimerScreen from './app/src/modules/timer/TimerScreen';
import * as SQLiteActions from './app/src/services/sqlite';

const App = () => {
  React.useEffect(() => {
    SQLiteActions.createTable();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView>
        <TimerScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
