import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Stack,
  TextField,
  Button,
  Typography
} from "@mui/material";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import login from "../api/login";
import verifyLogin from "../api/verifyLogin";

const useStyles = makeStyles(theme => ({
  textFieldButton: {
    height: "100%"
  }
}));

const LoginAccordion = ({ logIn }) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [waitingForVerification, setWaitingForVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  }

  const handleVerificationCodeInput = (event) => {
    setVerificationCode(event.target.value);
  }

  const handleLoginRequest = async () => {
    try {
      const loginResponse = await login(email);

      alert(loginResponse.data);

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

  const handleVerifyLoginRequest = async () => {
    try {
      const verifyLoginResponse = await verifyLogin(email, verificationCode);

      logIn(verifyLoginResponse.data.auth, verifyLoginResponse.data.refresh, verifyLoginResponse.data.email, verifyLoginResponse.data.name);
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
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Login</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          <Typography>Enter your email address and we'll send you an email with a verification code.</Typography>
          <Grid container spacing={0}>
            <Grid item xs={0} sm={3}/>
            <Grid item xs={6} sm={4} sx={{ pr: 1 }}>
              <TextField
                fullWidth
                variant="standard"
                label="Email"
                value={email}
                onChange={handleEmailInput}
              />
            </Grid>
            <Grid item xs={6} sm={2} sx={{ pl: 1 }}>
              <Button
                className={classes.textFieldButton}
                fullWidth
                color="primary"
                variant="contained"
                onClick={handleLoginRequest}
              >
                Go
              </Button>
            </Grid>
            <Grid item xs={0} sm={3}/>
          </Grid>
          {
            waitingForVerification
            ? (
              <>
                <Typography variant="h5">Verification Code</Typography>
                <Typography>We sent a 6-digit verification code to {email}</Typography>
                <TextField
                  fullWidth
                  label="Verification Code"
                  value={verificationCode}
                  onChange={handleVerificationCodeInput}
                />
                <Button fullWidth variant="contained" color="primary" onClick={handleVerifyLoginRequest}>Verify</Button>
              </>
            )
            : <></>
          }
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default LoginAccordion;
