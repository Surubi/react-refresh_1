import React from 'react';
import ReactDOM from 'react-dom/client';
// @ts-ignore
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from './features/menue-ctrl/app-store';

// @ts-ignore - keep the import compatible until moduleResolution is set to "bundler", "node16", or "nodenext".
import { initializeKeycloak, logout } from './kc-config/keycloak-config';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
(async () => {
  try {
    const isAuthenticated = await initializeKeycloak();
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Provider store={appStore}>
            <App isAuthenticated={isAuthenticated} />
          </Provider>
        </BrowserRouter>
      </React.StrictMode>
    );

  } catch (ex) {
    logout();
  }
})();






//export const KEY_CLOAK: Keycloak = new Keycloak(getKeycloakConfig());

// KEY_CLOAK.init(getKeycloakInitOptions()).then((authenticated: boolean) => {
//   console.log('Keycloak initialized. Authenticated:', authenticated);
//   if (authenticated && KEY_CLOAK.token) {
//     setKeycloakBearerToken(KEY_CLOAK.token);
//     setAuthorizationToken(KEY_CLOAK.token);
//     setAuthenticated(true);
//   } else {
//     logout();
//     deleteAuthorizationToken();
//   }
//   console.log('Keycloak Complete : ', KEY_CLOAK);

//   root.render(
//     <React.StrictMode>
//       <BrowserRouter>
//         <Provider store={appStore}>
//           <App KEY_CLOAK={KEY_CLOAK} isAuthenticated={authenticated} />
//         </Provider>
//       </BrowserRouter>
//     </React.StrictMode>
//   );
// }).catch((error: any) => {
//   logout();
//   console.error('Keycloak initialization error:', error);
// });


// initKeycloak();



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
