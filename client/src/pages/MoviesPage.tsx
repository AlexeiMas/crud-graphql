import React from 'react'
import Movies from "../containers/Movies"
import {Box} from "@mui/material"
import SearchInput from "../components/SearchInput"
import {useSearch} from "../hooks/useSearch"

const MoviesPage = () => {
  const searchArgs = useSearch()
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} my={2}>
        <SearchInput {...searchArgs}/>
      </Box>
      <Movies search={searchArgs.defaultValue}/>
    </>
  )
}

export default MoviesPage