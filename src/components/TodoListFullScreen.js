import {
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  Grid,
  Stack,
  TextField,
  Button
} from "@mui/material";
import { useState, forwardRef } from "react";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import TodoListTask from "./TodoListTask";
import addTask from "../api/addTask";
import updateTask from "../api/updateTask";
import updateTaskCompletion from "../api/updateTaskCompletion";
import deleteTask from "../api/deleteTask";

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

  const [newTask, setNewTask] = useState("");

  const closeTodoList = () => {
    setOpen(false);
  }

  const handleNewTaskInput = (event) => {
    setNewTask(event.target.value);
  }

  const addTaskWrapper = async () => {
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

  const updateTaskWrapper = async (taskId, updatedTask) => {
    try {
      const newTasks = await updateTask(taskId, updatedTask);

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

  const updateTaskCompletionWrapper = async (taskId, completed) => {
    try {
      const newTasks = await updateTaskCompletion(taskId, completed);

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

  const deleteTaskWrapper = async (taskId) => {
    try {
      const newTasks = await deleteTask(taskId);

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
          <Typography sx={{ flex: 1 }} variant="h5">To-do List</Typography>
          <IconButton onClick={closeTodoList}>
            <Close fontSize="large" color="info" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
      <Stack spacing={3}>
        {
          tasks.map((task, index) => (
            <TodoListTask
              key={index}
              taskObject={task}
              updateTask={updateTaskWrapper}
              updateTaskCompletion={updateTaskCompletionWrapper}
              deleteTask={deleteTaskWrapper}
            />
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
              onClick={addTaskWrapper}
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
