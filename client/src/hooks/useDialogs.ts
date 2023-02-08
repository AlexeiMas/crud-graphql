import React, {useState} from "react"
import {TModalState} from "../types/modal"

type TUseDialogs =
  Record<"isModal" | "isConfirmation", TModalState> &
  Record<"setIsModal" | "setIsConfirmation", React.Dispatch<React.SetStateAction<TModalState>>> &
  Record<"handleClose" | "handleShowModal", () => void > &
  {
    anchorEl: null | HTMLElement
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  }

export const useDialogs = (): TUseDialogs => {
  const [isModal, setIsModal] = useState<TModalState>({isOpen: false})
  const [isConfirmation, setIsConfirmation] = useState<TModalState>({isOpen: false})

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const handleShowModal = () => setIsModal({isOpen: true})

  return {
    isModal,
    setIsModal,
    isConfirmation,
    setIsConfirmation,
    anchorEl,
    handleClick,
    handleClose,
    handleShowModal
  }
}