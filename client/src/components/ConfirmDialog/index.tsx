import React from 'react'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import DoDisturbIcon from '@mui/icons-material/DoDisturb'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import {TModalContext} from "../../types/modal"

export type TConfirmDialog = {
  id?: string
  isShown: boolean
  handleClose(this: TModalContext | void, confirmed: boolean): void
}

export default ({id, isShown, handleClose}: TConfirmDialog) => {
  return (
    <Dialog open={!!id || isShown} onClose={handleClose.bind(void 0, false)} fullWidth>
      <DialogTitle style={{ cursor: 'move' }} id={`confirm-dialog-${id}`}>
        Are you sure that you want to delete element?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{visibility: id ? "visible" : "hidden"}}>
          If you click 'CONFIRM' button, element with id <br/><strong>[{id}]</strong><br/>will be removed from database.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant={"contained"} color={"secondary"} autoFocus onClick={handleClose.bind(void 0,false)} startIcon={<DoDisturbIcon/>}>
          Cancel
        </Button>
        <Button variant={"contained"} color={"warning"} onClick={id ? handleClose.bind({id}, true) : void 0} startIcon={<DeleteForeverIcon/>}>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}
