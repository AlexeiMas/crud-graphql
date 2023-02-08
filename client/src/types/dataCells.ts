import React from "react"
import {DefaultComponentProps} from "@mui/material/OverridableComponent"
import {ListItemTypeMap} from "@mui/material"

export type TTableSearch = {
  search: string
}

export type TCellsMovieRow = {
  watched: boolean,
  rate: number | null | undefined,
  director: string | undefined,
  name: string,
  genre: string,
  id: string | null | undefined
} | null

export type TCellsDirectorRow = {
  name: string,
  age: number,
  movies: React.FunctionComponentElement<DefaultComponentProps<ListItemTypeMap<{button?: false | undefined}, "li">>>[] | undefined
  id: string | null | undefined
} | null
