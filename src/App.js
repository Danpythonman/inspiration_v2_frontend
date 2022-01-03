import { useState, useEffect } from 'react';
import MainPage from './components/MainPage';
import WelcomePage from './components/WelcomePage';
import getImage from './api/getImage';
import getQuote from './api/getQuote';
import getNameAndEmail from './api/getNameAndEmail';
import './App.css';

function App() {
  // If the auth and refresh tokens in local storage are defined, then user is logged in.
  // We just check auth token and assume refresh token exists if auth token exists.
  // For guest users, auth and refresh tokens are both the string "guest".
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("inspiration_v2_auth_token") ? true : false);

  const [imageObject, setImageObject] = useState({});
  const [quoteObject, setQuoteObject] = useState({});
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("inspiration_v2_user")));

  const getImageFromBackend = async () => {
    try {
      const imageResponse = await getImage();

      setImageObject(imageResponse.data);
    } catch (err) {
      // If the response property is defined, then there was an error with the server
      if (err.response) {
        alert(`ERROR: Status ${err.response.status}\n${err.response.data}`);
      } else {
        alert(`ERROR: ${err}`);
      }
    }
  }

  const getQuoteFromBackend = async () => {
    try {
      const quoteResponse = await getQuote();

      setQuoteObject(quoteResponse.data);
    } catch (err) {
      // If the response property is defined, then there was an error with the server
      if (err.response) {
        alert(`ERROR: Status ${err.response.status}\n${err.response.data}`);
      } else {
        alert(`ERROR: ${err}`);
      }
    }
  }

  const getNameAndEmailFromBackend = async () => {
    try {
      const nameAndEmailResponse = await getNameAndEmail();

      setUser(nameAndEmailResponse.data);
      localStorage.setItem("inspiration_v2_user", JSON.stringify(nameAndEmailResponse.data));
    } catch (err) {
      // If the response property is defined, then there was an error with the server
      if (err.response) {
        alert(`ERROR: Status ${err.response.status}\n${err.response.data}`);
      } else {
        alert(`ERROR: ${err}`);
      }
    }
  }

  useEffect(() => {
    getImageFromBackend();
    getQuoteFromBackend();
    if (localStorage.getItem("inspiration_v2_auth_token") && localStorage.getItem("inspiration_v2_auth_token") !== "guest") {
      getNameAndEmailFromBackend();
    }
  }, []);

  return (
    <div className="App">
      {
        isLoggedIn
        ? <MainPage imageObject={imageObject} quoteObject={quoteObject} user={user} />
        : <WelcomePage setIsLoggedIn={setIsLoggedIn} />
      }
    </div>
  );
}

export default App;
