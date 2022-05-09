import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

body {

background: ${({ theme }) => theme.body};

color: ${({ theme }) => theme.text};

transition: all 0.2s linear;

}
::-webkit-scrollbar, textarea::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track, textarea::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.scrollTrack};
  }
  
  ::-webkit-scrollbar-thumb, textarea::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.scrollThumb};
  }
`