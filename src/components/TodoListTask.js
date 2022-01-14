import {
  Stack,
  TextField,
  IconButton
} from "@mui/material";
import { useState, useEffect } from "react";
import { RadioButtonUnchecked, CheckCircle, Edit, Check, DoneOutline, Undo, Close, Delete } from "@mui/icons-material";

const TodoListTask = ({ index, taskObject, updateTask, updateTaskCompletion, deleteTask }) => {
  const [task, setTask] = useState("");
  const [completed, setCompleted] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const openTaskEdit = () => {
    setEditTask(true);
  }

  const handleTaskInput = (event) => {
    if (editTask) {
      setTask(event.target.value);
    }
  }

  const resetTask = () => {
    setTask(taskObject.content);
    setEditTask(false);
  }

  const updateTaskWrapper = () => {
    // If user is a guest, the task id is the task's index in the array of tasks.
    // If user is not a guest, the task id is the _id property from the database.
    if (localStorage.getItem("inspiration_v2_auth_token") && localStorage.getItem("inspiration_v2_auth_token") === "guest") {
      updateTask(index, task);
    } else {
      updateTask(taskObject._id, task);
    }
    setEditTask(false);
  }

  const updateTaskCompletionWrapper = () => {
    setCompleted(completed ? false : true);

    // If user is a guest, the task id is the task's index in the array of tasks.
    // If user is not a guest, the task id is the _id property from the database.
    if (localStorage.getItem("inspiration_v2_auth_token") && localStorage.getItem("inspiration_v2_auth_token") === "guest") {
      updateTaskCompletion(index, completed ? false : true);
    } else {
      updateTaskCompletion(taskObject._id, completed ? false : true);
    }
  }

  const deleteTaskWrapper = () => {
    // If user is a guest, the task id is the task's index in the array of tasks.
    // If user is not a guest, the task id is the _id property from the database.
    if (localStorage.getItem("inspiration_v2_auth_token") && localStorage.getItem("inspiration_v2_auth_token") === "guest") {
      deleteTask(index);
    } else {
      deleteTask(taskObject._id);
    }
  }

  useEffect(() => {
    setTask(taskObject.content);
    setCompleted(taskObject.completed);
  }, [taskObject]);

  return (
    <Stack direction="row">
      <IconButton sx={{ pl: 2, pr: 2 }} onClick={updateTaskCompletionWrapper}>
        {
          completed
          ? <CheckCircle />
          : <RadioButtonUnchecked />
        }
      </IconButton>
      <TextField
        fullWidth
        style={{ textDecoration: completed ? "line-through": "none" }}
        variant={
          editTask
          ? "filled"
          : "standard"
        }
        size={
          editTask
          ? "small"
          : "large"
        }
        value={task}
        onChange={handleTaskInput}
      />
      {
        completed
        ? (
          <>
            <IconButton sx={{ pl: 2, pr: 1 }} onClick={deleteTaskWrapper}>
              <DoneOutline />
            </IconButton>
            <IconButton sx={{ pr: 2 }} onClick={updateTaskCompletionWrapper}>
              <Undo />
            </IconButton>
          </>
        )
        : editTask
          ? (
            <>
              <IconButton sx={{ pl: 2, pr: 1 }} onClick={updateTaskWrapper}>
                <Check />
              </IconButton>
              <IconButton sx={{ pr: 2 }} onClick={resetTask}>
                <Close />
              </IconButton>
            </>
          )
          : (
            <>
              <IconButton sx={{ pl: 2, pr: 1 }} onClick={openTaskEdit}>
                <Edit />
              </IconButton>
              <IconButton sx={{ pr: 2 }} onClick={deleteTaskWrapper}>
                <Delete />
              </IconButton>
            </>
          )
      }
    </Stack>
  );
}

export default TodoListTask;
