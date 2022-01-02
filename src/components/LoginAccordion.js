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
import { ExpandMore } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  textFieldButton: {
    height: "100%"
  }
}));

const LoginAccordion = () => {
  const classes = useStyles();

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
              <TextField fullWidth variant="standard" label="Email"/>
            </Grid>

            <Grid item xs={6} sm={2} sx={{ pl: 1 }}>
              <Button className={classes.textFieldButton} color="primary" fullWidth variant="contained">
                Go
              </Button>
            </Grid>

            <Grid item xs={0} sm={3}/>

          </Grid>

        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

export default LoginAccordion;
