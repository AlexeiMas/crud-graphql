import React from 'react'
import {useMutation, useQuery} from "@apollo/client"
import {GET_DIRECTORS} from "../../graphql/queries/directorQueries"
import {DEL_DIRECTOR} from "../../graphql/mutations/directorMutations"
import {DataGrid} from "@mui/x-data-grid"
import {TTableSearch} from "../../types/dataCells"
import {useDialogs} from "../../hooks/useDialogs"
import ConfirmDialog from "../../components/ConfirmDialog"
import {TModalContext} from "../../types/modal"
import TableOptionsBtn from "../../components/TableOptionsBtn"
import DirectorDialog from "../../components/DirectorDialog"
import {columnsDirectors, rowsDirectors} from "../../features/directorCells"

export default ({search}: TTableSearch) => {
  const {loading, error, data} = useQuery(GET_DIRECTORS, {
    variables: {
      name: search
    }
  })

  const [removeDirector] = useMutation(DEL_DIRECTOR, {
    update(cache, {data}) {
      if (data?.removeDirector) {
        cache.modify({
          fields: {
            directors(currentDirectors: {__ref: string}[] = []) {
              return currentDirectors.filter(director => director.__ref !== `Director:${data.removeDirector?.id}`)
            }
          }
        })
      }
    }
  })


  const {
    isModal, setIsModal,
    isConfirmation, setIsConfirmation,
    anchorEl, handleClick,
    handleClose, handleShowModal
  } = useDialogs()

  const handleConfirmClose = React.useCallback(async function(this: TModalContext, confirmed: boolean) {
    if (confirmed && this.id) {
      await removeDirector({
        variables: {
          id: this.id
        }
      })
    }
    setIsConfirmation({isOpen: false})
  }, [removeDirector])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  return (
    <>
      <DirectorDialog modalProps={isModal} setModalProps={setIsModal}/>
      <ConfirmDialog id={isConfirmation.idEntity} isShown={isConfirmation.isOpen} handleClose={handleConfirmClose} />

      {
        data && data.directors &&
        <DataGrid
          columns={columnsDirectors({anchorEl, handleClick, handleClose, setIsModal, setIsConfirmation})}
          rows={rowsDirectors(data)}
          pageSize={50}
          autoHeight
          getRowHeight={() => 'auto'}
          showCellRightBorder
          showColumnRightBorder
          hideFooterSelectedRowCount
          disableSelectionOnClick
          disableColumnMenu
          disableExtendRowFullWidth
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
            mb: 3
          }}
        />
      }

      <TableOptionsBtn handleShowModal={handleShowModal}/>
    </>
  )
};