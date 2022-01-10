import {
  Stack,
  TextField,
  IconButton
} from "@mui/material";
import { useState, useEffect } from "react";
import { RadioButtonUnchecked, CheckCircle, Edit, Check, Close, Delete } from "@mui/icons-material";

const TodoListTask = ({ taskObject, updateTask, updateTaskCompletion, deleteTask }) => {
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
    updateTask(taskObject._id, task);
    setEditTask(false);
  }

  const updateTaskCompletionWrapper = () => {
    setCompleted(completed ? false : true);
    updateTaskCompletion(taskObject._id, completed ? false : true);
  }

  const deleteTaskWrapper = () => {
    deleteTask(taskObject._id);
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
      <IconButton sx={{ pl: 2, pr: 1 }} onClick={editTask ? updateTaskWrapper : openTaskEdit}>
        {
          editTask
          ? <Check />
          : <Edit />
        }
      </IconButton>
      <IconButton sx={{ pr: 2 }} onClick={editTask ? resetTask : deleteTaskWrapper}>
        {
          editTask
          ? <Close />
          : <Delete />
        }
      </IconButton>
    </Stack>
  );
}

export default TodoListTask;
