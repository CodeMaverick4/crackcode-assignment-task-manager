
import SignUp from './components/signUp';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './services/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import TaskManager from './components/task_manager';
import LogIn from './components/signIn';

function App() {  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Show a loader while checking auth state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the user if signed in
      setLoading(false); // Stop loading once auth state is determined
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or loader component
  }

  return (
    <Routes>
    {/* Redirect to /all_task if logged in, else show LogIn */}
    <Route path="/signin" element={!user ? <LogIn /> : <Navigate to="/all_task" />} />

    {/* Redirect to /all_task if logged in, else show SignUp */}
    <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/all_task" />} />

    {/* Show TaskManager if logged in, else redirect to /signin */}
    <Route path="/all_task" element={user ? <TaskManager user={user}/> : <Navigate to="/signin" />} />

    {/* Catch-all route to redirect unknown paths */}
    <Route path="*" element={<Navigate to={user ? "/all_task" : "/signin"} />} />
  </Routes>   
  // <TaskManager/>
  );
}

export default App;
