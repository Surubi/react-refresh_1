import React, { useEffect } from 'react';
// @ts-ignore - keep the import compatible until moduleResolution is set to "bundler", "node16", or "nodenext".
import type Keycloak from 'keycloak-js';
import { AppRouting } from './app-routing.component/app-routing';
import { Footer } from './footer.component/footer';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from './features/menue-ctrl/user-auth-store';
import { useNavigate } from 'react-router-dom';


// import './App.css';
const App = ({ KEY_CLOAK, isAuthenticated }: { KEY_CLOAK: Keycloak, isAuthenticated: boolean }) => {

  const dispatch = useDispatch();
  dispatch(setAuthenticated({ isAuthenticated: isAuthenticated, userName: KEY_CLOAK.tokenParsed?.preferred_username || "" }));
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated");
      //KEY_CLOAK.login({ redirectUri: "http://localhost:3000/login" });
    } else {
      console.log("User is authenticated");
    }
    const interval = setInterval(() => {
      handleTokenRefresh();
    }, 30000); // Refresh token every 5 minutes

    return () => clearInterval(interval);
  }, [ isAuthenticated]);

  const handleTokenRefresh = () => {
    KEY_CLOAK.updateToken(30).then((refreshed: boolean) => {
      if (refreshed) {
        console.log("Token refreshed");
      } else {
        console.log("Token not refreshed, valid for " + Math.round(KEY_CLOAK.tokenParsed?.exp! + KEY_CLOAK.timeSkew! - new Date().getTime() / 1000) + " seconds");
      }
    }).catch(() => {
      console.error("Failed to refresh token");
      KEY_CLOAK.logout({ redirectUri: "http://localhost:3000/login" });
      dispatch(setAuthenticated({ isAuthenticated: false, userName: "" }));
      navigate("/login", { replace: true });
    });
  };


  return (
    <div className="App min-h-screen flex flex-col">
      <AppRouting isAuthenticated={isAuthenticated} />
      <Footer />
    </div>
  );
}

export default App;
