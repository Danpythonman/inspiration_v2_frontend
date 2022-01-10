import {useState, useEffect } from "react";
import TopAppBar from "./TopAppBar";
import MessageDisplay from "./MessageDisplay";
import BottomAppBar from "./BottomAppBar";

const MainPage = ({ imageObject, quoteObject, user, tasks, updateTasks, handleNameChange, logOut, handleDeleteAccount, handleVerifyDeleteAccount }) => {
  const [name, setName] = useState(JSON.parse(localStorage.getItem("inspiration_v2_user")).name);

  useEffect(() => {
    if (imageObject) {
      document.body.style.backgroundImage = `url(${imageObject.imageUrl})`;
    }
  }, [imageObject]);

  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
    }
  }, [user]);

  return (
    <>
      <TopAppBar
        user={user}
        handleNameChange={handleNameChange}
        logOut={logOut}
        handleDeleteAccount={handleDeleteAccount}
        handleVerifyDeleteAccount={handleVerifyDeleteAccount}
      />

      <MessageDisplay
        name={name}
        quoteObject={quoteObject}
      />

      <BottomAppBar
        tasks={tasks}
        updateTasks={updateTasks}
        imageObject={imageObject}
        quoteObject={quoteObject}
      />
    </>
  );
}

export default MainPage;
