import React from 'react'
import {AppBar, Box, Button, Container, IconButton, PaletteMode, Toolbar, useMediaQuery, useTheme} from "@mui/material"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import {Link, useLocation} from "react-router-dom"
import {DIRECTORS_ROUTE, MOVIES_ROUTE} from "../../routes/constants"

export type THeader = {
  mode: PaletteMode
  setMode: React.Dispatch<React.SetStateAction<PaletteMode>>
}

const Header = ({mode, setMode}: THeader) => {
  const {pathname} = useLocation()
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));

  const sizes = () => {
    if (desktop) return "large";
    if (tablet) return "medium";
    if (mobile) return "small";
  };

  return (
    <AppBar position="static">
      <Container maxWidth={false}>
        <Toolbar>
          <Box>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => setMode(prevState => prevState === 'light' ? 'dark' : 'light')}
              color="inherit"
            >
              {mode === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end"}}>
            <Button
              component={Link}
              to={'/'}
              size={sizes()}
              variant={pathname === MOVIES_ROUTE ? "contained" : "outlined"}
              color={"success"}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >Movies</Button>
            <Button
              component={Link}
              to={'/directors'}
              size={sizes()}
              variant={pathname === DIRECTORS_ROUTE ? "contained" : "outlined"}
              color={"success"}
              sx={{ my: 2, ml: mobile ? 1 : 2, color: 'white', display: 'block' }}
            >Directors</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header