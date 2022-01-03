import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Box,
  IconButton,
  ButtonGroup,
  Button
} from "@mui/material";
import { useEffect } from "react";
import { Settings } from "@mui/icons-material";

const MainPage = ({ imageObject, quoteObject }) => {

  useEffect(() => {
    if (imageObject) {
      document.body.style.backgroundImage = `url(${imageObject.imageUrl})`;
    }
  }, [imageObject]);

  return (
    <>
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="primary">Welcome</Typography>
      </Box>
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={2}>
              <ButtonGroup variant="text" style={{ borderRadius: 1, backgroundColor: "#808080", opacity: 0.75 }}>
                <Button color="info">Image Credit</Button>
                <Button color="info">Quote Credit</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={4}>
              <Button variant="text" color="info" style={{ borderRadius: 1, backgroundColor: "#808080", opacity: 0.75 }}>To-do List</Button>
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default MainPage;
