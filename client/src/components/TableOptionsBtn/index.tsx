import React from 'react'
import {Fab} from "@mui/material"

export type ITabOptionsBtn = {
  handleShowModal: () => void
}

const TableOptionsBtn = ({handleShowModal}: ITabOptionsBtn) => {
  return (
    <Fab
      color="primary" aria-label="add"
      sx={{position: "fixed", right: 16, bottom: 16, fontSize: 32}}
      onClick={handleShowModal}
    >+</Fab>
  )
}

export default TableOptionsBtn