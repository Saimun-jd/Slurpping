import { Link } from "react-router-dom";
import logoImage from "../../assets/images/lws-logo-dark.svg";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../features/auth/authSlice";

export default function Navigation() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const logout = () => {
        dispatch(userLoggedOut());
    }
    return (
        <nav className="border-general sticky top-0 z-40 border-b bg-[#2C3E50] transition-colors">
            <div className="max-w-9xl mx-auto">
                <div className="flex justify-between h-16 items-center mx-4">
                    <Link to="/">
                        <img
                            className="h-16"
                            src="/chatify-logo.png"
                            alt="Chatify"
                        />
                    </Link>
                    <ul>
                        <li className="font-bold flex flex-row justify-center items-center gap-2">
                            <div className="text-white border-b-2 border-green-400 border-spacing-4">{auth.userInfo.user.username}</div>
                            <div className="text-white cursor-pointer" onClick={logout}>Logout</div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
