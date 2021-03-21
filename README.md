## React 프로젝트에서 Dark Mode 사용하기

### 목차

- theme 별 스타일 코드 관리(light, dark)
- 루트 컴포넌트(theme 변경 기준)에서 dark, light를 state 로 관리
- theme 전환용 hook 사용하기
- window.matchMedia 이해하기
- 참고


### theme 별 스타일 코드 관리(light, dark)

```js
// src/styles/theme.js

export const lightTheme = {
  body: '#E2E2E2',
  text: '#363537',
  toggleBorder: '#FFF',
  gradient: 'linear-gradient(#39598A, #79D7ED)',
};

export const darkTheme = {
  body: '#363537',
  text: '#FAFAFA',
  toggleBorder: '#6B8096',
  gradient: 'linear-gradient(#091236, #1E215D)',
} 
```

### 루트 컴포넌트(theme 변경 기준)에서 dark, light를 state 로 관리

```js
// src/App.js

...

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div/>
  }

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles/>
        <Toggle theme={theme} toggleTheme={toggleTheme}/>
        ...
    </ThemeProvider>
);
}
```

### theme 전환용 hook 사용하기

```js
// src/hooks/useDarkMode.js
   
import {useEffect, useState} from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = mode => {
    // localStorage 로 관리(세션 유지)
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');

    if (localTheme) {
      setTheme(localTheme)
    } else {
      // OS 설정(light or dark)여부 확인
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }

    // useDarkMode를 사용하는 컴포넌트가 완전히 마운트된 후 사용하기 위해서,
    // 사용하는 컴포넌트에서는 마운트 되지 않았을 때, 빈 html 조각 던지기
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted];
};
  ```

### window.matchMedia 이해하기

`window.matchMedia` 메소드는 `Media Queries Level 5 specification` 이다.  
OS 테마(lightMode or darkMode)를 브라우저에서 확인하는 속성이다.

브라우저 마다 지원 할수도 있고 안 할수도 있다.  
최신 브라우저 대부분 지원한다.(`IE 10 이상`, `Edge`, `Firefox 6-`, `Chrome 9-`, ..)  
`Can I Use` 에서 확인해서 사용하면 될거 같다.   

<br />

`OS 설정이, dark 일 때`
```
window.matchMedia('(prefers-color-scheme: dark)');
// MediaQueryList {media: "(prefers-color-scheme: dark)", matches: true, onchange: null}

window.matchMedia('(prefers-color-scheme: light)');
// MediaQueryList {media: "(prefers-color-scheme: light)", matches: false, onchange: null}
```


`OS 설정이, light 일 때`
```
window.matchMedia('(prefers-color-scheme: light)');
// MediaQueryList {media: "(prefers-color-scheme: light)", matches: true, onchange: null}

window.matchMedia('(prefers-color-scheme: dark)');
// MediaQueryList {media: "(prefers-color-scheme: dark)", matches: false, onchange: null}
```

### 참고

- [css-tricks](https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/)
