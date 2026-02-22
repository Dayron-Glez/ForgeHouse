import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slices/authSlice";
import profileReducer from "@/features/profile/slices/profileSlice";
import bmiReducer from "@/features/bmi/slices/bmiSlice";
import appointmentReducer from "@/features/appointments/slices/appointmentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    bmi: bmiReducer,
    appointments: appointmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
