import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist'; 
import storage from 'redux-persist/es/storage';
import Reducer from './Reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';

const config = {
    key: 'root',
    storage
}

const reducer = persistCombineReducers(config, Reducer);

const configureStore = (initState) => {
    let store = createStore(reducer, initState, composeWithDevTools(applyMiddleware(thunk)));
    let persistor = persistStore(store);

    return { persistor, store };
}

export default configureStore;