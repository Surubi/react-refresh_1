export const UnAuthenticated = () => {
    
    
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="max-w-md w-full rounded-2xl border border-amber-500/30 bg-slate-800 p-8 text-center shadow-2xl">
                <div className="mb-4 text-6xl">🚫</div>
                <h1 className="text-3xl font-bold text-white">401 - Unauthenticated</h1>
                <p className="mt-3 text-slate-300">
                    Please sign in to access this page.
                </p>
                <button className="mt-6 rounded-lg bg-amber-500 px-4 py-2 font-semibold text-slate-900 transition hover:bg-amber-400">
                    Sign In
                </button>
            </div>
        </div>
    );
};