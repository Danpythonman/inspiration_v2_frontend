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

const TopAppBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnchorElement, setMenuAnchorElement] = useState(null);

  const openMenu = (event) => {
    setMenuAnchorElement(event.currentTarget);
    setMenuOpen(true);
  }

  const closeMenu = () => {
    setMenuAnchorElement(null);
    setMenuOpen(false);
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
              <MenuItem>Change Name</MenuItem>
              <MenuItem>Log Out</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default TopAppBar;
