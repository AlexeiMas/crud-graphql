import React from 'react'
import {useMutation, useQuery} from "@apollo/client"
import {GET_MOVIES} from "../../graphql/queries/movieQueries"
import {DEL_MOVIE} from "../../graphql/mutations/movieMutations"
import {DataGrid} from "@mui/x-data-grid"
import MovieDialog from "../../components/MovieDialog"
import {TModalContext} from "../../types/modal"
import ConfirmDialog from "../../components/ConfirmDialog"
import {columnsMovies, rowsMovies} from "../../features/movieCells"
import {useDialogs} from "../../hooks/useDialogs"
import TableOptionsBtn from "../../components/TableOptionsBtn"
import {TTableSearch} from "../../types/dataCells"

export default ({search}: TTableSearch) => {
  const {loading, error, data} = useQuery(GET_MOVIES, {
    variables: {
      name: search
    }
  })
  const [removeMovie] = useMutation(DEL_MOVIE, {
    update(cache, {data}) {
      if (data?.removeMovie) {
        cache.modify({
          fields: {
            movies(currentMovies: {__ref: string}[] = []) {
              return currentMovies.filter(movie => movie.__ref !== `Movie:${data.removeMovie?.id}`)
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
      await removeMovie({
        variables: {
          id: this.id
        }
      })
    }
    setIsConfirmation({isOpen: false})
  }, [removeMovie])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error! {error.message}</div>

  return (
    <>
      <MovieDialog modalProps={isModal} setModalProps={setIsModal}/>
      <ConfirmDialog id={isConfirmation.idEntity} isShown={isConfirmation.isOpen} handleClose={handleConfirmClose} />

      {
        data && data.movies &&
        <DataGrid
          columns={columnsMovies({anchorEl, handleClick, handleClose, setIsModal, setIsConfirmation})}
          rows={rowsMovies(data)}
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