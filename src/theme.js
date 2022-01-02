import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";
import { pink } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        primary: {
            main: blue[500]
        },
        secondary: {
            main: pink[300]
        }
    }
});

export default theme;
