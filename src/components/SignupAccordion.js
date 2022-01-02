import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  Tooltip,
  IconButton
} from "@mui/material";
import { ExpandMore, Security, Info } from "@mui/icons-material";

const SignupAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Signup</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          <Typography>Enter your email address and we'll send you an email with a verification code.</Typography>
          <Grid container>
            <Grid item xs={11}>
              <TextField fullWidth label="Email" helperText="Your email will only be used for verifying actions like signup, logins, etc." />
            </Grid>
            <Grid item xs={1}>
              <Tooltip
                title={
                  <>
                    <Typography variant="h5"><strong>No password?</strong></Typography>
                    <Typography variant="body1">
                      Instead of using a password to access your account, you will be sent an email with a verification code whenever you log in.
                    </Typography>
                    <Typography variant="caption">
                      Don't worry, you wont have to log in every time you use this website. However, you will be required to log in every 30 days.
                    </Typography>
                  </>
                }
              >
                <IconButton>
                  <Security />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={11}>
              <TextField fullWidth label="Name" helperText="This doesn't have to be your legal name, just whatever you would like to be called (you can always change this later)." />
            </Grid>
            <Grid item xs={1}>
              <Tooltip
                title={
                  <>
                    <Typography variant="h5"><strong>What is my name used for?</strong></Typography>
                    <Typography variant="body1">
                      Your name is only used to to display a welcome message with your name, so it can be whatever you want.
                    </Typography>
                  </>
                }
              >
                <IconButton>
                  <Info />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" color="primary">Send</Button>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default SignupAccordion;
