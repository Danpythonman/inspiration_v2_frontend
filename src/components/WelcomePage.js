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

const WelcomePage = ({ logIn }) => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={1} sm={2} md={3} />

      <Grid
        className={classes.centeredContent}
        item
        container
        xs={10}
        sm={8}
        md={6}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={6}>
          <Stack spacing={5}>
            <Typography variant="h2">Welcome</Typography>

            <LoginAccordion logIn={logIn} />

            <SignupAccordion logIn={logIn} />

            <GuestAccordion logIn={logIn} />
          </Stack>
        </Grid>
      </Grid>

      <Grid item xs={1} sm={2} md={3} />
    </Grid>
  );
}

export default WelcomePage;
