import React from "react"

export type TModalState = {
  isOpen: boolean,
  idEntity?: string
}

export type TModalContext = {
  id: string
}

export type TDialog = {
  modalProps: TModalState,
  setModalProps: React.Dispatch<React.SetStateAction<TModalState>>
}