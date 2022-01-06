import {
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Grid,
  IconButton
} from "@mui/material";
import { useState } from "react";
import { Settings } from "@mui/icons-material";
import ChangeNameDialog from "./ChangeNameDialog";
import logOutOfAllDevices from "../api/logOutOfAllDevices";

const TopAppBar = ({ user, handleNameChange, logOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchorElement, setMenuAnchorElement] = useState(null);
  const [nameChangeDialogOpen, setNameChangeDialogOpen] = useState(false);

  const openMenu = (event) => {
    setMenuAnchorElement(event.currentTarget);
    setMenuOpen(true);
  }

  const closeMenu = () => {
    setMenuAnchorElement(null);
    setMenuOpen(false);
  }

  const handleNameChangeDialogOpen = () => {
    setNameChangeDialogOpen(true);
  }

  const handleLogOutOfAllDevices = async () => {
    try {
      const logOutOfAllDevicesResponse = await logOutOfAllDevices();

      logOut();

      alert(logOutOfAllDevicesResponse.data);
    } catch (err) {
      // If the response property is defined, then there was an error with the server
      if (err.response) {
        alert(`ERROR: Status ${err.response.status}\n${err.response.data}`);
      } else {
        alert(`ERROR: ${err}`);
      }
    }
  }

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Grid container>
          <Grid item xs={11} />
          <Grid item xs={1}>
            <IconButton onClick={openMenu}>
              <Settings sx={{ color: "#FFFFFF" }} fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={menuAnchorElement}
              open={menuOpen}
              onClose={closeMenu}
            >
              <MenuItem onClick={handleNameChangeDialogOpen}>Change Name</MenuItem>
              <MenuItem onClick={logOut}>Log Out</MenuItem>
              {
                user && user.email !== null
                ? <MenuItem onClick={handleLogOutOfAllDevices}>Log Out Everywhere</MenuItem>
                : <></>
              }
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
      <ChangeNameDialog
        open={nameChangeDialogOpen}
        setOpen={setNameChangeDialogOpen}
        user={user}
        handleNameChange={handleNameChange}
      />
    </AppBar>
  );
}

export default TopAppBar;
