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

const GuestAccordion = ({ logIn }) => {
  const classes = useStyles();

  const [name, setName] = useState("");

  const handleNameInput = (event) => {
    setName(event.target.value);
  }

  const continueAsGuest = () => {
    // Auth and refresh tokens are both the string "guest", email is null, and the name is the name entered by the user
    logIn("guest", "guest", null, name);
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
