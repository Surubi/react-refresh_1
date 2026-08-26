// keycloak-js exposes its typings through an export map that older TypeScript
// module-resolution settings cannot resolve.
// @ts-ignore - keep the import compatible until moduleResolution is set to "bundler", "node16", or "nodenext".
import Keycloak from 'keycloak-js';
import { Navigate } from 'react-router-dom';


export default class  KeyCloakConfig {
    public static readonly url: string = "http://localhost:8080";
    public static readonly realm: string = "master";
    public static readonly clientId: string = "react-app-client";

    public static  KEY_CLOAK: Keycloak = new Keycloak(KeyCloakConfig.getKeycloakConfig());

    public static getKeycloakConfig(): any {
        return {
            url: KeyCloakConfig.url,
            realm: KeyCloakConfig.realm,
            clientId: KeyCloakConfig.clientId
        };
    }

    public static getKeycloakInitOptions(): any {
        return {
            onLoad: "check-sso", //"login-required",   // or 'check-sso'
            pkceMethod: "S256",         // recommended for security
            checkLoginIframe: false,
        };
    }

    public static initializeKeycloak(): void {
    
        const keycloakInitOptions = KeyCloakConfig.getKeycloakInitOptions();

        KeyCloakConfig.KEY_CLOAK.init(keycloakInitOptions).then((authenticated: boolean) => {
            console.log('Keycloak initialized. Authenticated:', authenticated);
            if (authenticated) {
                KeyCloakConfig.setKeycloakBearerToken(KeyCloakConfig.KEY_CLOAK.token);
                console.log('Keycloak Complete : ', KeyCloakConfig.KEY_CLOAK);
                KeyCloakConfig.setAuthenticated(true);

            } else {
                KeyCloakConfig.clearKeycloakBearerToken();
                KeyCloakConfig.clearAuthenticated();
                KeyCloakConfig.KEY_CLOAK.login({
                    redirectUri: "http://localhost:3000/login"
                });
            }
        }).catch((error: any) => {
            KeyCloakConfig.clearKeycloakBearerToken();
            KeyCloakConfig.clearAuthenticated();
            console.error('Keycloak initialization error:', error);
        });
    }

    public static getKeycloakBearerToken(): string | null {
        const token = localStorage.getItem('kc_token');
        return token ? token : null;
    }


    public static setKeycloakBearerToken(token: string): void {
        localStorage.setItem('kc_token', token);
    }

    public static clearKeycloakBearerToken(): void {
        localStorage.removeItem('kc_token');
    }

    public static isAuthenticated(): boolean {
        const token = KeyCloakConfig.getKeycloakBearerToken();
        return token !== null;
    }

    public static logout(): void {
        if(KeyCloakConfig.isAuthenticated()){
            KeyCloakConfig.KEY_CLOAK.logout({ redirectUri: "http://localhost:3000/login" });
        }
        KeyCloakConfig.clearKeycloakBearerToken();
        localStorage.removeItem('isAuthenticated');
    }

    public static setAuthenticated(isAuthenticated: boolean): void {
        localStorage.setItem('isAuthenticated', isAuthenticated ? 'true' : 'false');
    }

    public static getAuthenticated(): boolean {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        return isAuthenticated === 'true';
    }

    public static clearAuthenticated(): void {
        localStorage.removeItem('isAuthenticated');
    }


}

