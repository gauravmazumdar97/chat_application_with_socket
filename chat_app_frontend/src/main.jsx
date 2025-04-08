import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'


// Create MUI theme
const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={muiTheme}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ThemeProvider>
  </StrictMode>,
)
