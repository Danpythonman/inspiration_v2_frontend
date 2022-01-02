import { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import './App.css';

function App() {
  // If the auth and refresh tokens in local storage are defined, then user is logged in.
  // We just check auth token and assume refresh token exists if auth token exists.
  // For guest users, auth and refresh tokens are both the string "guest".
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("inspiration_v2_auth_token") ? true : false);

  return (
    <div className="App">
      {
        isLoggedIn
        ? <p>Hi</p>
        : <WelcomePage setIsLoggedIn={setIsLoggedIn} />
      }
    </div>
  );
}

export default App;
