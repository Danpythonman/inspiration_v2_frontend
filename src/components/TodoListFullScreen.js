import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  List,
  Grid,
  Stack,
  TextField,
  Button
} from "@mui/material";
import { forwardRef, useEffect } from "react";
import { Close, RadioButtonUnchecked, Edit, Delete } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
  textFieldButton: {
    height: "100%"
  }
}));

const TodoListTransition = forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TodoListFullScreen = ({ open, setOpen, tasks }) => {
  const classes = useStyles();

  const closeTodoList = () => {
    setOpen(false);
  }

  useEffect(() => {
    console.log(tasks);
  }, [tasks]);

  return (
    <Dialog
      fullScreen
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
      <List>
        {
          tasks.map((task, index) => (
            <Stack key={index} direction="row">
              <IconButton sx={{ pl: 2, pr: 2 }}>
                <RadioButtonUnchecked />
              </IconButton>
              <TextField fullWidth variant="outlined" value={task.content} style={{ flex: 1 }} />
              <IconButton sx={{ pl: 2, pr: 1 }}>
                <Edit />
              </IconButton>
              <IconButton sx={{ pr: 2 }}>
                <Delete />
              </IconButton>
            </Stack>
          ))
        }
      </List>
      <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: "auto", bottom: 5 }}>
        <Toolbar>
          <Grid container>
            <Grid item xs={11} sx={{ pr: 1 }}>
              <TextField fullWidth variant="standard" label="New Task" />
            </Grid>
            <Grid item xs={1} sx={{ pl: 1 }}>
              <Button className={classes.textFieldButton} fullWidth variant="contained">Add</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
}

export default TodoListFullScreen;
