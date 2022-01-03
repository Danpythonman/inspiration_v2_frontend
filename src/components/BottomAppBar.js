import {
  AppBar,
  Toolbar,
  Grid,
  ButtonGroup,
  Button
} from "@mui/material";

const BottomAppBar = () => {
  return(
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
            <ButtonGroup variant="text" style={{ borderRadius: 1, backgroundColor: "#696969", opacity: 0.7 }}>
              <Button color="info">Image Credit</Button>
              <Button color="info">Quote Credit</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <Button variant="text" color="info" style={{ borderRadius: 1, backgroundColor: "#696969", opacity: 0.75 }}>To-do List</Button>
          </Grid>
          <Grid item xs={4} />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default BottomAppBar;
