import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAdminStatus = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    const {user} = useSelector(state => state.auth);

    useEffect(() => {
        if(user && user.isAdmin){
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }

        setCheckingStatus(false);
    }, [user]);

    return {isAdmin, checkingStatus}
}