import WelcomePage from './components/WelcomePage';
import './App.css';

function App() {
  return (
    <div className="App">
      {
        localStorage.getItem("inspiration_v2_auth_token")
        ? <></>
        : <WelcomePage />
      }
    </div>
  );
}

export default App;
