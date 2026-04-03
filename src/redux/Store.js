import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from './ExpenseSlice'
export const store = configureStore({
    reducer: {
        expense: expenseReducer
    }
})