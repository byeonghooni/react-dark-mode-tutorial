import {func, string} from 'prop-types';
import styled from 'styled-components';

import {ReactComponent as MoonIcon} from '../icons/moon.svg';
import {ReactComponent as SunIcon} from '../icons/sun.svg';


const Container = styled.button`
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  font-size: 0.5rem;
  margin: 0 auto;
  overflow: hidden;
  padding: 0.5rem;
  position: relative;
  width: 8rem;
  height: 4rem;
  
  svg {
    height: auto;
    width: 2.5rem;
    transition: all 0.3s linear;
    
    // sun
    &:first-child {
      transform: ${({ lightTheme }) => lightTheme ? 'translateY(0)' : 'translateY(100px)'};
    }
    
    // moon
    &:nth-child(2) {
      transform: ${({ lightTheme }) => lightTheme ? 'translateY(-100px)' : 'translateY(0)'};
    }
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  const isLight = theme === 'light';
  return (
    <Container lightTheme={isLight} onClick={toggleTheme}>
      <SunIcon/>
      <MoonIcon/>
    </Container>
  );
};


Toggle.prototype = {
  theme: string.isRequired,
  toggleTheme: func.isRequired
};

export default Toggle;
