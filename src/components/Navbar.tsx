import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
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

const ProfileButton = styled.div`
  font-family: 'Michroma', sans-serif;
  padding: 8px 16px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(45deg, #000000, #434343, #000000);
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px; /* Adjust the width for the profile image */
  height: 50px; /* Adjust the height for the profile image */
  overflow: hidden;
  background-size: cover;
  background-position: center;
`;

const Navbar: React.FC = () => {
  const [user, setUser] = useState<{ name?: string; profileImage?: string } | null>(null);

  const handleSuccess = (credentialResponse: any) => {
    console.log('Login successful:', credentialResponse);

    // Extract the user's name from the credential response
    const userName = credentialResponse?.profile?.name || '';
    const firstNameInitial = userName.charAt(0).toUpperCase();

    // Fetch the profile image based on the initial
    const imageUrl = `/api/${firstNameInitial}`;

    setUser({
      name: userName,
      profileImage: imageUrl,
    });
  };

  const handleError = () => {
    console.error('Login failed');
    // Handle login error
  };

  return (
    <NavbarContainer>
      <Logo>Imgify</Logo>
      {user ? (
        <ProfileButton style={{ backgroundImage: `url(${user.profileImage})` }}>
          {user.name ? user.name.charAt(0).toUpperCase() : ''}
        </ProfileButton>
      ) : (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      )}
    </NavbarContainer>
  );
};

export default Navbar;