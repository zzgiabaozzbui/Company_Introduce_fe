import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counterSlice"
import appGlobalReducer from "./appGlobal"
import roleReducer from "./role"
import activeKeyReducer from "./activeKey"
import customerDirectoryReducer from "./customerDirectory"
import courseReducer from "./course"
import commonReducer from "./common"
import requestOrderReducer from "./requestOrder"

export default configureStore({
  reducer: {
    counter: counterReducer,
    appGlobal: appGlobalReducer,
    role: roleReducer,
    activeKey: activeKeyReducer,
    customerDirectory: customerDirectoryReducer,
    common: commonReducer,
    course: courseReducer,
    requestOrder: requestOrderReducer,
  },
})
