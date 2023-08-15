import {configureStore, createSlice} from '@reduxjs/toolkit'

const authSclice = createSlice({ // we are creating reducers
    name : "login",
    initialState:{isLoggedIn :false},
    reducers:{
        login(state){
            state.isLoggedIn = true
        },
        logout(state){
            localStorage.removeItem("userId")
            state.isLoggedIn = false
        },
    }
})

export const authActions = authSclice.actions  // we are creating actions

export const store = configureStore({ // we are creating store
     // only when we have one reducer
//     // otherwise reducer: {
//     login: counterReducer,
// }

reducer : authSclice .reducer
})