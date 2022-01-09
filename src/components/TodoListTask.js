import {
  Stack,
  TextField,
  IconButton
} from "@mui/material";
import { useState, useEffect } from "react";
import { RadioButtonUnchecked, Edit, Delete } from "@mui/icons-material";

const TodoListTask = ({ taskObject, deleteTask }) => {
  const [task, setTask] = useState("");

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
      <TextField fullWidth variant="standard" value={task} />
      <IconButton sx={{ pl: 2, pr: 1 }}>
        <Edit />
      </IconButton>
      <IconButton sx={{ pr: 2 }} onClick={deleteTaskWrapper}>
        <Delete />
      </IconButton>
    </Stack>
  );
}

export default TodoListTask;
