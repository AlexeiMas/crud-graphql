import React from 'react'
import {IconButton, Menu, MenuItem} from "@mui/material"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import {TModalState} from "../../types/modal"

export type IItemOptionsMenu = {
  idEntity: string
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  anchorEl: null | HTMLElement
  handleClose: () => void
  setIsModal: React.Dispatch<React.SetStateAction<TModalState>>
  setIsConfirmation: React.Dispatch<React.SetStateAction<TModalState>>
}

const ItemOptionsMenu = ({idEntity, handleClose, handleClick, anchorEl, setIsModal, setIsConfirmation}: IItemOptionsMenu) => {
  const open = (idEntity === anchorEl?.id);

  return (
    <>
      <IconButton
        id={idEntity}
        aria-label="options"
        aria-controls={open ? `item-menu-${idEntity}` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`item-menu-${idEntity}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': idEntity,
        }}
      >
        <MenuItem onClick={() => {
          handleClose()
          setIsModal({isOpen: true, idEntity: anchorEl?.id})
        }}>Edit</MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          setIsConfirmation({isOpen: true, idEntity: anchorEl?.id})
        }}>Remove</MenuItem>
      </Menu>
    </>
  )
}

export default ItemOptionsMenu