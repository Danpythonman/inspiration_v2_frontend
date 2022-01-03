import {
  Typography,
  Box
} from "@mui/material";
import { useEffect } from "react";
import TopAppBar from "./TopAppBar";
import BottomAppBar from "./BottomAppBar";

const MainPage = ({ imageObject, quoteObject }) => {

  useEffect(() => {
    if (imageObject) {
      document.body.style.backgroundImage = `url(${imageObject.imageUrl})`;
    }
  }, [imageObject]);

  return (
    <>
      <TopAppBar />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="primary">Welcome</Typography>
      </Box>
      <BottomAppBar />
    </>
  );
}

export default MainPage;
