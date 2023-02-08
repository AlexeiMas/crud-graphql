import {GetAllMoviesQuery} from "../graphql/__generated__/graphql"
import {GridColDef} from "@mui/x-data-grid"
import React from "react"
import {TCellsMovieRow} from "../types/dataCells"
import {Rating} from "@mui/material"
import ItemOptionsMenu, {IItemOptionsMenu} from "../components/ItemOptionsMenu"

const columnsMovies = ({...props}: Omit<IItemOptionsMenu, "idEntity">): GridColDef[] => [
  {
    field: "name",
    headerName: "Title",
    flex: 2,
    minWidth: 150
  },
  {
    field: "genre",
    headerName: "Genre",
    flex: 1,
    minWidth: 120
  },
  {
    field: "rate",
    headerName: "Rate",
    flex: 1,
    minWidth: 135,
    renderCell: (params) => React.createElement(Rating, {
      name: "rating",
      value: params.value,
      readOnly: true
    })
},
{
  field: "director",
    headerName: "Director",
  flex: 1,
  minWidth: 150
},
{
  field: "watched",
    headerName: "Watched",
  flex: 2,
  minWidth: 80,
  type: "boolean"
},
{
  field: " ",
    sortable: false,
  width: 70,
  renderCell: (params) => {
    const idEntity = String(params.id)
    return React.createElement(ItemOptionsMenu, {
      idEntity,
      ...props
    })
  }
}
]

const rowsMovies = (data:  GetAllMoviesQuery | undefined): TCellsMovieRow[] => {
  if (data?.movies && data.movies.length > 0) {
    return data.movies.map(el => el &&
      ({
        id: el.id, name: el.name,
        genre: el.genre,
        rate: el.rate,
        director: el.director?.name,
        watched: el.watched
      })
    )
  }
  return []
}

export {
  columnsMovies,
  rowsMovies
}