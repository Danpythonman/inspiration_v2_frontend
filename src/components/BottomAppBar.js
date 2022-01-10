import {
  AppBar,
  Toolbar,
  Grid,
  Stack,
  ButtonGroup,
  Button,
  Link,
  Typography
} from "@mui/material";
import { useState } from "react";
import TodoListFullScreen from "./TodoListFullScreen";

const BottomAppBar = ({ tasks, updateTasks }) => {
  const [todoListOpen, setTodoListOpen] = useState(false);

  const openTodoList = () => {
    setTodoListOpen(true);
  }

  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Grid container>
          <Grid item xs={2}>
            <ButtonGroup variant="text" style={{ borderRadius: 1, backgroundColor: "#696969", opacity: 0.7 }}>
              <Button color="info">Image Credit</Button>
              <Button color="info">Quote Credit</Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={4}>
            <Button
              variant="text"
              color="info"
              style={{ borderRadius: 1, backgroundColor: "#696969", opacity: 0.75 }}
              onClick={openTodoList}
            >
              To-do List
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
    </AppBar>
  );
}

export default BottomAppBar;
