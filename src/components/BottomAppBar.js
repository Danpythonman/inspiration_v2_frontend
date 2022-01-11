import {
  AppBar,
  Toolbar,
  Button
} from "@mui/material";
import { useState } from "react";
import TodoListFullScreen from "./TodoListFullScreen";
import SiteInfoDialog from "./SiteInfoDialog";

const BottomAppBar = ({ tasks, updateTasks, imageObject, quoteObject }) => {
  const [todoListOpen, setTodoListOpen] = useState(false);
  const [siteInfoDialogOpen, setSiteInfoDialogOpen] = useState(false);

  const openTodoList = () => {
    setTodoListOpen(true);
  }

  const openSiteInfoDialog = () => {
    setSiteInfoDialogOpen(true);
  }

  return (
    <AppBar position="fixed" color="transparent" elevation={0} sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Button
          variant="text"
          color="info"
          style={{ borderRadius: 1, backgroundColor: "transparent" }}
          onClick={openSiteInfoDialog}
        >
          <strong>Info and Credit</strong>
        </Button>
        <div style={{ flex: 1 }}></div>
        <Button
          variant="text"
          color="info"
          style={{ borderRadius: 1, backgroundColor: "transparent" }}
          onClick={openTodoList}
        >
          <strong>To-do List</strong>
        </Button>
      </Toolbar>
      <TodoListFullScreen
        open={todoListOpen}
        setOpen={setTodoListOpen}
        tasks={tasks}
        updateTasks={updateTasks}
      />
      <SiteInfoDialog
        open={siteInfoDialogOpen}
        setOpen={setSiteInfoDialogOpen}
        imageObject={imageObject}
        quoteObject={quoteObject}
      />
    </AppBar>
  );
}

export default BottomAppBar;
