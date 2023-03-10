import React from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "./index.css"
import { RecoilRoot } from "recoil"

import { QueryClient, QueryClientProvider } from "react-query"
const container = document.getElementById("root")

const root = createRoot(container)
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
