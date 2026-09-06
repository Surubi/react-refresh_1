import { useNavigate } from "react-router-dom";



export const NotFound = () => {
    const  navigate = useNavigate();

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full rounded-2xl border border-sky-500/30 bg-slate-800 p-8 text-center shadow-2xl">
                <div className="mb-4 text-6xl">🌐</div>
                <h1 className="text-4xl font-bold text-white">404</h1>
                <p className="mt-3 text-xl text-sky-300">Page Not Found</p>
                <p className="mt-2 text-slate-300">
                    The page you are looking for does not exist or has been moved.
                </p>
                <button onClick={() => navigate('/home')} className="mt-6 rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white transition hover:bg-sky-600">
                    Go Home
                </button>
            </div>
        </div>
    );
};