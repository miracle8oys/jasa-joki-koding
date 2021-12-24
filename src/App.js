import {BrowserRouter, Routes, Route} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { signInWithGoogle, auth } from "./config/firebase";
import Home from "./Home";
import { useState } from "react";
import Login from "./Login";
import Admin from "./Admin";
import TaskDetail from "./TaskDetail";
function App() {

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login signInWithGoogle={signInWithGoogle} user={user} />} />
          <Route path="/admin" element={<Admin user={user} signOut={signOut} auth={auth} />} />
          <Route path="/task/:task_id" element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
