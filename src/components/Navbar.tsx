
import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.4);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
`;

const Logo = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 32px;
  color: #fff;
  transition: color 0.3s ease;
  &:hover {
    color: #ff4081;
  }
`;

const LoginButton = styled.button`
  font-family: 'Michroma', sans-serif;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: linear-gradient(45deg, #000000, #434343, #000000);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  &:hover {
    transform: scale(1.1);
    background: linear-gradient(45deg, #0f0f0f, #1e1e1e, #0f0f0f);
  }
  &:active {
    transform: scale(1);
  }
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Logo>Imgify</Logo>
      <LoginButton>Login</LoginButton>
    </NavbarContainer>
  );
};

export default Navbar;