import {ThemeProvider} from 'styled-components';
import {darkTheme, lightTheme} from './styles/theme';
import {GlobalStyles} from './styles/global';
import Toggle from './components/Toggle';
import {useDarkMode} from './hooks/useDarkMode';

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />
  }

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles/>
        <Toggle theme={theme} toggleTheme={toggleTheme}/>
        <h1>It's a {theme === 'light' ? 'light theme' : 'dark theme'}!</h1>
        <footer>
          <span>Credits:</span>
          <small><b>Sun</b> icon made by <a
            href="https://www.flaticon.com/authors/smalllikeart">smalllikeart</a> from <a
            href="https://www.flaticon.com">www.flaticon.com</a></small>
          <small><b>Moon</b> icon made by <a href="https://www.freepik.com/home">Freepik</a> from <a
            href="https://www.flaticon.com">www.flaticon.com</a></small>
        </footer>
      </>
    </ThemeProvider>
  );
}

export default App;
