import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography
} from "@mui/material";

const GuestAccordion = () => {
  return (
    <Accordion>
      <AccordionSummary>
        <Typography>Continue as Guest</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Continuing without an account will mean that your to-do list will not be saved online, only on your local device.
        </Typography>
        <Button>Ok</Button>
      </AccordionDetails>
    </Accordion>
  );
}

export default GuestAccordion;
