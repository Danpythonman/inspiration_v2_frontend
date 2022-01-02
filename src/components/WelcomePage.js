import { Grid, Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LoginAccordion from "./LoginAccordion";
import SignupAccordion from "./SignupAccordion";
import GuestAccordion from "./GuestAccordion";

const useStyles = makeStyles({
  centeredContent: {
    minHeight: "100vh"
  }
});

const WelcomePage = ({ setIsLoggedIn }) => {
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
          <Stack spacing={3}>
            <Typography variant="h2">Welcome</Typography>

            <LoginAccordion setIsLoggedIn={setIsLoggedIn} />

            <SignupAccordion setIsLoggedIn={setIsLoggedIn} />

            <GuestAccordion setIsLoggedIn={setIsLoggedIn} />
          </Stack>
        </Grid>
      </Grid>

      <Grid item sm={2} />
    </Grid>
  );
}

export default WelcomePage;
