import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  DialogActions,
  Button
} from "@mui/material";
import { useState } from "react";

const ChangeNameDialog = ({ open, setOpen, user, handleNameChange }) => {
  const [newName, setNewName] = useState("");

  const handleCloseDialog = () => {
    setOpen(false);
  }

  const handleNameInput = (event) => {
    setNewName(event.target.value);
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleCloseDialog}>
      <DialogTitle>Change Name?</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            fullWidth
            variant="standard"
            InputProps={{ readOnly: true }}
            label="Current Name"
            value={
              user && user.name
              ? user.name
              : ""
            }
          />
          <TextField
            fullWidth
            variant="standard"
            label="New Name"
            value={newName}
            onChange={handleNameInput}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { handleNameChange(newName) }}>Save</Button>
        <Button onClick={handleCloseDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangeNameDialog;
