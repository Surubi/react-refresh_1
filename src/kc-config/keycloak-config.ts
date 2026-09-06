// keycloak-js exposes its typings through an export map that older TypeScript
// module-resolution settings cannot resolve.
// @ts-ignore - keep the import compatible until moduleResolution is set to "bundler", "node16", or "nodenext".
import Keycloak from 'keycloak-js';



declare global {
  interface Window {
    refreshTokenInterval:  NodeJS.Timer;
  }
}

const url: string = process.env.REACT_APP_SERVER_URL || "http://localhost:8080";
const realm: string = process.env.REACT_APP_REALM || "react-application-realm";
const clientId: string = process.env.REACT_APP_CLIENT_ID || "react-application-client";


const getKeycloakConfig: any = () => {
    return {
        url: url,
        realm: realm,
        clientId: clientId
    };
}

const KEY_CLOAK: Keycloak = new Keycloak(getKeycloakConfig());
const getKeycloakInitOptions: any = () => {
    return {
        onLoad: "check-sso", //"login-required",   // or 'check-sso'
        pkceMethod: "S256",         // recommended for security
        checkLoginIframe: false,
    };
}



const handleTokenRefresh = () => {
    KEY_CLOAK.updateToken(30).then((refreshed: boolean) => {
        if (refreshed) {
            console.log("Token refreshed");
        } else {
            console.log("Token not refreshed, valid for " + Math.round(KEY_CLOAK.tokenParsed?.exp! + KEY_CLOAK.timeSkew! - new Date().getTime() / 1000) + " seconds");
        }
    }).catch(() => {
        console.error("Failed to refresh token");
        logout();


    });
};

export const initializeKeycloak = async () => {

    const keycloakInitOptions = getKeycloakInitOptions();
    try {
        const authenticated = await KEY_CLOAK.init(keycloakInitOptions)
        setKeycloakBearerToken(KEY_CLOAK.token);
        setAuthenticated(authenticated);
        setLoggedInUseName(KEY_CLOAK.tokenParsed?.preferred_username || undefined);
        window.refreshTokenInterval = setInterval(() => {
            handleTokenRefresh();
        }, 30000);
        return authenticated;
    } catch (ex) {
        return false;
    }
}

const setLoggedInUseName = (username: string) => {
    localStorage.setItem('user_name', username);
}

export const getLoggedInUseName = (): string | null => {
    return localStorage.getItem('user_name');
}

export const getKeycloakBearerToken = (): string | null => {
    const token = localStorage.getItem('kc_token');
    return token ? token : null;
}


export const setKeycloakBearerToken = (token: string) => {
    localStorage.setItem('kc_token', token);
}

export const clearKeycloakBearerToken = (): void => {
    localStorage.removeItem('kc_token');
}

export const isAuthenticated = (): boolean => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return isAuthenticated === 'true';
}

export const logout = () => {
    localStorage.removeItem('user_name');
    localStorage.removeItem('isAuthenticated');
    clearKeycloakBearerToken();
    KEY_CLOAK.logout({ redirectUri: "http://localhost:3000/login" });
}

export const login = () => {
    KEY_CLOAK.login({ redirectUri: "http://localhost:3000/login" });
}

const setAuthenticated = (isAuthenticated: boolean) => {
    localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false');
}

