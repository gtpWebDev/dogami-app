import { useState } from "react";

import AuthService from "../../lib/AuthService";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

import NavBarBreadcrumbs from "../composites/Breadcrumbs";

import { ConsumableTooltip } from "../styledComponents/tooltip";
import { ProfileButton } from "../styledComponents/buttons";
import { CompositeLinkNoUnderline } from "../styledComponents/links";

const pages = ["Dashboard", "Dogami", "Strategies"];
const userMenu = ["Dashboard", "Logout"];

function NavBar({ currentUser, handleChangeCurrentUser }) {
  // const [anchorElNav, setAnchorElNav] = useState("");
  // const [anchorElUser, setAnchorElUser] = useState("");

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  const logoutUser = () => {
    /**
     * Remove details from local storage, set currentUser to null
     * and go to the login page
     */
    const authService = new AuthService();
    authService.logout();
    handleChangeCurrentUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Always show, take all available space */}
          <Box sx={{ flexGrow: 1 }}>
            <NavBarBreadcrumbs />
          </Box>

          {/* Always show, take remaining space */}
          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              // Logout button
              <ProfileButton
                sx={{ borderRadius: "30px", p: 0 }}
                label={`LOGOUT ${currentUser.substring(0, 10)}`}
                onClick={logoutUser}
              />
            ) : (
              // Button within link to login page
              <CompositeLinkNoUnderline linkLoc="/login">
                <ProfileButton
                  sx={{ borderRadius: "30px", p: 0 }}
                  label="Login"
                />
              </CompositeLinkNoUnderline>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
