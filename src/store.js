import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/users/userSlice";
import cartReducer from "./features/cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Gabungkan semua reducer menggunakan combineReducers
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

// Konfigurasi persist
const persistConfig = {
  key: "root",
  storage,
};

// Bungkus rootReducer dengan persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Konfigurasi store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Ekspor persistor
export const persistor = persistStore(store);
