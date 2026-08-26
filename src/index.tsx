import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from './features/menue-ctrl/app-store';
// import { initKeycloak } from './kc-config/init.keycloak';

// @ts-ignore - keep the import compatible until moduleResolution is set to "bundler", "node16", or "nodenext".
import Keycloak from 'keycloak-js';
import KeyCloakConfig from './kc-config/keycloak-config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const KEY_CLOAK: Keycloak = new Keycloak(KeyCloakConfig.getKeycloakConfig());

KEY_CLOAK.init(KeyCloakConfig.getKeycloakInitOptions()).then((authenticated: boolean) => {
  console.log('Keycloak initialized. Authenticated:', authenticated);
  if (authenticated && KEY_CLOAK.token) {
    KeyCloakConfig.setKeycloakBearerToken(KEY_CLOAK.token);
    KeyCloakConfig.setAuthenticated(true);
  } else {
    KeyCloakConfig.clearKeycloakBearerToken();
    KeyCloakConfig.clearAuthenticated();
  }
  console.log('Keycloak Complete : ', KEY_CLOAK);

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={appStore}>
          <App KEY_CLOAK={KEY_CLOAK} isAuthenticated={authenticated} />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}).catch((error: any) => {
  KeyCloakConfig.clearKeycloakBearerToken();
  KeyCloakConfig.clearAuthenticated();
  console.error('Keycloak initialization error:', error);
});


// initKeycloak();



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
