import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {store} from './app/src/store/index';
import {Provider} from 'react-redux';
import TimerScreen from './app/src/modules/timer/TimerScreen';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <TimerScreen />
      </SafeAreaView>
    </Provider>
  );
};

export default App;
