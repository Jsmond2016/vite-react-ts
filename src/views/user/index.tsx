import React from "react"
import { Outlet, Routes, Route, BrowserRouter } from "react-router-dom"

export default () => {
  return (
    <div className="user-container">
      <Outlet />
    </div>
  )
}
