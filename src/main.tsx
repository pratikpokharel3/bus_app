import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"

import { router } from "routes/index"
import { store } from "store/index"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ReduxProvider store={store}>
    <RouterProvider router={router} />
  </ReduxProvider>
  // </React.StrictMode>
)
