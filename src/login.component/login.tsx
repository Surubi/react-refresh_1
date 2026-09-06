import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated, login } from "../kc-config/keycloak-config";

export const Login = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            console.log("User is authenticated");
            navigate("/home", { replace: true });
        } else {
            console.log("User is not authenticated");
            navigate("/login", { replace: true });
            //login();
        }
    }, [navigate]);

    const handleLogin = () => {
        if (isAuthenticated()) {
            console.log("User is authenticated");
            navigate("/home", { replace: true });
        } else {
            console.log("User is not authenticated");
            login();
            // navigate("/login", { replace: true });
        }
    }


    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
            <div className="relative">
                <section className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
                    <p className="mt-3 text-slate-600">SSO is enabled for this app. Click below to continue.</p>
                    <button
                        type="button"
                        aria-label="Continue with SSO"
                        title="Continue with SSO"
                        className="mx-auto mt-8 block rounded-full p-2 transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
                        onClick={handleLogin}
                    >
                        <img
                            src="/assets/img/lock.svg"
                            alt="Continue with SSO"
                            className="h-16 w-16"
                        />
                    </button>
                </section>
            </div>
        </main>
    );
}