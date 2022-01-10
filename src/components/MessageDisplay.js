import {
  Box,
  Stack,
  Grid,
  Typography
} from "@mui/material";

const MessageDisplay = ({ name, quoteObject }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Stack spacing={1}>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Typography sx={{ pb: "1rem" }} variant="h2" style={{ color: "#FFFFFF" }}>Welcome {name}</Typography>
            <Typography style={{ color: "#FFFFFF" }}>{quoteObject.quote}</Typography>
            <Typography style={{ color: "#FFFFFF" }}>{`- ${quoteObject.author}`}</Typography>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Stack>
    </Box>
  );
}

export default MessageDisplay;
