import {
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Grid,
  Stack,
  TextField,
  Button
} from "@mui/material";
import { useState, forwardRef } from "react";
import { Close, RadioButtonUnchecked, Edit, Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import addTask from "../api/addTask";

const useStyles = makeStyles(theme => ({
  textFieldButton: {
    height: "100%"
  }
}));

const TodoListTransition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TodoListFullScreen = ({ open, setOpen, tasks, updateTasks }) => {
  const classes = useStyles();

  const [newTask, setNewTask] = useState();

  const closeTodoList = () => {
    setOpen(false);
  }

  const handleNewTaskInput = (event) => {
    setNewTask(event.target.value);
  }

  const addNewTask = async () => {
    try {
      const newTasks = await addTask(newTask);

      updateTasks(newTasks.data);
    } catch (err) {
      // If the response property is defined, then there was an error with the server
      if (err.response) {
        alert(`ERROR: Status ${err.response.status}\n${err.response.data}`);
      } else {
        alert(`ERROR: ${err}`);
      }
    }
  }

  return (
    <Dialog
      fullScreen
      scroll={"paper"}
      open={open}
      onClose={closeTodoList}
      TransitionComponent={TodoListTransition}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={closeTodoList}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
      <Stack spacing={3}>
        {
          tasks.map((task, index) => (
            <Stack key={index} direction="row">
              <IconButton sx={{ pl: 2, pr: 2 }}>
                <RadioButtonUnchecked />
              </IconButton>
              <TextField fullWidth variant="standard" value={task.content} />
              <IconButton sx={{ pl: 2, pr: 1 }}>
                <Edit />
              </IconButton>
              <IconButton sx={{ pr: 2 }}>
                <Delete />
              </IconButton>
            </Stack>
          ))
        }
      </Stack>
      </DialogContent>
      <DialogActions>
        <Grid container sx={{pl: 3, pr: 3}}>
          <Grid item xs={11} sx={{ pr: 1 }}>
            <TextField
              fullWidth
              variant="standard"
              label="New Task"
              value={newTask}
              onChange={handleNewTaskInput}
            />
          </Grid>
          <Grid item xs={1} sx={{ pl: 1 }}>
            <Button
              className={classes.textFieldButton}
              fullWidth
              variant="contained"
              onClick={addNewTask}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default TodoListFullScreen;
