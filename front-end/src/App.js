import Game from "./Game";
import Home from "./Home";
import { useSelector } from 'react-redux'




// params needed
// if not logged in display login form
// else display game component

function App() {
  const userLoggedIn = useSelector(state => state.auth.loggedIn)


  return (
    <>
    {!userLoggedIn && <Home />}
    {userLoggedIn &&  <Game />}
    </>
  );
}

export default App;
