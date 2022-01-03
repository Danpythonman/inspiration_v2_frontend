import {
  AppBar,
  Toolbar,
  Grid,
  IconButton
} from "@mui/material";
import { Settings } from "@mui/icons-material";

const TopAppBar = () => {
  return(
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Grid container>
          <Grid item xs={11} />
          <Grid item xs={1}>
            <IconButton>
              <Settings sx={{ color: "#FFFFFF" }} fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default TopAppBar;
