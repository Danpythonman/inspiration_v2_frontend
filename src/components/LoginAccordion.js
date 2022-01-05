import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
  Divider
} from "@mui/material";
import { useState } from "react";
import { ExpandMore } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import VerificationCode from "./VerificationCode";
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
    <Accordion square>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>Login</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={3}>
          <Typography>Enter your email address and we'll send you an email with a verification code.</Typography>
          <Grid container>
            <Grid item xs={0} sm={2} md={3} />
            <Grid item xs={8} sm={6} md={4} sx={{ pr: 1 }}>
              <TextField
                fullWidth
                variant="standard"
                label="Email"
                value={email}
                onChange={handleEmailInput}
              />
            </Grid>
            <Grid item xs={4} sm={2} md={2} sx={{ pl: 1 }}>
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
            <Grid item xs={0} sm={2} md={3} />
          </Grid>
          {
            waitingForVerification
            ? (
              <>
                <br/>
                <VerificationCode
                  email={email}
                  verificationCode={verificationCode}
                  setVerificationCode={setVerificationCode}
                  handleVerifyRequest={handleVerifyLoginRequest}
                />
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
