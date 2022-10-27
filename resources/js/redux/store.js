import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import thunk from "redux-thunk";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const rootPersitConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    userSlice: userReducer,
});
const persistedReducer = persistReducer(rootPersitConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});
export const persistor = persistStore(store);
