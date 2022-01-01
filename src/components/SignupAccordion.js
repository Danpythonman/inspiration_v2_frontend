import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography
} from "@mui/material";

const SignupAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Signup</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField fullWidth label="Email" helperText="Your email will only be used for verifying actions like signup, logins, etc." />
        <TextField fullWidth label="Name" helperText="This doesn't have to be your legal name, just whatever you would like to be called (you can always change this later)." />
      </AccordionDetails>
    </Accordion>
  );
}

export default SignupAccordion;
