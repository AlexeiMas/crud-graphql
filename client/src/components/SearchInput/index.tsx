import React from 'react'
import { styled, alpha } from '@mui/material/styles';
import {InputBase} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

export interface ISearchInput {
  defaultValue: string
  onChange: (e:  React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement> & { target: HTMLInputElement }) => void
}

const SearchInput = ({...props}: ISearchInput) => {
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid rgba(0, 0, 0, 0.23)',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      border: '1px solid rgba(0, 0, 0, 1)'
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up("sm")]: {
        width: '70ch',
      },
      [theme.breakpoints.up('md')]: {
        width: '70ch',
        '&:focus': {
          width: '100ch',
        },
      },
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        type={"Search"}
        placeholder="Search title or name…"
        inputProps={{ 'aria-label': 'search' }}
        {...props}
      />
    </Search>
  )
}

export default SearchInput