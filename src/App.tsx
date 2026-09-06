import React, { useEffect } from 'react';
// @ts-ignore - keep the import compatible until moduleResolution is set to "bundler", "node16", or "nodenext".
import { AppRouting } from './app-routing.component/app-routing';
import { Footer } from './footer.component/footer';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from './features/menue-ctrl/user-auth-store';
import { getLoggedInUseName, login } from './kc-config/keycloak-config';


const App = ({ isAuthenticated }: {isAuthenticated: boolean }) => {

  const dispatch = useDispatch();
  dispatch(setAuthenticated({ isAuthenticated: isAuthenticated, userName:  getLoggedInUseName()}));
  //const navigate = useNavigate();
  useEffect(() => {
    return () => clearInterval(window.refreshTokenInterval);
  }, [ isAuthenticated]);

  


  return (
    <div className="App flex h-screen min-h-0 flex-col overflow-hidden">
      <div className="min-h-0 flex-1">
        <AppRouting isAuthenticated={isAuthenticated} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
