import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { reloadUserProfile } from './redux/UserSlice';
import Router from './router/router';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reloadUserProfile());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;

