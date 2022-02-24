import { useState, useEffect } from 'react';
import MainPage from './components/MainPage';
import WelcomePage from './components/WelcomePage';
import getImage from './api/getImage';
import getQuote from './api/getQuote';
import getNameAndEmail from './api/getNameAndEmail';
import changeName from './api/changeName';
import deleteAccount from './api/deleteAccount';
import verifyDeleteAccount from './api/verifyDeleteAccount';
import getTodoList from './api/getTodoList';
import './App.css';

function App() {
  // If the auth and refresh tokens in local storage are defined, then user is logged in.
  // We just check auth token and assume refresh token exists if auth token exists.
  // For guest users, auth and refresh tokens are both the string "guest".
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("inspiration_v2_auth_token") ? true : false);

  const [imageObject, setImageObject] = useState({});
  const [quoteObject, setQuoteObject] = useState({});
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  const logIn = (authToken, refreshToken, userEmail, userName) => {
    // Set auth and refresh tokens in local storage to "guest"
    localStorage.setItem("inspiration_v2_auth_token", authToken);
    localStorage.setItem("inspiration_v2_refresh_token", refreshToken);

    // Set user object in local storage
    localStorage.setItem("inspiration_v2_user", JSON.stringify({ email: userEmail, name: userName }));

    // Set user object in state
    setUser({ email: userEmail, name: userName });

    // Set to true so main page will be rendered
    setIsLoggedIn(true);
  }

  const logOut = () => {
    // Set to false so welcome page will be rendered
    setIsLoggedIn(false);

    // Remove auth token, refresh token, user name and email, and to-do list from local storage
    localStorage.removeItem("inspiration_v2_auth_token");
    localStorage.removeItem("inspiration_v2_refresh_token");
    localStorage.removeItem("inspiration_v2_user");
    localStorage.removeItem("inspiration_v2_tasks");

    // Remove user from state
    setUser(null);
  }

  const handleAPIRequestError = (err) => {
    // If the response property is defined, then there was an error with the server
    if (err.response) {
      // If the status is 401, then the refresh token is invalid and the user must log in again
      if (err.response.status === 401) {
        alert("Token expired, please log in again");
        logOut();
      } else {
        alert(`ERROR: Status ${err.response.status}\n${err.response.data}`);
      }
    } else {
      alert(`ERROR: ${err}`);
    }
  }

  const getImageFromBackend = async () => {
    try {
      const imageResponse = await getImage();

      setImageObject(imageResponse.data);
    } catch (err) {
      handleAPIRequestError(err);
    }
  }

  const getQuoteFromBackend = async () => {
    try {
      const quoteResponse = await getQuote();

      setQuoteObject(quoteResponse.data);
    } catch (err) {
      handleAPIRequestError(err);
    }
  }

  const getNameAndEmailFromBackend = async () => {
    try {
      const nameAndEmailResponse = await getNameAndEmail();

      setUser(nameAndEmailResponse.data);

      // Save name and email to local storage
      localStorage.setItem("inspiration_v2_user", JSON.stringify(nameAndEmailResponse.data));
    } catch (err) {
      handleAPIRequestError(err);
    }
  }

  const getTasks = async () => {
    try {
      // If user is a guest, then get the tasks from local storage.
      // If user is not a guest, then get the tasks from the database.
      if (localStorage.getItem("inspiration_v2_auth_token") === "guest") {
        // Get to-do list from local storage
        let todoList = JSON.parse(localStorage.getItem("inspiration_v2_tasks"));

        if (!todoList) {
          todoList = [];
          localStorage.setItem("inspiration_v2_tasks", JSON.stringify(todoList));
        }

        // Save to-do list to state
        setTasks(todoList);
      } else {
        // Get to-do list from backend
        const todoListResponse = await getTodoList();

        // Save to-do list to state and local storage
        setTasks(todoListResponse.data);
        localStorage.setItem("inspiration_v2_tasks", JSON.stringify(todoListResponse.data));
      }
    } catch (err) {
      handleAPIRequestError(err);
    }
  }

  const handleNameChange = async (newName) => {
    try {
      const oldUserObject = JSON.parse(localStorage.getItem("inspiration_v2_user"));
      const newUserObject = { email: oldUserObject.email, name: newName };

      // If user is logged in, send request to change name in backend
      if (oldUserObject.email) {
        await changeName(newName);
      }

      setUser(newUserObject);

      // Save name and email to local storage
      localStorage.setItem("inspiration_v2_user", JSON.stringify(newUserObject));

      alert("Name changed successfully");
    } catch (err) {
      handleAPIRequestError(err);
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();

      return true;
    } catch (err) {
      handleAPIRequestError(err);
    }
  }

  const handleVerifyDeleteAccount = async (verificationCode) => {
    try {
      await verifyDeleteAccount(verificationCode);

      logOut();
    } catch (err) {
      handleAPIRequestError(err);
    }
  }

  const updateTasks = (newTasks) => {
    // Update to-do list in state
    setTasks(newTasks);

    // Update to-do list in local storage
    localStorage.setItem("inspiration_v2_tasks", JSON.stringify(newTasks));
  }

  useEffect(() => {
    // When user logs in, get their name and email from backend
    if (isLoggedIn) {
      // If user is not a guest, get their name and email from backend
      if (localStorage.getItem("inspiration_v2_auth_token") && localStorage.getItem("inspiration_v2_auth_token") !== "guest") {
        getNameAndEmailFromBackend();
      }

      // Also get tasks. This function gets tasks from backend if user is logged in, or from local storage if user is a guest.
      getTasks();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // When an image is received from the backend, set the background to that image
    document.body.style.backgroundImage = `url(${imageObject.imageUrl})`;
  }, [imageObject]);

  useEffect(() => {
    getImageFromBackend();
    getQuoteFromBackend();

    if (localStorage.getItem("inspiration_v2_auth_token") && localStorage.getItem("inspiration_v2_auth_token") !== "guest") {
      getNameAndEmailFromBackend();
    } else {
      setUser(JSON.parse(localStorage.getItem("inspiration_v2_user")));
    }
  }, []);

  return (
    <div className="App">
      {
        isLoggedIn
        ? <MainPage
          imageObject={imageObject}
          quoteObject={quoteObject}
          user={user}
          tasks={tasks}
          updateTasks={updateTasks}
          handleNameChange={handleNameChange}
          logOut={logOut}
          handleDeleteAccount={handleDeleteAccount}
          handleVerifyDeleteAccount={handleVerifyDeleteAccount}
        />
        : <WelcomePage logIn={logIn} />
      }
    </div>
  );
}

export default App;
