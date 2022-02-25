import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  Stack,
  TextField,
  InputAdornment,
  Button
} from "@mui/material";
import { useState, useRef, forwardRef, useEffect } from "react";
import { Close, Add, Settings } from "@mui/icons-material";
import TodoListTask from "./TodoListTask";
import addTask from "../api/addTask";
import updateTask from "../api/updateTask";
import updateTaskCompletion from "../api/updateTaskCompletion";
import deleteTask from "../api/deleteTask";

const TodoListTransition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TodoListFullScreen = ({ open, setOpen, user, tasks, updateTasks, handleColorChange, handleAPIRequestError }) => {
  const [newTask, setNewTask] = useState("");
  const [color, setColor] = useState("#2196F3");
  const [colorDialogOpen, setColorDialogOpen] = useState(false);
  const appBarRef = useRef(null);

  const closeTodoList = () => {
    setOpen(false);
  }

  const openColorDialog = () => {
    setColorDialogOpen(true);
  }

  const closeColorDialog = () => {
    appBarRef.current.style.backgroundColor = user.color;
    setColorDialogOpen(false);
  }

  const changeColor = (event) => {
    appBarRef.current.style.backgroundColor = event.target.value;
  }

  const handleNewTaskInput = (event) => {
    setNewTask(event.target.value);
  }

  const addTaskOnEnter = (event) => {
    if (event.key === "Enter") {
      addTaskWrapper();
    }
  }

  const handleColorChangeWrapper = async () => {
    handleColorChange(appBarRef.current.style.backgroundColor);
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

  useEffect(() => {
    if (user && user.color) {
      setColor(user.color);
    }
  }, [user]);

  return (
    <Dialog
      fullScreen
      scroll={"paper"}
      open={open}
      onClose={closeTodoList}
      TransitionComponent={TodoListTransition}
    >
      <AppBar position="static" ref={appBarRef} style={{ backgroundColor: color }}>
        <Toolbar>
          <Typography sx={{ flex: 1 }} variant="h5">To-do List</Typography>
          <IconButton onClick={openColorDialog}>
            <Settings sx={{ color: "#FFFFFF" }} fontSize="large" />
          </IconButton>
          <Dialog open={colorDialogOpen} onClose={closeColorDialog}>
            <DialogTitle>Pick To-Do List Colour</DialogTitle>
            <DialogContent>
              <input type="color" onChange={changeColor}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleColorChangeWrapper}>SAVE</Button>
              <Button onClick={closeColorDialog}>CLOSE</Button>
            </DialogActions>
          </Dialog>
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
