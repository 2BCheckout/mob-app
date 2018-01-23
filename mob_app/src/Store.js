import { createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist'; 
import storage from 'redux-persist/es/storage';
import Reducer from './Reducer';

const config = {
    key: 'root',
    storage
}

const reducer = persistCombineReducers(config, Reducer);

const configureStore = (initState) => {
    let store = createStore(reducer, initState);
    let persistor = persistStore(store);

    return { persistor, store };
}

export default configureStore;