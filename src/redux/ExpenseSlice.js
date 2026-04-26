import { createSlice } from "@reduxjs/toolkit";
import { client } from "../config/supabase";

import React, { act } from 'react'

const expense = createSlice({
    name: "expense Slice",
    initialState: {
        list: []
    },
    reducers: {
        addExpense: (state, action) => {
            state.list.unshift(action.payload)
        },
        removeExpense: (state, action) => {
            state.list = state.list.filter(exp => exp.id !== action.payload)
        },
        updateExpense: (state, action) => {
            state.list = state.list.map(exp =>
                exp.id === action.payload.id ? action.payload : exp
            );
        },
        setExpense: (state, action) => {
            state.list = action.payload
        }
    }
})

export const { setExpense, addExpense, removeExpense, updateExpense, totalExpense } = expense.actions
export default expense.reducer
