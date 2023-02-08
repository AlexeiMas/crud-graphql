import React from 'react'
import {Backdrop, CircularProgress} from "@mui/material"

const BackdropLoader = () => {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: "black" }} open>
      <CircularProgress color="success" size={40} thickness={4} value={100} />
    </Backdrop>
  )
}

export default BackdropLoader