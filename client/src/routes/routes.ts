// import MoviesPage from "../pages/MoviesPage"
// import DirectorsPage from "../pages/DirectorsPage"
import {DIRECTORS_ROUTE, MOVIES_ROUTE} from "./constants"
import React from "react"

export type TRoutes = {
  path: string
  Component: React.LazyExoticComponent<() => JSX.Element>
}

const MoviesPage = React.lazy(() => import("../pages/MoviesPage"))
const DirectorsPage = React.lazy(() => import("../pages/DirectorsPage"))

export const publicRoutes: TRoutes[] = [
  {
    path: MOVIES_ROUTE,
    Component: MoviesPage
  },
  {
    path: DIRECTORS_ROUTE,
    Component: DirectorsPage
  }
]