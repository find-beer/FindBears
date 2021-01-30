/*
 * @Descripttion : 
 * @Autor        : 刘振利
 * @Date         : 2021-01-17 21:36:18
 * @LastEditTime : 2021-01-23 18:44:04
 * @FilePath     : /src/redux/store/index.js
 */
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../reducers';
import AxiosCreator from '../middlewares/axios';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const middlewares = [
  AxiosCreator({
    baseURL: 'http://121.89.223.103:8080/',
    timeout: 5 * 1000,
  }),
];

const persistedReducer = persistReducer(persistConfig, reducers)

export default initState => {
  const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
  const store = createStore(persistedReducer, initState, composeEnhancers(applyMiddleware(...middlewares)))
  const persistor = persistStore(store)
  return {
    store,
    persistor
  };
};

