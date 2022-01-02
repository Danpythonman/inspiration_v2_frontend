import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Button,
  Typography
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const GuestAccordion = ({ setIsLoggedIn }) => {
  const continueAsGuest = () => {
    // Set auth and refresh tokens in local storage to "guest"
    localStorage.setItem("inspiration_v2_auth_token", "guest");
    localStorage.setItem("inspiration_v2_refresh_token", "guest");

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
          <Button fullWidth variant="contained" color="primary" onClick={continueAsGuest}>Continue</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default GuestAccordion;
