import {
  Typography,
  Grid,
  TextField,
  Button
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  textFieldButton: {
    height: "100%"
  }
}));

const VerificationCode = ({ email, verificationCode, setVerificationCode, handleVerifyRequest }) => {
  const classes = useStyles();

  const handleVerificationCodeInput = (event) => {
    setVerificationCode(event.target.value);
  }

  return (
    <>
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
            onClick={handleVerifyRequest}
          >
            Verify
          </Button>
        </Grid>
        <Grid item xs={0} sm={3}/>
      </Grid>
    </>
  );
}

export default VerificationCode;
