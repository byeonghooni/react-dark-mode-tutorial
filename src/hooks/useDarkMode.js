import {useEffect, useState} from 'react';

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light');
  const [componentMounted, setComponentMounted] = useState(false);

  const setMode = mode => {
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

// https://css-tricks.com/a-dark-mode-toggle-with-react-and-themeprovider/

// window.matchMedia 메소드는 Media Queries Level 5 specification 이다.
// OS 설정이 lightMode or darkMode 브라우저에서 확인하는 속성이다.
// 브라우저 마다 지원 할수도 있고 안 할수도 있다.
// IE 10 이상, Edge, Firefox 6-, Chrome 9-, ... => 최신 브라우저 대부분 지원(Can I Use 에서 확인)
//
// < OS 설정이, darkMode 일 때 >
// window.matchMedia('(prefers-color-scheme: dark)');
// => MediaQueryList {media: "(prefers-color-scheme: dark)", matches: true, onchange: null}
// window.matchMedia('(prefers-color-scheme: light)');
// => MediaQueryList {media: "(prefers-color-scheme: light)", matches: false, onchange: null}
//
// < OS 설정이, lightMode 일 때 >
// window.matchMedia('(prefers-color-scheme: light)');
// => MediaQueryList {media: "(prefers-color-scheme: light)", matches: true, onchange: null}
// window.matchMedia('(prefers-color-scheme: dark)');
// => MediaQueryList {media: "(prefers-color-scheme: dark)", matches: false, onchange: null}
