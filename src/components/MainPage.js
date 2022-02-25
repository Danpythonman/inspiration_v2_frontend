import {useState, useEffect } from "react";
import TopAppBar from "./TopAppBar";
import MessageDisplay from "./MessageDisplay";
import BottomAppBar from "./BottomAppBar";

const MainPage = ({ imageObject, quoteObject, user, tasks, updateTasks, handleColorChange, handleNameChange, logOut, handleDeleteAccount, handleVerifyDeleteAccount, handleAPIRequestError }) => {
  const [name, setName] = useState(JSON.parse(localStorage.getItem("inspiration_v2_user")).name);

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
        user={user}
        tasks={tasks}
        updateTasks={updateTasks}
        imageObject={imageObject}
        quoteObject={quoteObject}
        handleColorChange={handleColorChange}
        handleAPIRequestError={handleAPIRequestError}
      />
    </>
  );
}

export default MainPage;
