import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Stack
} from "@mui/material";
import { useState } from "react";
import VerificationCode from "./VerificationCode";

const DeleteAccountDialog = ({ open, setOpen, user, handleDeleteAccount, handleVerifyDeleteAccount }) => {
  const [waitingForVerification, setWaitingForVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const handleCloseDialog = () => {
    setOpen(false);
  }

  const handleDeleteAccountWrapper = async () => {
    const deleteAccountResponse = await handleDeleteAccount();

    if (deleteAccountResponse) {
      setWaitingForVerification(true);
    }
  }

  const handleVerifyDeleteAccountWrapper = async () => {
    await handleVerifyDeleteAccount(verificationCode);
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleCloseDialog}>
      <DialogTitle>Delete Account?</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Typography>
            Are you sure you would like to delete your account?
            This will permanently delete your account and all of your To-do list tasks.
          </Typography>
          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteAccountWrapper}
          >
            Delete
          </Button>
          {waitingForVerification && user && user.email &&
            <VerificationCode
              email={user.email}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              handleVerifyRequest={handleVerifyDeleteAccountWrapper}
            />
          }
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteAccountDialog;
