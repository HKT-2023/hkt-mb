import RootReducer from '../reducers/RootReducer';
import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import ReduxPersist from '../../config/ReduxPersist';
import createSagaMiddleware from 'redux-saga';
import RootSaga from '../sagas/RootSaga';

const persistedReducer = persistReducer(ReduxPersist.storeConfig, RootReducer);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(persistedReducer, applyMiddleware(...middlewares));
const runSaga = sagaMiddleware.run(RootSaga);
const persistor = persistStore(store);

export {store, persistor, runSaga};

export type TReduxState = ReturnType<typeof RootReducer>;
