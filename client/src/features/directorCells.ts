import {GetAllDirectorsQuery} from "../graphql/__generated__/graphql"
import {GridColDef} from "@mui/x-data-grid"
import React from "react"
import {TCellsDirectorRow} from "../types/dataCells"
import {List, ListItem} from "@mui/material"
import ItemOptionsMenu, {IItemOptionsMenu} from "../components/ItemOptionsMenu"

const columnsDirectors = ({...props}: Omit<IItemOptionsMenu, "idEntity">): GridColDef[] => [
  {
    field: "name",
    headerName: "Name",
    flex: 2,
    minWidth: 150
  },
  {
    field: "age",
    headerName: "Age",
    flex: 1,
    minWidth: 70
  },
  {
    field: "movies",
    headerName: "Movies",
    flex: 2,
    minWidth: 350,
    renderCell: (params) => React.createElement(List, {
      sx: {listStyleType: "decimal", paddingLeft: 1}
    }, params.value)
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

const rowsDirectors = (data: GetAllDirectorsQuery | undefined): TCellsDirectorRow[] => {
  if (data?.directors && data.directors.length > 0) {
    return data.directors.map(el => el &&
      ({
        id: el.id,
        name: el.name,
        age: el.age,
        movies: el.movies?.map(item => React.createElement(ListItem, {
          key: item?.id,
          sx: {display: 'list-item'}
        }, item?.name))
      })
    )
  }
  return []
}

export {
  columnsDirectors,
  rowsDirectors
}