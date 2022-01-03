import { useState, useEffect } from 'react';
import MainPage from './components/MainPage';
import WelcomePage from './components/WelcomePage';
import getImage from './api/getImage';
import getQuote from './api/getQuote';
import './App.css';

function App() {
  // If the auth and refresh tokens in local storage are defined, then user is logged in.
  // We just check auth token and assume refresh token exists if auth token exists.
  // For guest users, auth and refresh tokens are both the string "guest".
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("inspiration_v2_auth_token") ? true : false);

  const [imageObject, setImageObject] = useState({});
  const [quoteObject, setQuoteObject] = useState({});

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

  useEffect(() => {
    getImageFromBackend();
    getQuoteFromBackend();
  }, []);

  return (
    <div className="App">
      {
        isLoggedIn
        ? <MainPage imageObject={imageObject} quoteObject={quoteObject} />
        : <WelcomePage setIsLoggedIn={setIsLoggedIn} />
      }
    </div>
  );
}

export default App;
