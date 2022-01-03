import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Grid,
  TextField,
  Button,
  Typography
} from "@mui/material";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  textFieldButton: {
    height: "100%"
  }
}));

const GuestAccordion = ({ setIsLoggedIn }) => {
  const classes = useStyles();

  const [name, setName] = useState("");

  const handleNameInput = (event) => {
    setName(event.target.value);
  }

  const continueAsGuest = () => {
    // Set auth and refresh tokens in local storage to "guest"
    localStorage.setItem("inspiration_v2_auth_token", "guest");
    localStorage.setItem("inspiration_v2_refresh_token", "guest");

    // Set user object in local storage
    localStorage.setItem("inspiration_v2_user", JSON.stringify({ email: null, name: name }));

    // Set user as logged in so that main page will render
    setIsLoggedIn(true);
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Continue as Guest</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          <Typography>
            Continuing without an account will mean that your to-do list will not be saved online, only on your local device.
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={0} sm={3}/>
            <Grid item xs={6} sm={4} sx={{ pr: 1 }}>
              <TextField
                fullWidth
                variant="standard"
                label="Name"
                value={name}
                onChange={handleNameInput}
              />
            </Grid>
            <Grid item xs={6} sm={2} sx={{ pl: 1 }}>
              <Button
                className={classes.textFieldButton}
                fullWidth
                color="primary"
                variant="contained"
                onClick={continueAsGuest}
              >
                Continue
              </Button>
            </Grid>
            <Grid item xs={0} sm={3}/>
          </Grid>
          <Button fullWidth variant="contained" color="primary" onClick={continueAsGuest}>Continue</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default GuestAccordion;
