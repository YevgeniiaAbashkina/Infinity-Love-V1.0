import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import auth from "./authReducer";
import appReducer from "./appReducer/appReducer";
import  userReducer  from "./userReducer/userReducer";
import childReducer from "./childReducer/childReducer";
import pediatrReducer from "./pediatrReducer/pediatrReducer";
import entertainmentReducer from "./entertainmentReducer/entertainmentReducer";


const rootReducer = combineReducers({
    app: appReducer,
    auth,
    user: userReducer,
    child: childReducer,
    pediatr: pediatrReducer,
    entertainment: entertainmentReducer,
    
})

const store = configureStore({reducer: rootReducer});

export default store;