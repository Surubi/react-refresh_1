import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../login.component/login';
import { Unauthorized } from '../403.component/403';
import { UnAuthenticated } from '../401.component/401';
import { NotFound } from '../404.component/404';
import { Home } from '../home.component/Home';
import { IsAuthenticated } from '../auth-guard.component/IsAuthenticated';
import { Films } from '../films.component/Films';
import { Actors } from '../actors.component/actors';
import { Settings } from '../settings.component/settings';
import HomeContentComponent from '../home.component/default.home.compnent';

export const AppRouting = ({ isAuthenticated }: { isAuthenticated: boolean }) => {


  return (
    <Routes >
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Login />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="" element={<IsAuthenticated isAuthenticated={isAuthenticated}> <Home /></IsAuthenticated>} >
        <Route path="" element={<HomeContentComponent />} />
        <Route path="/actors" element={<Actors />} />
        <Route path="/films" element={<Films />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/unauthenticated" element={<UnAuthenticated />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}