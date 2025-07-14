import { FaMoon, FaRegMoon } from "react-icons/fa";
import { useColorTheme } from "../theme/ColorThemeProvider";
import styled from "styled-components";

export const HEIGHT_HEADER = 80;
const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.color.elements};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  height: ${HEIGHT_HEADER}px;
  /* margin-bottom: 2rem; */

  h1 {
    margin: 0;
  }
  @media (max-width: 1024px) {
    h1 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.25rem;
    }
  }

  @media (max-width: 375px) {
    h1 {
      font-size: 1rem;
    }
  }
`;

const ToggleColorThemenButton = styled.button`
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
`;

export default function Header() {
  const {theme, toggleTheme} = useColorTheme();
  return (
    <HeaderContainer>
      <h1>Where in the word?</h1>
      <ToggleColorThemenButton onClick={toggleTheme}>
        {theme === "light" ? <FaRegMoon /> : <FaMoon />}
        <span>Dark Mode</span>
      </ToggleColorThemenButton>
    </HeaderContainer>
  )
}