import { Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LoginAccordion from "./LoginAccordion";
import SignupAccordion from "./SignupAccordion";
import GuestAccordion from "./GuestAccordion";

const useStyles = makeStyles({
  centeredContent: {
    minHeight: '100vh'
  }
});

const WelcomePage = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item sm={2} />

      <Grid
        className={classes.centeredContent}
        item
        container
        sm={8}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6}>
          <Stack spacing={2}>
          <Typography variant="h2">Welcome</Typography>

          <LoginAccordion />

          <SignupAccordion />

          <GuestAccordion />
          </Stack>
        </Grid>
      </Grid>

      <Grid item sm={2} />
    </Grid>
  );
}

export default WelcomePage;
