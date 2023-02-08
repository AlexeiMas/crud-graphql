import React from 'react'
import {useSearch} from "../hooks/useSearch"
import {Box} from "@mui/material"
import SearchInput from "../components/SearchInput"
import Directors from "../containers/Directors"

const DirectorsPage = () => {
  const searchArgs = useSearch()

  return (
    <>
      <Box display={"flex"} justifyContent={"center"} my={2}>
        <SearchInput {...searchArgs}/>
      </Box>
      <Directors search={searchArgs.defaultValue}/>
    </>
  )
}

export default DirectorsPage