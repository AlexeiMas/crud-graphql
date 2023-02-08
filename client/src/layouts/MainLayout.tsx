import React from 'react'
import {Outlet} from "react-router-dom"
import Header from "../components/Header"
import {Container, createTheme, CssBaseline, PaletteMode, ThemeProvider} from "@mui/material"

const MainLayout = () => {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const darkTheme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Header mode={mode} setMode={setMode}/>
      <Container maxWidth={false}>
        <Outlet/>
      </Container>
    </ThemeProvider>
  )
}

export default MainLayout