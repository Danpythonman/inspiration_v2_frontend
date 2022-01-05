import {
  Box,
  Stack,
  Typography
} from "@mui/material";

const MessageDisplay = ({ name, quoteObject }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Stack spacing={1}>
        <Typography sx={{ pb: "1rem" }} variant="h2" style={{ color: "#FFFFFF" }}>Welcome {name}</Typography>
        <Typography style={{ color: "#FFFFFF" }}>{quoteObject.quote}</Typography>
        <Typography sx={{ pl: "7rem" }} style={{ color: "#FFFFFF" }}>{`- ${quoteObject.author}`}</Typography>
      </Stack>
    </Box>
  );
}

export default MessageDisplay;
