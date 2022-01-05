import {
  Typography,
  Box
} from "@mui/material";
import {useState, useEffect } from "react";
import TopAppBar from "./TopAppBar";
import BottomAppBar from "./BottomAppBar";

const MainPage = ({ imageObject, quoteObject, user, logOut }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (imageObject) {
      document.body.style.backgroundImage = `url(${imageObject.imageUrl})`;
    }
  }, [imageObject]);

  useEffect(() => {
    if (user === JSON.parse(localStorage.getItem("inspiration_v2_user")).name) {
      setName(user.name);
    } else {
      setName(JSON.parse(localStorage.getItem("inspiration_v2_user")).name);
    }
  }, [user]);

  return (
    <>
      <TopAppBar logOut={logOut} />
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Typography color="primary">Welcome {name}</Typography>
      </Box>
      <BottomAppBar />
    </>
  );
}

export default MainPage;
