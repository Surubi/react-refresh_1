export const Unauthorized = () => {

    


    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
            <div className="max-w-md w-full rounded-2xl border border-red-500/30 bg-slate-800 p-8 text-center shadow-2xl">
                <div className="mb-4 text-6xl">🔐</div>
                <h1 className="text-3xl font-bold text-white">403 - Forbidden</h1>
                <p className="mt-3 text-slate-300">
                    You are not authorized to access this page.
                </p>
                <button className="mt-6 rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition hover:bg-red-600">
                    Go to Login
                </button>
            </div>
        </div>
    );
};