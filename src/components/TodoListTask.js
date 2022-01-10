import {
  Stack,
  TextField,
  IconButton
} from "@mui/material";
import { useState, useEffect } from "react";
import { RadioButtonUnchecked, Edit, Check, Close, Delete } from "@mui/icons-material";

const TodoListTask = ({ taskObject, updateTask, deleteTask }) => {
  const [task, setTask] = useState("");
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

  const deleteTaskWrapper = () => {
    deleteTask(taskObject._id);
  }

  useEffect(() => {
    setTask(taskObject.content);
  }, [taskObject]);

  return (
    <Stack direction="row">
      <IconButton sx={{ pl: 2, pr: 2 }}>
        <RadioButtonUnchecked />
      </IconButton>
      <TextField
        fullWidth
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
