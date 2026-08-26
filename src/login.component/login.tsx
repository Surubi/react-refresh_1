import { useNavigate } from "react-router-dom";
import KeyCloakConfig from "../kc-config/keycloak-config";
import { useEffect } from "react";
import { KEY_CLOAK } from "..";

export const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (KeyCloakConfig.isAuthenticated()) {
            console.log("User is authenticated");
            navigate("/home", { replace: true });
        }else{
            console.log("User is not authenticated");
            //navigate("/login", { replace: true });
           // KEY_CLOAK.login({ redirectUri: "http://localhost:3000/login" });
        } 
    }, [navigate]);

    const handleLogin = () => {
        if (KeyCloakConfig.isAuthenticated()) {
            console.log("User is authenticated");
            navigate("/home", { replace: true });
        } else {
            console.log("User is not authenticated");
            KEY_CLOAK.login({ redirectUri: "http://localhost:3000/login" });
        }
    }


    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
                <p className="mt-3 text-slate-600">SSO is enabled for this app. Click below to continue.</p>
                <button
                    className="mt-8 w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                    onClick={handleLogin}
                >
                    Login
                </button>
            </section>
        </main>
    );
}