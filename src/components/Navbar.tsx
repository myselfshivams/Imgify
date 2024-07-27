import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

// Styled components
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

interface DropdownMenuProps {
  visible: boolean;
}

const DropdownMenu = styled.div<DropdownMenuProps>`
  position: absolute;
  top: 60px; /* Adjust based on your layout */
  right: 20px; /* Adjust based on your layout */
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  z-index: 1001;
`;

const DropdownItem = styled.div`
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 0, 0, 0.3);
  }
  
  &.logout {
    color: red;
  }
  
  & .icon {
    margin-right: 10px;
  }
`;

const Navbar: React.FC = () => {
  const [user, setUser] = useState<{ name?: string; profileImage?: string } | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSuccess = (credentialResponse: any) => {
    console.log('Login successful:', credentialResponse);

    // Check the structure of credentialResponse
    console.log('Credential Response:', credentialResponse);

    // Extract the user's name and profile picture from the credential response
    const userName = credentialResponse?.profileObj?.name || '';
    const profilePicture = credentialResponse?.profileObj?.picture || '';

    setUser({
      name: userName,
      profileImage: profilePicture || '/user.jpg', // Fallback to default image
    });
  };

  const handleError = () => {
    console.error('Login failed');
    // Handle login error
  };

  const handleLogout = () => {
    // Handle logout logic
    setUser(null);
    setDropdownVisible(false);
  };

  return (
    <NavbarContainer>
      <Logo>Imgify</Logo>
      {user ? (
        <ProfileButton
          style={{ backgroundImage: `url(${user.profileImage})` }}
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          {!user.profileImage && user.name ? user.name.charAt(0).toUpperCase() : ''}
        </ProfileButton>
      ) : (
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
      )}
      <DropdownMenu visible={dropdownVisible}>
        <DropdownItem onClick={() => console.log('Navigate to profile')}>
          <FontAwesomeIcon icon={faUser} className="icon" />
          My Profile
        </DropdownItem>
        <DropdownItem className="logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="icon" />
          Logout
        </DropdownItem>
      </DropdownMenu>
    </NavbarContainer>
  );
};

export default Navbar;