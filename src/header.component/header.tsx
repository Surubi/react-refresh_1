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
        <header className="bg-blue-500 text-white shadow-md border-b border-lime-300">
            <div className="flex justify-between items-center px-4 py-3">
                {/* Left side: Logo + Title */}
                <div className="flex items-center gap-2 cursor-pointer" onClick={viewCtrl}>
                    <div className="text-4xl leading-none">🌐</div>
                    <h1 className="text-2xl font-bold">fiLmi</h1>
                </div>
                <div className="flex items-center gap-6">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-96 px-4 py-3 border border-gray-300 rounded-lg text-lg text-black 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:w-[40rem]"
                    />
                </div>

                {/* Right side: Menu + Profile */}
                <div className="flex items-center gap-6">
                    <nav className="flex gap-4">
                        <Link to="#" className="hover:text-lime-200">Home</Link>
                        <Link to="#" className="hover:text-lime-200">Movies</Link>
                        <Link to="#" className="hover:text-lime-200">About</Link>
                    </nav>

                    <div className="flex items-center gap-2 cursor-pointer">
                        <img
                            src="/assets/img/logo.jpg"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                        <span className="font-medium">{ userAuthState.userName }</span>
                    </div>
                </div>
            </div>
        </header>

    );
};