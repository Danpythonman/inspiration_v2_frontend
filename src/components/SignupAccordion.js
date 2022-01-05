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
  IconButton,
  Divider
} from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { ExpandMore, Security, Info } from "@mui/icons-material";
import signup from "../api/signup";
import verifySignup from "../api/verifySignup";

const useStyles = makeStyles(theme => ({
  textFieldButton: {
    height: "100%"
  }
}));

const SignupAccordion = ({ logIn }) => {
  const classes = useStyles();

  const [emailTooltipOpen, setEmailTooltipOpen] = useState(false);
  const [nameTooltipOpen, setNameTooltipOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [waitingForVerification, setWaitingForVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const openEmailTooltip = () => {
    setEmailTooltipOpen(true);
  }

  const closeEmailTooltip = () => {
    setEmailTooltipOpen(false);
  }

  const openNameTooltip = () => {
    setNameTooltipOpen(true);
  }

  const closeNameTooltip = () => {
    setNameTooltipOpen(false);
  }

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  }

  const handleNameInput = (event) => {
    setName(event.target.value);
  }

  const handleVerificationCodeInput = (event) => {
    setVerificationCode(event.target.value);
  }

  const handleSignupRequest = async () => {
    try {
      const signupResponse = await signup(email);

      alert(signupResponse.data);

      setWaitingForVerification(true);
    } catch (err) {
      // If the response property is defined, then there was an error with the server
      if (err.response) {
        alert(`ERROR: Status ${err.response.status}\n${err.response.data}`);
      } else {
        alert(`ERROR: ${err}`);
      }
    }
  }

  const handleVerifySignupRequest = async () => {
    try {
      const verifySignupResponse = await verifySignup(email, name, verificationCode);

      logIn(verifySignupResponse.data.auth, verifySignupResponse.data.refresh, email, name);
    } catch (err) {
      // If the response property is defined, then there was an error with the server
      if (err.response) {
        alert(`ERROR: Status ${err.response.status}\n${err.response.data}`);
      } else {
        alert(`ERROR: ${err}`);
      }
    }
  }

  return (
    <Accordion square>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Signup</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          <Typography>Enter your email address and we'll send you an email with a verification code.</Typography>
          <Grid container>
            <Grid item xs={11}>
              <TextField
                fullWidth
                variant="standard"
                label="Email"
                helperText="Your email will only be used for verifying actions like signup, logins, etc."
                value={email}
                onChange={handleEmailInput}
              />
            </Grid>
            <Grid item xs={1}>
              <Tooltip
                open={emailTooltipOpen}
                onClose={closeEmailTooltip}
                disableHoverListener
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
                <IconButton onClick={emailTooltipOpen ? closeEmailTooltip : openEmailTooltip}>
                  <Security />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={11}>
              <TextField
                fullWidth
                variant="standard"
                label="Name"
                helperText="This doesn't have to be your legal name, just whatever you would like to be called (you can always change this later)."
                value={name}
                onChange={handleNameInput}
              />
            </Grid>
            <Grid item xs={1}>
              <Tooltip
                open={nameTooltipOpen}
                onClose={closeNameTooltip}
                disableHoverListener
                title={
                  <>
                    <Typography variant="h5"><strong>What is my name used for?</strong></Typography>
                    <Typography variant="body1">
                      Your name is only used to to display a welcome message with your name, so it can be whatever you want.
                    </Typography>
                  </>
                }
              >
                <IconButton onClick={nameTooltipOpen ? closeNameTooltip : openNameTooltip}>
                  <Info />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Button fullWidth variant="contained" color="primary" onClick={handleSignupRequest}>Signup</Button>
          {
            waitingForVerification
            ? (
              <>
                <Divider />
                <Typography variant="h5">Verification Code</Typography>
                <Typography>We sent a 6-digit verification code to {email}</Typography>
                <Grid container>
                  <Grid item xs={0} sm={3}/>
                  <Grid item xs={6} sm={4} sx={{ pr: 1 }}>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="Verification Code"
                      value={verificationCode}
                      onChange={handleVerificationCodeInput}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2} sx={{ pl: 1 }}>
                    <Button
                      className={classes.textFieldButton}
                      fullWidth
                      color="secondary"
                      variant="contained"
                      onClick={handleVerifySignupRequest}
                    >
                      Verify
                    </Button>
                  </Grid>
                  <Grid item xs={0} sm={3}/>
                </Grid>
              </>
            )
            : <></>
          }
        </Stack>
        {/* </Grid> */}
        {/* <Grid item sm={1}/> */}
        {/* </Grid> */}
      </AccordionDetails>
    </Accordion>
  );
}

export default SignupAccordion;
