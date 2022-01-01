import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Typography
} from "@mui/material";

const LoginAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Login</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>Enter your email address and we'll send you an email with a verification code.</Typography>
        <TextField fullWidth label="Email"/>
      </AccordionDetails>
    </Accordion>
  );
}

export default LoginAccordion;
