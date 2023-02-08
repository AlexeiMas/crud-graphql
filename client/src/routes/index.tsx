import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {publicRoutes} from "./routes"
import MainLayout from "../layouts/MainLayout"
import BackdropLoader from "../components/BackdropLoader"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          {publicRoutes.map(({path, Component}) =>
            <Route key={path} path={path} element={
              <React.Suspense fallback={<BackdropLoader/>}>
                <Component/>
              </React.Suspense>
            }/>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router