import {
  AppBar,
  Toolbar,
  Grid,
  Stack,
  Button,
  Link,
  Typography
} from "@mui/material";
import { useState } from "react";
import TodoListFullScreen from "./TodoListFullScreen";
import SiteInfoDialog from "./SiteInfoDialog";

const BottomAppBar = ({ tasks, updateTasks, imageObject, quoteObject }) => {
  const [todoListOpen, setTodoListOpen] = useState(false);
  const [siteInfoDialogOpen, setSiteInfoDialogOpen] = useState(false);

  const openTodoList = () => {
    setTodoListOpen(true);
  }

  const openSiteInfoDialog = () => {
    setSiteInfoDialogOpen(true);
  }

  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
            <Button
              variant="text"
              color="info"
              style={{ borderRadius: 1, backgroundColor: "transparent", position: "fixed", left: "1rem" }}
              onClick={openSiteInfoDialog}
            >
              <strong>Info and Credit</strong>
            </Button>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <Button
              variant="text"
              color="info"
              style={{ borderRadius: 1, backgroundColor: "transparent" }}
              onClick={openTodoList}
            >
              <strong>To-do List</strong>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Stack style={{ position: "fixed", right: 5, bottom: 5 }} alignItems="flex-end">
            <Typography style={{ color: "#A9A9A9" }}>
              Image Courtesy of <Link color="inherit" underline="hover" href="https://data.nasa.gov/Space-Science/Astronomy-Picture-of-the-Day-API/ez2w-t8ua">NASA's Astronomy Picture of the Day API</Link>
            </Typography>
            <Typography style={{ color: "#A9A9A9" }}>
              Quote Courtesy of <Link color="inherit" underline="hover" href="https://quotes.rest/">They Said So Quotes API</Link>
            </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Toolbar>
      <TodoListFullScreen
        open={todoListOpen}
        setOpen={setTodoListOpen}
        tasks={tasks}
        updateTasks={updateTasks}
      />
      <SiteInfoDialog
        open={siteInfoDialogOpen}
        setOpen={setSiteInfoDialogOpen}
        imageObject={imageObject}
        quoteObject={quoteObject}
      />
    </AppBar>
  );
}

export default BottomAppBar;
