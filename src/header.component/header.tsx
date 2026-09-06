import { Link } from "react-router-dom";
import { toggleExpand } from "../features/menue-ctrl/menue-visiblity-ctrl.store";
import { useDispatch, useSelector } from "react-redux";
import { UserAuthState } from "../features/menue-ctrl/user-auth-store";

export const Header = () => {

    const userAuthState: UserAuthState = useSelector((state: any) => state.userAuth) || { isAuthenticated: false, userName: null };
    
    const dispatch = useDispatch();
    const isCollapsed: boolean = useSelector((state: any) => state.toggleMenue.toggle);
    const viewCtrl = () => {
        dispatch(toggleExpand({ toggle: !isCollapsed }));
    }




    return (
        <header className="overflow-hidden border-b border-cyan-200 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 text-white shadow-md">
            <div className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                {/* Left side: Logo + Title */}
                <div className="flex min-w-0 items-center gap-2" onClick={viewCtrl}>
                    <div className="shrink-0 text-4xl leading-none">🌐</div>
                    <h1 className="truncate text-2xl font-bold">fiLmi</h1>
                </div>
                <div className="w-full min-w-0 sm:order-2 sm:flex-1 sm:px-4 lg:order-none lg:max-w-xl">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full rounded-lg border border-blue-200 px-4 py-2.5 text-base text-black shadow-sm focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                    />
                </div>

                {/* Right side: Menu + Profile */}
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 sm:order-3 sm:ml-auto lg:order-none">
                    <nav className="flex min-w-0 flex-wrap gap-x-4 gap-y-1 text-sm">
                        <Link to="#" className="hover:text-cyan-100">Home</Link>
                        <Link to="#" className="hover:text-cyan-100">Movies</Link>
                        <Link to="#" className="hover:text-cyan-100">About</Link>
                    </nav>

                    <div className="flex min-w-0 items-center gap-2">
                        <img
                            src="/assets/img/logo.jpg"
                            alt="User Avatar"
                            className="h-9 w-9 shrink-0 rounded-full border-2 border-white"
                        />
                        <span className="max-w-[8rem] truncate font-medium">{ userAuthState.userName }</span>
                    </div>
                </div>
            </div>
        </header>

    );
};