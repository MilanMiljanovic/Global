import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./lib/firebase";
import { getDoc, doc } from "firebase/firestore";
import LoggedInUserContext from "./context/LoggedInUserContext";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Account from "./pages/Account";
import NoPage from "./pages/NoPage";

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {

    onAuthStateChanged(auth, user => {

      if (user) {

        getDoc(doc(db, "users", user.uid))
          .then(doc => {
            setLoggedInUser({ ...doc.data(), id: doc.id });
          })
          .catch(error => { console.log(error.message) });
      }
      else {
        setLoggedInUser({});
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <LoggedInUserContext.Provider value={{ loggedInUser: loggedInUser, setLoggedInUser: setLoggedInUser }}>
        <Routes>
          <Route path="/" element={loggedInUser.id ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!loggedInUser.id ? <LogIn /> : <Navigate to="/" />} />
          <Route path="/signup" element={!loggedInUser.id ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/account/:userId" element={loggedInUser.id ? <Account /> : <Navigate to="/login" />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </LoggedInUserContext.Provider>
    </BrowserRouter >
  );
}

export default App;

