import { createStore } from "redux";
import rootReducer from "./root-reducer";
import { composeWithDevTools } from 'redux-devtools-extension'
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(store);