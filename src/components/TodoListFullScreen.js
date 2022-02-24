import {
  Dialog,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  Stack,
  TextField,
  InputAdornment
} from "@mui/material";
import { useState, forwardRef } from "react";
import { Close, Add } from "@mui/icons-material";
import TodoListTask from "./TodoListTask";
import addTask from "../api/addTask";
import updateTask from "../api/updateTask";
import updateTaskCompletion from "../api/updateTaskCompletion";
import deleteTask from "../api/deleteTask";

const TodoListTransition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TodoListFullScreen = ({ open, setOpen, tasks, updateTasks, handleAPIRequestError }) => {
  const [newTask, setNewTask] = useState("");

  const closeTodoList = () => {
    setOpen(false);
  }

  const handleNewTaskInput = (event) => {
    setNewTask(event.target.value);
  }

  const addTaskOnEnter = (event) => {
    if (event.key === "Enter") {
      addTaskWrapper();
    }
  }

  const addTaskWrapper = async () => {
    try {
      // If user is a guest, the task id is the task's index in the array of tasks.
      // If user is not a guest, the task id is the _id property from the database.
      if (localStorage.getItem("inspiration_v2_auth_token") && localStorage.getItem("inspiration_v2_auth_token") === "guest") {
        const currentTasks = JSON.parse(localStorage.getItem("inspiration_v2_tasks"));

        const newTasks = currentTasks.concat({ content: newTask, completed: false });

        updateTasks(newTasks);
      } else {
        const newTasks = await addTask(newTask);

        updateTasks(newTasks.data);
      }

      // Remove task from textfield
      setNewTask("");
    } catch (err) {
      handleAPIRequestError(err);
    }
  }

  const updateTaskWrapper = async (taskId, updatedTask) => {
    try {
      // If user is a guest, the task id is the task's index in the array of tasks.
      // If user is not a guest, the task id is the _id property from the database.
      if (localStorage.getItem("inspiration_v2_auth_token") && localStorage.getItem("inspiration_v2_auth_token") === "guest") {
        const currentTasks = JSON.parse(localStorage.getItem("inspiration_v2_tasks"));

        const newTasks = currentTasks.map((task, index) => index === taskId ? { ...task, content: updatedTask } : { ...task });

        updateTasks(newTasks);
      } else {
        const newTasks = await updateTask(taskId, updatedTask);

        updateTasks(newTasks.data);
      }
    } catch (err) {
      handleAPIRequestError(err);
    }
  }

  const updateTaskCompletionWrapper = async (taskId, completed) => {
    try {
      // If user is a guest, the task id is the task's index in the array of tasks.
      // If user is not a guest, the task id is the _id property from the database.
      if (localStorage.getItem("inspiration_v2_auth_token") && localStorage.getItem("inspiration_v2_auth_token") === "guest") {
        const currentTasks = JSON.parse(localStorage.getItem("inspiration_v2_tasks"));

        const newTasks = currentTasks.map((task, index) => index === taskId ? { ...task, completed: completed } : { ...task });

        updateTasks(newTasks);
      } else {
        const newTasks = await updateTaskCompletion(taskId, completed);

        updateTasks(newTasks.data);
      }
    } catch (err) {
      handleAPIRequestError(err);
    }
  }

  const deleteTaskWrapper = async (taskId) => {
    try {
      // If user is a guest, the task id is the task's index in the array of tasks.
      // If user is not a guest, the task id is the _id property from the database.
      if (localStorage.getItem("inspiration_v2_auth_token") && localStorage.getItem("inspiration_v2_auth_token") === "guest") {
        const currentTasks = JSON.parse(localStorage.getItem("inspiration_v2_tasks"));

        const newTasks = currentTasks.filter((task, index) => index !== taskId);

        updateTasks(newTasks);
      } else {
        const newTasks = await deleteTask(taskId);

        updateTasks(newTasks.data);
      }
    } catch (err) {
      handleAPIRequestError(err);
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
              index={index}
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
        <TextField
          fullWidth
          variant="standard"
          label="New Task"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={addTaskWrapper}>
                  <Add />
                </IconButton>
              </InputAdornment>
            )
          }}
          value={newTask}
          onChange={handleNewTaskInput}
          onKeyPress={addTaskOnEnter}
        />
      </DialogActions>
    </Dialog>
  );
}

export default TodoListFullScreen;
