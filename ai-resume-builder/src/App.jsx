import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet } from 'react-router-dom';
import Header from './components/custome/Header';
import { Toaster } from 'sonner';

function App() {
  const { user, isLoaded, isSignedIn } = useUser(); // Corrected destructuring

  if (!isLoaded) {
    // Optionally show a loading indicator while user is being fetched
    return <div>Loading...</div>;
  }

  if (!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/sign-in'} />;
  }
  return (
    <>
       <Header/>
      <Outlet />
      <Toaster/>
    </>
  );
}

export default App;
