// é o arquivo que vai disponibilizar o meu estado global/reducers
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from './modules/userSlice';
import loggedUserSlice from './modules/loggedLocalSlice';
import { useDispatch } from 'react-redux';

const usersStorageConfig = {
    key: 'users',
    storage,  
};
const loggedUserConfig = {
    key: 'loggedLocalUser',
    storage,  
};

const usersReducer = persistReducer(usersStorageConfig, userSlice);
const loggedUserReducer = persistReducer(loggedUserConfig, loggedUserSlice);

const store = configureStore({
    reducer: {
        users: usersReducer,
        loggedUser: loggedUserReducer,
    },
    
});
const persistor = persistStore(store);
export type UserStore = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useStoreDispatch: () => UserStore = useDispatch;
export { store, persistor };
