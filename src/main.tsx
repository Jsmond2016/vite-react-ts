import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "@/assets/style/reset.css"
import "@/assets/style/gloab.scss"

const module = import.meta.glob("./mocks/browser.js")


if (process.env.NODE_ENV === "development") {
  module['./mocks/browser.js']().then(mod => {
    const { mocker } = mod as any;
    mocker.start();
  })
  
}



ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={ store }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
