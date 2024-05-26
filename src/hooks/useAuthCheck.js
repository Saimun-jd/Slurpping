import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
    const dispatch = useDispatch()
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(()=> {
        const localAuth = localStorage?.getItem("userInfo");
        const token = localStorage?.getItem("accessToken");
        if(localAuth?.userInfo && token?.accessToken) {
            dispatch(userLoggedIn({
                userInfo: JSON.parse(localAuth.userInfo),
                accessToken: JSON.parse(token.accessToken)
            }))
        }
        setAuthChecked(true);
    }, [dispatch, setAuthChecked]);
    return authChecked;
}